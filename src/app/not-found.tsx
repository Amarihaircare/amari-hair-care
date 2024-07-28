import Image from "next/image";
import Link from "next/link";
import notFound from "../assets/images/404.webp";
import en from "@/language/en";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="py-16 flex flex-col items-center justify-center">
      <Image
        width={500}
        height={200}
        src={notFound}
        alt="404"
        className="mb-8"
      />
      <h1 className="text-3xl font-semibold text-center">{en.pageNotFound}</h1>
      <p className="max-w-[320px] text-center">{en.notFoundDescription}</p>
      <Button asChild>
        <Link
          href="/login"
          className={`
            rounded-full
            ${buttonVariants({ variant: "default" })}
            mt-6 px-6 
            `}
        >
          Login
        </Link>
      </Button>
    </div>
  );
}
