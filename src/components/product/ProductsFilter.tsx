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
        className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-200 py-3 font-semibold lg:hidden"
      >
        {en.filter}
        {!showFilter ? <CaretDown /> : <CaretUp />}
      </button>
      {showFilter && (
        <>
          <div className="hidden flex-col gap-4 lg:flex">
            <div className="flex items-center gap-4">
              <Image src={aloeIcon} width={24} height={24} alt="brand logo" />
              <h4 className="text-xl font-bold">{en.searchByProducts}</h4>
            </div>
            <form
              action="#"
              data-type="searchForm"
              className="relative hidden w-full items-center md:flex"
            >
              <Input
                placeholder={`${en.search}...`}
                type="search"
                className="w-full rounded-full py-5"
              />
              <button
                className="header_user-search_btn absolute bottom-0 right-0 top-0 flex items-center justify-center rounded-full bg-secondary px-4 font-medium"
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
                    <div className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-200">
                      <input
                        type="radio"
                        id={category}
                        hidden
                        className="peer"
                        name="category"
                      />
                      <div className="h-2 w-2 rounded-full peer-checked:bg-primary" />
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
                      "rounded-lg border border-gray-200 px-5 py-3",
                      {
                        "bg-primary text-white": weight === 5,
                      },
                    )}
                  >
                    {weight}
                    {weight < 50 ? "g" : "ml"}
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
              {[1000, 50000].map((price) => (
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

const categories = [en.hairCare, en.scalpCare];

const weights = [10, 15, 30, 50, 100, 200, 400];
