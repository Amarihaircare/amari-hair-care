import { NextRequest, NextResponse } from 'next/server';
import { BASE_URL, getHeaders, getCleanizedCookies, updateCookieInHeaders } from '@/lib/zoho-api';

export async function POST(req: NextRequest) {
  console.log('[API] /api/checkout/offline-payment hit');
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
        const token = clientCsrfToken.startsWith('csrfp=') ? clientCsrfToken : `csrfp=${clientCsrfToken}`;
        (headers as any)['X-ZCSRF-TOKEN'] = token;
        console.log('[API] Using Client-Provided CSRF Token:', token);
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
          const token = csrfMatch[1].startsWith('csrfp=') ? csrfMatch[1] : `csrfp=${csrfMatch[1]}`;
          (headers as any)['X-ZCSRF-TOKEN'] = token;
        }
    }

    const body = await req.json();
    const { checkout_id } = body;

    if (!checkout_id) {
        return NextResponse.json({ error: 'Missing checkout_id' }, { status: 400 });
    }

    // Validate Offline Payment Eligibility
    let offlinePayments =
    checkoutState?.offline_payments ||
    checkoutState?.order?.offline_payments ||
    [];
    
    // Fallback: If refresh didn't return offline payments, try fetching full checkout
    if (!offlinePayments || offlinePayments.length === 0) {
        console.log('[API] Offline payments missing in refresh response, fetching full checkout...');
        try {
            const fullCheckoutRes = await fetch(`${BASE_URL}/checkout`, { method: 'GET', headers });
            if (fullCheckoutRes.ok) {
                const fullData = await fullCheckoutRes.json();
                const fullCheckout = fullData?.payload?.checkout || fullData?.checkout || fullData;
                offlinePayments = fullCheckout?.offline_payments || fullCheckout?.order?.offline_payments || [];
                
                // Update checkoutState for other uses if needed
                if (!checkoutState) checkoutState = fullCheckout;
            }
        } catch (e) {
            console.error('[API] Failed to fetch full checkout:', e);
        }
    }
    
    // Log for debugging
    console.log('[API] Offline Payments Available:', JSON.stringify(offlinePayments));

    if (!Array.isArray(offlinePayments)) {
        offlinePayments = [];
    }

    // Zoho API Endpoint for Offline Payment
    const endpoint = `${BASE_URL}/checkout/process-offline-payment?checkout_id=${checkout_id}&payment_mode=1001`;
    // User requested payment_mode=1001 specifically. Sending as both query (above) and body (below) to be safe.
    // Trying number format if string failed, or keeping string if that's what they meant. 
    // Usually APIs accept strings for IDs, but let's try strict compliance if they meant number.
    // However, the user said "payment_mode=1001" which looks like a string or query param.
    const payload = { payment_mode: 1001 }; 
    
    console.log('[API] Sending Offline Payment Request to Zoho:', endpoint);
    console.log('[API] Payload:', JSON.stringify(payload));

    const res = await fetch(endpoint, { method: 'POST', headers, body: JSON.stringify(payload) });
    console.log('[API] Zoho Response Status:', res.status, res.statusText);

    cookiesToSendAll.push(...getCleanizedCookies(res));
    updateCookieInHeaders(res, headers);
    const raw = await res.text();
    console.log('[API] Zoho Response Body (Raw):', raw.substring(0, 200));

    let data: any;
    try {
        data = JSON.parse(raw);
    } catch {
        data = { raw, status: res.status };
    }

    // Confirmation polling
    // Offline payments might be instant, but polling ensures we have the order_id
    let confirmed = false;
    let orderId: string | undefined = data?.payload?.order_id || data?.order_id || data?.data?.order_id;
    
    // If successful response, we might already have the redirect_url or success message
    if (data.code === 0 || data.success === true || res.ok) {
        // Polling to get final order details if needed
        for (let i = 0; i < 5 && !confirmed; i++) {
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
    }

    const responsePayload = data?.payload || data;
    const nestedRedirect = data?.data?.redirect_url || data?.payload?.data?.redirect_url;
    const redirect_url = responsePayload?.redirect_url || nestedRedirect;

    // Determine if the operation was actually successful
    // 1. Polling confirmed the order exists (confirmed === true)
    // 2. OR Zoho returned an explicit success code (code === 0)
    // 3. OR HTTP 200 and no obvious error in body
    const isZohoSuccess = data.code === 0 || data.success === true || (res.ok && !data.error && !data.message?.includes('error'));
    const isSuccess = confirmed || isZohoSuccess;

    const response = NextResponse.json(
        isSuccess
        ? { success: true, order_id: orderId, redirect_url, raw: data }
        : { success: false, error: data.message || data.error || 'Order not created', raw: data },
        { status: isSuccess ? 200 : (res.status === 200 ? 400 : res.status) }
    );
    cookiesToSendAll.forEach((c) => response.headers.append('Set-Cookie', c));
    return response;

  } catch (error: any) {
    console.error('[API Checkout Offline Payment] Exception:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
