import { privacyPolicy } from "@/assets/data/privacy";
import PurifiedHtml from "@/components/shared/PurifiedHtml";
import en from "@/language/en";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: en.privacyPageMetaTitle,
  description: en.privacyPageMetaDescription,
};

export default function Privacy() {
  return (
    <section className="flex w-full flex-col items-center justify-center bg-white pb-10 pt-10 lg:pb-20 lg:pt-20">
      <div className="flex w-full flex-col justify-center gap-10 px-4 md:max-w-screen-sm lg:flex-row lg:px-0 xl:max-w-[95%] 2xl:max-w-screen-xl">
        <div className="flex max-w-[700px] flex-col border border-gray-200 p-4 py-10 shadow">
          <PurifiedHtml html={privacyPolicy} />
        </div>
      </div>
    </section>
  );
}
