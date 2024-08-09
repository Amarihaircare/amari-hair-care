"use client";

import {
  BookmarkIcon,
  CaretDown,
  DocumentIcon,
  SearchIcon,
} from "@/assets/icons";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import en from "@/language/en";
import Image from "next/image";
import BurgerButton from "../ui/BurgerButton";
import RoundedIconButton from "../ui/RoundedIconButton";
import SearchSlide from "./SearchSlide";
import SearchForm from "../ui/SearchForm";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";

export default function Navbar() {
  const { cart } = useCart();

  const router = useRouter();
  const [searchKwd, setSearchKwd] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [dropdown, setDropdown] = useState("");
  const [showNav, setShowNav] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [scrollingDown, setScrollingDown] = useState(false);
  const SCROLL_THRESHOLD = 600;

  const userAction = [
    {
      name: en.search,
      icon: <SearchIcon strokeWidth="3" />,
      onClick: () => setShowSearch(!showSearch),
    },
    {
      name: en.wishlists,
      icon: <BookmarkIcon />,
    },
    {
      onClick: () => router.push("/stockist"),
      name: en.cart,
      icon: <DocumentIcon />,
    },
  ];

  function handleSearch(value: string) {
    if (!showSearch) {
      setShowSearch((prev) => !prev);
    }
    setSearchKwd(value);
  }

  useEffect(() => {
    if (typeof window === "undefined") return;

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowSearch(false);
      setScrollY(currentScrollY);
      setScrollingDown(currentScrollY > lastScrollY);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "header top-0 z-[999] flex w-full justify-center bg-background transition-all duration-300 lg:pb-8",
        {
          "sticky bg-white shadow": scrollY > 0,
          "translate-y-[-500%]":
            scrollY > SCROLL_THRESHOLD && scrollingDown && !showNav,
          "bg-white": showNav,
        },
      )}
    >
      <div className="relative flex w-full flex-wrap items-center justify-between bg-inherit px-4 py-4 md:max-w-[95%] md:flex-nowrap lg:p-0 lg:pt-8 xl:max-w-screen-xl">
        <Link href="/">
          <Image
            src="/logo-black.svg"
            width={82}
            height={50}
            alt="logo"
            className="hidden md:block"
          />
          <Image
            src="/logo-icon-black.svg"
            width={24}
            height={50}
            alt="logo"
            className="md:hidden"
          />
        </Link>
        <nav
          className={cn(
            "header_nav absolute left-0 right-0 top-[100%] h-screen translate-x-[-120%] bg-white transition-transform ease-in-out lg:static lg:h-auto lg:translate-x-0 lg:bg-transparent",
            {
              "translate-x-0": showNav,
            },
          )}
        >
          <ul className="header_nav-list flex flex-col gap-4 px-2 py-8 lg:flex-row lg:items-center lg:gap-10 lg:p-0">
            {navLinks.map((navLink) => (
              <li
                className="header_nav-list_item group relative"
                key={navLink.url}
              >
                <Link
                  onClick={() => {
                    !navLink.dropdown && setShowNav(false);
                  }}
                  onMouseLeave={() => setDropdown("")}
                  className="nav-link flex items-center gap-2 font-nunito font-bold transition-colors hover:text-green-700"
                  href={navLink.url}
                  aria-expanded="false"
                  aria-controls={navLink.name}
                >
                  {navLink.name}
                  {navLink.dropdown && <CaretDown />}
                </Link>

                {navLink.dropdown && (
                  <div
                    className={cn(
                      "top-full hidden group-hover:block lg:absolute lg:py-4",
                      {
                        block: dropdown === navLink.name,
                      },
                    )}
                  >
                    <ul className="dropdown-list rounded bg-white py-4 lg:min-w-[200px]">
                      {navLink.dropdown.map((item) => (
                        <li className="nav-item list-item" key={item.url}>
                          <Link
                            onClick={() => setShowNav(false)}
                            className="dropdown-item block px-4 py-2 font-semibold transition-colors hover:bg-secondary lg:min-w-max"
                            href={item.url}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="header_user relative flex items-center gap-4 md:gap-8 xl:gap-36">
          <SearchForm
            className="hidden w-[280px] lg:flex"
            searchKwd={searchKwd}
            handleChange={handleSearch}
          />

          <div className="flex items-center gap-4 lg:gap-6">
            {userAction.map((action, index) => (
              <div key={index} className="relative">
                <RoundedIconButton
                  onClick={action.onClick}
                  className={cn({
                    "lg:hidden": action.name.toLowerCase() === "search",
                  })}
                  icon={action.icon}
                  data-search={action.name.toLowerCase() === "search"}
                />
                {action.name.toLowerCase() === "cart" && cart.length > 0 && (
                  <p className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-[#313133] text-[10px] font-medium text-white">
                    {cart.length}
                  </p>
                )}
              </div>
            ))}
          </div>
          <BurgerButton
            handleClick={() => setShowNav(!showNav)}
            showNav={showNav}
          />

          <SearchSlide
            searchKwd={searchKwd}
            showSearch={showSearch}
            setSearchKwd={setSearchKwd}
            setShowSearch={setShowSearch}
            handleSearch={handleSearch}
            className="hidden lg:block"
          />
        </div>
        <SearchSlide
          searchKwd={searchKwd}
          showSearch={showSearch}
          setSearchKwd={setSearchKwd}
          handleSearch={handleSearch}
          setShowSearch={setShowSearch}
          className="lg:hidden"
        />
      </div>
    </header>
  );
}

const navLinks = [
  {
    name: en.home,
    url: "/",
  },
  {
    name: en.catalogue,
    url: "/catalogue",
  },
  {
    name: en.PaaS,
    url: "/PaaS",
  },
  {
    name: en.more,
    url: "#",
    dropdown: [
      {
        name: en.about,
        url: "/about",
      },
      {
        name: en.contact,
        url: "/contact",
      },
      {
        name: en.faq,
        url: "/faq",
      },
      {
        name: en.salonServices,
        url: "/salon-services",
      },
      {
        name: en.privacyPolicy,
        url: "/privacy",
      },
      {
        name: en.termsOfService,
        url: "/tos",
      },
    ],
  },
];
