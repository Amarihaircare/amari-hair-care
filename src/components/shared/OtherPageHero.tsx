"use client";
import { usePathname } from "next/navigation";

export default function OtherPageHero() {
  const pathname = usePathname();
  const heading = pathname.split("/")[1].replace(/-/g, " ");

  return (
    <div className="flex flex-col items-center justify-center py-20 bg-background">
      <h1 className="text-4xl lg:text-6xl font-bold text-center capitalize mb-4">
        {heading}
      </h1>
      <p className="text-center max-w-[500px]">
        {descriptions[heading.toLowerCase()]}
      </p>
    </div>
  );
}

const descriptions: Record<string, string> = {
  product:
    "Our hair products, are designed to meet the highest standards of quality and effectiveness, offers unparalleled benefits for your needs.",
};
