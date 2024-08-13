import { CaretDown, CaretUp } from "@/assets/icons";
import en from "@/language/en";
import Image from "next/image";
import { useState } from "react";
import { Input } from "../ui/input";
import aloeIcon from "@/assets/icons/aloe-icon.png";
import { Slider } from "../ui/slider";
import { cn, formatCurrency } from "@/lib/utils";

interface ProductsFilterProps {
  handleSearch: (v: string) => void;
  handleSlide: (v: number) => void;
  handleWeight: (v: string) => void;
  handleCategory: (v: string) => void;
  currentWeight?: string;
}

export default function ProductsFilter({
  handleSlide,
  handleSearch,
  handleWeight,
  handleCategory,
  currentWeight,
}: ProductsFilterProps) {
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
                onChange={(e) => handleSearch(e.target.value)}
              />
              <button
                className="header_user-search_btn absolute bottom-0 right-0 top-0 flex items-center justify-center rounded-full bg-secondary px-4 font-medium"
                type="submit"
                data-trigger="search"
                disabled
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
                        onChange={() => handleCategory(category)}
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
                      "rounded-lg border border-gray-200 px-3 py-3 text-sm",
                      {
                        "bg-primary text-white": weight === currentWeight,
                      },
                    )}
                    onClick={() => handleWeight(weight)}
                  >
                    {weight}
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
            <Slider
              defaultValue={[50]}
              max={100}
              step={1}
              onValueChange={(v) => handleSlide(v[0])}
            />
          </div>
        </>
      )}
    </div>
  );
}

const categories = [en.all, en.hairCare, en.scalpCare];

const weights = ["All", "10ml", "15ml", "30ml", "50ml", "100g", "200g", "400g"];
