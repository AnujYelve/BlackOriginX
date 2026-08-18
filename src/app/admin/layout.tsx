"use client";

import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/admin/Sidebar";
import { Topbar } from "@/components/admin/Topbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  // Login page gets a clean layout (no sidebar/topbar)
  if (isLoginPage) {
    return (
      <SessionProvider>
        <div className="admin-login-wrapper min-h-screen flex items-center justify-center bg-[#0a0a0a]">
          {children}
        </div>
      </SessionProvider>
    );
  }

  return (
    <SessionProvider>
      <div className="admin-layout flex min-h-screen bg-[#f8f8f8]">
        <Sidebar />
        <div className="admin-main flex-1 flex flex-col min-h-screen overflow-hidden">
          <Topbar />
          <main className="admin-content flex-1 overflow-y-auto p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </SessionProvider>
  );
}
