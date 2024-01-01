import {
  Button,
  PaginationItemType,
  cn,
  usePagination,
} from "@nextui-org/react";
import React from "react";

export default function ProductPagination() {
  const {
    activePage,
    range,
    setPage,
    onNext,
    onPrevious,
    slots,
    showControls,
  } = usePagination({
    total: 6,
    showControls: true,
    siblings: 10,
    boundaries: 10,
    onChange: (page) => alert(page),
  });
  return (
    <div>
      <p>Active page: {activePage}</p>
      <ul className="flex gap-2 items-center">
        {range.map((page) => {
          if (page === PaginationItemType.NEXT) {
            return (
              <li key={page} aria-label="next page" className="w-4 h-4">
                <Button
                  className="w-full h-full bg-default-200 rounded-full"
                  color="secondary"
                  variant="bordered"
                  onClick={onNext}
                >
                  O
                </Button>
              </li>
            );
          }

          if (page === PaginationItemType.PREV) {
            return (
              <li key={page} aria-label="previous page" className="w-4 h-4">
                <button
                  className="w-full h-full bg-default-200 rounded-full"
                  onClick={onPrevious}
                >
                  O
                </button>
              </li>
            );
          }

          if (page === PaginationItemType.DOTS) {
            return (
              <li key={page} className="w-4 h-4">
                ...
              </li>
            );
          }

          return (
            <li key={page} aria-label={`page ${page}`} className="w-4 h-4">
              <button
                className={cn(
                  "w-full h-full bg-default-300 rounded-full",
                  activePage === page && "bg-secondary",
                )}
                onClick={() => setPage(page)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
