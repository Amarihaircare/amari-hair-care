import { cn } from "@/lib/utils";
import SearchForm from "../ui/SearchForm";
import { products } from "@/assets/data/products";
import Link from "next/link";
import { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";

interface SearchSlideProps extends React.HTMLAttributes<HTMLDivElement> {
  showSearch: boolean;
  searchKwd: string;
  setSearchKwd: React.Dispatch<React.SetStateAction<string>>;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
  handleSearch: (v: string) => void;
  size?: string;
}

export default function SearchSlide({
  showSearch,
  searchKwd,
  setSearchKwd,
  className,
  setShowSearch,
  handleSearch,
}: SearchSlideProps) {
  const searchRef = useRef(null);
  const searchResult = products.filter(
    (product) =>
      product.name?.toLowerCase().includes(searchKwd.toLowerCase()) &&
      searchKwd.length > 0,
  );
  useOnClickOutside(searchRef, (e) => {
    // @ts-expect-error ignore datasat
    const canClose = e.currentTarget?.dataset?.search;
    if (!canClose) return;
    setShowSearch(false);
  });

  return (
    <div
      ref={searchRef}
      data-search={true}
      className={cn(
        "search_slide absolute left-0 top-[100%] -z-10 flex h-screen w-full translate-y-[-220%] flex-col gap-4 bg-white p-4 transition-transform ease-in-out lg:top-[48px] lg:h-auto lg:w-auto lg:min-w-[380px] lg:rounded lg:px-0",
        {
          "translate-y-0": showSearch,
          "lg:translate-y-[-220%]": !searchKwd,
        },
        className,
      )}
    >
      <SearchForm
        searchKwd={searchKwd}
        className="lg:hidden"
        handleChange={handleSearch}
      />

      <div className="search-results flex w-full flex-col gap-4 lg:gap-0">
        {searchResult.map((result) => (
          <Link
            data-search="true"
            key={result.slug}
            href={`/product/${result.slug}`}
            className="flex items-center justify-between font-medium hover:bg-secondary lg:p-4"
            onClick={() => {
              setShowSearch(false);
              setSearchKwd("");
            }}
          >
            {result.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
