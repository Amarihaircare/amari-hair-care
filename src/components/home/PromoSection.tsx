import en from "@/language/en";
import Image from "next/image";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import promoProduct from "../../assets/images/collection.webp";

export default function PromoSection() {
  const timeCards = [en.days, en.hours, en.mins, en.secs];
  return (
    <section className="promo_section flex w-full flex-col items-center justify-center bg-background py-20 lg:py-40">
      <div className="promo_container flex w-full flex-col items-center justify-between gap-10 overflow-hidden px-4 md:max-w-[95%] lg:flex-row lg:px-0 2xl:max-w-screen-xl">
        <div className="wrapper flex max-w-[500px] flex-col items-center lg:items-start">
          <div className="promo_header mb-6">
            <Link
              className="promo_header-title mb-6 block text-center text-2xl font-bold lg:text-left lg:text-4xl"
              href="/catalogue"
              target="_blank"
              rel="noopener norefferer"
            >
              {en.promoTitle}
            </Link>
            <p className="promo_header-text text-center lg:text-left">
              {en.promoDescription}
            </p>
          </div>
          <div className="promo_price mb-6 flex items-center justify-center gap-6 lg:justify-start">
            <p className="price price--old text-3xl font-semibold text-gray-400">
              $48.97
            </p>
            <p className="price price--new text-3xl font-semibold text-green-800">
              $27.97
            </p>
          </div>
          <div className="promo_timer mb-6 flex justify-center gap-4 lg:justify-start">
            {timeCards.map((time, index) => (
              <div
                className="timer_block flex h-14 w-14 flex-col items-center justify-center rounded border border-primary lg:h-20 lg:w-20"
                key={index}
              >
                <p
                  className="timer_block-number text-2xl font-semibold text-green-800"
                  id="seconds"
                >
                  00
                </p>{" "}
                <p>{time}</p>
              </div>
            ))}
          </div>
          <Button asChild>
            <Link
              href="/catalogue"
              className={`${buttonVariants({
                variant: "secondary",
              })} mt-6 self-center px-6 py-6 font-semibold hover:bg-[#C6E749]/80 lg:self-start`}
            >
              {en.shopNow}
            </Link>
          </Button>
        </div>
        <div className="media" data-aos="fade-left">
          <Image
            src={promoProduct}
            alt="media"
            width={800}
            height={600}
            className="h-full w-full"
          />
        </div>
      </div>
    </section>
  );
}
