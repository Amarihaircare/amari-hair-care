import type { Metadata } from "next";
import { products } from "@/assets/data/products";
import ProductImageSlides from "@/components/product/ProductImageSlides";
import Rating from "@/components/ui/Rating";
import en from "@/language/en";
import { formatCurrency } from "@/lib/utils";
import AddToCartAction from "@/components/ui/AddToCartAction";
import ProductDetails from "@/components/product/ProductDetails";
import { MINIMUM_QUANTITY } from "@/lib/constants";

export const metadata: Metadata = {
  title: en.productMetaTitle,
  description: en.productMetaDescription,
};

export default function Product({ params }: { params: { product: string } }) {
  const product = products.find(
    (product) =>
      product.slug.toLowerCase().replace(/ /g, "-") === params.product,
  );

  const productKeyTitle = [
    {
      key: en.moq,
      title: MINIMUM_QUANTITY,
    },

    {
      key: en.category,
      title: product?.category,
    },
    {
      key: en.weight,
      title: product?.weight,
    },
  ];

  const additionalInformation = [
    {
      key: en.ingredients,
      value: product?.ingredients ?? "N/A",
    },
    {
      key: en.recommendedUsage,
      value: product?.howToUse ?? "N/A",
    },
  ];

  return (
    <section className="flex w-full flex-col items-center justify-center bg-white pb-10 pt-10 lg:pb-20 lg:pt-20">
      <div className="flex w-full flex-col gap-10 px-4 md:max-w-screen-sm lg:px-0 xl:max-w-[95%] 2xl:max-w-screen-xl">
        <div className="flex w-full flex-col items-center justify-between gap-10 lg:flex-row lg:gap-0">
          <ProductImageSlides images={product?.images ?? []} />
          <div className="product-info flex w-full flex-col gap-6 lg:w-[46%]">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold lg:text-4xl">
                {product?.name}
              </h2>
              <div className="flex items-center gap-2">
                <Rating value={product?.rating ?? 0} />
                <p className="text-sm">
                  ({product?.reviews?.length ?? 0} customer reviews)
                </p>
              </div>
            </div>
            <p>{product?.shortDescription}</p>

            <div className="flex items-center gap-2">
              {product?.prices.map((price, index) => (
                <p
                  key={price.currency}
                  className="flex items-center gap-2 text-2xl font-bold lg:text-4xl"
                >
                  <span>
                    {formatCurrency({
                      amount: price.amount,
                      currency: price.currency,
                      locale: price.locale,
                    })}
                  </span>
                  <span>{index < product.prices.length - 1 ? "||" : ""}</span>
                </p>
              ))}
            </div>

            <AddToCartAction productSlug={product?.slug} />

            <ul className="flex flex-col gap-4">
              {productKeyTitle.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <p className="font-semibold">{item.key}:</p>
                  <p className="">{item.title}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <ProductDetails
          description={product?.description ?? ""}
          reviews={product?.reviews ?? []}
          additionalInformation={additionalInformation}
        />
      </div>
    </section>
  );
}

export async function generateStaticParams() {
  return products.map((product) => ({
    product: product.slug,
  }));
}
