"use client";
import { CaretDown, CaretUp } from "@/assets/icons";
import en from "@/language/en";
import Image from "next/image";
import { useState } from "react";
import { Input } from "../ui/input";
import aloeIcon from "@/assets/icons/aloe-icon.png";
import { Slider } from "../ui/slider";
import { cn, formatCurrency } from "@/lib/utils";

export default function ProductsFilter() {
  const [showFilter, setShowFilter] = useState(
    typeof window === "undefined" ? true : window.innerWidth > 1024,
  );
  return (
    <div className="flex flex-col gap-8 lg:w-[20%]">
      <button
        onClick={() => setShowFilter(!showFilter)}
        className="w-full flex items-center lg:hidden gap-2 border border-gray-200 py-3 justify-center rounded-full font-semibold"
      >
        {en.filter}
        {!showFilter ? <CaretDown /> : <CaretUp />}
      </button>
      {showFilter && (
        <>
          <div className="lg:flex flex-col gap-4 hidden">
            <div className="flex items-center gap-4">
              <Image src={aloeIcon} width={24} height={24} alt="brand logo" />
              <h4 className="text-xl font-bold">{en.searchByProducts}</h4>
            </div>
            <form
              action="#"
              data-type="searchForm"
              className="relative w-full md:flex items-center hidden"
            >
              <Input
                placeholder={`${en.search}...`}
                type="search"
                className="rounded-full w-full py-5"
              />
              <button
                className="header_user-search_btn px-4 font-medium flex absolute right-0 bg-secondary bottom-0 top-0 rounded-full items-center justify-center"
                type="submit"
                data-trigger="search"
              >
                {en.search}
              </button>
            </form>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <Image src={aloeIcon} width={24} height={24} alt="brand logo" />
              <h4 className="text-xl font-bold">{en.productCategories}</h4>
            </div>
            <ul className="flex flex-col gap-2">
              {categories.map((category, index) => (
                <li key={index}>
                  <label htmlFor={category} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center">
                      <input
                        type="radio"
                        id={category}
                        hidden
                        className="peer"
                        name="category"
                      />
                      <div className="w-2 h-2 rounded-full peer-checked:bg-primary" />
                    </div>

                    {category}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <Image src={aloeIcon} width={24} height={24} alt="brand logo" />
              <h4 className="text-xl font-bold">{en.weight}</h4>
            </div>
            <ul className="flex flex-wrap gap-4">
              {weights.map((weight, index) => (
                <li key={index}>
                  <button
                    className={cn(
                      "py-3 px-5 rounded-lg border border-gray-200",
                      {
                        "bg-primary text-white": weight === 5,
                      },
                    )}
                  >
                    {weight}g
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <Image src={aloeIcon} width={24} height={24} alt="brand logo" />
              <h4 className="text-xl font-bold">{en.filterByPrice}</h4>
            </div>
            <div className="flex items-center justify-between">
              {[1000, 100000].map((price) => (
                <p key={price} className="font-medium">
                  {formatCurrency(price, "NGN")}
                </p>
              ))}
            </div>
            <Slider defaultValue={[50]} max={100} step={1} />
          </div>
        </>
      )}
    </div>
  );
}

const categories = [
  en.onSale,
  en.oil,
  en.moisturizers,
  en.spray,
  en.conditioner,
  en.shampoo,
  en.treatment,
];

const weights = [1, 3.5, 5, 7, 14, 28];
