import { NextRequest, NextResponse } from 'next/server';
import { BASE_URL, getHeaders, getCleanizedCookies } from '@/lib/zoho-api';

export async function POST(req: NextRequest) {
  try {
    const cookieHeader = req.headers.get('cookie') || '';
    console.log('[API Cart CLEAR] Incoming Cookie:', cookieHeader ? 'Present' : 'None');

    // 1. Get current cart items
    const getRes = await fetch(`${BASE_URL}/cart`, {
      method: 'GET',
      headers: getHeaders(cookieHeader),
    });

    const getRaw = await getRes.text();
    let cartData;
    try {
        cartData = JSON.parse(getRaw);
    } catch {
        console.error('[API Cart CLEAR] Failed to parse cart data');
        return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 });
    }

    const items = cartData?.payload?.items || cartData?.payload?.cart?.items || cartData?.items || [];
    const cartId = cartData?.payload?.cart?.id || cartData?.cart?.id || cartData?.cart_id;

    console.log(`[API Cart CLEAR] Found ${items.length} items to remove. Cart ID: ${cartId}`);

    if (items.length === 0) {
        return NextResponse.json({ success: true, message: "Cart already empty" });
    }

    // 2. Delete each item
    // We run them sequentially to avoid race conditions with session updates, although parallel might work.
    // Given the user report of sync issues, sequential is safer.
    
    let lastRes: Response | null = null;
    let successCount = 0;
    let failCount = 0;

    for (const item of items) {
        const variantId = item.variant_id || item.product_variant_id;
        if (!variantId) continue;

        const deleteUrl = new URL(`${BASE_URL}/cart`);
        deleteUrl.searchParams.append('product_variant_id', variantId);
        if (cartId) deleteUrl.searchParams.append('cart_id', cartId);

        console.log(`[API Cart CLEAR] Removing item ${variantId}...`);

        const res = await fetch(deleteUrl.toString(), {
            method: 'DELETE',
            headers: getHeaders(cookieHeader), // Use original cookie to maintain session
        });

        if (res.ok) {
            successCount++;
        } else {
            failCount++;
            console.error(`[API Cart CLEAR] Failed to remove item ${variantId}:`, await res.text());
        }
        lastRes = res;
    }

    // 3. Prepare response
    const responseInit: ResponseInit = { status: 200 };
    const response = NextResponse.json({ 
        success: true, 
        removed: successCount, 
        failed: failCount 
    }, responseInit);

    // Forward cookies from the LAST operation (closest to current state)
    // Ideally we should collect all Set-Cookies, but usually the last one contains the latest session state.
    if (lastRes) {
        const cookiesToSend = getCleanizedCookies(lastRes);
        cookiesToSend.forEach(cookie => {
            response.headers.append('Set-Cookie', cookie);
        });
    } else {
        // If no delete happened (loop didn't run), forward GET cookies
        const cookiesToSend = getCleanizedCookies(getRes);
        cookiesToSend.forEach(cookie => {
            response.headers.append('Set-Cookie', cookie);
        });
    }

    return response;

  } catch (err: any) {
    console.error('[API Cart CLEAR] Exception:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
