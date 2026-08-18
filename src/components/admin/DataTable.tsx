"use client";

import { cn } from "@/lib/utils";
import { Inbox } from "lucide-react";

export interface Column<T> {
  key: string;
  header: string;
  render: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  selectedIds?: string[];
  onSelectChange?: (ids: string[]) => void;
  onRowClick?: (item: T) => void;
  emptyMessage?: string;
  emptyIcon?: React.ReactNode;
  className?: string;
  loading?: boolean;
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  selectedIds,
  onSelectChange,
  onRowClick,
  emptyMessage = "No data found",
  emptyIcon,
  className,
  loading,
}: DataTableProps<T>) {
  const selectable = !!onSelectChange;
  const allSelected = data.length > 0 && selectedIds?.length === data.length;

  const toggleAll = () => {
    if (!onSelectChange) return;
    if (allSelected) {
      onSelectChange([]);
    } else {
      onSelectChange(data.map(keyExtractor));
    }
  };

  const toggleOne = (id: string) => {
    if (!onSelectChange || !selectedIds) return;
    if (selectedIds.includes(id)) {
      onSelectChange(selectedIds.filter((i) => i !== id));
    } else {
      onSelectChange([...selectedIds, id]);
    }
  };

  if (loading) {
    return (
      <div className="bg-white border border-black/5 rounded-2xl overflow-hidden">
        <div className="flex flex-col items-center justify-center py-20 text-black/30">
          <div className="w-8 h-8 border-2 border-[#b87333]/20 border-t-[#b87333] rounded-full animate-spin mb-4" />
          <p className="text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-white border border-black/5 rounded-2xl overflow-hidden">
        <div className="flex flex-col items-center justify-center py-20 text-black/30">
          {emptyIcon || <Inbox size={40} className="mb-3 text-black/15" />}
          <p className="text-sm">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("bg-white border border-black/5 rounded-2xl overflow-hidden", className)}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-black/5">
              {selectable && (
                <th className="w-12 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleAll}
                    className="w-4 h-4 rounded border-black/15 text-[#b87333] focus:ring-[#b87333]/20 cursor-pointer"
                  />
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    "px-4 py-3 text-left text-[11px] font-semibold tracking-wider text-black/40 uppercase",
                    col.className
                  )}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-black/[0.03]">
            {data.map((item) => {
              const id = keyExtractor(item);
              const isSelected = selectedIds?.includes(id);
              return (
                <tr
                  key={id}
                  onClick={() => onRowClick?.(item)}
                  className={cn(
                    "transition-colors",
                    onRowClick && "cursor-pointer",
                    isSelected
                      ? "bg-[#b87333]/[0.03]"
                      : "hover:bg-black/[0.01]"
                  )}
                >
                  {selectable && (
                    <td className="w-12 px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleOne(id)}
                        className="w-4 h-4 rounded border-black/15 text-[#b87333] focus:ring-[#b87333]/20 cursor-pointer"
                      />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={cn(
                        "px-4 py-3 text-sm text-black/70",
                        col.className
                      )}
                    >
                      {col.render(item)}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
