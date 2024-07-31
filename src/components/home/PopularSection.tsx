"use client";
import en from "@/language/en";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import Rating from "../ui/Rating";
import { HeartIcon, ShoppingBasket, EyeIcon } from "@/assets/icons";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { useRef, useState } from "react";
import useSlidesPerView from "@/hooks/useSlidesPerView";

import { Autoplay } from "swiper/modules";
import SlidesPagination from "../ui/SlidesPagination";
import { popularProducts } from "@/assets/data/products";

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
      <div className=" w-full overflow-hidden px-4 md:max-w-screen-sm xl:max-w-screen-lg 2xl:max-w-screen-xl">
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
            <SwiperSlide key={index}>
              <div className="media w-full mb-4 relative rounded overflow-hidden">
                <Image
                  src={product.images[0]}
                  alt="media"
                  width={320}
                  height={220}
                  className="w-full h-[220px] rounded object-cover"
                />

                <div className="overlay hidden lg:flex flex-col items-center justify-center absolute w-full h-full top-0 hover:bg-[#284721]/60 transition-all group">
                  <ul className="action flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                    {productMenu.map((menu, index) => (
                      <li key={index} className="list-item">
                        <button className="w-10 h-10 rounded-full bg-white hover:bg-secondary flex items-center justify-center text-secondary hover:text-white">
                          {menu.icon}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="main flex flex-col gap-2">
                <div className="main_rating">
                  <Rating value={product.rating} />
                </div>
                <Link
                  className="main_title max-w-[300px] font-semibold text-black"
                  href={`/product/${product.slug}`}
                  rel="noopener norefferer"
                >
                  {product.name}
                </Link>
                <div className="main_price">
                  <p className="price font-bold text-green-800">
                    {formatCurrency(product.price, "NGN")}
                  </p>
                </div>
              </div>
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

const productMenu = [
  {
    icon: <HeartIcon />,
  },
  {
    icon: <ShoppingBasket />,
  },
  {
    icon: <EyeIcon />,
  },
];
