import { NextRequest, NextResponse } from 'next/server';

const DOMAIN_NAME = 'amariscalpcare.zohoecommerce.com';
const BASE_URL = 'https://commerce.zoho.com/storefront/api/v1';

export async function POST(req: NextRequest) {
  try {
    const cookieHeader = req.headers.get('cookie') || '';
    console.log('[Checkout API] Incoming Cookie:', cookieHeader);
    const body = await req.json();

    const name: string = body?.name || '';
    const [first_name, ...rest] = name.split(' ');
    const last_name = rest.join(' ') || first_name;
    const phone = body?.phone || '';
    const country = body?.country || '';
    
    // Mutable headers to allow updating cookie if session rotates
    let headers: Record<string, string> = {
      'domain-name': DOMAIN_NAME,
      'Content-Type': 'application/json',
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    };

    // Helper to update headers with new cookie (strip attributes for next request)
    const updateCookie = (res: Response) => {
        const setCookie = res.headers.get('set-cookie');
        if (setCookie) {
             console.log('[Checkout API] Received new Set-Cookie:', setCookie);
             // Extract name=value part (before first ;)
             const cookieValue = setCookie.split(';')[0];
             headers['Cookie'] = cookieValue; 
        }
    };

    // ---------------------------------------------------------
    // Initialize: Call GET /checkout to get checkout_id
    // ---------------------------------------------------------
    
    let checkout_id: string | null = null;

    console.log('[Checkout] Initializing checkout...');
    const initRes = await fetch(`${BASE_URL}/checkout`, {
      method: 'GET',
      headers,
    });
    
    updateCookie(initRes);

    if (!initRes.ok) {
        const errText = await initRes.text();
        console.error('[Checkout] Init Failed:', errText);
        // Fallback: Try getting it from /cart if /checkout fails
        console.log('[Checkout] Fallback: Fetching /cart to find checkout_id...');
        const cartRes = await fetch(`${BASE_URL}/cart`, { method: 'GET', headers });
        updateCookie(cartRes);
        
        if (!cartRes.ok) throw new Error(`Failed to init checkout and fetch cart: ${errText}`);
        
        const cartData = await cartRes.json();
        const cart = cartData?.payload?.cart || cartData?.cart || cartData?.data?.cart;
        checkout_id = cart?.cart_id || cart?.id;
    } else {
        const initData = await initRes.json();
        const checkout = initData?.payload?.checkout || initData?.checkout;
        checkout_id = checkout?.checkout_id || checkout?.id;
        
        // If not found in checkout object, check if it returned a cart object
        if (!checkout_id) {
             const cart = initData?.payload?.cart || initData?.cart;
             checkout_id = cart?.cart_id || cart?.id;
        }
    }

    if (!checkout_id) {
      throw new Error('Could not retrieve Checkout ID from Zoho response.');
    }
    console.log('[Checkout] checkout_id:', checkout_id);


    // ---------------------------------------------------------
    // Step 1 (Address): POST /checkout/address
    // ---------------------------------------------------------
    const addressPayload = {
      billing_address: {
        first_name,
        last_name,
        email: body?.email,
        address1: body?.address,
        city: body?.city,
        state: body?.state,
        zip: body?.zip,
        country,
        phone,
      },
      shipping_address: {
        first_name,
        last_name,
        email: body?.email,
        address1: body?.address,
        city: body?.city,
        state: body?.state,
        zip: body?.zip,
        country,
        phone,
      },
    };

    console.log('[Checkout] Updating address...');
    const addressRes = await fetch(`${BASE_URL}/checkout/address?checkout_id=${checkout_id}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(addressPayload),
    });

    if (!addressRes.ok) {
       const err = await addressRes.text();
       console.error('[Checkout] Address Update Failed:', err);
       throw new Error(`Address update failed: ${err}`);
    }
    
    // Check if address response contains shipping methods (Optimization/Prompt Hint)
    const addressData = await addressRes.json();
    let shippingMethods = addressData?.payload?.shipping_methods || addressData?.shipping_methods || [];


    // ---------------------------------------------------------
    // Step 2 (Shipping): POST /checkout/shipping-methods
    // ---------------------------------------------------------
    // If we didn't get methods from address response, fetch them.
    if (!shippingMethods || shippingMethods.length === 0) {
        console.log('[Checkout] Fetching shipping methods...');
        const shippingMethodsRes = await fetch(`${BASE_URL}/checkout/shipping-methods?checkout_id=${checkout_id}`, {
            method: 'GET',
            headers,
        });
        if (shippingMethodsRes.ok) {
            const shippingData = await shippingMethodsRes.json();
            shippingMethods = shippingData?.payload?.shipping_methods || shippingData?.shipping_methods || [];
        } else {
             console.warn('[Checkout] Failed to fetch shipping methods:', await shippingMethodsRes.text());
        }
    }

    // Select a shipping method
    // "Use one of the id values returned..."
    let shippingId = null;
    if (shippingMethods.length > 0) {
        // Prefer 'Standard' or take the first one
        const match = shippingMethods.find((m: any) => m.name?.toLowerCase().includes('standard')) || shippingMethods[0];
        shippingId = match?.id || match?.shipping_id;
    } else {
        console.warn('[Checkout] No shipping methods found. Attempting to proceed without setting one (risky).');
    }

    if (shippingId) {
        console.log('[Checkout] Setting shipping method:', shippingId);
        const shippingPayload = {
            shipping_method_id: shippingId,
        };

        const shippingUpdateRes = await fetch(`${BASE_URL}/checkout/shipping-methods?checkout_id=${checkout_id}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(shippingPayload),
        });

        if (!shippingUpdateRes.ok) {
            console.error('[Checkout] Shipping Method Update Failed:', await shippingUpdateRes.text());
            throw new Error('Failed to set shipping method.');
        }
    }


    // ---------------------------------------------------------
    // Step 3 (Payment): POST /checkout/process-payment
    // ---------------------------------------------------------
    console.log('[Checkout] Processing payment...');
    const paymentPayload = {
        payment_mode: "online",
        payment_gateway: "paypal"
    };

    const paymentRes = await fetch(`${BASE_URL}/checkout/process-payment?checkout_id=${checkout_id}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(paymentPayload),
    });

    const paymentRaw = await paymentRes.text();
    
    if (!paymentRes.ok) {
         console.error('[Checkout] Payment Process Failed:', {
        status: paymentRes.status,
        statusText: paymentRes.statusText,
        body: paymentRaw,
      });

      
    }

    let paymentData: any = {};
    try {
      paymentData = JSON.parse(paymentRaw);
    } catch {
      paymentData = { raw: paymentRaw };
    }

    // Handle Redirect
    // "Look for payload.redirect_url or payload.payment_url"
    const payload = paymentData?.payload || paymentData;
    const paymentUrl = payload?.payment_url || payload?.redirect_url;
    const orderId = payload?.order?.order_id || payload?.order?.id || payload?.order_id;

    if (paymentUrl) {
        console.log('[Checkout] Redirect URL found:', paymentUrl);
        return NextResponse.json({
            status: 'success',
            payment_url: paymentUrl,
            order_id: orderId,
            message: 'Redirecting to payment gateway...'
        });
    } else if (orderId) {
        // Maybe it auto-completed (e.g. 0 cost)?
         console.log('[Checkout] Order completed without redirect:', orderId);
         return NextResponse.json({
            status: 'success',
            order_id: orderId,
            message: 'Order placed successfully.'
        });
    } else {
        console.warn('[Checkout] No redirect URL or Order ID found in response:', paymentRaw);
        return NextResponse.json({
            status: 'error',
            error: 'No payment redirect URL received from Zoho.',
            details: paymentData
        }, { status: 500 });
    }

  } catch (err: any) {
    console.error('[Checkout] CRITICAL ERROR:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
