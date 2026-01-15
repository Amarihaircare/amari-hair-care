import { NextRequest, NextResponse } from 'next/server';
import { BASE_URL, getHeaders, getCleanizedCookies } from '@/lib/zoho-api';

// GET: Retrieve the current cart
export async function GET(req: NextRequest) {
  try {
    const cookieHeader = req.headers.get('cookie') || '';
    console.log('[API Cart GET] Incoming Cookie:', cookieHeader ? 'Present' : 'None');
    
    // Removed ?format=json to avoid EXTRA_PARAM_FOUND error
    const url = `${BASE_URL}/cart`;
    
    const res = await fetch(url, {
      method: 'GET',
      headers: getHeaders(cookieHeader),
    });

    const raw = await res.text();
    const cookiesToSend = getCleanizedCookies(res);
    
    if (cookiesToSend.length > 0) {
        console.log('[API Cart GET] Setting Cookies:', cookiesToSend.length);
    }

    const responseInit: ResponseInit = { 
        status: res.ok ? 200 : res.status 
    };

    let responseData;
    try {
        responseData = JSON.parse(raw);
    } catch {
        responseData = { error: raw };
    }

    const response = NextResponse.json(responseData, responseInit);
    
    // Set all cookies on the response
    cookiesToSend.forEach(cookie => {
        response.headers.append('Set-Cookie', cookie);
    });
    
    if (!res.ok) {
      console.error('[API Cart GET] Error:', raw);
    }

    return response;
  } catch (err: any) {
    console.error('[API Cart GET] Exception:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST: Add item to cart (or create cart)
// Endpoint: https://commerce.zoho.com/storefront/api/v1/cart/items
export async function POST(req: NextRequest) {
  try {
    const cookieHeader = req.headers.get('cookie') || '';
    console.log('[API Cart POST] Incoming Cookie:', cookieHeader ? 'Present' : 'None');
    const body = await req.json();

    // Forward the body (expects product_variant_id, quantity, cart_id, etc.)
    // Zoho Storefront API: POST /cart (not /cart/items)
    const res = await fetch(`${BASE_URL}/cart`, {
      method: 'POST',
      headers: getHeaders(cookieHeader),
      body: JSON.stringify(body),
    });

    const raw = await res.text();
    const cookiesToSend = getCleanizedCookies(res);

    if (cookiesToSend.length > 0) {
        console.log('[API Cart POST] Setting Cookies:', cookiesToSend.length);
        cookiesToSend.forEach((c, i) => console.log(`[API Cart POST] Cookie ${i}:`, c.split(';')[0]));
    } else {
        console.warn('[API Cart POST] No cookies received from Zoho!');
    }

    const responseInit: ResponseInit = { 
        status: res.ok ? 200 : res.status 
    };

    let responseData;
    try {
        responseData = JSON.parse(raw);
    } catch {
        responseData = { error: raw };
    }

    const response = NextResponse.json(responseData, responseInit);
    
    // Set all cookies on the response
    cookiesToSend.forEach(cookie => {
        response.headers.append('Set-Cookie', cookie);
    });

    if (!res.ok) {
      console.error('[API Cart POST] Error:', raw);
    }

    return response;
  } catch (err: any) {
    console.error('[API Cart POST] Exception:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PUT: Update item in cart
// Endpoint: https://commerce.zoho.com/storefront/api/v1/cart
export async function PUT(req: NextRequest) {
  try {
    const cookieHeader = req.headers.get('cookie') || '';
    console.log('[API Cart PUT] Incoming Cookie:', cookieHeader ? 'Present' : 'None');
    const body = await req.json();

    const res = await fetch(`${BASE_URL}/cart`, {
      method: 'PUT',
      headers: getHeaders(cookieHeader),
      body: JSON.stringify(body),
    });

    const raw = await res.text();
    const cookiesToSend = getCleanizedCookies(res);
    
    if (cookiesToSend.length > 0) {
        console.log('[API Cart PUT] Setting Cookies:', cookiesToSend.length);
    }

    const responseInit: ResponseInit = { 
        status: res.ok ? 200 : res.status 
    };

    let responseData;
    try {
        responseData = JSON.parse(raw);
    } catch {
        responseData = { error: raw };
    }

    const response = NextResponse.json(responseData, responseInit);
    
    // Set all cookies on the response
    cookiesToSend.forEach(cookie => {
        response.headers.append('Set-Cookie', cookie);
    });
    
    if (!res.ok) {
      console.error('[API Cart PUT] Error:', raw);
    }

    return response;
  } catch (err: any) {
    console.error('[API Cart PUT] Exception:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE: Remove item from cart
// Endpoint: https://commerce.zoho.com/storefront/api/v1/cart
export async function DELETE(req: NextRequest) {
  try {
    const cookieHeader = req.headers.get('cookie') || '';
    console.log('[API Cart DELETE] Incoming Cookie:', cookieHeader ? 'Present' : 'None');
    
    const url = new URL(`${BASE_URL}/cart`);
    // Forward query params if present
    req.nextUrl.searchParams.forEach((value, key) => {
        url.searchParams.append(key, value);
    });

    const options: RequestInit = {
      method: 'DELETE',
      headers: getHeaders(cookieHeader),
    };

    // Try to parse body if exists, as Zoho might accept body for DELETE
    try {
        const body = await req.json();
        if (body && Object.keys(body).length > 0) {
            options.body = JSON.stringify(body);
        }
    } catch (e) {
        // No body or invalid JSON, ignore
    }

    const res = await fetch(url.toString(), options);

    const raw = await res.text();
    const cookiesToSend = getCleanizedCookies(res);
    
    if (cookiesToSend.length > 0) {
        console.log('[API Cart DELETE] Setting Cookies:', cookiesToSend.length);
    }

    const responseInit: ResponseInit = { 
        status: res.ok ? 200 : res.status 
    };

    let responseData;
    try {
        responseData = JSON.parse(raw);
    } catch {
        responseData = { error: raw };
    }

    const response = NextResponse.json(responseData, responseInit);
    
    // Set all cookies on the response
    cookiesToSend.forEach(cookie => {
        response.headers.append('Set-Cookie', cookie);
    });
    
    if (!res.ok) {
      console.error('[API Cart DELETE] Error:', raw);
    }

    return response;
  } catch (err: any) {
    console.error('[API Cart DELETE] Exception:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
