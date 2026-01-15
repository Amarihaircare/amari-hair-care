import { NextRequest, NextResponse } from 'next/server';
import { BASE_URL, getHeaders, getCleanizedCookies } from '@/lib/zoho-api';

export async function POST(req: NextRequest) {
  try {
    const cookieHeader = req.headers.get('cookie') || '';
    const headers = getHeaders(cookieHeader);
    const body = await req.json();
    const { checkout_id, shipping_address, billing_address } = body;

    if (!checkout_id || (!shipping_address && !body.address)) {
        return NextResponse.json({ error: 'Missing checkout_id or address data' }, { status: 400 });
    }

    console.log('[API Checkout Address] Updating address for ID:', checkout_id);

    const shipping = shipping_address || body.address;
    const billing = billing_address || body.address;

    const formatAddress = (addr: any) => {
        const name: string = addr.name || '';
        const [first_name, ...rest] = name.split(' ');
        const last_name = rest.join(' ') || first_name;
        
        return {
            first_name,
            last_name,
            email_address: addr.email || addr.email_address,
            address: addr.address,
            city: addr.city,
            state: addr.state,
            postal_code: addr.zip || addr.postal_code,
            country: addr.country,
            telephone: addr.phone || addr.telephone || '0000000000',
        };
    };

    const payload = {
        billing_address: formatAddress(billing),
        shipping_address: formatAddress(shipping)
    };

    const res = await fetch(`${BASE_URL}/checkout/address?checkout_id=${checkout_id}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    const cookiesToSend = getCleanizedCookies(res);
    const raw = await res.text();

    const responseInit: ResponseInit = { 
        status: res.ok ? 200 : res.status 
    };

    if (!res.ok) {
        console.error('[API Checkout Address] Error:', raw);
        const response = NextResponse.json({ error: raw }, responseInit);
        cookiesToSend.forEach(cookie => response.headers.append('Set-Cookie', cookie));
        return response;
    }

    console.log('[API Checkout Address] Raw Response:', raw.substring(0, 1000)); // Log first 1000 chars

    const data = JSON.parse(raw);
    const shipping_methods = data?.payload?.checkout_shipping_methods?.shipping_methods || 
                             data?.payload?.shipping_methods || 
                             data?.shipping_methods || 
                             [];
    const checkout = data?.payload?.checkout || data?.checkout;

    const response = NextResponse.json({ 
        success: true, 
        shipping_methods,
        checkout 
    }, responseInit);

    cookiesToSend.forEach(cookie => response.headers.append('Set-Cookie', cookie));

    return response;

  } catch (error: any) {
    console.error('[API Checkout Address] Exception:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
