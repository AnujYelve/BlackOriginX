"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageIcon, X, Link as LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { adminInputClassName } from "./FormField";

interface MediaSelectorProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  className?: string;
}

export function MediaSelector({
  value,
  onChange,
  label = "Image URL",
  className,
}: MediaSelectorProps) {
  const [previewError, setPreviewError] = useState(false);

  const isValidUrl = value && value.startsWith("http");

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {/* URL Input */}
      <div className="relative">
        <LinkIcon
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-black/30"
        />
        <input
          type="url"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setPreviewError(false);
          }}
          placeholder={`Enter ${label.toLowerCase()}...`}
          className={cn(adminInputClassName, "pl-10")}
        />
        {value && (
          <button
            onClick={() => onChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-black/30 hover:text-black/60 transition-colors"
            aria-label="Clear URL"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Preview */}
      {isValidUrl && !previewError ? (
        <div className="relative w-full h-48 rounded-xl overflow-hidden border border-black/5 bg-black/[0.02] group">
          <Image
            src={value}
            alt="Preview"
            fill
            className="object-cover"
            onError={() => setPreviewError(true)}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all" />
        </div>
      ) : value && previewError ? (
        <div className="w-full h-32 rounded-xl border border-red-200 bg-red-50 flex flex-col items-center justify-center gap-2 text-red-400">
          <ImageIcon size={24} />
          <p className="text-xs">Unable to load image preview</p>
        </div>
      ) : null}
    </div>
  );
}
