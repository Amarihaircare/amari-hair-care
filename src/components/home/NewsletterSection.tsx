import Image from "next/image";

export default function NewsletterSection() {
  return (
    <section className="newsletter section--nopb">
      <div className="container">
        <div className="wrapper">
          <div className="newsletter_deco">
            <div className="newsletter_deco-wrapper">
              <Image
                className="lazy leaf leaf--left entered loaded"
                data-src=""
                src=""
                alt="deco"
                data-ll-status="loaded"
              />
            </div>
            <div className="newsletter_deco-wrapper">
              <Image
                className="lazy leaf leaf--right entered loaded"
                data-src=""
                src=""
                alt="deco"
                data-ll-status="loaded"
              />
            </div>
          </div>
          <div className="newsletter_content">
            <div className="newsletter_header">
              <h2 className="newsletter_header-title">
                Sign Up for Our Newsletter
              </h2>
              <p className="newsletter_header-text">
                Accumsan sit amet nulla facilisi morbi tempus. Suscipit tellus
                mauris a diam maecenas sed enim ut sem
              </p>
            </div>
            <form
              className="newsletter_form d-sm-flex"
              data-type="newsletter"
              action="#"
              method="post"
            >
              <input
                className="newsletter_form-field field required"
                type="text"
                data-type="email"
                placeholder="Email"
              />
              <button className="newsletter_form-btn btn" type="submit">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
