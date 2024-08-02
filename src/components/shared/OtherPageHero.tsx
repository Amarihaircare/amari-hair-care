"use client";
import en from "@/language/en";
import { usePathname } from "next/navigation";

interface OtherPageHeroProps {
  heading?: string;
}
export default function OtherPageHero({ heading }: OtherPageHeroProps) {
  const pathname = usePathname();
  const name = heading ? heading : pathname.split("/")[1].replace(/-/g, " ");

  return (
    <section
      className="otherpages__hero w-full bg-cover bg-center bg-no-repeat relative flex flex-col items-center justify-center
"
    >
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <h1 className="text-4xl lg:text-6xl font-bold text-center capitalize mb-4">
          {name}
        </h1>
        <p className="text-center max-w-[500px]">
          {descriptions[name.toLowerCase()]}
        </p>
      </div>
    </section>
  );
}

const descriptions: Record<string, string> = {
  product: en.productPageDescription,
  "error page": en.errorPageDescription,
  catalogue: en.cataloguePageDescription,
};
