import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginateProps {
  currentPage: number;
  lastPage: number;
}

const generatePaginationLinks = (currentPage: number, lastPage: number) => {
  const delta = 2; // Number of pages to show around the current page
  const range = [];
  const rangeWithEllipsis = [];
  let l;

  range.push(1);
  for (let i = currentPage - delta; i <= currentPage + delta; i++) {
    if (i >= 2 && i < lastPage) {
      range.push(i);
    }
  }
  range.push(lastPage);

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithEllipsis.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithEllipsis.push("ellipsis");
      }
    }
    rangeWithEllipsis.push(i);
    l = i;
  }

  return rangeWithEllipsis;
};

export default function Paginate({ currentPage, lastPage }: PaginateProps) {
  const links = generatePaginationLinks(currentPage, lastPage);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={currentPage > 1 ? `?page=${currentPage - 1}` : "#"}
          />
        </PaginationItem>
        {links.map((link, index) =>
          link === "ellipsis" ? (
            <PaginationItem key={index}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            +link > 1 && (
              <PaginationItem key={index}>
                <PaginationLink
                  href={`?page=${link}`}
                  isActive={link === currentPage}
                >
                  {link}
                </PaginationLink>
              </PaginationItem>
            )
          ),
        )}
        <PaginationItem>
          <PaginationNext
            href={currentPage < lastPage ? `?page=${currentPage + 1}` : "#"}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
