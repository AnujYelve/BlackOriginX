"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  value?: string;
  onSearch: (query: string) => void;
  placeholder?: string;
  debounceMs?: number;
  className?: string;
}

export function SearchBar({
  value = "",
  onSearch,
  placeholder = "Search...",
  debounceMs = 300,
  className,
}: SearchBarProps) {
  const [query, setQuery] = useState(value);

  // Sync external value
  useEffect(() => {
    setQuery(value);
  }, [value]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, debounceMs);
    return () => clearTimeout(timer);
  }, [query, debounceMs, onSearch]);

  const handleClear = useCallback(() => {
    setQuery("");
    onSearch("");
  }, [onSearch]);

  return (
    <div className={cn("relative", className)}>
      <Search
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-black/30"
      />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white border border-black/8 rounded-xl pl-10 pr-9 py-2.5 text-sm text-black/80 placeholder:text-black/30 focus:outline-none focus:border-[#b87333]/30 focus:ring-1 focus:ring-[#b87333]/15 transition-all"
      />
      {query && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-black/30 hover:text-black/60 transition-colors"
          aria-label="Clear search"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
