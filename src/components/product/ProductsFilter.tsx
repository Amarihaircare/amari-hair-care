import { CaretDown, CaretUp } from "@/assets/icons";
import en from "@/language/en";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import aloeIcon from "@/assets/icons/aloe-icon.png";
import { Slider } from "../ui/slider";
import { formatCurrency } from "@/lib/utils";

interface ProductsFilterProps {
  handleSearch: (v: string) => void;
  handleSlide: (v: number) => void;
  handleCategory: (v: string) => void;
  minPrice: number;
  maxPrice: number;
  currentPriceMax: number;
  categories: any[];
  currentCategoryId: string;
  searchValue: string;
}

export default function ProductsFilter({
  handleSlide,
  handleSearch,
  handleCategory,
  minPrice,
  maxPrice,
  currentPriceMax,
  categories,
  currentCategoryId,
  searchValue,
}: ProductsFilterProps) {
  const [showFilter, setShowFilter] = useState(true);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setShowFilter(window.innerWidth > 1024);
    }
  }, []);
  const formatCategoryName = (s: string) =>
    s
      .replace(/[_-]+/g, " ")
      .split(" ")
      .filter(Boolean)
      .map((t) => (t[0] ? t[0].toUpperCase() + t.slice(1) : t))
      .join(" ");
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
                value={searchValue}
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
              <li>
                <label htmlFor="category-all" className="flex items-center gap-2">
                  <div className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-200">
                    <input
                      type="radio"
                      id="category-all"
                      hidden
                      className="peer"
                      name="category"
                      checked={currentCategoryId === "all"}
                      onChange={() => handleCategory("all")}
                    />
                    <div className="h-2 w-2 rounded-full peer-checked:bg-primary" />
                  </div>
                  {en.all}
                </label>
              </li>
              {categories.map((category: any) => {
                const id = String(category.category_id || category.id);
                const name = String(category.name || "");
                const displayName = formatCategoryName(name);
                return (
                  <li key={id}>
                    <label htmlFor={`category-${id}`} className="flex items-center gap-2">
                      <div className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-200">
                        <input
                          type="radio"
                          id={`category-${id}`}
                          hidden
                          className="peer"
                          name="category"
                          checked={currentCategoryId === id}
                          onChange={() => handleCategory(id)}
                        />
                        <div className="h-2 w-2 rounded-full peer-checked:bg-primary" />
                      </div>

                      {displayName}
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <Image src={aloeIcon} width={24} height={24} alt="brand logo" />
              <h4 className="text-xl font-bold">{en.filterByPrice}</h4>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-medium">
                {formatCurrency({
                  amount: minPrice || 0,
                  currency: "NGN",
                })}
              </p>
              <p className="font-medium">
                {formatCurrency({
                  amount: currentPriceMax || maxPrice || 0,
                  currency: "NGN",
                })}
              </p>
            </div>
            <Slider
              min={minPrice || 0}
              max={maxPrice || 0}
              step={100}
              value={[currentPriceMax || maxPrice || 0]}
              onValueChange={(v) => handleSlide(v[0])}
            />
          </div>
        </>
      )}
    </div>
  );
}
