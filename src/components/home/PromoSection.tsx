import en from "@/language/en";
import Image from "next/image";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import promoProduct from "../../assets/images/collection.webp";

export default function PromoSection() {
  const timeCards = [en.days, en.hours, en.mins, en.secs];
  return (
    <section className="promo_section py-20 lg:py-40 w-full flex-col flex items-center justify-center bg-background">
      <div className="promo_container flex flex-col lg:flex-row justify-between items-center w-full overflow-hidden lg:px-0 px-4 md:max-w-[95%] 2xl:max-w-screen-xl gap-10">
        <div className="wrapper max-w-[500px] flex flex-col items-center lg:items-start">
          <div className="promo_header mb-6">
            <Link
              className="promo_header-title font-bold text-2xl text-center lg:text-left lg:text-4xl block mb-6"
              href="product.html"
              target="_blank"
              rel="noopener norefferer"
            >
              {en.promoTitle}
            </Link>
            <p className="promo_header-text text-center lg:text-left">
              {en.promoDescription}
            </p>
          </div>
          <div className="promo_price flex lg:justify-start justify-center items-center gap-6 mb-6">
            <p className="price price--old text-3xl font-semibold text-gray-400">
              $48.97
            </p>
            <p className="price price--new text-3xl font-semibold text-green-800">
              $27.97
            </p>
          </div>
          <div className="promo_timer flex justify-center lg:justify-start gap-4 mb-6">
            {timeCards.map((time, index) => (
              <div
                className="timer_block w-14 h-14 lg:w-20 lg:h-20 flex flex-col justify-center items-center border border-primary rounded "
                key={index}
              >
                <p
                  className="timer_block-number text-green-800 font-semibold text-2xl"
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
              href="/stockist"
              className={`${buttonVariants({
                variant: "secondary",
              })} mt-6 px-6 self-center lg:self-start font-semibold py-6 hover:bg-[#C6E749]/80`}
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
            className="w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}
