"use client";

import en from "@/language/en";
import Image from "next/image";
import avatarOne from "../../assets/images/avatar-one.png";
import avatarTwo from "../../assets/images/avatar-two.png";
import Rating from "../ui/Rating";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";

import { Autoplay } from "swiper/modules";
import { cn } from "@/lib/utils";

export default function TestimonialsSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  return (
    <section className="review_section py-20 lg:py-40 w-full flex-col flex items-center justify-center bg-white">
      <div className="review_container flex flex-col items-center w-full overflow-hidden px-4 md:max-w-screen-sm xl:max-w-screen-lg 2xl:max-w-screen-xl">
        <div className="reviews_header lg:max-w-[600px] flex flex-col items-center">
          <h2 className="reviews_header-title text-2xl w-[220px] lg:w-auto lg:text-4xl text-center mb-6 font-bold">
            {en.reviewHeader}
          </h2>

          <p className="reviews_header-text text-center">
            {en.reviewDescription}
          </p>
        </div>
        <Swiper
          onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
          slidesPerView={
            window.innerWidth > 1024 ? 3 : window.innerWidth > 768 ? 2 : 1
          }
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="mySwiper w-full my-12"
        >
          {reviews.map((review, index) => (
            <SwiperSlide
              key={index}
              className="reviews_slider-slide w-full lg:min-w-[420px] p-4 lg:p-10 rounded border shadow border-gray-200"
            >
              <div className="reviews_slider-slide_wrapper flex flex-col h-full items-center gap-4 justify-between">
                <Image
                  src={review.avatar}
                  alt="avatar"
                  width={100}
                  height={100}
                  className="w-20 h-20 rounded-full object-cover mb-4"
                />
                <Rating value={review.rating} />
                <p className="text-center">{review.review}</p>
                <h5 className="font-semibold">{review.name}</h5>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: reviews.length }, (_, index) => (
            <div
              key={index}
              className={cn(" w-3 h-3 rounded-full bg-secondary", {
                "bg-primary": index === activeSlide,
              })}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const reviews = [
  {
    name: "Sarah E",
    review:
      "The Vitamin E Serum has transformed my hair! It’s now so much smoother and healthier. I couldn’t be happier with the results!",
    rating: 5,
    avatar: avatarOne,
  },
  {
    name: "Ngozi Uche",
    review:
      "Amari Hair Care products are a game changer. The Natural Hair Moisturizer is perfect for my curls, keeping them hydrated and frizz-free all day.",
    rating: 4,
    avatar: avatarTwo,
  },
  {
    name: "Glory John",
    review:
      "The African Black Soap Clarifying Shampoo Bar is fantastic. It leaves my hair feeling so clean and refreshed without any residue.",
    rating: 4,
    avatar: avatarOne,
  },
  {
    name: "Aisha Umar",
    review:
      "I love the Leave-In Protein Treatment! My hair has never been this strong and shiny. It’s a must-have in my hair care routine.",
    rating: 4,
    avatar: avatarTwo,
  },
  {
    name: "Ebuka Nwosu",
    review:
      "I can’t get enough of the Caffeine Scalp Serum. It has significantly improved the health of my scalp and the growth of my hair. Truly amazing!",
    rating: 4,
    avatar: avatarOne,
  },
  {
    name: "Rita Mark",
    review:
      "The pH Balancing Mist and Cleanser is a staple in my skincare routine. It’s gentle on my skin and leaves it feeling fresh and clean.",
    rating: 4,
    avatar: avatarTwo,
  },
  {
    name: "Jane Doe",
    review:
      "The Aloe Vera Extract Oil is a miracle worker! It has helped to soothe my dry scalp and has left my hair feeling soft and nourished.",
    rating: 4,
    avatar: avatarOne,
  },
];
