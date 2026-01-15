import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const secret = process.env.PAYSTACK_SECRET_KEY;
    if (!secret) {
      return NextResponse.json({ error: 'Missing Paystack secret key' }, { status: 500 });
    }

    const { searchParams } = new URL(req.url);
    const reference = searchParams.get('reference') || '';
    const checkout_id = searchParams.get('checkout_id') || '';

    if (!reference) {
      return NextResponse.json({ error: 'Missing reference' }, { status: 400 });
    }
    if (!checkout_id) {
      return NextResponse.json({ error: 'Missing checkout_id' }, { status: 400 });
    }

    const res = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${secret}`,
      },
    });

    const raw = await res.text();
    let data: any;
    try {
      data = JSON.parse(raw);
    } catch {
      data = { raw, status: res.status };
    }

    if (!res.ok || data.status !== true || data?.data?.status !== 'success') {
      const message = data?.message || 'Verification failed';
      return NextResponse.json({ error: message, details: data }, { status: res.status || 500 });
    }

    const internalUrl = new URL('/api/checkout/offline-payment', req.url).toString();
    const placeRes = await fetch(internalUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Cookie: req.headers.get('cookie') || ''
      },
      body: JSON.stringify({ checkout_id }),
    });

    const placeData = await placeRes.json();
    if (!placeRes.ok || placeData?.success !== true) {
      return NextResponse.json(
        { error: placeData?.error || 'Order not created', paystack: data, zoho: placeData },
        { status: placeRes.status || 500 }
      );
    }

    return NextResponse.json({
      success: true,
      paystack: {
        reference,
        amount: data?.data?.amount,
        currency: data?.data?.currency,
        customer: data?.data?.customer?.email,
      },
      order_id: placeData?.order_id,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
