import { NextRequest, NextResponse } from 'next/server';
import { BASE_URL, getHeaders, getCleanizedCookies, updateCookieInHeaders } from '@/lib/zoho-api';

export async function GET(req: NextRequest) {
  try {
    const cookieHeader = req.headers.get('cookie') || '';
    const headers: Record<string, string> = getHeaders(cookieHeader);
    const { searchParams } = new URL(req.url);
    const checkout_id = searchParams.get('checkout_id');
    if (!checkout_id) {
      return NextResponse.json({ error: 'Missing checkout_id' }, { status: 400 });
    }

    let confirmed = false;
    let orderId: string | undefined = undefined;

    for (let i = 0; i < 8 && !confirmed; i++) {
      const res = await fetch(`${BASE_URL}/checkout?refresh=true`, { method: 'GET', headers });
      updateCookieInHeaders(res, headers);
      if (res.ok) {
        try {
          const data = await res.json();
          const co = data?.payload?.checkout || data?.checkout || data;
          const tasks = co?.completed_tasks || {};
          confirmed = !!tasks?.order;
          orderId =
            co?.order?.order_id ||
            co?.order?.id ||
            data?.payload?.order_id ||
            data?.order_id ||
            orderId;
        } catch {}
      }
      if (!confirmed) {
        await new Promise((r) => setTimeout(r, 800));
      }
    }

    if (confirmed && orderId) {
      return NextResponse.json({ success: true, order_id: orderId });
    }
    return NextResponse.json({ success: false, error: 'Order not confirmed yet' }, { status: 202 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

