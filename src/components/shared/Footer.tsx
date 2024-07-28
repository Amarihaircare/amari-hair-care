import Facebook from "@/assets/icons";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container d-flex flex-column flex-md-row flex-wrap flex-xl-nowrap justify-content-xl-between">
        <div className="footer_main-about footer_main-block col-md-6 col-xl-auto">
          <Link
            className="brand footer_main-about_brand d-flex align-items-center"
            href="/"
          >
            logo
          </Link>
          <div className="footer_main-about_wrapper">
            <p className="text">
              Elementum nisi quis eleifend quam adipiscing. Cursus metus aliquam
              eleifend mi in nulla posuere sollicitudin
            </p>
            <ul className="socials d-flex align-items-center accent">
              <li className="list-item">
                <Link
                  className="link"
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener norefferer"
                >
                  <Facebook />
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer_main-contacts footer_main-block col-md-6 col-xl-auto">
          <h4 className="footer_main-contacts_header footer_main-header">
            Contacts information
          </h4>
          <ul className="footer_main-contacts_list">
            <li className="list-item d-flex align-items-center">
              <span className="icon d-flex justify-content-center align-items-center">
                <i className="icon-call"></i>
              </span>
              <div className="wrapper d-flex flex-column">
                <Link className="link" href="tel:+1234567890">
                  +1-202-555-0133
                </Link>
                <Link className="link" href="tel:+1234567890">
                  +1-202-555-0133
                </Link>
              </div>
            </li>
          </ul>
        </div>
        <div className="footer_main-nav footer_main-block col-md-6 col-xl-auto">
          <h4 className="footer_main-nav_header footer_main-header">
            Shop Products
          </h4>
          <ul className="footer_main-nav_list d-flex flex-wrap flex-md-column">
            <li className="list-item">
              <Link className="link d-inline-flex align-items-center" href="#">
                <i className="icon-caret_right accent icon"></i> Flower
              </Link>
            </li>
          </ul>
        </div>
        <div className="footer_main-instagram footer_main-block col-md-6 col-xl-auto">
          <h4 className="footer_main-instagram_header footer_main-header">
            Instagram
          </h4>
          <ul className="footer_main-instagram_list d-grid">
            <li className="list-item">
              <Link
                className="link"
                href="#"
                target="_blank"
                rel="noopener norefferer"
              >
                <Image
                  className="lazy preview entered loaded"
                  data-src=""
                  src=""
                  alt="instagram post"
                  data-ll-status="loaded"
                />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
