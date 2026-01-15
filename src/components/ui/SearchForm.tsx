import en from "@/language/en";
import { Input } from "./input";
import { SearchIcon } from "@/assets/icons";
import { cn } from "@/lib/utils";

interface SearchFormProps {
  className?: string;
  handleChange: (v: string) => void;
  searchKwd: string;
  onSubmit?: (v: string) => void;
}

export default function SearchForm({
  className,
  searchKwd,
  handleChange,
  onSubmit,
}: SearchFormProps) {
  return (
    <form
      action="#"
      data-type="searchForm"
      className={cn("relative flex items-center", className)}
      onSubmit={(e) => {
        e.preventDefault();
        const value = searchKwd.trim();
        if (!value) return;
        onSubmit?.(value);
      }}
    >
      <Input
        placeholder={`${en.search}...`}
        type="search"
        className="w-full rounded-full"
        onChange={(e) => handleChange(e.target.value)}
        value={searchKwd}
        data-search="true"
      />
      <button
        className="header_user-search_btn absolute bottom-0 right-0 top-0 flex w-10 items-center justify-center rounded-full bg-secondary"
        type="submit"
        data-search="true"
      >
        <SearchIcon className="text-sm" />
      </button>
    </form>
  );
}
