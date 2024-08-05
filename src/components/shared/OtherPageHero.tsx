"use client";
import en from "@/language/en";
import { capitalize } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { platform } from "os";

interface OtherPageHeroProps {
  heading?: string;
}
export default function OtherPageHero({ heading }: OtherPageHeroProps) {
  const pathname = usePathname();
  const name = heading ? heading : pathname.split("/")[1].replace(/-/g, " ");

  return (
    <section className="otherpages__hero relative flex w-full flex-col items-center justify-center bg-cover bg-center bg-no-repeat">
      <div className="flex flex-col items-center justify-center px-4 py-20">
        <h1
          data-aos="fade-up"
          className="mb-4 text-center text-4xl font-bold lg:text-6xl"
        >
          {alternateHeading[name.toLowerCase()] || capitalize(name)}
        </h1>
        <p data-aos="fade-up" className="max-w-[500px] text-center">
          {descriptions[name.toLowerCase()]}
        </p>
      </div>
    </section>
  );
}

const alternateHeading: Record<string, string> = {
  faq: en.faqPageTitle,
  platform: en.paas,
  service: en.ourServices,
};

const descriptions: Record<string, string> = {
  product: en.productPageDescription,
  "error page": en.errorPageDescription,
  catalogue: en.cataloguePageDescription,
  stockist: en.stockistPageDescription,
  contact: en.contactPageDescription,
  about: en.aboutPageDescription,
  faq: en.faqPageDescription,
  platform: en.paasPageDescription,
  services: en.servicesPageDescription,
};
