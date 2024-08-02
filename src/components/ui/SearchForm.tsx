import en from "@/language/en";
import { Input } from "./input";
import { SearchIcon } from "@/assets/icons";
import { cn } from "@/lib/utils";

interface SearchFormProps extends React.HTMLAttributes<HTMLFormElement> {
  setSearchKwd: React.Dispatch<React.SetStateAction<string>>;
}
export default function SearchForm({
  setSearchKwd,
  className,
}: SearchFormProps) {
  return (
    <form
      action="#"
      data-type="searchForm"
      className={cn("relative flex items-center", className)}
    >
      <Input
        placeholder={`${en.search}...`}
        type="search"
        className="w-full rounded-full"
        onChange={(e) => setSearchKwd(e.target.value)}
      />
      <button
        className="header_user-search_btn absolute bottom-0 right-0 top-0 flex w-10 items-center justify-center rounded-full bg-secondary"
        type="submit"
        data-trigger="search"
      >
        <SearchIcon className="text-sm" />
      </button>
    </form>
  );
}
