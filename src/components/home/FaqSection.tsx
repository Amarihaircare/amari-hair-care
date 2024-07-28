import Image from "next/image";

export default function FaqSection() {
  return (
    <section className="container d-flex flex-column-reverse flex-xl-row">
      <div className="faq_media">
        <Image
          className="lazy entered loaded"
          data-src=""
          src=""
          alt="media"
          data-ll-status="loaded"
        />
      </div>
      <div className="faq_main col-xl-6">
        <div className="faq_main-header">
          <h2 className="faq_main-header_title">
            The Effects of Cannabis on Your Body
          </h2>
          <p className="faq_main-header_text">
            Elementum eu facilisis sed odio morbi quis commodo odio. Mauris
            rhoncus aenean vel elit scelerisque mauris pellentesque. Accumsan
            sit amet nulla facilisi morbi tempus
          </p>
        </div>
        <div className="accordion">
          <div className="accordion_component" id="accordionComponent">
            <div className="accordion_component-item">
              <h4
                className="accordion_component-item_header d-flex justify-content-between align-items-center collapsed"
                data-bs-toggle="collapse"
                data-bs-target="#item-1"
              >
                Reduce Inflammation and Relieve Pain
                <span className="wrapper">
                  <i className="icon-caret_down icon"></i>
                </span>
              </h4>
              <div
                id="item-1"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionComponent"
              >
                <div className="accordion_component-item_body">
                  Placerat orci nulla pellentesque dignissim enim sit amet
                  venenatis urna. Tempus urna et pharetra pharetra massa massa
                  ultricies mi. Elementum sagittis vitae et leo duis ut diam
                  quam
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
