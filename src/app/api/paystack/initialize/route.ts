import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.PAYSTACK_SECRET_KEY;
    const publicKey = process.env.PAYSTACK_PUBLIC_KEY;
    if (!secret || !publicKey) {
      return NextResponse.json({ error: 'Missing Paystack keys' }, { status: 500 });
    }

    const origin = req.headers.get('origin') || '';
    const body = await req.json();
    const { email, amount, checkout_id, currency = 'NGN' } = body || {};

    if (!email || !amount || !checkout_id) {
      return NextResponse.json({ error: 'Missing email, amount or checkout_id' }, { status: 400 });
    }

    const amountInKobo =
      currency.toUpperCase() === 'NGN'
        ? Math.round(Number(amount) * 100)
        : Math.round(Number(amount) * 100);

    const metadata = {
      checkout_id,
      origin,
    };

    const callback_url = origin
      ? `${origin}/checkout/success?checkout_id=${encodeURIComponent(checkout_id)}`
      : undefined;

    const res = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secret}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        amount: amountInKobo,
        currency,
        metadata,
        ...(callback_url ? { callback_url } : {}),
      }),
    });

    const raw = await res.text();
    let data: any;
    try {
      data = JSON.parse(raw);
    } catch {
      data = { raw, status: res.status };
    }

    if (!res.ok || data.status !== true) {
      const message = data?.message || 'Unable to initialize Paystack';
      return NextResponse.json({ error: message, details: data }, { status: res.status || 500 });
    }

    const authUrl = data?.data?.authorization_url;
    const reference = data?.data?.reference;
    const access_code = data?.data?.access_code;

    return NextResponse.json({
      success: true,
      authorization_url: authUrl,
      reference,
      access_code,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
