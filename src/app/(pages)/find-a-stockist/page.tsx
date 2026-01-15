import en from "@/language/en";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: en.findAStockistPageMetaTitle,
  description: en.findAStockistPageMetaDescription,
};

export default function FindAStockist() {
  return (
    <section className="flex w-full flex-col items-center justify-center bg-white pb-10 pt-10 lg:pb-20 lg:pt-20">
      <div className="flex w-full flex-col justify-center gap-10 px-4 md:max-w-screen-sm lg:flex-row lg:px-0 xl:max-w-[95%] 2xl:max-w-screen-xl">
        <iframe
          className="h-[700px] w-full outline-none"
          src="https://docs.google.com/document/d/e/2PACX-1vSNzX5JfAPr6j11GKxFv0fvixzHNWFydnyajNYfRE6iuotENB7TzaIWtP74hY_kXpVO5TD7CZa40DwB/pub?embedded=true"
        ></iframe>
      </div>
    </section>
  );
}
