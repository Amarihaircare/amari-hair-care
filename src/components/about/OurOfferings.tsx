import en from "@/language/en";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import vpg from "@/assets/images/vpg.webp";
import hairCareProducts from "@/assets/images/instagram-six.webp";
import b2bProducts from "@/assets/images/instagram-two.webp";

import Image from "next/image";

export default function OurOfferings() {
  return (
    <div className="flex flex-col justify-center gap-10 pb-10 lg:flex-row lg:pb-20">
      <div className="grid gap-10 md:grid-cols-2 lg:w-[70%]">
        <div className="flex flex-col justify-center gap-3">
          <h2 className="text-center text-2xl font-bold lg:text-left lg:text-4xl">
            {en.amariProductOfferings}
          </h2>
          <p className="text-center lg:text-left">
            {en.amariProductOfferingsDescription}
          </p>
          <Button asChild>
            <Link
              href="/catalogue"
              className={`${buttonVariants({
                variant: "secondary",
              })} mb-14 mt-6 self-center px-6 py-6 font-semibold hover:bg-[#C6E749]/80 lg:self-start`}
            >
              {en.heroCta}
            </Link>
          </Button>
        </div>
        {offerings.map((offering) => (
          <div
            className="group relative overflow-hidden rounded border border-background bg-white shadow"
            key={offering.title}
          >
            <Image
              src={offering.image}
              width={400}
              height={400}
              alt="offering"
              className="h-[320px] w-full rounded transition-all ease-in-out group-hover:scale-125"
            />
            <div className="absolute bottom-0 top-0 flex flex-col justify-end bg-background/80 p-4">
              <h3 className="mb-2 text-2xl font-bold">{offering.title}</h3>
              <p className="mb-4">{offering.description}</p>
              <Link
                href={"/catalogue"}
                className="inline-block self-start border-b-2 border-primary pb-3 font-bold"
              >
                {en.stockUpNow}
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="main_offering-bg flex flex-col items-center justify-center rounded p-4 py-40 lg:w-[28%]">
        <p className="mb-4 text-center">{en.growthAndExpansionDescription}</p>
        <p className="mb-8 text-center">{en.joinUsDescription}</p>

        <Button asChild>
          <Link
            href={`mailto:${en.emailAddress}`}
            className="inline-block font-bold"
          >
            {en.reachUs}
          </Link>
        </Button>
      </div>
    </div>
  );
}

const offerings = [
  {
    title: en.scalpCareProducts,
    image: vpg,
    description: en.scalpCareProductsDescription,
  },
  {
    title: en.hairCareProducts,
    image: hairCareProducts,
    description: en.hairCareProductsDescription,
  },
  {
    title: en.paaSInitiative,
    image: b2bProducts,
    description: en.ourFocusDescription,
  },
];
