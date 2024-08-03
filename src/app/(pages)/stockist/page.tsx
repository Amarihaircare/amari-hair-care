import type { Metadata } from "next";

import StockistTab from "@/components/stockist/StockistTab";
import en from "@/language/en";

export const metadata: Metadata = {
  title: en.stockistMetaTitle,
  description: en.stockistMetaDescription,
};

export default function Stockist() {
  return (
    <section className="flex w-full flex-col items-center justify-center bg-white pb-10 pt-10 lg:pb-20 lg:pt-20">
      <div className="flex w-full flex-col px-4 md:max-w-screen-sm lg:px-0 xl:max-w-[95%] 2xl:max-w-screen-xl">
        <StockistTab />
      </div>
    </section>
  );
}
