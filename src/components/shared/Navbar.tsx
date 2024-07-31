"use client";

import { CaretDown, HeartIcon } from "@/assets/icons";
import { cn } from "@/lib/utils";
import { Search, ShoppingBasket } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import en from "@/language/en";
import Image from "next/image";
import BurgerButton from "../ui/BurgerButton";

export default function Navbar() {
  const [dropdown, setDropdown] = useState("");
  const [showNav, setShowNav] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [scrollingDown, setScrollingDown] = useState(false);
  const SCROLL_THRESHOLD = 600;

  useEffect(() => {
    if (typeof window === "undefined") return;

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setScrollingDown(currentScrollY > lastScrollY);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const userAction = [
    {
      name: en.wishlists,
      icon: <HeartIcon />,
    },
    {
      name: en.cart,
      icon: <ShoppingBasket />,
    },
  ];
  console.log(dropdown);

  return (
    <header
      className={cn(
        "header py-4 lg:py-8 w-full flex justify-center z-[999] top-0 bg-background transition-all duration-300",
        {
          "bg-white shadow sticky": scrollY > 0,
          "translate-y-[-200px]": scrollY > SCROLL_THRESHOLD && scrollingDown,
        }
      )}
    >
      <div className="flex relative flex-wrap md:flex-nowrap items-center justify-between px-4 md:max-w-screen-sm xl:max-w-screen-lg 2xl:max-w-screen-xl w-full">
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
            "header_nav absolute lg:bg-transparent border-gray-200 lg:border-0 border bg-white left-4 right-4 top-[calc(100%+24px)] lg:block lg:static translate-x-[-12000px] lg:translate-x-0",
            {
              "translate-x-0": showNav,
            }
          )}
        >
          <ul className="header_nav-list flex flex-col lg:flex-row lg:items-center px-2 py-8 lg:p-0 gap-4 lg:gap-10">
            {navLinks.map((navLink) => (
              <li
                className="header_nav-list_item relative group"
                key={navLink.url}
              >
                <Link
                  onClick={() =>
                    setDropdown((prev) =>
                      prev === navLink.name ? "" : navLink.name
                    )
                  }
                  onMouseLeave={() => setDropdown("")}
                  className="nav-link flex items-center gap-2 font-bold font-nunito hover:text-green-700 transition-colors"
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
                      "lg:absolute top-full group-hover:block hidden lg:py-4",
                      {
                        block: dropdown === navLink.name,
                      }
                    )}
                  >
                    <ul className="dropdown-list bg-white rounded py-4">
                      {navLink.dropdown.map((item) => (
                        <li className="list-item nav-item" key={item.url}>
                          <Link
                            className="dropdown-item block px-4 py-2 hover:bg-gray-100 hover:text-green-700 transition-colors lg:min-w-max"
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
        <div className="header_user flex gap-4 md:gap-8 lg:gap-36 items-center">
          <form
            action="#"
            data-type="searchForm"
            className="relative md:flex items-center hidden"
          >
            <Input
              placeholder={`${en.search}...`}
              type="search"
              className="rounded-full min-w-[280px]"
            />
            <button
              className="header_user-search_btn  flex absolute w-10 right-0 bg-secondary bottom-0 top-0 rounded-full items-center justify-center"
              type="submit"
              data-trigger="search"
            >
              <Search className="text-sm" />
            </button>
          </form>

          <div className="flex items-center gap-4 lg:gap-6">
            {userAction.map((action, index) => (
              <button
                key={index}
                className="header_user-action bg-secondary flex items-center justify-center rounded-full w-10 h-10"
              >
                {action.icon}
              </button>
            ))}
          </div>
          <BurgerButton
            handleClick={() => setShowNav(!showNav)}
            showNav={showNav}
          />
        </div>
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
    name: en.catalog,
    url: "#",
    dropdown: [
      {
        name: en.caffeineScalpSerum,
        url: "/catalog/caffeine-scalp-serum",
      },
      {
        name: en.vitaminESerum,
        url: "/catalog/vitamin-e-serum",
      },
      {
        name: en.phBalancingMistAndCleanser,
        url: "/catalog/ph-balancing-mist-and-cleanser",
      },
      {
        name: en.naturalHairMoisturizer,
        url: "/catalog/natural-hair-moisturizer",
      },
      {
        name: en.leaveInProteinTreatment,
        url: "/catalog/leave-in-protein-treatment",
      },
      {
        name: en.aloeVeraExtractOil,
        url: "/catalog/aloe-vera-extract-oil",
      },
      {
        name: en.africanBlackSoapClarifyingShampooBar,
        url: "/catalog/african-black-soap-clarifying-shampoo-bar",
      },
      {
        name: en.ayurvedicHairTreatment,
        url: "/catalog/ayurvedic-hair-treatment",
      },
    ],
  },
  {
    name: en.about,
    url: "/about",
  },
  {
    name: en.contact,
    url: "/contact",
  },
];
