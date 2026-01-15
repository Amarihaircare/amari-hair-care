"use client";

import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useRef, useState } from "react";
import type { StaticImageData } from "next/image";
import { CaretRight, CaretLeft } from "@/assets/icons";
import { cn } from "@/lib/utils";

const getCdnImageUrl = (imagePath: string): string => {
  if (!imagePath) return "";

  let url = imagePath;
  if (!url.startsWith("http")) {
    url = `https://amariscalpcare.zohoecommerce.com${url}`;
  }

  url = url.replace(
    "https://amariscalpcare.zohoecommerce.com",
    "https://cdn1.zohoecommerce.com",
  );

  const [pathWithoutQuery, existingQuery] = url.split("?");

  const cleanPath = pathWithoutQuery.replace(/\/\d+x\d+$/, "");
  let finalPath = `${cleanPath}/800x800`;

  let query = existingQuery || "";
  if (!query.includes("storefront_domain=")) {
    query = query
      ? `${query}&storefront_domain=amariscalpcare.zohoecommerce.com`
      : "storefront_domain=amariscalpcare.zohoecommerce.com";
  }

  if (query) {
    finalPath += `?${query}`;
  }

  return finalPath;
};

interface ProductImageSlidesProps {
  images: (string | StaticImageData)[];
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
    <div className="w-full lg:w-[40%] max-w-[420px] flex flex-col gap-4">
      <div className="relative flex flex-col items-center justify-center">
        <Swiper
          ref={swiperRef}
          loop={true}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2 w-full aspect-[3/4] max-h-[480px]"
        >
          {images.map((image, index) => {
            const baseSrc = typeof image === "string" ? image : image.src;
            const src =
              typeof baseSrc === "string" && baseSrc.includes("product-images/")
                ? getCdnImageUrl(baseSrc)
                : baseSrc;
            return (
              <SwiperSlide key={index}>
                <img
                  src={src}
                  alt="Product Image"
                  className="w-full h-full object-cover rounded"
                  style={{
                    objectFit: "cover",
                  }}
                />
              </SwiperSlide>
            );
          })}
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
        spaceBetween={5}
        slidesPerView={5}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="product_slide w-full h-[131px] lg:h-[225px]"
      >
        {images.map((image, index) => {
          const baseSrc = typeof image === "string" ? image : image.src;
          const src =
            typeof baseSrc === "string" && baseSrc.includes("product-images/")
              ? getCdnImageUrl(baseSrc)
              : baseSrc;
          return (
            <SwiperSlide key={index} className="produc_mySlide h-full">
              <img
                src={src}
                alt="Product Image"
                className="w-[100px] h-[80px] object-cover rounded"
                style={{
                  objectFit: "cover",
                }}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
