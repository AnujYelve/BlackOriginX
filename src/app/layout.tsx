import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { LayoutShell } from "@/components/layout/LayoutShell";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | BlackOriginX",
    default: "BlackOriginX | Redefining the Future of Mobility",
  },
  description: "BlackOriginX is a holding company building and scaling technology-driven brands that redefine the future of mobility.",
  keywords: ["technology", "mobility", "future", "investment"],
};

import { ThemeHandler } from "@/components/ThemeHandler";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${inter.variable} h-full antialiased overflow-x-hidden`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-brand-black text-brand-white overflow-x-hidden light-theme" suppressHydrationWarning>
        <ThemeHandler />
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}

