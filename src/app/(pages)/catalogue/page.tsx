import type { Metadata } from "next";

import { products } from "@/assets/data/products";
import ProductCard from "@/components/product/ProductCard";
import Paginate from "@/components/ui/Paginate";
import SeoText from "@/components/product/SeoText";
import ProductsFilter from "@/components/product/ProductsFilter";
import en from "@/language/en";

export const metadata: Metadata = {
  title: en.catalogueMetaTitle,
  description: en.catalogueMetaDescription,
};

export default function Catalogue({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const currentPage = searchParams?.page
    ? parseInt(searchParams.page as string)
    : 1;
  const from = (currentPage - 1) * 9;
  const to = from + 10;
  const total = Math.ceil(products.length / 9);

  return (
    <section className="flex w-full flex-col items-center justify-center bg-white pb-10 pt-10 lg:pb-20 lg:pt-20">
      <div className="flex w-full flex-col px-4 md:max-w-[95%] lg:px-0 2xl:max-w-screen-xl">
        <div className="flex w-full flex-col-reverse justify-between gap-10 lg:flex-row">
          <div className="w-lg:w-[78%] flex flex-col gap-6">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {products.slice(from, to).map((product, index) => (
                <div key={index} className="flex flex-col gap-4">
                  <ProductCard
                    name={product.name}
                    image={product.images[0]}
                    price={product.price}
                    rating={product.rating}
                    slug={product.slug}
                    discount={product?.discount}
                  />
                </div>
              ))}
            </div>
            <Paginate currentPage={currentPage} lastPage={total} />
          </div>
          <ProductsFilter />
        </div>
        <SeoText />
      </div>
    </section>
  );
}
