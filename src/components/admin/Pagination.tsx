"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  className?: string;
}

export function Pagination({
  page,
  pageSize,
  total,
  totalPages,
  onPageChange,
  onPageSizeChange,
  className,
}: PaginationProps) {
  const startItem = (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, total);

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push("...");
      for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
        pages.push(i);
      }
      if (page < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  if (total === 0) return null;

  return (
    <div className={cn("flex flex-col sm:flex-row items-center justify-between gap-4 pt-4", className)}>
      {/* Info */}
      <p className="text-xs text-black/40">
        Showing <span className="font-semibold text-black/60">{startItem}</span> to{" "}
        <span className="font-semibold text-black/60">{endItem}</span> of{" "}
        <span className="font-semibold text-black/60">{total}</span> results
      </p>

      <div className="flex items-center gap-3">
        {/* Page size selector */}
        {onPageSizeChange && (
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="text-xs bg-white border border-black/8 rounded-lg px-2 py-1.5 text-black/60 focus:outline-none focus:border-[#b87333]/30"
          >
            {[10, 20, 50, 100].map((size) => (
              <option key={size} value={size}>
                {size} / page
              </option>
            ))}
          </select>
        )}

        {/* Page buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            className="w-8 h-8 rounded-lg border border-black/8 flex items-center justify-center text-black/40 hover:text-black/70 hover:border-black/15 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft size={14} />
          </button>

          {getPageNumbers().map((p, idx) =>
            p === "..." ? (
              <span key={`dots-${idx}`} className="w-8 h-8 flex items-center justify-center text-black/30 text-xs">
                ...
              </span>
            ) : (
              <button
                key={p}
                onClick={() => onPageChange(p as number)}
                className={cn(
                  "w-8 h-8 rounded-lg text-xs font-medium transition-all",
                  page === p
                    ? "bg-gradient-to-r from-[#b87333] to-[#e5a93c] text-white shadow-sm"
                    : "border border-black/8 text-black/50 hover:text-black/70 hover:border-black/15"
                )}
              >
                {p}
              </button>
            )
          )}

          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
            className="w-8 h-8 rounded-lg border border-black/8 flex items-center justify-center text-black/40 hover:text-black/70 hover:border-black/15 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
