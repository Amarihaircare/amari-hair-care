"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useState } from "react";
import Image, { StaticImageData } from "next/image";

interface ProductImageSlidesProps {
  images: StaticImageData[];
}
export default function ProductImageSlides({
  images,
}: ProductImageSlidesProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  console.log(images, "images");

  return (
    <div className="w-full lg:w-[50%] flex flex-col gap-4">
      <Swiper
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
