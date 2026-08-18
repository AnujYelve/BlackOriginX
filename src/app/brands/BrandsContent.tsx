"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function BrandsContent() {
  return (
    <div className="flex flex-col min-h-screen pt-32 pb-24 bg-brand-black">
      <Container>
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center max-w-3xl mx-auto mb-24 flex flex-col items-center px-4"
        >
          <motion.span variants={fadeInUp} className="text-xs uppercase tracking-[0.25em] text-[#e5a93c] font-bold mb-3">
            Ecosystem Portfolio
          </motion.span>
          <motion.h1 variants={fadeInUp} className="text-4xl sm:text-6xl font-black tracking-tighter mb-4 text-brand-white">
            Our Brands
          </motion.h1>
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "80px", opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="h-[3px] bg-gradient-to-r from-[#b87333] to-[#e5a93c] rounded-full mb-6"
            style={{ filter: "drop-shadow(0 2px 5px rgba(229, 169, 60, 0.4))" }}
          />
          <motion.p variants={fadeInUp} className="text-lg text-brand-light-grey font-light leading-relaxed">
            Discover our portfolio of disruptive digital products and technology ventures. We build companies from foundational architecture to commercial deployment, driving long-term value at scale.
          </motion.p>
        </motion.div>

        {/* Brand Showcase List */}
        <div className="flex flex-col gap-16 max-w-6xl mx-auto px-4 sm:px-0">

          {/* Torkk Flagship Venture Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="group premium-gradient-border relative overflow-hidden rounded-3xl border border-black/5 bg-black/[0.01] hover:bg-black/[0.02] shadow-2xl transition-all duration-500"
          >
            {/* Glowing Ambient Mesh */}
            <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-radial from-[#b87333]/8 to-transparent rounded-full blur-3xl pointer-events-none -mr-40 -mt-40 transition-transform duration-700 group-hover:scale-110" />

            <div className="flex flex-col lg:flex-row min-h-[440px]">
              {/* Product Info Column */}
              <div className="p-8 sm:p-12 md:p-16 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#e5a93c] bg-[#e5a93c]/5 border border-[#e5a93c]/20 px-3 py-1 rounded-full">
                      Signature Brand
                    </span>
                  </div>

                  <div className="mb-6">
                    <Image
                      src="/torkk_logo.png"
                      alt="Torkk Logo"
                      width={180}
                      height={56}
                      className="h-20 w-auto object-contain"
                      priority
                    />
                  </div>

                  <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4 text-brand-white">TORKK</h2>
                  <h3 className="text-lg sm:text-xl font-medium text-[#e5a93c]/90 mb-6">Zero Commission. Fair Rides. Future of Mobility.</h3>
                  <p className="text-brand-light-grey leading-relaxed mb-8 font-light text-sm md:text-base">
                    Torkk is India&apos;s first subscription-based ride-booking platform. By replacing commissions with a transparent driver subscription model, we maximize driver earnings to 100% and lower passenger fares.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button
                    variant="primary"
                    asChild
                    className="gap-2 bg-gradient-to-r from-[#b87333] to-[#e5a93c] text-white border-0 py-3 px-6 rounded-full hover:scale-105 transition-transform"
                  >
                    <Link href="/brands/torkk">
                      Explore Torkk <ArrowRight size={16} />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    asChild
                    className="gap-2 border border-[#b87333]/30 hover:!border-transparent hover:!bg-gradient-to-r hover:!from-blue-600 hover:!to-purple-600 hover:!text-white text-brand-white bg-transparent py-3 px-6 rounded-full hover:scale-105 transition-all duration-300"
                  >
                    <a href="https://torkk.in/" target="_blank" rel="noopener noreferrer">
                      Official Website <ArrowRight size={16} />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
}
