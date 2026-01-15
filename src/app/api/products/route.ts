import { NextResponse } from 'next/server';

const BOOKS_ORG_ID = process.env.ZOHO_BOOKS_ORG_ID;
const BOOKS_TOKEN = process.env.ZOHO_BOOKS_TOKEN;

export async function GET() {
  try {
    const baseApiUrl = "https://commerce.zoho.com/storefront/api/v1/products?page=1&per_page=100";

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    const productRes = await fetch(baseApiUrl, {
      method: 'GET',
      headers: {
        'domain-name': 'amariscalpcare.zohoecommerce.com',
        'Content-Type': 'application/json'
      },
      next: { revalidate: 3600 },
      signal: controller.signal,
    });

    const rawText = await productRes.text();
    try { clearTimeout(timer); } catch {}

    if (!productRes.ok) {
      console.error(`Zoho Storefront Error ${productRes.status}:`, rawText);
      return NextResponse.json({
        error: "Zoho Storefront API Rejected Request",
        details: rawText
      }, { status: productRes.status });
    }

    const result = JSON.parse(rawText);
    const products: any[] =
      result?.payload?.products ||
      result?.products ||
      result?.data?.products ||
      [];

    if (BOOKS_ORG_ID && BOOKS_TOKEN && products.length > 0) {
      try {
        const booksRes = await fetch(`https://books.zoho.com/api/v3/items?organization_id=${BOOKS_ORG_ID}`, {
          method: 'GET',
          headers: {
            Authorization: `Zoho-oauthtoken ${BOOKS_TOKEN}`,
            'Content-Type': 'application/json',
          },
          cache: 'no-store',
        });

        if (booksRes.ok) {
          const booksRaw = await booksRes.json();
          const items: any[] =
            booksRaw?.items ||
            booksRaw?.payload?.items ||
            [];

          const booksBySku = new Map<string, any>();
          const booksByName = new Map<string, any>();

          for (const item of items) {
            if (!item.cf_cdn_image_url) continue;

            const sku = item.sku || item.SKU;
            if (sku) booksBySku.set(String(sku), item);

            const name = item.name || item.item_name;
            if (name) booksByName.set(String(name).toLowerCase().trim(), item);
          }

          for (const product of products) {
            let match = null;

            // Try SKU match first
            const variant = product?.variants?.[0];
            const sku = variant?.sku;
            if (sku) {
               match = booksBySku.get(String(sku));
            }

            // Fallback to Name match
            if (!match && product.name) {
               match = booksByName.get(String(product.name).toLowerCase().trim());
            }

            if (match && match.cf_cdn_image_url) {
              product.cf_cdn_image_url = match.cf_cdn_image_url;
            }
          }
        } else {
          const errText = await booksRes.text();
          console.error('Zoho Books Items error', errText);
        }
      } catch (booksErr: any) {
        console.error('Zoho Books Items exception', booksErr?.message || booksErr);
      }
    }

    return NextResponse.json({
      products,
      message: "Successfully fetched products",
    });

  } catch (err: any) {
    console.error("CRITICAL ROUTE ERROR:", err.message);
    return NextResponse.json({ products: [], error: err.message }, { status: 200 });
  }
}
