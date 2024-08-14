import type { Metadata } from "next";

import SeoText from "@/components/product/SeoText";
import en from "@/language/en";
import ProductSection from "@/components/product/ProductSection";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: en.catalogueMetaTitle,
  description: en.catalogueMetaDescription,
};

export default function Catalogue() {
  return (
    <section className="flex w-full flex-col items-center justify-center bg-white pb-10 pt-10 lg:pb-20 lg:pt-20">
      <div className="flex w-full flex-col px-4 md:max-w-[95%] lg:px-0 2xl:max-w-screen-xl">
        <Suspense fallback={<div>Loading...</div>}>
          <ProductSection />
        </Suspense>
        <SeoText />
      </div>
    </section>
  );
}
