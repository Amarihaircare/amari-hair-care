import Image from "next/image";

export default function TestimonialsSection() {
  return (
    <section className="review_section py-40 w-full flex-col flex items-center justify-center bg-white">
      <div className="review_container flex items-center w-full overflow-hidden px-4 md:max-w-screen-sm xl:max-w-screen-lg 2xl:max-w-screen-xl">
        <h2 className="reviews_header-title">Your Trust is Our Top Concern</h2>
        <p className="reviews_header-text">
          Feugiat sed lectus vestibulum mattis ullamcorper velit. Sed pulvinar
          proin gravida hendrerit lectus
        </p>
      </div>
      <div className="reviews_slider swiper swiper-initialized swiper-horizontal swiper-pointer-events">
        <div className="swiper-wrapper">
          <div
            className="reviews_slider-slide swiper-slide swiper-slide-duplicate swiper-slide-duplicate-next"
            data-swiper-slide-index="3"
          >
            <div className="reviews_slider-slide_wrapper d-flex flex-column align-items-center">
              <Image
                className="lazy avatar entered loaded"
                data-src=""
                src=""
                alt="avatar"
                data-ll-status="loaded"
              />
              <ul className="rating d-flex align-items-center accent">
                <li className="rating_star">
                  <i className="icon-star_fill"></i>
                </li>
              </ul>
              <p className="text">
                Amet facilisis magna etiam tempor orci eu lobortis elementum
                nibh. Tellus elementum sagittis vitae et leo.
              </p>
              <h5 className="name">John Doe</h5>
            </div>
          </div>
        </div>
        <div className="swiper-pagination swiper-pagination--dots swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal">
          <span className="swiper-pagination-bullet"></span>
        </div>
      </div>
    </section>
  );
}
