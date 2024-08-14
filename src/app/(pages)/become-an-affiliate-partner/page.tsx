import en from "@/language/en";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: en.becomeAnAffiliatePartnerPageMetaTitle,
  description: en.becomeAnAffiliatePartnerPageMetaDescription,
};

export default function BecomeAnAffiliatePartner() {
  return (
    <section className="flex w-full flex-col items-center justify-center bg-white pb-10 pt-10 lg:pb-20 lg:pt-20">
      <div className="flex w-full flex-col justify-center gap-10 px-4 md:max-w-screen-sm lg:flex-row lg:px-0 xl:max-w-[95%] 2xl:max-w-screen-xl">
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSftT0cx-MaNyHxKpJP5ZtEr2tcxW33V608c7i4HSJpqrQbQrw/viewform?embedded=true"
          className="h-[600px] w-full outline-none lg:h-[500px]"
        >
          Loading…
        </iframe>
      </div>
    </section>
  );
}
