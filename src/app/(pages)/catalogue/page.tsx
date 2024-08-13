import type { Metadata } from "next";

import SeoText from "@/components/product/SeoText";
import en from "@/language/en";
import ProductSection from "@/components/product/ProductSection";

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

  return (
    <section className="flex w-full flex-col items-center justify-center bg-white pb-10 pt-10 lg:pb-20 lg:pt-20">
      <div className="flex w-full flex-col px-4 md:max-w-[95%] lg:px-0 2xl:max-w-screen-xl">
        <ProductSection currentPage={currentPage} />
        <SeoText />
      </div>
    </section>
  );
}
