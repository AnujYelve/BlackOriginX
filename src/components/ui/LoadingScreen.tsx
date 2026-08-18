"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function LoadingScreen() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleComplete = useCallback(() => {
    setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem("box-preloaded", "true");
      document.body.style.overflow = "";
    }, 400);
  }, []);

  useEffect(() => {
    setMounted(true);

    const alreadyLoaded = sessionStorage.getItem("box-preloaded");
    if (alreadyLoaded) return;

    setIsVisible(true);
    document.body.style.overflow = "hidden";

    // Show loader for 2.4 seconds then exit
    const timer = setTimeout(() => {
      handleComplete();
    }, 2400);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [handleComplete]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            clipPath: "inset(0 0 100% 0)",
            transition: {
              duration: 0.9,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
          className="loading-screen"
        >
          {/* Ambient background glow */}
          <div className="loading-ambient" />
          <div className="loading-ambient-secondary" />

          <div className="loading-content">
            {/* Spinning circle loader */}
            <div className="loading-ring-container">
              {/* Outer rotating ring */}
              <div className="loading-orbit-ring" />

              {/* Inner rotating circle (opposite direction) */}
              <div className="loading-spinner" />

              {/* Pulsing center dot */}
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="loading-center-dot"
              />
            </div>

            {/* Logo below the loader */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              className="loading-logo"
            >
              <Image
                src="/logo.jpg.jpeg"
                alt="BlackOriginX"
                width={220}
                height={50}
                className="loading-logo-img"
                priority
              />
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="loading-tagline"
            >
              Redefining the Future of Mobility
            </motion.p>

            {/* Bottom shimmer line */}
            <div className="loading-shimmer-track">
              <div className="loading-shimmer" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

