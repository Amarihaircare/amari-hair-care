import Image from "next/image";

export default function HomeHero() {
  return (
    <section className="hero section">
      <div className="container">
        <div className="hero_content col-xl-6">
          <div className="hero_content-header">
            <h1 className="hero_content-header_title">
              Cannabis Oils: CBD Oil and THC Oil Available
            </h1>
            <p className="hero_content-header_text">
              Discover a diverse range of food, concentrates, cannabis oils,
              capsules, CBD oils, baked buns and dried flowers - available in
              indica, sativa and hybrid varieties with varying CBD and THC
              potencies. Cannabis accessories can also be purchased.
            </p>
          </div>
          <a className="hero_content-btn btn" href="shop.html">
            Shop Now
          </a>
          <div className="features-list d-sm-flex flex-wrap">
            <div className="features-list_row d-sm-flex">
              <div
                className="features-list_item aos-init aos-animate"
                data-order="1"
                data-aos="fade-up"
              >
                <div className="wrapper d-flex flex-column flex-sm-row align-items-center">
                  <h5 className="title">Free Shipping &amp; Returns</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hero_media">
        <Image
          className="lazy hero_media-leaf entered loaded"
          data-src=""
          src=""
          alt="media"
          data-ll-status="loaded"
        />
      </div>
    </section>
  );
}
