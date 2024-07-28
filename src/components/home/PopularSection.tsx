import Image from "next/image";

export default function PopularSection() {
  return (
    <section className="popular section">
      <div className="popular_header">
        <h2 className="popular_header-title">Popular Products</h2>
        <p className="popular_header-text">
          Suscipit tellus mauris a diam maecenas sed enim ut sem. Turpis egestas
          maecenas pharetra convallis posuere
        </p>
      </div>
      <div className="popular_slider swiper swiper-initialized swiper-horizontal swiper-pointer-events">
        <div className="swiper-wrapper">
          <div
            className="popular_slider-slide swiper-slide swiper-slide-duplicate"
            data-swiper-slide-index="0"
          >
            <div className="wrapper d-flex flex-column">
              <div className="media">
                <div className="overlay d-flex flex-column align-items-center justify-content-center">
                  <ul className="action d-flex align-items-center justify-content-center">
                    <li className="list-item">
                      <a
                        className="action_link d-flex align-items-center justify-content-center"
                        href="#"
                        data-trigger="compare"
                      >
                        <i className="icon-compare"></i>
                      </a>
                    </li>
                  </ul>
                </div>
                <Image
                  className="lazy entered loaded"
                  data-src=""
                  src=""
                  alt="media"
                  data-ll-status="loaded"
                />
              </div>
              <div className="main d-flex flex-column">
                <div className="main_rating">
                  <ul className="main_rating-stars d-flex align-items-center accent">
                    <li className="main_rating-stars_star">
                      <i className="icon-star_fill"></i>
                    </li>
                  </ul>
                </div>
                <a
                  className="main_title"
                  href="product.html"
                  target="_blank"
                  rel="noopener norefferer"
                >
                  Witchcraft Cannabis
                </a>
                <div className="main_price">
                  <span className="price">$7.97</span>
                </div>
              </div>
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
