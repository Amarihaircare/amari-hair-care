import Image from "next/image";
import Link from "next/link";

export default function CategoriesSection() {
  return (
    <div className="categories section--nopb">
      <div className="container">
        <ul className="categories_list d-flex flex-wrap">
          <li
            className="categories_list-item col-6 col-md-4 col-xl-2"
            data-order="1"
          >
            <Link className="categories_list-item_wrapper" href="#">
              <div className="media">
                <span className="overlay d-flex flex-column justify-content-end">
                  <span className="overlay_content">24 Items</span>
                </span>
                <Image
                  className="lazy entered loaded"
                  data-src=""
                  src=""
                  alt="media"
                  data-ll-status="loaded"
                />
              </div>
              <h4 className="title">Seeds</h4>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
