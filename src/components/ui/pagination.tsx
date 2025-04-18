import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react";
import { useEffect, useRef } from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number | undefined;
  updatePage: (action: "next" | "prev" | number) => void;
  className?: string;
  scrollToTopOnPaginate?: boolean;
};

const Pagination = ({
  currentPage,
  totalPages,
  updatePage,
  className,
  scrollToTopOnPaginate = true,
}: PaginationProps) => {
  const prevPageRef = useRef(currentPage);

  useEffect(() => {
    if (scrollToTopOnPaginate && prevPageRef.current !== currentPage) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    prevPageRef.current = currentPage;
  }, [currentPage, scrollToTopOnPaginate]);

  if (totalPages === undefined) {
    return (
      <div className="flex justify-center">
        <div className="flex items-center gap-1">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-9" />
          <Skeleton className="h-9 w-9" />
          <Skeleton className="h-9 w-9" />
          <Skeleton className="h-9 w-24" />
        </div>
      </div>
    );
  }

  const generatePagination = () => {
    const pages: (number | "ellipsis")[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("ellipsis");
      }

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("ellipsis");
      }

      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pages = generatePagination();

  const handlePageUpdate = (pageAction: "next" | "prev" | number) => {
    updatePage(pageAction);
  };

  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
    >
      <ul className="flex flex-row items-center gap-1">
        <li>
          <button
            onClick={() => handlePageUpdate("prev")}
            disabled={currentPage === 1}
            aria-label="Go to previous page"
            className={cn(
              buttonVariants({
                variant: "ghost",
                size: "default",
              }),
              "gap-1 px-2.5 sm:pl-2.5",
              currentPage === 1 && "pointer-events-none opacity-50"
            )}
          >
            <ChevronLeftIcon />
            <span className="hidden sm:block">Previous</span>
          </button>
        </li>

        {pages.map((page, i) => (
          <li key={`${page}-${i}`} data-slot="pagination-item">
            {page === "ellipsis" ? (
              <span
                aria-hidden
                data-slot="pagination-ellipsis"
                className="flex size-9 items-center justify-center"
              >
                <MoreHorizontalIcon className="size-4" />
                <span className="sr-only">More pages</span>
              </span>
            ) : (
              <button
                onClick={() => handlePageUpdate(page)}
                aria-current={currentPage === page ? "page" : undefined}
                data-active={currentPage === page}
                className={cn(
                  buttonVariants({
                    variant: currentPage === page ? "outline" : "ghost",
                    size: "icon",
                  })
                )}
              >
                {page}
              </button>
            )}
          </li>
        ))}

        <li>
          <button
            onClick={() => handlePageUpdate("next")}
            disabled={currentPage === totalPages}
            aria-label="Go to next page"
            className={cn(
              buttonVariants({
                variant: "ghost",
                size: "default",
              }),
              "gap-1 px-2.5 sm:pr-2.5",
              currentPage === totalPages && "pointer-events-none opacity-50"
            )}
          >
            <span className="hidden sm:block">Next</span>
            <ChevronRightIcon />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export { Pagination };
