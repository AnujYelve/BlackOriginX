"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { Container } from "../ui/Container";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Brands", href: "/brands" },
  { name: "Blog", href: "/blog" },
  { name: "Investors", href: "/investors" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const pathname = usePathname();

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);



  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`nav-header flex items-center ${isScrolled ? "nav-scrolled" : ""}`}
      >
        <Container className="w-full">
          <nav className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 z-50 transition-transform active:scale-95 duration-200"
              onMouseEnter={() => setHoveredLink(null)}
            >
              <Image
                src="/logo.jpg.jpeg"
                alt="BlackOriginX Logo"
                width={180}
                height={40}
                className="object-contain"
                style={{ width: "auto", height: "36px" }}
                priority
              />
            </Link>

            {/* Desktop Navigation Links */}
            <div
              className="hidden md:flex items-center gap-1 bg-white/[0.02] border border-white/5 px-2 py-1.5 rounded-full backdrop-blur-md"
              onMouseLeave={() => setHoveredLink(null)}
            >
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onMouseEnter={() => setHoveredLink(link.name)}
                    className="nav-link relative px-5 py-2 text-sm font-medium tracking-wide transition-colors duration-200 rounded-full text-brand-light-grey hover:text-brand-white"
                  >
                    {/* Animated Sliding Hover Background Pill */}
                    {hoveredLink === link.name && (
                      <motion.span
                        layoutId="nav-hover-pill"
                        className="absolute inset-0 bg-white/5 dark:bg-white/5 border border-white/10 rounded-full z-0"
                        transition={{ type: "spring", stiffness: 350, damping: 28 }}
                      />
                    )}

                    <span className={`relative z-10 ${isActive ? "text-brand-white font-semibold" : ""}`}>
                      {link.name}
                    </span>

                    {/* Active Underline Indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="nav-active-indicator"
                        className="absolute bottom-1 left-4 right-4 h-[2px] bg-gradient-to-r from-[#b87333] to-[#e5a93c] rounded-full z-10"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Controls: Theme & Mobile Toggle */}
            {/* Mobile Hamburger toggle */}
            <button
              className="nav-mobile-toggle flex md:!hidden z-50"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </nav>
        </Container>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="nav-mobile-overlay"
          >
            <div className="nav-mobile-bg-glow" />

            <div className="flex flex-col items-center justify-between h-[65vh] w-full max-w-md px-6 z-10">
              <div className="w-full flex flex-col gap-6 text-center mt-12">
                {navLinks.map((link, i) => {
                  const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: 20, filter: "blur(5px)" }}
                      transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`nav-mobile-link text-4xl font-bold tracking-tight py-2 ${isActive ? "text-brand-white" : "text-brand-light-grey/60"}`}
                      >
                        {isActive && <span className="nav-mobile-dot" />}
                        {link.name}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Mobile CTA or Social Links at the bottom */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.35, duration: 0.6 }}
                className="w-full flex flex-col items-center gap-6"
              >
                <div className="h-px w-full bg-white/10" />
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#b87333] to-[#e5a93c] text-white text-sm font-semibold tracking-wider uppercase transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-[#b87333]/20"
                >
                  Partner With Us <ArrowRight size={16} />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
