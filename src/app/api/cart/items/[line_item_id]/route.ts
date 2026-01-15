import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest, { params }: { params: { line_item_id: string } }) {
  try {
    const body = await req.json();
    const cookieHeader = req.headers.get('cookie') || '';

    const res = await fetch(`https://commerce.zoho.com/storefront/api/v1/cart/items/${params.line_item_id}?format=json`, {
      method: 'PUT',
      headers: {
        'domain-name': 'amariscalpcare.zohoecommerce.com',
        'Content-Type': 'application/json',
        ...(cookieHeader ? { Cookie: cookieHeader } : {}),
      },
      body: JSON.stringify(body),
    });

    const raw = await res.text();
    const setCookie = res.headers.get('set-cookie') || undefined;

    if (!res.ok) {
      return NextResponse.json({ error: raw }, { status: res.status, headers: setCookie ? { 'set-cookie': setCookie } : undefined });
    }

    const data = JSON.parse(raw);
    return NextResponse.json(data, { headers: setCookie ? { 'set-cookie': setCookie } : undefined });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
