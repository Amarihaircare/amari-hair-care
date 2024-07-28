import Image from "next/image";
import Link from "next/link";

export default function PromoSection() {
  return (
    <div className="promo">
      <div className="promo_fluid d-lg-flex align-items-center align-items-xxl-end">
        <div className="wrapper section--nopb col-lg-6 col-xxl-auto">
          <div className="promo_header">
            <Link
              className="promo_header-title"
              href="product.html"
              target="_blank"
              rel="noopener norefferer"
            >
              CBD Facial Serum: Anti-Aging + Daily Moisturizer
            </Link>
            <p className="promo_header-text">
              Accumsan sit amet nulla facilisi morbi tempus. Suscipit tellus
              mauris a diam maecenas sed enim ut sem. Turpis egestas maecenas
              pharetra convallis posuere
            </p>
          </div>
          <div className="promo_price">
            <span className="price price--old">$48.97</span>
            <span className="price price--new">$27.97</span>
          </div>
          <div className="promo_timer timer d-flex justify-content-center justify-content-md-start">
            <div className="timer_block d-flex flex-column justify-content-center">
              <span className="timer_block-number" id="seconds">
                00
              </span>{" "}
              secs
            </div>
          </div>
          <a className="promo_btn btn" href="shop.html">
            Shop Now
          </a>
        </div>
        <div className="media">
          <Image
            className="lazy entered loaded"
            data-src=""
            src=""
            alt="media"
            data-ll-status="loaded"
          />
        </div>
      </div>
    </div>
  );
}
