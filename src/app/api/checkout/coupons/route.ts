import { NextRequest, NextResponse } from 'next/server';
import { BASE_URL, getHeaders, getCleanizedCookies } from '@/lib/zoho-api';

export async function POST(req: NextRequest) {
  try {
    const cookieHeader = req.headers.get('cookie') || '';
    const headers = getHeaders(cookieHeader);
    const body = await req.json();
    const { checkout_id, coupon_code } = body;

    if (!checkout_id || !coupon_code) {
        return NextResponse.json({ error: 'Missing checkout_id or coupon_code' }, { status: 400 });
    }

    console.log('[API Checkout Coupon] Applying coupon:', coupon_code);

    const res = await fetch(`${BASE_URL}/checkout/coupons?checkout_id=${checkout_id}`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ coupon_code }),
    });

    const cookiesToSend = getCleanizedCookies(res);
    const raw = await res.text();

    const responseInit: ResponseInit = { 
        status: res.ok ? 200 : res.status 
    };

    if (!res.ok) {
        console.error('[API Checkout Coupon] Error:', raw);
        const response = NextResponse.json({ error: raw }, responseInit);
        cookiesToSend.forEach(cookie => response.headers.append('Set-Cookie', cookie));
        return response;
    }

    const data = JSON.parse(raw);
    const checkout = data?.payload?.checkout || data?.checkout;

    const response = NextResponse.json({ 
        success: true,
        checkout
    }, responseInit);

    cookiesToSend.forEach(cookie => response.headers.append('Set-Cookie', cookie));

    return response;

  } catch (error: any) {
    console.error('[API Checkout Coupon] Exception:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
