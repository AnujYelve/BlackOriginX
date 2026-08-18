"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    direction: "up" | "down" | "neutral";
  };
  subtitle?: string;
  className?: string;
}

export function StatsCard({ label, value, icon: Icon, trend, subtitle, className }: StatsCardProps) {
  return (
    <div
      className={cn(
        "bg-white border border-black/5 rounded-2xl p-5 hover:border-black/10 hover:shadow-sm transition-all duration-300 group",
        className
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#b87333]/10 to-[#e5a93c]/5 border border-[#b87333]/10 flex items-center justify-center group-hover:scale-105 transition-transform">
          <Icon size={18} className="text-[#b87333]" />
        </div>
        {trend && (
          <span
            className={cn("text-xs font-semibold px-2 py-1 rounded-lg", {
              "text-green-600 bg-green-50": trend.direction === "up",
              "text-red-500 bg-red-50": trend.direction === "down",
              "text-black/40 bg-black/[0.03]": trend.direction === "neutral",
            })}
          >
            {trend.value}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-black/85 tracking-tight">{value}</p>
      <p className="text-xs text-black/40 font-medium mt-1">{label}</p>
      {subtitle && (
        <p className="text-[10px] text-black/30 mt-0.5">{subtitle}</p>
      )}
    </div>
  );
}
