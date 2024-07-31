import Image from "next/image";
import Link from "next/link";
import notFound from "../assets/images/404.webp";
import en from "@/language/en";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="py-40 flex flex-col items-center justify-center px-4">
      <Image
        width={500}
        height={200}
        src={notFound}
        alt="404"
        className="mb-8"
      />
      <h1 className="text-3xl font-semibold text-center mb-4">
        {en.pageNotFound}
      </h1>
      <p className="max-w-[360px] text-center">{en.notFoundDescription}</p>
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
  );
}
