"use client";
import en from "@/language/en";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { useRef, useState } from "react";
import useSlidesPerView from "@/hooks/useSlidesPerView";

import { Autoplay } from "swiper/modules";
import SlidesPagination from "../ui/SlidesPagination";
import { popularProducts } from "@/assets/data/products";
import ProductCard from "../product/ProductCard";

export default function PopularSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const slidesPerView = useSlidesPerView();
  const swiperRef = useRef<SwiperRef>(null);

  const handleDotClick = (index: number) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideToLoop(index);
    }
  };

  return (
    <section className="popular_section bg-white pb-20 lg:pb-40 w-full flex-col flex items-center justify-center">
      <div className=" w-full overflow-hidden px-4 md:max-w-[95%] 2xl:max-w-screen-xl">
        <div className="popular_header flex flex-col items-center gap-4">
          <h2 className="popular_header-title text-2xl lg:text-4xl font-bold text-center">
            {en.popularProducts}
          </h2>
          <p className="popular_header-text max-w-[620px] text-center">
            {en.popularProductsDescription}
          </p>
        </div>
        <Swiper
          onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
          slidesPerView={slidesPerView}
          spaceBetween={30}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={true}
          modules={[Autoplay]}
          className="mySwiper my-8"
          ref={swiperRef}
        >
          {popularProducts.map((product, index) => (
            <SwiperSlide key={index} className="flex flex-col gap-4">
              <ProductCard
                name={product.name}
                image={product.images[0]}
                price={product.price}
                rating={product.rating}
                discount={product?.discount}
                slug={product.slug}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <SlidesPagination
          length={popularProducts.length}
          activeSlide={activeSlide}
          handleDotClick={handleDotClick}
        />
      </div>
    </section>
  );
}
