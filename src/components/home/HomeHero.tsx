"use client";
import {
  ClinicallyIcon,
  EnvironmentalIcon,
  OilDropIcon,
  PlantIcon,
  PositiveReviewsIcon,
} from "@/assets/icons";
import en from "@/language/en";
import { CheckIcon } from "lucide-react";
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
    <section className="relative flex w-full flex-col items-center overflow-hidden pb-20 lg:min-h-[800px] lg:pb-0">
      <div className="absolute bottom-0 right-0 top-0 hidden w-[50%] bg-primary lg:block" />
      <div className="flex w-full flex-col justify-center md:max-w-[95%] lg:min-h-[800px] lg:flex-row lg:justify-normal 2xl:max-w-screen-xl">
        <div className="hero_content flex flex-col items-center justify-center gap-4 px-4 py-20 lg:w-[50%] lg:items-start lg:px-0 lg:py-0">
          <div className="hero_content-header flex flex-col items-center gap-4 lg:items-start">
            <h1 className="hero_content-header_title text-center text-3xl font-black lg:max-w-[560px] lg:text-left lg:text-6xl">
              {en.heroTitle}
            </h1>
            <p className="hero_content-header_text max-w-[400px] text-center lg:text-left 2xl:max-w-[450px]">
              {en.heroDescription}
            </p>
          </div>
          <Button asChild>
            <Link
              href="/stockist"
              className={`${buttonVariants({
                variant: "secondary",
              })} mb-14 mt-6 self-center px-6 py-6 font-semibold hover:bg-[#C6E749]/80 lg:self-start`}
            >
              {en.heroCta}
            </Link>
          </Button>

          <div className="aos-init aos-animate grid gap-x-20 gap-y-8 lg:grid-cols-2">
            {ourValues.map((value, index) => (
              <div
                key={index}
                className="wrapper flex flex-col items-center gap-4 lg:flex-row"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary/20 text-2xl shadow">
                  {value.icon}
                </span>
                <h5 className="title font-semibold lg:max-w-[150px]">
                  {value.name}
                </h5>
              </div>
            ))}
          </div>
        </div>
        <div className="relative flex flex-col justify-center bg-primary px-4 py-20 lg:w-[50%] lg:items-center lg:py-0">
          <div className="hero_media z-[90] lg:absolute lg:left-[-25%] lg:top-[20%]">
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
              className="mySwiper flex w-[300px] items-center justify-center lg:scale-125"
            >
              {slides.map((slide, index) => (
                <SwiperSlide key={index}>
                  <Image
                    src={slide.image}
                    alt={slide.name}
                    width={800}
                    height={600}
                    className={cn("h-full w-full", {})}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="max-w-[300px]">
            <h2 className="mb-2 text-2xl font-bold text-white lg:text-4xl">
              {slides[activeSlide].name}
            </h2>
            <p className="text-white">
              {slides[activeSlide].product?.description}
            </p>
            <ul className="my-6">
              {slides[activeSlide].product?.ingredients?.map(
                (ingredient, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="flex h-4 w-4 items-center justify-center rounded-full bg-secondary">
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
              className="mt-6 self-center rounded-none border-b-2 border-secondary bg-transparent py-2 font-semibold text-secondary lg:self-start"
            >
              {en.aboutProduct}
            </Link>
          </div>
          <div className="absolute right-4 flex flex-col gap-4 lg:right-0">
            {Array.from({ length: slides.length }, (_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={cn(
                  "text-sm font-bold text-white/60 transition-all",
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
    name: en.oils,
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
    name: en.ourValueOne,
    icon: <OilDropIcon />,
  },
  {
    name: en.ourValueTwo,
    icon: <PlantIcon />,
  },
  {
    name: en.ourValueThree,
    icon: <ClinicallyIcon />,
  },
  {
    name: en.ourValueFour,
    icon: <PositiveReviewsIcon />,
  },
];
