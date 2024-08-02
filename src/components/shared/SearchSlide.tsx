import { cn } from "@/lib/utils";
import SearchForm from "../ui/SearchForm";

interface SearchSlideProps extends React.HTMLAttributes<HTMLDivElement> {
  showSearch: boolean;
  searchKwd: string;
  setSearchKwd: React.Dispatch<React.SetStateAction<string>>;
  searchRef: React.MutableRefObject<null>;
}

export default function SearchSlide({
  showSearch,
  searchKwd,
  setSearchKwd,
  className,
  searchRef,
}: SearchSlideProps) {
  return (
    <div
      ref={searchRef}
      className={cn(
        "search_slide absolute left-0 top-[100%] -z-10 h-screen w-full translate-y-[-220%] bg-white transition-transform ease-in-out lg:top-[48px] lg:h-auto lg:w-auto lg:min-w-[380px]",
        {
          "translate-y-0": showSearch,
          "lg:translate-y-0": searchKwd.length > 0,
        },
        className,
      )}
    >
      <div className="p-4 lg:p-6">
        <SearchForm setSearchKwd={setSearchKwd} className="lg:hidden" />
        <p>search</p>
        <p>search</p>
        <p>search</p>
        kO
        <p>search</p>
      </div>
    </div>
  );
}
