import { NextRequest, NextResponse } from 'next/server';

const BOOKS_ORG_ID = process.env.ZOHO_BOOKS_ORG_ID;
const BOOKS_TOKEN = process.env.ZOHO_BOOKS_TOKEN;

export async function GET(_req: NextRequest, { params }: { params: { handle: string } }) {
  try {
    const url = `https://commerce.zoho.com/storefront/api/v1/products/${params.handle}`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'domain-name': 'amariscalpcare.zohoecommerce.com',
        'Content-Type': 'application/json',
      },
      next: { revalidate: 300 },
    });

    const raw = await res.text();
    let product: any = null;

    if (res.ok) {
      const result = JSON.parse(raw);
      product =
        result?.payload?.product ||
        result?.product ||
        result?.data?.product ||
        result;
    }

    // Fallback: Fetch from list if direct fetch fails or returns incomplete data
    if (!product || (!product.product_id && !product.handle)) {
      const listRes = await fetch('https://commerce.zoho.com/storefront/api/v1/products?per_page=200', {
        method: 'GET',
        headers: {
          'domain-name': 'amariscalpcare.zohoecommerce.com',
          'Content-Type': 'application/json',
        },
        next: { revalidate: 300 },
      });
      const listRaw = await listRes.text();
      if (!listRes.ok) {
        return NextResponse.json({ error: listRaw }, { status: listRes.status });
      }
      const listData = JSON.parse(listRaw);
      const products =
        listData?.payload?.products ||
        listData?.products ||
        listData?.data?.products ||
        [];
      product = products.find((p: any) => p.handle === params.handle || p.product_id?.toString() === params.handle);
    }

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Enrichment: Fetch high-res image URL from Zoho Books
    if (BOOKS_ORG_ID && BOOKS_TOKEN) {
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
          const booksData = await booksRes.json();
          const items: any[] = booksData?.items || [];
          const variant = product.variants?.[0];
          const sku = variant?.sku || product.sku;

          let match = null;

          // Try SKU match
          if (sku) {
            match = items.find((item: any) => (item.sku || item.SKU) === sku);
          }

          // Try Name match if no SKU match
          if (!match && product.name) {
             const pName = String(product.name).toLowerCase().trim();
             match = items.find((item: any) => {
                const iName = item.name || item.item_name;
                return iName && String(iName).toLowerCase().trim() === pName;
             });
          }

          if (match && match.cf_cdn_image_url) {
            product.cf_cdn_image_url = match.cf_cdn_image_url;
          }
        }
      } catch (booksErr) {
        console.error('Zoho Books enrichment failed:', booksErr);
      }
    }

    return NextResponse.json({ product });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
