"use client";
import en from "@/language/en";
import { capitalize } from "@/lib/utils";
import { usePathname } from "next/navigation";
import PurifiedHtml from "./PurifiedHtml";

interface OtherPageHeroProps {
  heading?: string;
}
export default function OtherPageHero({ heading }: OtherPageHeroProps) {
  const pathname = usePathname();
  const name = heading ? heading : pathname.split("/")[1];

  return (
    <section className="otherpages__hero relative flex w-full flex-col items-center justify-center bg-cover bg-center bg-no-repeat">
      <div className="flex max-w-[600px] flex-col items-center justify-center px-4 py-20">
        <h1 className="mb-4 text-center text-4xl font-bold lg:text-6xl">
          {alternateHeading[name.toLowerCase()] || capitalize(name)}
        </h1>
        <PurifiedHtml html={descriptions[name.toLowerCase()]} />
      </div>
    </section>
  );
}

const alternateHeading: Record<string, string> = {
  faq: en.faqPageTitle,
  "salon-services": en.salonServices,
  privacy: en.privacyPolicy,
  tos: en.tos,
  "find-a-stockist": en.findAStockist,
  "become-an-affiliate-partner": en.becomeAnAffiliatePartner,
};

const descriptions: Record<string, string> = {
  product: en.productPageDescription,
  "error page": en.errorPageDescription,
  catalogue: en.cataloguePageDescription,
  stockist: en.stockistPageDescription,
  contact: en.contactPageDescription,
  about: en.aboutPageDescription,
  faq: en.faqPageDescription,
  paas: en.paasPageDescription,
  "salon-services": en.servicesPageDescription,
  "find-a-stockist": en.findAStockistPageDescription,
  "become-an-affiliate-partner": en.becomeAnAffiliatePartnerPageDescription,
  privacy: en.privacyPageDescription,
  tos: en.tosPageDescription,
};
