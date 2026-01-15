import type { Metadata } from "next";

import SeoText from "@/components/product/SeoText";
import en from "@/language/en";
import ProductSection from "@/components/product/ProductSection";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: en.catalogueMetaTitle,
  description: en.catalogueMetaDescription,
};

export default async function Catalogue() {
  const base = process.env.NEXT_PUBLIC_BASE_URL || '';
  const url = base ? `${base}/api/products` : '/api/products';
  const res = await fetch(url, { cache: 'no-store' });
  const data = res.ok ? await res.json() : { products: [] };
  const initialProducts = data.products || [];
  return (
    <section className="flex w-full flex-col items-center justify-center bg-white pb-10 pt-10 lg:pb-20 lg:pt-20">
      <div className="flex w-full flex-col px-4 md:max-w-[95%] lg:px-0 2xl:max-w-screen-xl">
        <Suspense fallback={<div>Loading...</div>}>
          <ProductSection initialProducts={initialProducts} />
        </Suspense>
        <SeoText />
      </div>
    </section>
  );
}
