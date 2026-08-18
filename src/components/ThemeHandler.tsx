"use client";

import { useEffect } from "react";

export function ThemeHandler() {
  useEffect(() => {
    // Silence browser extension hydration warnings (e.g. bis_skin_checked) in dev console & terminal
    if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
      const originalError = console.error;
      const originalWarn = console.warn;

      console.error = (...args: any[]) => {
        const msg = args.map(a => (typeof a === "object" ? JSON.stringify(a) : String(a))).join(" ");
        if (
          msg.includes("bis_skin_checked") ||
          msg.includes("Extra attributes from the server") ||
          msg.includes("did not match") ||
          msg.includes("Hydration failed")
        ) {
          return;
        }
        originalError(...args);
      };

      console.warn = (...args: any[]) => {
        const msg = args.map(a => (typeof a === "object" ? JSON.stringify(a) : String(a))).join(" ");
        if (
          msg.includes("bis_skin_checked") ||
          msg.includes("Extra attributes from the server") ||
          msg.includes("did not match") ||
          msg.includes("Hydration failed")
        ) {
          return;
        }
        originalWarn(...args);
      };
    }

    // Unconditionally force the website to display in white theme regardless of any computer/OS theme settings
    document.body.classList.add("light-theme");
    document.documentElement.classList.add("light-theme");
  }, []);

  return null;
}
