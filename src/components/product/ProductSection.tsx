"use client";

import Paginate from "@/components/ui/Paginate";
import ProductCard from "./ProductCard";
import ProductsFilter from "./ProductsFilter";
import { products } from "@/assets/data/products";
import { useState } from "react";
import { convertToGram, normalizePrice } from "@/lib/utils";
import en from "@/language/en";
import { useSearchParams } from "next/navigation";

export default function ProductSection() {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [currentWeight, setCurrentWeight] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page")
    ? parseInt(searchParams.get("page") as string)
    : 1;

  const from = (currentPage - 1) * 9;
  const to = from + 10;
  const total = Math.ceil(products.length / 9);

  function handleSearch(kwd: string) {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(kwd.toLowerCase()),
    );
    setFilteredProducts(filtered);
  }

  function handleSlide(v: number) {
    const filtered = products.filter(
      (product) =>
        normalizePrice({
          min: 1000,
          max: 50000,
          value: product.prices[0].amount,
        }) *
          100 <=
        v,
    );
    setFilteredProducts(filtered);
  }

  function handleCategory(v: string) {
    const filters: Record<string, boolean> = {
      all: true,
    };
    const filtered = products.filter(
      (product) => filters[v.toLowerCase()] || product.category === v,
    );
    setFilteredProducts(filtered);
  }

  function handleWeight(v: string) {
    const filters: Record<string, boolean> = {
      all: true,
    };

    const filtered = products.filter(
      (product) =>
        filters[v.toLowerCase()] ||
        convertToGram(product.weight) === convertToGram(v),
    );
    setFilteredProducts(filtered);
    setCurrentWeight(v);
  }

  return (
    <div className="flex w-full flex-col-reverse justify-between gap-10 lg:flex-row">
      <div className="flex w-full flex-col gap-6 lg:w-[78%]">
        {filteredProducts.length === 0 ? (
          <div className="flex items-center justify-center">
            <p className="max-w-[500px] text-center">{en.noResults}</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.slice(from, to).map((product, index) => (
              <div key={index} className="flex flex-col gap-4">
                <ProductCard
                  name={product.name}
                  image={product.images[0]}
                  prices={product.prices}
                  rating={product.rating}
                  slug={product.slug}
                />
              </div>
            ))}
          </div>
        )}
        <Paginate currentPage={currentPage} lastPage={total} />
      </div>
      <ProductsFilter
        handleSlide={handleSlide}
        handleSearch={handleSearch}
        handleWeight={handleWeight}
        handleCategory={handleCategory}
        currentWeight={currentWeight}
      />
    </div>
  );
}
