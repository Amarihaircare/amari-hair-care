import { findProduct } from "@/assets/data/products";
import ProductImageSlides from "@/components/product/ProductImageSlides";
import Rating from "@/components/ui/Rating";
import en from "@/language/en";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: en.productMetaTitle,
  description: en.productMetaDescription,
};

export default function Product({ params }: { params: { product: string } }) {
  const product = findProduct(params.product);

  return (
    <section className="w-full flex flex-col  pb-20 lg:pb-40 pt-10 lg:pt-20  items-center justify-center bg-white">
      <div className="flex flex-col lg:flex-row items-center justify-between md:max-w-screen-sm w-full px-4 xl:max-w-screen-lg 2xl:max-w-screen-xl gap-10">
        <ProductImageSlides images={product?.images ?? []} />
        <div className="product-info lg:w-[48%] w-full">
          <div>
            <h2 className="text-2xl font-bold lg:text-4xl mb-4">
              {product?.name}
            </h2>
            <div className="flex items-center gap-2">
              <Rating value={product?.rating ?? 0} />
              <p className="text-sm">
                ({product?.reviews?.length ?? 0} customer reviews)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
