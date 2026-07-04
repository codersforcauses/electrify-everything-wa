import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const go = (page: number) => {
    const clamped = Math.min(Math.max(page, 1), totalPages);
    if (clamped !== currentPage) onPageChange(clamped);
  };

  const pages: (number | "...")[] = [];
  const windowSize = 1;
  for (let p = 1; p <= totalPages; p++) {
    if (
      p === 1 ||
      p === totalPages ||
      (p >= currentPage - windowSize && p <= currentPage + windowSize)
    ) {
      pages.push(p);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  const btnBase =
    "flex h-8 min-w-8 items-center justify-center rounded-md border text-sm font-medium transition-colors";

  return (
    <nav
      className="flex items-center justify-center gap-1.5"
      aria-label="Pagination"
    ></nav>
  );
}
