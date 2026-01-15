import { Metadata } from "next";
import ProductImageSlides from "@/components/product/ProductImageSlides";
import Rating from "@/components/ui/Rating";
import en from "@/language/en";
import { formatCurrency } from "@/lib/utils";
import AddToCartAction from "@/components/ui/AddToCartAction";
import ProductDetails from "@/components/product/ProductDetails";
import { MINIMUM_QUANTITY } from "@/lib/constants";
import { notFound } from "next/navigation";
import PurifiedHtml from "@/components/shared/PurifiedHtml";

const ZOHO_STORE_URL = "https://amariscalpcare.zohoecommerce.com";

export const metadata: Metadata = {
  title: en.productMetaTitle,
  description: en.productMetaDescription,
};

async function getProductData(slug: string) {
  const base = process.env.NEXT_PUBLIC_BASE_URL || '';

  try {
    const url = base ? `${base}/api/products/${slug}` : `/api/products/${slug}`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("Failed to fetch product");
    const data = await res.json();
    return data.product || data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    return null;
  }
}

export default async function Product({ params }: { params: { product: string } }) {
  const product = await getProductData(params.product);

  if (!product) {
    notFound();
  }

  const variantImgs = product.variants?.[0]?.images?.map((img: any) =>
    img.url?.startsWith('http') ? img.url : `${ZOHO_STORE_URL}${img.url}`
  ) || [];
  const productImgs = product.images?.map((img: any) =>
    img.url?.startsWith('http') ? img.url : `${ZOHO_STORE_URL}${img.url}`
  ) || [];
  let productImages = variantImgs.length ? variantImgs : productImgs;

  // Use high-res image from Zoho Books if available
  if (product.cf_cdn_image_url) {
    const targetUrl = product.cf_cdn_image_url.includes('res=original') 
      ? product.cf_cdn_image_url 
      : `${product.cf_cdn_image_url}${product.cf_cdn_image_url.includes('?') ? '&' : '?'}res=original`;
    const proxyUrl = `/api/books-image?url=${encodeURIComponent(targetUrl)}`;
    
    // Prepend the high-quality image
    productImages = [proxyUrl, ...productImages];
  }

  const productKeyTitle = [
    { key: en.moq, title: MINIMUM_QUANTITY },
    { key: en.category, title: product.category_name },
    // Checking weight from attributes if not top-level
    {
        key: en.weight,
        title: product.weight ? `${product.weight} ${product.weight_unit}` : "N/A"
    },
  ];

  // Mapping attributes using the 'name' and 'value' structure from Zoho
  const additionalInformation = [
    {
      key: en.ingredients,
      value: product.attributes?.find((a: any) => a.name === "Ingredients")?.value ?? "N/A",
    },
    {
      key: en.recommendedUsage,
      value: product.attributes?.find((a: any) => a.name === "How to Use")?.value ?? "N/A",
    },
  ];

  return (
    <section className="flex w-full flex-col items-center justify-center bg-white pb-10 pt-10 lg:pb-20 lg:pt-20">
      <div className="flex w-full flex-col gap-10 px-4 md:max-w-screen-sm lg:px-0 xl:max-w-[95%] 2xl:max-w-screen-xl">
        <div className="flex w-full flex-col items-center gap-10 lg:flex-row lg:items-start lg:gap-8">

          {/* Images Slider */}
          <ProductImageSlides images={productImages} />

          <div className="product-info flex w-full flex-col gap-6  px-2">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold lg:text-4xl">
                {product.name}
              </h2>
              <div className="flex items-center gap-2">
                <Rating value={5} />
                <p className="text-sm">
                  ({product.review_count || 0} customer reviews)
                </p>
              </div>
            </div>

            <PurifiedHtml html={product.short_description || product.description || ""} />

            <div className="flex items-center gap-2">
               <p className="text-2xl font-bold lg:text-4xl text-green-800">
                  {formatCurrency({
                    // Storefront API uses 'selling_price' inside the variant
                    amount: product.variants?.[0]?.selling_price || 0,
                    currency: "NGN",
                    locale: "en-NG",
                  })}
               </p>
            </div>

            <AddToCartAction
              productSlug={product.handle || product.product_id}
              variantId={product.variants?.[0]?.item_id || product.variants?.[0]?.variant_id}
              productName={product.name}
              productPrices={[{
                amount: product.variants?.[0]?.selling_price || 0,
                currency: "NGN",
                locale: "en-NG",
              }]}
              productImage={(productImages?.[0] as string) || ""}
            />

            <ul className="flex flex-col gap-4 border-t pt-6">
              {productKeyTitle.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <p className="font-semibold text-black">{item.key}:</p>
                  <p className="text-gray-700">{item.title}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Detailed Tabs: Zoho uses 'description' for the full HTML content */}
        <ProductDetails
          description={product.description || ""}
          reviews={[]}
          additionalInformation={additionalInformation}
        />
      </div>
    </section>
  );
}
