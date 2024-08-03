import type { Metadata } from "next";
import { findProduct } from "@/assets/data/products";
import ProductImageSlides from "@/components/product/ProductImageSlides";
import Rating from "@/components/ui/Rating";
import RoundedIconButton from "@/components/ui/RoundedIconButton";
import en from "@/language/en";
import { HeartIcon } from "@/assets/icons";
import { formatCurrency } from "@/lib/utils";
import AddToCartAction from "@/components/ui/AddToCartAction";
import ProductDetails from "@/components/product/ProductDetails";

export const metadata: Metadata = {
  title: en.productMetaTitle,
  description: en.productMetaDescription,
};

export default function Product({ params }: { params: { product: string } }) {
  const product = findProduct(params.product);

  const productKeyTitle = [
    {
      key: en.category,
      title: product?.category,
    },
    {
      key: en.size,
      title: product?.size,
    },
    {
      key: en.tags,
      title: product?.tags.join(", "),
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
            <div className="flex justify-between">
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
              <RoundedIconButton
                icon={<HeartIcon />}
                className="border border-gray-200 bg-white shadow transition-colors hover:bg-secondary hover:text-white"
              />
            </div>
            <p>{product?.shortDescription}</p>

            <p className="text-2xl font-bold lg:text-4xl">
              {formatCurrency(product?.price ?? 0, "NGN")}
            </p>

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
