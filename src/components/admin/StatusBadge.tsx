"use client";

import { cn } from "@/lib/utils";

type StatusVariant =
  | "published"
  | "draft"
  | "read"
  | "unread"
  | "pending"
  | "scheduled"
  | "completed"
  | "rejected"
  | "active"
  | "archived"
  | "deleted"
  | "contacted";

const variantStyles: Record<StatusVariant, string> = {
  published: "bg-green-50 text-green-700 border-green-200",
  draft: "bg-yellow-50 text-yellow-700 border-yellow-200",
  read: "bg-blue-50 text-blue-600 border-blue-200",
  unread: "bg-orange-50 text-orange-600 border-orange-200",
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  scheduled: "bg-indigo-50 text-indigo-600 border-indigo-200",
  completed: "bg-green-50 text-green-700 border-green-200",
  rejected: "bg-red-50 text-red-600 border-red-200",
  active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  archived: "bg-gray-100 text-gray-500 border-gray-200",
  deleted: "bg-red-50 text-red-500 border-red-200",
  contacted: "bg-sky-50 text-sky-600 border-sky-200",
};

interface StatusBadgeProps {
  variant: StatusVariant;
  label?: string;
  className?: string;
}

export function StatusBadge({ variant, label, className }: StatusBadgeProps) {
  const displayLabel = label || variant.charAt(0).toUpperCase() + variant.slice(1);
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-lg text-[11px] font-semibold border tracking-wide",
        variantStyles[variant],
        className
      )}
    >
      {displayLabel}
    </span>
  );
}
