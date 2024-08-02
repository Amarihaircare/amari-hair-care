"use client";
import {
  EmployeeIcon,
  EnvironmentalIcon,
  InnovationIcon,
} from "@/assets/icons";
import en from "@/language/en";
import { Heart, CheckIcon } from "lucide-react";
import Image from "next/image";
import moisturizer from "../../assets/images/natural-hair-mois.webp";
import cleanser from "../../assets/images/ph-balance.webp";
import serum from "../../assets/images/hair-serum.webp";
import oil from "../../assets/images/aloe-vera-extract-oil.webp";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { useRef, useState } from "react";

// import required modules
import { Autoplay } from "swiper/modules";
import { cn } from "@/lib/utils";

export default function HomeHero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const swiperRef = useRef<SwiperRef>(null);

  function handleDotClick(index: number) {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideToLoop(index);
    }
  }

  return (
    <section className="w-full overflow-hidden lg:pb-0 pb-20 lg:min-h-[800px] relative flex flex-col items-center">
      <div className="absolute w-[50%] right-0 top-0 bottom-0 bg-primary hidden lg:block" />
      <div className=" w-full lg:min-h-[800px] md:max-w-[95%] 2xl:max-w-screen-xl flex flex-col lg:flex-row justify-center lg:justify-normal">
        <div className="hero_content lg:w-[50%] flex flex-col gap-4 lg:items-start items-center lg:px-0 justify-center px-4 py-20 lg:py-0">
          <div className="hero_content-header flex flex-col gap-4 items-center lg:items-start">
            <h1 className="hero_content-header_title lg:max-w-[560px] text-center lg:text-left text-3xl lg:text-6xl font-black">
              {en.heroTitle}
            </h1>
            <p className="hero_content-header_text max-w-[400px] 2xl:max-w-[450px] text-center lg:text-left">
              {en.heroDescription}
            </p>
          </div>
          <Button asChild>
            <Link
              href="/stockist"
              className={`${buttonVariants({
                variant: "secondary",
              })} mt-6 px-6 self-center lg:self-start font-semibold py-6 mb-14 hover:bg-[#C6E749]/80`}
            >
              {en.becomeAStockist}
            </Link>
          </Button>

          <div className="aos-init aos-animate grid lg:grid-cols-2 gap-y-8 gap-x-20">
            {ourValues.map((value, index) => (
              <div
                key={index}
                className="wrapper flex flex-col lg:flex-row items-center gap-4"
              >
                <span className="w-16 h-16 rounded-full bg-secondary/20 shadow flex items-center justify-center">
                  {value.icon}
                </span>
                <h5 className="title font-semibold lg:max-w-[150px]">
                  {value.name}
                </h5>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-primary lg:w-[50%] flex lg:items-center px-4 justify-center flex-col relative py-20 lg:py-0">
          <div className="hero_media lg:absolute lg:top-[20%] lg:left-[-25%] z-[90] ">
            <Swiper
              ref={swiperRef}
              onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
              effect={"fade"}
              grabCursor={true}
              pagination={false}
              loop={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
              rewind={false}
              className="mySwiper w-[300px] lg:scale-125 flex items-center justify-center"
            >
              {slides.map((slide, index) => (
                <SwiperSlide key={index}>
                  <Image
                    src={slide.image}
                    alt={slide.name}
                    width={800}
                    height={600}
                    className={cn("w-full h-full", {})}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="max-w-[300px]">
            <h2 className="text-2xl lg:text-4xl font-bold text-white mb-2">
              {slides[activeSlide].name}
            </h2>
            <p className="text-white">
              {slides[activeSlide].product?.description}
            </p>
            <ul className="my-6">
              {slides[activeSlide].product?.ingredients?.map(
                (ingredient, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-secondary flex items-center justify-center">
                      <CheckIcon
                        width={"1em"}
                        height={"1em"}
                        className="text-sm"
                      />
                    </div>
                    <p key={index} className="text-white">
                      {ingredient}
                    </p>
                  </li>
                ),
              )}
            </ul>
            <Link
              href="/catalog/caffeine-scalp-serum"
              className=" mt-6 text-secondary border-b-2 border-secondary rounded-none self-center bg-transparent lg:self-start font-semibold py-2"
            >
              {en.aboutProduct}
            </Link>
          </div>
          <div className="absolute right-4 lg:right-0 flex flex-col gap-4">
            {Array.from({ length: slides.length }, (_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={cn(
                  "text-white/60 text-sm font-bold transition-all",
                  {
                    "scale-[1.8] text-white": activeSlide === index,
                  },
                )}
              >
                0{index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const slides = [
  {
    name: en.moisturizers,
    image: moisturizer,
    product: {
      name: en.moisturizers,
      description: en.moisturizersShortDescription,
      ingredients: [
        en.sodiumLactate,
        en.butyrospermumParkii,
        en.butyleneGlycol,
      ],
    },
  },
  {
    name: en.cleansers,
    image: cleanser,
    product: {
      name: en.phBalancingMistAndCleanser,
      description: en.phBalancingMistAndCleanserShortDescription,
      ingredients: [
        en.lavenderExtract,
        en.salicylicAcid,
        en.angelicaExtract,
        en.vitexExtract,
      ],
    },
  },
  {
    name: en.oil,
    image: oil,
    product: {
      name: en.aloeVeraExtractOil,
      description: en.aloeVeraExtractOilShortDescription,
      ingredients: [en.aloeBarbadensis],
    },
  },
  {
    name: en.serums,
    image: serum,
    product: {
      name: en.vitaminESerum,
      description: en.vitaminESerumShortDescription,
      ingredients: [
        en.simmondsiaChinensis,
        en.tocopherylAcetate,
        en.rosmarinusOfficinalis,
        en.astaxanthinOil,
      ],
    },
  },
];

const ourValues = [
  {
    name: en.customerSatisfaction,
    icon: <Heart />,
  },
  {
    name: en.employeeSatisfaction,
    icon: <EmployeeIcon className="text-2xl" />,
  },
  {
    name: en.environmentalSustainability,
    icon: <EnvironmentalIcon />,
  },
  {
    name: en.qualityAndInnovation,
    icon: <InnovationIcon />,
  },
];
