import { NextRequest, NextResponse } from 'next/server';
import { BASE_URL, getHeaders, getCleanizedCookies, updateCookieInHeaders } from '@/lib/zoho-api';

export async function GET(req: NextRequest) {
  try {
    const cookieHeader = req.headers.get('cookie') || '';
    const headers: Record<string, string> = getHeaders(cookieHeader);
    const fallbackHeaders = { ...headers };

    const res = await fetch(`${BASE_URL}/checkout`, {
      method: 'GET',
      headers,
    });

    // Do not override headers with new cookies until we confirm
    let cookiesToSend = getCleanizedCookies(res);

    let data: any = null;
    let checkout_id: string | undefined;
    let countries: any[] = [];
    let completed_tasks: any = undefined;
    let order: any = undefined;
    let is_offline_payment_eligible: boolean | undefined = undefined;
    let payment_url: string | undefined = undefined;
    let offline_payments: any[] = [];
    let offline_error_message: string | undefined = undefined;
    let checkoutErrorRaw = '';

    if (res.ok) {
      const raw = await res.text();
      checkoutErrorRaw = raw;
      try {
        data = JSON.parse(raw);
      } catch {
        data = null;
      }
      if (data) {
        const checkoutData = data?.payload?.checkout || data?.checkout;
        checkout_id = checkoutData?.checkout_id;
        countries = checkoutData?.address_detail?.countries || [];
        completed_tasks = checkoutData?.completed_tasks;
        order = checkoutData?.order;
        is_offline_payment_eligible =
          checkoutData?.order?.is_offline_payment_eligible ??
          checkoutData?.is_offline_payment_eligible;
        payment_url = checkoutData?.order?.payment_url ?? checkoutData?.payment_url;
        offline_payments =
          data?.payload?.offline_payments ||
          checkoutData?.offline_payments ||
          [];
        offline_error_message =
          data?.payload?.error_message ||
          checkoutData?.error_message;
      }
    } else {
      checkoutErrorRaw = await res.text();
    }

    // Fallback: if checkout_id is missing, try /cart
    if (!checkout_id) {
      const cartRes = await fetch(`${BASE_URL}/cart`, {
        method: 'GET',
        headers: fallbackHeaders,
      });
      const cartCookies = getCleanizedCookies(cartRes);
      if (cartCookies.length > 0) {
        cookiesToSend = [...cookiesToSend, ...cartCookies];
      }
      if (cartRes.ok) {
        try {
          const cartData = await cartRes.json();
          checkout_id =
            cartData?.payload?.cart?.cart_id ||
            cartData?.cart?.cart_id ||
            cartData?.cart_id ||
            cartData?.payload?.cart_id;

          const lineItems = cartData?.payload?.line_items || cartData?.payload?.cart?.items || [];
          if (!checkout_id && Array.isArray(lineItems) && lineItems.length === 0) {
            const response = NextResponse.json(
              { error: 'Cart is empty', code: 'EMPTY_CART', redirect: '/cart' },
              { status: 400 },
            );
            cookiesToSend.forEach((cookie) => response.headers.append('Set-Cookie', cookie));
            return response;
          }
        } catch (e) {
          // ignore parse errors
        }
      }
    }

    if (!checkout_id) {
      return NextResponse.json(
        {
          error: 'Could not initialize checkout ID',
          details: checkoutErrorRaw || 'Checkout and Cart did not provide an id',
        },
        { status: 404 },
      );
    }

    const response = NextResponse.json({
      checkout_id,
      countries,
      completed_tasks,
      order,
      is_offline_payment_eligible,
      payment_url,
      offline_payments,
      error_message: offline_error_message,
    });

    cookiesToSend.forEach((cookie) => {
      response.headers.append('Set-Cookie', cookie);
    });

    // Merge cookies into headers for subsequent calls by clients (optional)
    updateCookieInHeaders(res, headers);

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
