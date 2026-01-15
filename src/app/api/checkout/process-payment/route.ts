import { NextRequest, NextResponse } from 'next/server';
import { BASE_URL, getHeaders, getCleanizedCookies, updateCookieInHeaders } from '@/lib/zoho-api';

export async function POST(req: NextRequest) {
  console.log('[API] /api/checkout/process-payment hit');
  try {
    const cookiesToSendAll: string[] = [];
    const cookieHeader = req.headers.get('cookie') || '';
    const clientCsrfToken = req.headers.get('X-ZCSRF-TOKEN');
    console.log('[API] Incoming Cookie Header:', cookieHeader ? 'Present' : 'Missing');
    console.log('[API] Incoming X-ZCSRF-TOKEN Header:', clientCsrfToken);

    const headers = getHeaders(cookieHeader);
    
    // STRICT RULE: Forward User-Agent and ensure domain-name
    const userAgent = req.headers.get('user-agent');
    if (userAgent) {
        (headers as any)['User-Agent'] = userAgent;
    }
    (headers as any)['domain-name'] = 'amariscalpcare.zohoecommerce.com';
    
    // Priority 1: Use the token sent by the client (strictly following user rule)
    if (clientCsrfToken) {
        const formatted = clientCsrfToken.startsWith('csrfp=') ? clientCsrfToken : `csrfp=${clientCsrfToken}`;
        (headers as any)['X-ZCSRF-TOKEN'] = formatted;
        console.log('[API] Using Client-Provided CSRF Token');
    }

    // STRICT RULE: Refresh Session BEFORE payment logic
    // This forces Zoho to see new settings and potentially sets the CSRF cookie if missing
    console.log('[API] Refreshing Session via /checkout?refresh=true...');
    let checkoutState: any = null;
    try {
        const refreshRes = await fetch(`${BASE_URL}/checkout?refresh=true`, { method: 'GET', headers });
        console.log('[API] Session Refresh Status:', refreshRes.status);
        
        const refreshCookies = getCleanizedCookies(refreshRes);
        if (refreshCookies.length > 0) {
            cookiesToSendAll.push(...refreshCookies);
            updateCookieInHeaders(refreshRes, headers);
        }

        if (refreshRes.ok) {
            try {
                const s = await refreshRes.json();
                checkoutState = s?.payload?.checkout || s?.checkout || s;
            } catch (e) {
                console.error('[API] Failed to parse checkout state:', e);
            }
        }
    } catch (e) {
        console.error('[API] Session Refresh Failed:', e);
    }

    // Re-evaluate CSRF from headers (in case Refresh added it)
    if (!(headers as any)['X-ZCSRF-TOKEN']) {
        const cookieStr = headers['Cookie'] || '';
        let csrfMatch = cookieStr.match(/(?:csrfp|csrfc|LS_CSRF_TOKEN)=([^;]+)/i);
        console.log('[API] Extracted CSRF from Cookie (after refresh):', csrfMatch ? csrfMatch[1] : 'null');

        if (csrfMatch && csrfMatch[1]) {
          (headers as any)['X-ZCSRF-TOKEN'] = `csrfp=${csrfMatch[1]}`;
        }
    }

    // Check if we have a token now
    if (!(headers as any)['X-ZCSRF-TOKEN']) {
      console.log('[API] CSRF token missing, attempting bootstrap...');
      
      const cookiesToSet: string[] = [];

      // Attempt 1: Refresh cookies from Zoho checkout
      let bootstrap = await fetch(`${BASE_URL}/checkout`, { method: 'GET', headers });
      console.log('[API] Bootstrap 1 Status:', bootstrap.status);
      
      let bootCookies = getCleanizedCookies(bootstrap);
      if (bootCookies.length > 0) {
        cookiesToSet.push(...bootCookies);
        updateCookieInHeaders(bootstrap, headers);
      }
      
      // Try to find token in body if not in cookies
      try {
          const clone = bootstrap.clone();
          const data = await clone.json();
          // Check common locations for CSRF token in Zoho responses
          const tokenInBody = data?.csrf_token || data?.payload?.csrf_token || data?.csrf;
          if (tokenInBody) {
             console.log('[API] Found CSRF in Bootstrap Body');
             const formatted = String(tokenInBody).startsWith('csrfp=') ? String(tokenInBody) : `csrfp=${tokenInBody}`;
             (headers as any)['X-ZCSRF-TOKEN'] = formatted;
             // Fake a match so we skip the next check or use it
              if (!headers['Cookie']?.includes('csrfp=') && !headers['Cookie']?.includes('csrfc=') && !headers['Cookie']?.includes('LS_CSRF_TOKEN=')) {
                  // If we found it in body but not cookie, we might need to set it as cookie?
                  // Or just use the header.
              }
           }
       } catch {}

       let refreshed = (headers['Cookie'] || '').match(/(?:csrfp|csrfc|LS_CSRF_TOKEN)=([^;]+)/i);
       
       // If found in body, we can construct a fake match or just rely on header being set
       if ((headers as any)['X-ZCSRF-TOKEN'] && !refreshed) {
           // If we set header from body, treat as refreshed
           refreshed = ['csrfp=' + (headers as any)['X-ZCSRF-TOKEN'], (headers as any)['X-ZCSRF-TOKEN']];
       }
       
       // Attempt 2: If still missing, try /cart (sometimes initializes session better)
       if (!refreshed) {
         console.log('[API] CSRF still missing, trying /cart...');
         const cartRes = await fetch(`${BASE_URL}/cart`, { method: 'GET', headers });
         const cartCookies = getCleanizedCookies(cartRes);
         if (cartCookies.length > 0) {
             cookiesToSet.push(...cartCookies);
             updateCookieInHeaders(cartRes, headers);
         }
         refreshed = (headers['Cookie'] || '').match(/(?:csrfp|csrfc|LS_CSRF_TOKEN)=([^;]+)/i);
       }

      console.log('[API] Refreshed CSRF Match:', refreshed ? refreshed[1] : 'null');

      if (refreshed && refreshed[1]) {
        (headers as any)['X-ZCSRF-TOKEN'] = refreshed[1];
        // We found it! We must ensure these cookies are sent back in the final response.
        // We'll add them to cookiesToSendAll later, or if we error now, we return them.
        cookiesToSendAll.push(...cookiesToSet);
      } else {
        const errResponse = NextResponse.json(
            { error: 'Missing CSRF token. The session may have expired. Please refresh the page.' }, 
            { status: 400 }
        );
        cookiesToSet.forEach(c => errResponse.headers.append('Set-Cookie', c));
        return errResponse;
      }
    }
    const body = await req.json();
    const { checkout_id, payment_gateway: bodyGateway } = body;

    if (!checkout_id) {
        return NextResponse.json({ error: 'Missing checkout_id' }, { status: 400 });
    }

    
    const paymentGateway = typeof bodyGateway === 'string' && bodyGateway.length > 0 ? bodyGateway : 'paystack';
    
    // checkoutState is already populated by the Refresh Session block above
    
    if (paymentGateway === 'cash_on_delivery') {
      const offlinePayments =
        checkoutState?.offline_payments ||
        checkoutState?.order?.offline_payments ||
        [];
      if (!Array.isArray(offlinePayments) || offlinePayments.length === 0) {
        return NextResponse.json({ error: 'Offline payment not available' }, { status: 400 });
      }

      const endpoint = `${BASE_URL}/checkout/process-offline-payment?checkout_id=${checkout_id}`;
      const payload = { payment_mode: 1001 };
      const res = await fetch(endpoint, { method: 'POST', headers, body: JSON.stringify(payload) });
      cookiesToSendAll.push(...getCleanizedCookies(res));
      updateCookieInHeaders(res, headers);
      const raw = await res.text();

      let data: any;
      try {
        data = JSON.parse(raw);
      } catch {
        data = { raw };
      }

      // Confirmation polling
      let confirmed = false;
      let orderId: string | undefined = data?.payload?.order_id || data?.order_id;
      for (let i = 0; i < 6 && !confirmed; i++) {
        const pollRes = await fetch(`${BASE_URL}/checkout?refresh=true`, { method: 'GET', headers });
        cookiesToSendAll.push(...getCleanizedCookies(pollRes));
        updateCookieInHeaders(pollRes, headers);
        if (pollRes.ok) {
          try {
            const pollData = await pollRes.json();
            const co = pollData?.payload?.checkout || pollData?.checkout;
            const tasks = co?.completed_tasks || {};
            confirmed = !!tasks?.order;
            orderId =
              orderId ||
              co?.order?.order_id ||
              pollData?.payload?.order_id ||
              pollData?.order_id;
          } catch {}
        }
        if (!confirmed) {
          await new Promise((r) => setTimeout(r, 800));
        }
      }

      const response = NextResponse.json(
        confirmed
          ? { success: true, order_id: orderId, raw: data }
          : { success: false, error: 'Order not created yet', raw: data },
        { status: confirmed ? 200 : res.status }
      );
      cookiesToSendAll.forEach((c) => response.headers.append('Set-Cookie', c));
      return response;
    }

    const payload: any = { payment_mode: 'online', payment_gateway: paymentGateway };
    
    // Attempt 1: /checkout/process-payment
    let primaryEndpoint = `${BASE_URL}/checkout/process-payment?checkout_id=${checkout_id}`;
    console.log('[API] Sending Online Payment Request to Zoho (Attempt 1):', primaryEndpoint);
    console.log('[API] Payload:', JSON.stringify(payload));
    
    let res = await fetch(primaryEndpoint, { method: 'POST', headers, body: JSON.stringify(payload) });
    console.log('[API] Zoho Response Status (Attempt 1):', res.status, res.statusText);

    // Attempt 2: /checkout/payment (Fallback if 404)
    if (res.status === 404) {
        console.log('[API] /process-payment returned 404, trying /payment...');
        primaryEndpoint = `${BASE_URL}/checkout/payment?checkout_id=${checkout_id}`;
        res = await fetch(primaryEndpoint, { method: 'POST', headers, body: JSON.stringify(payload) });
        console.log('[API] Zoho Response Status (Attempt 2):', res.status, res.statusText);
    }

    const cookiesToSend = getCleanizedCookies(res);
    cookiesToSendAll.push(...cookiesToSend);
    updateCookieInHeaders(res, headers);
    const raw = await res.text();
    console.log('[API] Zoho Response Body (Raw):', raw.substring(0, 200));

    const responseInit: ResponseInit = { 
        status: res.ok ? 200 : res.status 
    };

    let data;
    try {
        data = JSON.parse(raw);
    } catch {
        data = { raw, status: res.status, statusText: res.statusText };
    }

    const responsePayload = data?.payload || data;
    const nestedRedirect = data?.data?.redirect_url || data?.payload?.data?.redirect_url;
    const payment_url = responsePayload?.payment_url || responsePayload?.redirect_url || nestedRedirect;

    const errMessage =
      responsePayload?.error_message ||
      responsePayload?.message ||
      data?.message ||
      data?.error ||
      (typeof data === 'string' ? data : JSON.stringify(data)) ||
      `Failed to initiate payment (Status: ${res.status})`;

    const response = NextResponse.json(
      payment_url
        ? {
            success: true,
            payment_url,
            redirect_url: payment_url, // Alias for clarity
            raw: data
          }
        : {
            success: false,
            error: errMessage,
            raw: data,
            status: res.status
          },
      responseInit
    );

    cookiesToSendAll.forEach(cookie => response.headers.append('Set-Cookie', cookie));

    return response;

  } catch (error: any) {
    console.error('[API Checkout Payment] Exception:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
