"use client";

import OtherPageHero from "@/components/shared/OtherPageHero";
import { Button, buttonVariants } from "@/components/ui/button";
import en from "@/language/en";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <>
      <OtherPageHero heading={en.errorPage} />
      <div className="py-40 flex flex-col items-center justify-center px-4">
        <h1 className="text-3xl font-semibold text-center mb-4">{en.error}</h1>

        <p className="max-w-[360px] text-center">{en.errorPageDescription}</p>

        <Button asChild>
          <Link
            href="/"
            className={`
            rounded-full
            ${buttonVariants({ variant: "default" })}
            mt-6 px-6 
            `}
          >
            {en.backToHomePage}
          </Link>
        </Button>
      </div>
    </>
  );
}
