"use client";

import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Menu, LogOut, UserCircle, ChevronRight } from "lucide-react";
import Link from "next/link";

// Generate breadcrumb from pathname
function getBreadcrumbs(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  return segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
    return { label, href };
  });
}

export function Topbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const breadcrumbs = getBreadcrumbs(pathname);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="admin-topbar h-16 bg-white border-b border-black/5 flex items-center justify-between px-4 lg:px-8 flex-shrink-0">
      {/* Left: Mobile menu + Breadcrumb */}
      <div className="flex items-center gap-3">
        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden w-9 h-9 rounded-lg bg-black/[0.03] border border-black/5 flex items-center justify-center text-black/50 hover:text-black/70 transition-all"
          aria-label="Toggle menu"
        >
          <Menu size={16} />
        </button>

        {/* Breadcrumb */}
        <nav className="hidden sm:flex items-center gap-1 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <span key={crumb.href} className="flex items-center gap-1">
              {index > 0 && (
                <ChevronRight size={12} className="text-black/20" />
              )}
              {index === breadcrumbs.length - 1 ? (
                <span className="font-semibold text-black/80">
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="text-black/40 hover:text-black/70 transition-colors"
                >
                  {crumb.label}
                </Link>
              )}
            </span>
          ))}
        </nav>
      </div>

      {/* Right: User dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-black/[0.03] transition-all"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#b87333] to-[#e5a93c] flex items-center justify-center text-white text-xs font-bold">
            {session?.user?.name?.charAt(0)?.toUpperCase() || "A"}
          </div>
          <span className="hidden md:block text-sm font-medium text-black/70">
            {session?.user?.name || "Admin"}
          </span>
        </button>

        {/* Dropdown */}
        {dropdownOpen && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-black/8 rounded-xl shadow-lg shadow-black/5 py-2 z-50">
            <Link
              href="/admin/profile"
              onClick={() => setDropdownOpen(false)}
              className="flex items-center gap-2 px-4 py-2 text-sm text-black/60 hover:text-black/90 hover:bg-black/[0.03] transition-all"
            >
              <UserCircle size={16} />
              Profile
            </Link>
            <div className="h-px bg-black/5 my-1" />
            <button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500/70 hover:text-red-600 hover:bg-red-50 transition-all"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
