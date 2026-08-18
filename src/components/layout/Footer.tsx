"use client";

import Link from "next/link";
import Image from "next/image";
import { Container } from "../ui/Container";
import { Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-brand-black border-t border-black/8 pt-24 pb-12 relative overflow-hidden themed-card">
      {/* Accent glow at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e5a93c]/35 to-transparent" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[250px] bg-radial from-[#b87333]/5 to-transparent rounded-full blur-[80px] pointer-events-none" />

      <Container>
        {/* Top Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-10 lg:gap-16 mb-20 px-4 sm:px-0">

          {/* Brand Info Column */}
          <div className="col-span-2 lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block mb-6 transition-transform duration-200 active:scale-95">
              <Image
                src="/logo.jpg.jpeg"
                alt="BlackOriginX Logo"
                width={180}
                height={40}
                className="object-contain opacity-90 hover:opacity-100 transition-opacity"
                style={{ width: "auto", height: "34px" }}
              />
            </Link>
            <p className="text-brand-light-grey text-base md:text-lg max-w-sm font-light leading-relaxed">
              BlackOriginX Private Limited builds innovative technology platforms that redefine urban mobility, clean energy, and connected IoT ecosystems for generation-scale value.
            </p>

            {/* Social Icons matching About Us LinkedIn styling & real branding */}
            <div className="flex gap-4 pt-2">
              {[
                {
                  icon: (
                    <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.6a1.4 1.4 0 1 0 1.4 1.4 1.4 1.4 0 0 0-1.4-1.4z" />
                    </svg>
                  ),
                  href: "https://www.linkedin.com/showcase/blackoriginx/",
                  label: "LinkedIn",
                  brandStyle: "bg-[#0A66C2] shadow-md shadow-[#0A66C2]/25 hover:shadow-[#0A66C2]/45"
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  ),
                  href: "https://x.com/blackoriginx_",
                  label: "X",
                  brandStyle: "bg-black shadow-md shadow-black/25 hover:shadow-black/45"
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  ),
                  href: "https://www.instagram.com/blackoriginx",
                  label: "Instagram",
                  brandStyle: "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] shadow-md shadow-pink-500/25 hover:shadow-pink-500/45"
                }
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${item.brandStyle} transition-all duration-200 hover:scale-110 active:scale-95`}
                  aria-label={item.label}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Brands */}
          <div className="col-span-1 lg:col-span-2 space-y-6">
            <h4 className="font-bold text-brand-white text-base uppercase tracking-[0.2em] pt-1">Brands</h4>
            <ul className="space-y-4 text-base sm:text-lg font-light text-brand-light-grey/65">
              <li>
                <Link href="/brands" className="hover:text-[#e5a93c] transition-colors flex items-center gap-1 group">
                  Overview
                </Link>
              </li>
              <li>
                <Link href="/brands/torkk" className="hover:text-[#e5a93c] transition-colors flex items-center gap-1 group">
                  Torkk Platform
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="col-span-1 lg:col-span-2 space-y-6">
            <h4 className="font-bold text-brand-white text-base uppercase tracking-[0.2em] pt-1">Company</h4>
            <ul className="space-y-4 text-base sm:text-lg font-light text-brand-light-grey/65">
              <li>
                <Link href="/about" className="hover:text-[#e5a93c] transition-colors flex items-center gap-1 group">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/about#leadership" className="hover:text-[#e5a93c] transition-colors flex items-center gap-1 group">
                  Leadership
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#e5a93c] transition-colors flex items-center gap-1 group">
                  Blog & Insights
                </Link>
              </li>
              <li>
                <Link href="/investors" className="hover:text-[#e5a93c] transition-colors flex items-center gap-1 group">
                  Investors
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#e5a93c] transition-colors flex items-center gap-1 group">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Apps */}
          <div className="col-span-2 lg:col-span-4 space-y-6">
            <h4 className="font-bold text-brand-white text-base uppercase tracking-[0.2em] pt-1">Office & Apps</h4>
            <ul className="space-y-4 text-base sm:text-lg font-light text-brand-light-grey/65">
              <li className="flex items-start gap-2.5">
                <MapPin size={18} className="text-[#e5a93c] flex-shrink-0 mt-1" />
                <span>Gurugram, Haryana, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={18} className="text-[#e5a93c] flex-shrink-0" />
                <a href="mailto:contact@blackoriginx.com" className="hover:text-[#e5a93c] transition-colors">contact@blackoriginx.com</a>
              </li>
            </ul>


          </div>

        </div>

        {/* Bottom Section */}
        <div className="border-t border-black/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-base font-medium">
          <p className="footer-bottom-text">© {new Date().getFullYear()} BlackOriginX Private Limited. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="footer-bottom-link transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="footer-bottom-link transition-colors">Terms of Service</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
