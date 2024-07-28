import { Search, Heart, ShoppingBasket } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="">
      <div className="container d-flex flex-wrap flex-xl-nowrap align-items-center justify-content-between">
        <Link href="/">Logo</Link>
        <nav className="header_nav">
          <ul className="header_nav-list">
            <li className="header_nav-list_item dropdown">
              <Link href="#" className="">
                Home <i className="icon-caret_down icon"></i>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="header_user d-flex justify-content-end align-items-center">
          <form
            className="header_user-search"
            action="#"
            method="get"
            data-type="searchForm"
          >
            <input
              className="header_user-search_field field required"
              type="text"
              placeholder="Search..."
            />
            <button
              className="header_user-search_btn header_user-action d-inline-flex align-items-center justify-content-center"
              type="submit"
              data-trigger="search"
            >
              <Search />
            </button>
          </form>
          <a
            className="header_user-action d-inline-flex align-items-center justify-content-center"
            href="#"
          >
            <Heart />
          </a>
          <button
            className="header_user-action d-inline-flex align-items-center justify-content-center"
            data-bs-toggle="offcanvas"
            data-bs-target="#cartOffcanvas"
            aria-controls="cartOffcanvas"
          >
            <ShoppingBasket />
          </button>
        </div>
      </div>
    </header>
  );
}
