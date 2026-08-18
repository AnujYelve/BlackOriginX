"use client";

import { cn } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  error?: string;
  helpText?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function FormField({
  label,
  htmlFor,
  error,
  helpText,
  required,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={htmlFor}
        className="text-xs font-semibold tracking-wider text-black/50 uppercase flex items-center gap-1"
      >
        {label}
        {required && <span className="text-red-400">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-xs text-red-500 font-medium">{error}</p>
      )}
      {helpText && !error && (
        <p className="text-[11px] text-black/30">{helpText}</p>
      )}
    </div>
  );
}

// Reusable input style
export const adminInputClassName =
  "w-full bg-white border border-black/8 rounded-xl px-4 py-3 text-sm text-black/80 placeholder:text-black/25 focus:outline-none focus:border-[#b87333]/30 focus:ring-1 focus:ring-[#b87333]/15 transition-all";

// Reusable textarea style
export const adminTextareaClassName =
  "w-full bg-white border border-black/8 rounded-xl px-4 py-3 text-sm text-black/80 placeholder:text-black/25 focus:outline-none focus:border-[#b87333]/30 focus:ring-1 focus:ring-[#b87333]/15 transition-all resize-none";

// Reusable select style
export const adminSelectClassName =
  "w-full bg-white border border-black/8 rounded-xl px-4 py-3 text-sm text-black/80 focus:outline-none focus:border-[#b87333]/30 focus:ring-1 focus:ring-[#b87333]/15 transition-all appearance-none cursor-pointer";
