"use client";

import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { CaretRight, CaretLeft } from "@/assets/icons";
import { cn } from "@/lib/utils";

interface ProductImageSlidesProps {
  images: StaticImageData[];
}
export default function ProductImageSlides({
  images,
}: ProductImageSlidesProps) {
  const swiperRef = useRef<SwiperRef>(null);

  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const navigations = [
    {
      name: "next",
      icon: <CaretRight />,
    },
    {
      name: "prev",
      icon: <CaretLeft />,
    },
  ];

  function handleNavigationClick(name: string) {
    if (!swiperRef.current || !swiperRef.current.swiper) return;

    if (name === "next") {
      swiperRef.current.swiper.slideNext();
      return;
    }
    swiperRef.current.swiper.slidePrev();
  }

  return (
    <div className="w-full lg:w-[50%] flex flex-col gap-4">
      <div className="relative flex flex-col items-center justify-center">
        <Swiper
          ref={swiperRef}
          loop={true}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2 w-full h-[370px] lg:h-[480px]"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <Image
                src={image}
                width={600}
                height={400}
                alt="Product Image"
                className="w-full h-full object-cover rounded"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {navigations.map((nav, index) => (
          <button
            onClick={() => handleNavigationClick(nav.name)}
            key={index}
            className={cn(
              "w-10 h-10 flex items-center justify-center bg-white rounded-full text-3xl shadow text-primary absolute z-[99]",
              {
                "right-4": nav.name === "next",
                "left-4": nav.name === "prev",
              },
            )}
          >
            {nav.icon}
          </button>
        ))}
      </div>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="product_slide w-full h-[131px] lg:h-[225px]"
      >
        {images.map((image, index) => (
          <SwiperSlide
            key={index}
            className="produc_mySlide h-full w-[168px] lg:w-[280px]"
          >
            <Image
              src={image}
              alt="Product Image"
              width={280}
              height={280}
              className="w-full h-full object-cover rounded"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
