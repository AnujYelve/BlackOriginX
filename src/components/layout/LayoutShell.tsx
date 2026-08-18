"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { ChatBot } from "@/components/ui/ChatBot";

interface LayoutShellProps {
  children: React.ReactNode;
}

/**
 * Conditionally renders Navbar, Footer, LoadingScreen, and ChatBot
 * based on the current route. Admin routes get their own layout
 * without the public site chrome.
 */
export function LayoutShell({ children }: LayoutShellProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <LoadingScreen />
      <Navbar />
      <main className="flex-1 flex flex-col pt-20">{children}</main>
      <Footer />
      <ChatBot />
    </>
  );
}
