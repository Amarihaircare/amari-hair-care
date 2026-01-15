import { NextRequest, NextResponse } from 'next/server';
import { BASE_URL, getHeaders, getCleanizedCookies } from '@/lib/zoho-api';

export async function POST(req: NextRequest) {
  try {
    const cookieHeader = req.headers.get('cookie') || '';
    const headers = getHeaders(cookieHeader);
    const body = await req.json();
    const { checkout_id, shipping_method_id } = body;

    if (!checkout_id || !shipping_method_id) {
        return NextResponse.json({ error: 'Missing checkout_id or shipping_method_id' }, { status: 400 });
    }

    console.log('[API Checkout Shipping] Setting method:', shipping_method_id);
    
    const endpoint = `${BASE_URL}/checkout/shipping-methods?checkout_id=${checkout_id}`;
    console.log('[API Checkout Shipping] Calling Zoho Endpoint:', endpoint);

    const res = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({ shipping: shipping_method_id }),
    });

    const cookiesToSend = getCleanizedCookies(res);
    const raw = await res.text();

    const responseInit: ResponseInit = { 
        status: res.ok ? 200 : res.status 
    };

    if (!res.ok) {
        console.error('[API Checkout Shipping] Error:', raw);
        const response = NextResponse.json({ error: raw }, responseInit);
        cookiesToSend.forEach(cookie => response.headers.append('Set-Cookie', cookie));
        return response;
    }

    const data = JSON.parse(raw);
    // Zoho might return 'checkout' or 'checkout_order_summary'
    const checkout = data?.payload?.checkout || data?.checkout || data?.payload?.checkout_order_summary;

    const response = NextResponse.json({ 
        success: true,
        checkout 
    }, responseInit);

    cookiesToSend.forEach(cookie => response.headers.append('Set-Cookie', cookie));

    return response;

  } catch (error: any) {
    console.error('[API Checkout Shipping] Exception:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
