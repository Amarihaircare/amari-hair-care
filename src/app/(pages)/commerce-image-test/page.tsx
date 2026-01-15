import Image from "next/image";

const ZOHO_STORE_URL = "https://amariscalpcare.zohoecommerce.com";

const getCdnImageUrl = (imagePath: string): string => {
  if (!imagePath) return "";

  let url = imagePath;
  if (!url.startsWith("http")) {
    url = `${ZOHO_STORE_URL}${url}`;
  }

  url = url.replace(
    "https://amariscalpcare.zohoecommerce.com",
    "https://cdn1.zohoecommerce.com",
  );

  const [pathWithoutQuery, existingQuery] = url.split("?");

  const cleanPath = pathWithoutQuery.replace(/\/\d+x\d+$/, "");
  let finalPath = `${cleanPath}/800x800`;

  let query = existingQuery || "";
  if (!query.includes("storefront_domain=")) {
    query = query
      ? `${query}&storefront_domain=amariscalpcare.zohoecommerce.com`
      : "storefront_domain=amariscalpcare.zohoecommerce.com";
  }

  if (query) {
    finalPath += `?${query}`;
  }

  return finalPath;
};

async function fetchCommerceProducts() {
  const res = await fetch(
    "https://commerce.zoho.com/storefront/api/v1/products?page=1&per_page=100",
    {
      method: "GET",
      headers: {
        "domain-name": "amariscalpcare.zohoecommerce.com",
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return [];
  }

  const data = await res.json();
  const products: any[] =
    data?.payload?.products || data?.products || data?.data?.products || [];

  return products;
}

export default async function CommerceImageTestPage() {
  const products = await fetchCommerceProducts();

  return (
    <section className="flex w-full flex-col items-center justify-center bg-white pb-10 pt-10 lg:pb-20 lg:pt-20">
      <div className="flex w-full flex-col px-4 md:max-w-[95%] lg:px-0 2xl:max-w-screen-xl">
        <h1 className="mb-6 text-2xl font-semibold text-black">
          Commerce API Image Test
        </h1>
        <p className="mb-8 text-sm text-gray-600">
          This page renders product images directly from the Zoho Commerce API
          without using any CDN or compression transforms.
        </p>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const rawPath = product.images?.[0]?.url as string | undefined;
            const baseUrl = rawPath
              ? rawPath.startsWith("http")
                ? rawPath
                : `${ZOHO_STORE_URL}${rawPath}`
              : "";

            const commerceUrl = baseUrl ? getCdnImageUrl(baseUrl) : null;

            if (!commerceUrl) return null;

            return (
              <div
                key={product.product_id}
                className="flex flex-col gap-2 rounded border border-gray-200 p-4"
              >
                <div className="relative w-full overflow-hidden rounded bg-gray-100">
                  <Image
                    src={commerceUrl}
                    alt={product.name}
                    width={800}
                    height={800}
                    className="h-[220px] w-full rounded object-contain"
                    unoptimized
                    quality={100}
                  />
                </div>
                <p className="text-sm font-semibold text-black">
                  {product.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
