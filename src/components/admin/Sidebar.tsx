"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Mail,
  Users,
  FileText,
  ImageIcon,
  Settings,
  Shield,
  UserCircle,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { signOut } from "next-auth/react";

const sidebarLinks = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Messages", href: "/admin/messages", icon: Mail },
  { label: "Meetings", href: "/admin/meetings", icon: Users },
  { label: "Blogs", href: "/admin/blogs", icon: FileText },
  // { label: "Media", href: "/admin/media", icon: ImageIcon },
  { label: "Audit Log", href: "/admin/audit", icon: Shield },
  { label: "Profile", href: "/admin/profile", icon: UserCircle },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={`admin-sidebar hidden lg:flex flex-col border-r border-black/8 bg-white transition-all duration-300 ${
        collapsed ? "w-[72px]" : "w-[260px]"
      }`}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-black/5">
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Link href="/admin" className="flex items-center gap-2">
                <Image
                  src="/logo.jpg.jpeg"
                  alt="BlackOriginX"
                  width={120}
                  height={28}
                  className="object-contain"
                  style={{ width: "auto", height: "24px" }}
                />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-8 h-8 rounded-lg bg-black/[0.03] border border-black/5 flex items-center justify-center text-black/40 hover:text-black/70 hover:bg-black/[0.05] transition-all"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {sidebarLinks.map((link) => {
          const active = isActive(link.href);
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              title={collapsed ? link.label : undefined}
              className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                active
                  ? "bg-gradient-to-r from-[#b87333]/10 to-[#e5a93c]/5 text-[#b87333] border border-[#b87333]/15"
                  : "text-black/50 hover:text-black/80 hover:bg-black/[0.03]"
              }`}
            >
              <Icon
                size={18}
                className={`flex-shrink-0 transition-colors ${
                  active ? "text-[#b87333]" : "text-black/35 group-hover:text-black/60"
                }`}
              />
              <AnimatePresence mode="wait">
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="whitespace-nowrap overflow-hidden"
                  >
                    {link.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="px-3 py-4 border-t border-black/5">
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          title={collapsed ? "Logout" : undefined}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500/70 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
        >
          <LogOut size={18} className="flex-shrink-0" />
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="whitespace-nowrap"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </aside>
  );
}
