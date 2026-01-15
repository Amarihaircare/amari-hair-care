import { cn } from "@/lib/utils";
import SearchForm from "../ui/SearchForm";
import { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import en from "@/language/en";

interface SearchSlideProps extends React.HTMLAttributes<HTMLDivElement> {
  showSearch: boolean;
  searchKwd: string;
  setSearchKwd: React.Dispatch<React.SetStateAction<string>>;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
  handleSearch: (v: string) => void;
  onSubmitSearch: (v: string) => void;
  size?: string;
}

export default function SearchSlide({
  showSearch,
  searchKwd,
  setSearchKwd,
  className,
  setShowSearch,
  handleSearch,
  onSubmitSearch,
}: SearchSlideProps) {
  const searchRef = useRef(null);
  useOnClickOutside(searchRef, (e) => {
    // @ts-expect-error ignore datasat
    const shouldClose = e.target?.dataset?.search !== "true";

    if (!shouldClose) return;
    setShowSearch(false);
  });

  return (
    <div
      ref={searchRef}
      data-search={true}
      className={cn(
        "search_slide absolute left-0 top-[100%] z-50 flex h-screen w-full translate-y-[-220%] flex-col gap-4 bg-white p-4 transition-transform ease-in-out lg:top-[48px] lg:h-auto lg:w-[380px] lg:max-w-[90vw] lg:left-auto lg:right-0 lg:rounded lg:px-0",
        {
          "translate-y-0": showSearch,
        },
        className,
      )}
    >
      <SearchForm
        searchKwd={searchKwd}
        handleChange={handleSearch}
        onSubmit={(value) => {
          onSubmitSearch(value);
          setSearchKwd("");
        }}
      />

      <div className="search-results flex w-full flex-col items-center gap-4 lg:gap-0">
        {searchKwd.length === 0 ? (
          <p className="max-w-[300px] px-4 text-center text-sm text-gray-500">
            {en.searchPlaceholder}
          </p>
        ) : (
          <p className="max-w-[300px] px-4 text-center text-sm text-gray-500">
            {en.search}
          </p>
        )}
      </div>
    </div>
  );
}
