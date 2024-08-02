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
    <section className="w-full flex flex-col pb-10 lg:pb-20 pt-10 lg:pt-20  items-center justify-center bg-white">
      <div className="flex flex-col md:max-w-screen-sm w-full lg:px-0 px-4 xl:max-w-[95%] 2xl:max-w-screen-xl gap-10">
        <div className="w-full flex flex-col gap-10 lg:gap-0 lg:flex-row items-center justify-between">
          <ProductImageSlides images={product?.images ?? []} />
          <div className="product-info lg:w-[46%] w-full flex flex-col gap-6">
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
                className="bg-white border border-gray-200 shadow hover:bg-secondary hover:text-white transition-colors"
              />
            </div>
            <p>{product?.shortDescription}</p>

            <p className="text-2xl font-bold lg:text-4xl">
              {formatCurrency(product?.price ?? 0, "NGN")}
            </p>

            <AddToCartAction />
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
