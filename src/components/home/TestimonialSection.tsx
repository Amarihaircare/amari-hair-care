"use client";

import en from "@/language/en";
import Rating from "../ui/Rating";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { useEffect, useRef, useState } from "react";
import useSlidesPerView from "@/hooks/useSlidesPerView";
import { Autoplay } from "swiper/modules";
import SlidesPagination from "../ui/SlidesPagination";
import { QuoteLeftIcon, QuoteRightIcon } from "@/assets/icons";
import { reviews } from "@/assets/data/reviews";
import { returnRandomSlice } from "@/lib/utils";

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState(reviews);
  const slidesPerView = useSlidesPerView();
  const [activeSlide, setActiveSlide] = useState(0);
  const swiperRef = useRef<SwiperRef>(null);

  const handleDotClick = (index: number) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideToLoop(index);
    }
  };

  useEffect(() => {
    setTestimonials(returnRandomSlice(reviews, 5));
  }, []);

  return (
    <section className="review_section flex w-full flex-col items-center justify-center bg-white py-20 lg:py-40">
      <div className="review_container flex w-full flex-col items-center overflow-hidden px-4 md:max-w-[95%] lg:px-0 2xl:max-w-screen-xl">
        <div className="reviews_header flex flex-col items-center lg:max-w-[600px]">
          <h2
            className="reviews_header-title mb-6 w-[220px] text-center text-2xl font-bold lg:w-auto lg:text-4xl"
            data-aos="fade-up"
          >
            {en.reviewHeader}
          </h2>

          <p className="reviews_header-text text-center" data-aos="fade-left">
            {en.reviewDescription}
          </p>
        </div>
        <Swiper
          ref={swiperRef}
          onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
          slidesPerView={slidesPerView}
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="mySwiper my-12 h-[300px] w-full"
        >
          {testimonials.map((review, index) => (
            <SwiperSlide
              key={index}
              className="reviews_slider-slide flex h-full w-full items-center justify-center rounded border border-gray-200 p-4 shadow lg:min-w-[420px] lg:p-10"
            >
              <div className="reviews_slider-slide_wrapper relative flex flex-col items-center justify-between gap-4">
                <QuoteLeftIcon className="absolute -top-4 left-0 text-xl" />
                <Rating value={review.rating} />
                <p className="line-clamp-5 cursor-pointer text-center hover:line-clamp-none">
                  {review.review}
                </p>
                <h5 className="font-semibold">{review.name}</h5>
                <QuoteRightIcon className="absolute -bottom-4 right-0 text-xl" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <SlidesPagination
          length={testimonials.length}
          activeSlide={activeSlide}
          handleDotClick={handleDotClick}
        />
      </div>
    </section>
  );
}
