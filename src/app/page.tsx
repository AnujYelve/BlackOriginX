"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import {
  ArrowRight,
  Lightbulb,
  Cpu,
  Compass,
  TrendingUp,
  Shield,
  Zap,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Self-contained scroll-triggered animated counter component
function AnimatedCounter({ value, duration = 2, suffix = "" }: { value: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = value;
    if (start === end) {
      setCount(end);
      return;
    }

    const totalMiliseconds = duration * 1000;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 20);

    const timer = setInterval(() => {
      start += Math.ceil(end / (totalMiliseconds / incrementTime));
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section — Signature Premier Animated Background */}
      <section
        onMouseMove={handleMouseMove}
        className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-brand-black pt-28 pb-20 lg:py-0"
      >
        {/* Interactive Mouse Lightfield Follower */}
        {isMounted && (
          <div
            className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-300"
            style={{
              background: `radial-gradient(700px circle at ${mousePos.x}px ${mousePos.y}px, rgba(184, 115, 51, 0.15), rgba(229, 169, 60, 0.05) 40%, transparent 80%)`
            }}
          />
        )}

        {/* Liquid Morphing Aurora Blob 1 (Top-Left) */}
        <motion.div
          animate={{
            x: [0, 60, -40, 0],
            y: [0, -50, 50, 0],
            scale: [1, 1.2, 0.85, 1],
            borderRadius: [
              "60% 40% 30% 70% / 60% 30% 70% 40%",
              "30% 60% 70% 40% / 50% 60% 30% 60%",
              "60% 40% 30% 70% / 60% 30% 70% 40%"
            ],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[3%] left-[5%] w-[550px] h-[550px] bg-gradient-to-tr from-[#b87333]/25 via-[#e5a93c]/15 to-transparent blur-[120px] pointer-events-none z-0"
        />

        {/* Liquid Morphing Aurora Blob 2 (Bottom-Right) */}
        <motion.div
          animate={{
            x: [0, -50, 60, 0],
            y: [0, 60, -40, 0],
            scale: [1, 0.8, 1.15, 1],
            borderRadius: [
              "40% 60% 60% 40% / 70% 30% 70% 30%",
              "60% 40% 30% 70% / 40% 70% 30% 60%",
              "40% 60% 60% 40% / 70% 30% 70% 30%"
            ],
            opacity: [0.25, 0.55, 0.25]
          }}
          transition={{
            duration: 19,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-[3%] right-[5%] w-[650px] h-[650px] bg-gradient-to-bl from-[#e5a93c]/20 via-[#b87333]/12 to-transparent blur-[140px] pointer-events-none z-0"
        />

        {/* Outer Counter-Rotating Holographic Cyber Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute w-[90vw] h-[90vw] max-w-[780px] max-h-[780px] rounded-full border border-[#b87333]/15 pointer-events-none z-0"
          style={{
            background: "radial-gradient(circle, transparent 68%, rgba(184, 115, 51, 0.04) 100%)"
          }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#e5a93c] shadow-[0_0_15px_#e5a93c]" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#b87333] shadow-[0_0_10px_#b87333]" />
        </motion.div>

        {/* Inner Counter-Rotating Cyber Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute w-[65vw] h-[65vw] max-w-[540px] max-h-[540px] rounded-full border border-dashed border-[#e5a93c]/20 pointer-events-none z-0"
        >
          <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full bg-[#e5a93c] shadow-[0_0_12px_#e5a93c]" />
        </motion.div>

        {/* Shimmering Stardust Floating Particles */}
        {isMounted && (
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            {[...Array(22)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: Math.random() * 0.5 + 0.2,
                  x: Math.random() * 100 + "%",
                  y: Math.random() * 100 + "%",
                  scale: Math.random() * 0.9 + 0.3,
                }}
                animate={{
                  y: ["0%", "-45%", "0%"],
                  x: ["0%", i % 2 === 0 ? "12%" : "-12%", "0%"],
                  opacity: [0.15, 0.7, 0.15],
                  scale: [0.4, 1.3, 0.4]
                }}
                transition={{
                  duration: 6 + Math.random() * 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 4,
                }}
                className="absolute w-2.5 h-2.5 rounded-full"
                style={{
                  background: i % 3 === 0
                    ? "rgba(229, 169, 60, 0.8)"
                    : i % 3 === 1
                      ? "rgba(184, 115, 51, 0.8)"
                      : "rgba(255, 255, 255, 0.7)",
                  boxShadow: i % 2 === 0
                    ? "0 0 12px rgba(229, 169, 60, 0.8)"
                    : "0 0 12px rgba(184, 115, 51, 0.8)"
                }}
              />
            ))}
          </div>
        )}

        {/* Matrix Perspective Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(184,115,51,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(184,115,51,0.04)_1px,transparent_1px)] bg-[size:75px_75px] pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_85%)] z-0" />

        <Container className="relative z-10 flex flex-col items-center text-center px-4 -mt-10 lg:-mt-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl flex flex-col items-center"
          >
            {/* Badge */}
            <motion.span
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-[#e5a93c] bg-[#b87333]/10 border border-[#b87333]/25 mb-6"
            >
              <Sparkles size={12} className="text-[#e5a93c] animate-pulse" /> Technology-First Mobility Ecosystem
            </motion.span>

            {/* Premium Headline */}
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
                }
              }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7.5xl font-black tracking-tight mb-5 leading-[1.05] text-brand-white"
            >
              Building India&apos;s <br />
              <span className="text-copper-gradient">Next Generation</span> Mobility Company
            </motion.h1>

            {/* Glowing Full-Width Horizontal Gold Beam Line Below Headline */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-full relative my-4 flex items-center justify-center pointer-events-none overflow-hidden"
            >
              <div className="absolute w-full h-8 bg-gradient-to-r from-transparent via-[#e5a93c]/25 to-transparent blur-md" />
              <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#e5a93c] to-transparent shadow-[0_0_15px_#e5a93c]" />
            </motion.div>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-lg text-brand-light-grey mb-8 max-w-2xl font-light leading-relaxed px-4 sm:px-0 relative z-10"
            >
              We build technology-first brands solving real-world transportation challenges through AI, safety and sustainable mobility.
            </motion.p>

            {/* Interactive CTA buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto"
            >
              <Button
                size="lg"
                className="hero-btn-primary gap-2 shadow-xl shadow-[#b87333]/10 hover:shadow-[#b87333]/25 bg-gradient-to-r from-[#b87333] to-[#e5a93c] border-0 transition-all duration-300 rounded-full px-8 py-6 text-base md:text-lg font-semibold"
                asChild
              >
                <Link href="/brands">
                  Explore Ecosystem <ArrowRight size={18} />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="hero-btn-secondary shadow-lg border-black/10 hover:border-black/30 hover:bg-black/[0.02] transition-colors duration-300 rounded-full px-8 py-6 text-base md:text-lg font-semibold"
                asChild
              >
                <Link href="/contact">Partner With Us</Link>
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* 1.5. Live Platform Statistics Section (Count Up) */}
      <section className="py-16 bg-brand-dark-grey/10 border-t border-b border-black/5 relative z-10">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center px-4 sm:px-0">
            {[
              { label: "Carbon Emission", value: 0, suffix: "%", desc: "100% Sustainable Green Transit" },
              { label: "Incubated Brand", value: 1, suffix: "", desc: "Torkk Smart Mobility" },
              { label: "Technology Focus", value: 100, suffix: "%", desc: "Proprietary Code & Design" },
              { label: "Safety Shield Rating", value: 100, suffix: "%", desc: "Fully Insured and Tracked" }
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <div className="text-4xl md:text-5xl font-black text-copper-gradient">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm font-bold text-brand-white">{stat.label}</div>
                <div className="text-xs text-brand-light-grey/65 font-light">{stat.desc}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 2. About BlackOriginX Section */}
      <section className="py-20 md:py-28 bg-brand-black relative z-10 border-t border-black/5">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center px-4 sm:px-0">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7"
            >
              <span className="text-xs uppercase tracking-[0.25em] text-copper-gradient font-bold mb-3 block">Corporate Overview</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-brand-white mb-6">
                About BlackOriginX
              </h2>
              <div className="h-[3px] w-[85px] bg-gradient-to-r from-[#b87333] to-[#e5a93c] rounded-full mb-8" />
              <p className="text-base md:text-lg text-brand-light-grey/85 font-light leading-relaxed mb-6">
                BlackOriginX Private Limited is a technology holding company focused on building and scaling innovative platforms that solve real-world problems. By integrating design, engineering, and sustainable business models, we build future-ready solutions that enhance daily life.
              </p>

              <div className="mb-8">
                <p className="text-sm font-bold text-brand-white mb-4">Focusing On:</p>

                <ul className="space-y-3">
                  {[
                    "Building and scaling technology-driven digital businesses.",
                    "Developing zero-commission mobility solutions through Torkk.",
                    "Incubating clean energy transit and connected telemetry models.",
                    "Leveraging artificial intelligence to optimize routing, dispatch, and safety."
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-brand-light-grey/70 font-light">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#b87333] mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button variant="outline" className="gap-2 border-black/10 hover:border-black/25 text-brand-white rounded-full" asChild>
                <Link href="/about">
                  Discover Our Story <ArrowRight size={16} />
                </Link>
              </Button>
            </motion.div>

            {/* Interactive Animated 4 Concept Cards Grid */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ perspective: "1000px" }}
              className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 relative"
            >
              <div className="absolute inset-0 bg-radial from-[#e5a93c]/10 to-transparent blur-3xl pointer-events-none" />

              {[
                {
                  step: "01",
                  title: "Ideation",
                  desc: "Discovering deep market voids and real-world friction.",
                  icon: Lightbulb,
                  color: "#f59e0b",
                  iconAnim: { y: [0, -6, 0], scale: [1, 1.08, 1] },
                  glowColor: "rgba(245, 158, 11, 0.15)",
                  borderColor: "border-[#f59e0b]/25 group-hover:border-[#f59e0b]/60"
                },
                {
                  step: "02",
                  title: "Design",
                  desc: "Crafting beautiful, user-centric wireframes & experiences.",
                  icon: Compass,
                  color: "#b87333",
                  iconAnim: { rotate: [0, 180, 360], y: [0, -4, 0] },
                  glowColor: "rgba(184, 115, 51, 0.15)",
                  borderColor: "border-[#b87333]/25 group-hover:border-[#b87333]/60"
                },
                {
                  step: "03",
                  title: "Engineering",
                  desc: "Building scalable, high-performance web/IoT backends.",
                  icon: Cpu,
                  color: "#3b82f6",
                  iconAnim: { scale: [1, 1.12, 1] },
                  glowColor: "rgba(59, 130, 246, 0.15)",
                  borderColor: "border-[#3b82f6]/25 group-hover:border-[#3b82f6]/60"
                },
                {
                  step: "04",
                  title: "Execution & Scale",
                  desc: "Launching globally trusted and safe brands.",
                  icon: TrendingUp,
                  color: "#22c55e",
                  iconAnim: { y: [0, -8, 0], opacity: [0.8, 1, 0.8] },
                  glowColor: "rgba(34, 197, 94, 0.15)",
                  borderColor: "border-[#22c55e]/25 group-hover:border-[#22c55e]/60"
                }
              ].map((item, idx) => {
                const Icon = item.icon;
                const shapeClass = idx === 0 || idx === 3
                  ? "rounded-tr-[44px] rounded-bl-[44px] rounded-tl-[16px] rounded-br-[16px] hover:rounded-tl-[44px] hover:rounded-br-[44px] hover:rounded-tr-[16px] hover:rounded-bl-[16px]"
                  : "rounded-tl-[44px] rounded-br-[44px] rounded-tr-[16px] rounded-bl-[16px] hover:rounded-tr-[44px] hover:rounded-bl-[44px] hover:rounded-tl-[16px] hover:rounded-br-[16px]";

                return (
                  <motion.div
                    key={item.step}
                    animate={{
                      y: [0, -8, 0],
                      rotate: [0, idx % 2 === 0 ? 0.6 : -0.6, 0]
                    }}
                    transition={{
                      duration: 5 + (idx * 0.8),
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: idx * 0.3
                    }}
                    className="w-full h-full"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 60, scale: 0.8, rotate: idx % 2 === 0 ? -6 : 6 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ type: "spring", stiffness: 80, damping: 12, delay: idx * 0.15 }}
                      whileHover={{
                        y: -12,
                        scale: 1.04,
                        rotateX: idx === 0 || idx === 2 ? 4 : -4,
                        rotateY: idx === 0 || idx === 3 ? -4 : 4,
                      }}
                      style={{ transformStyle: "preserve-3d" }}
                      className={`group relative p-6 sm:p-7 bg-[#2a2a2a] border themed-card ${item.borderColor} shadow-[0_15px_35px_rgba(0,0,0,0.4)] transition-all duration-500 ease-in-out flex flex-col justify-between overflow-hidden min-h-[220px] ${shapeClass}`}
                    >
                      {/* Ambient Glow Mesh */}
                      <motion.div
                        animate={{ opacity: [0.25, 0.55, 0.25] }}
                        transition={{ duration: 3.5 + idx, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 pointer-events-none rounded-[inherit]"
                        style={{
                          background: `radial-gradient(circle at top right, ${item.glowColor}, transparent 70%)`
                        }}
                      />

                      <div className="relative z-10">
                        {/* Header: Step & Animated Icon */}
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-xs font-black text-[#e5a93c] font-mono tracking-widest">
                            {item.step}
                          </span>

                          <motion.div
                            animate={item.iconAnim}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="w-10 h-10 rounded-xl flex items-center justify-center border shadow-sm"
                            style={{
                              background: `${item.color}18`,
                              borderColor: `${item.color}40`
                            }}
                          >
                            <Icon size={18} style={{ color: item.color }} />
                          </motion.div>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-extrabold card-title-white mb-2 tracking-tight" style={{ color: "#ffffff" }}>
                          {item.title}
                        </h3>

                        {/* Description */}
                        <p className="text-xs card-desc-grey font-light leading-relaxed" style={{ color: "#a1a1aa" }}>
                          {item.desc}
                        </p>
                      </div>

                      {/* Animated Beam Sweep Line */}
                      <div className="relative z-10 mt-6 h-[2.5px] w-full rounded-full overflow-hidden bg-white/5">
                        <motion.div
                          animate={{ x: ["-100%", "100%"] }}
                          transition={{ duration: 3 + idx * 0.5, repeat: Infinity, ease: "easeInOut" }}
                          className="h-full w-full rounded-full"
                          style={{
                            background: `linear-gradient(to right, transparent, ${item.color}, transparent)`
                          }}
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* 3. Our Vision & Mission Section */}
      <section className="py-20 md:py-28 bg-brand-dark-grey/10 border-t border-b border-black/5 relative z-10">
        <Container>
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-copper-gradient font-bold mb-3">Core Direction</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-brand-white mb-4">
              Vision & Mission
            </h2>
            <div className="h-[3px] w-[80px] bg-gradient-to-r from-[#b87333] to-[#e5a93c] rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto px-4 sm:px-0">
            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="group p-8 md:p-10 rounded-3xl border border-black/5 bg-black/[0.01] hover:bg-black/[0.02] hover:border-black/10 transition-all duration-300 flex flex-col justify-between relative overflow-hidden themed-card"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-radial from-[#e5a93c]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
              <div>
                <div className="w-14 h-14 rounded-2xl bg-black/[0.03] border border-black/8 flex items-center justify-center mb-8 text-[#b87333] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#b87333]/10">
                  <Image src="/our_vision.png" alt="Our Vision" width={36} height={36} className="w-9 h-9 object-contain" />
                </div>
                <h3 className="text-2xl font-black mb-4 tracking-tight text-brand-white">Our Vision</h3>
                <p className="text-brand-light-grey/65 leading-relaxed font-light text-sm md:text-base">
                  To build globally trusted technology brands that create meaningful impact through innovation, safety, and exceptional user experiences.
                </p>
              </div>
            </motion.div>

            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="group p-8 md:p-10 rounded-3xl border border-black/5 bg-black/[0.01] hover:bg-black/[0.02] hover:border-black/10 transition-all duration-300 flex flex-col justify-between relative overflow-hidden themed-card"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-radial from-[#b87333]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
              <div>
                <div className="w-14 h-14 rounded-2xl bg-black/[0.03] border border-black/8 flex items-center justify-center mb-8 text-[#b87333] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#b87333]/10">
                  <Image src="/our_mission.png" alt="Our Mission" width={36} height={36} className="w-9 h-9 object-contain" />
                </div>
                <h3 className="text-2xl font-black mb-4 tracking-tight text-brand-white">Our Mission</h3>
                <p className="text-brand-light-grey/65 leading-relaxed font-light text-sm md:text-base">
                  To develop high-quality digital products that simplify everyday life while maintaining innovation, reliability, and long-term value.
                </p>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* 4. Our Brands Section */}
      <section className="py-20 md:py-28 bg-brand-black relative z-10">
        <Container>
          <div className="flex flex-col items-center mb-16 text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-copper-gradient font-bold mb-3">Portfolio Ecosystem</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-brand-white mb-4">
              Our Brands
            </h2>
            <div className="h-[3px] bg-gradient-to-r from-[#b87333] to-[#e5a93c] rounded-full mb-6 w-[80px]" />
            <p className="text-brand-light-grey/70 max-w-2xl mx-auto px-4 sm:px-0 font-light text-base md:text-lg">
              Creating high-impact technology platforms that redefine markets and deliver intuitive user solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Torkk Flagship Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              whileHover={{ y: -10 }}
              className="group premium-gradient-border relative overflow-hidden rounded-3xl p-8 md:p-12 flex flex-col justify-between min-h-[440px] border border-black/5 shadow-2xl transition-all duration-300 themed-card"
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-radial from-[#b87333]/8 to-transparent rounded-full blur-3xl pointer-events-none -mr-20 -mt-20 transition-transform group-hover:scale-125 duration-700" />

              <div>
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
                <h3 className="text-4xl font-black tracking-tight text-brand-white mb-4">Torkk</h3>
                <p className="text-lg font-medium text-brand-light-grey mb-3">Zero Commission. Fair Rides. The Future of Ride Hailing.</p>
                {/* <p className="text-brand-light-grey/60 max-w-md font-light text-sm md:text-base leading-relaxed">
                  Torkk is India&apos;s first subscription-based ride-booking platform.
                </p> */}
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" className="gap-2 border-black/10 hover:border-black/25 text-brand-white rounded-full" asChild>
                    <Link href="/brands/torkk">
                      Explore Brand <ArrowRight size={16} />
                    </Link>
                  </Button>
                  <Button variant="outline" className="gap-2 border-black/10 hover:!border-transparent hover:!bg-gradient-to-r hover:!from-blue-600 hover:!to-purple-600 hover:!text-white text-brand-white rounded-full transition-all duration-300" asChild>
                    <a href="https://torkk.in/" target="_blank" rel="noopener noreferrer">
                      Official Website <ArrowRight size={16} />
                    </a>
                  </Button>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-black/[0.03] border border-black/8 flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity">
                  <Cpu size={20} className="text-[#b87333]" />
                </div>
              </div>
            </motion.div>

            {/* Upcoming Pipeline Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.25 }}
              whileHover={{ y: -10 }}
              className="rounded-3xl border border-black/5 border-dashed flex flex-col items-center justify-center min-h-[440px] text-center p-8 bg-black/[0.01] hover:bg-black/[0.02] hover:border-black/10 transition-all duration-300 relative overflow-hidden themed-card"
            >
              <div className="w-16 h-16 rounded-full border border-black/10 flex items-center justify-center mb-6 bg-black/[0.02] animate-pulse">
                <span className="text-2xl font-light text-brand-light-grey/50">+</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-brand-white">Upcoming Pipeline</h3>
              <p className="text-brand-light-grey/40 max-w-sm font-light text-sm leading-relaxed mb-6">
                Actively developing secondary digital products in collaborative design environments, serverless backend frameworks, and predictive logistics.
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* 5. Why Choose Us Section (Core Values) */}
      <section className="py-20 md:py-28 border-t border-black/5 bg-brand-black">
        <Container>
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-copper-gradient font-bold mb-3">Core Values</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-brand-white mb-4">Why Choose Us</h2>
            <div className="h-[3px] bg-gradient-to-r from-[#b87333] to-[#e5a93c] rounded-full mb-6 w-[80px]" />
            <p className="text-brand-light-grey/70 max-w-2xl mx-auto px-4 sm:px-0 font-light text-base md:text-lg">
              Operating at the intersection of robust engineering, intuitive design, and transparent partnerships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 sm:px-0">
            {[
              {
                imageSrc: "/innovation.png",
                title: "Innovation",
                desc: "Fostering disruptive, forward-thinking breakthroughs across hardware and software ecosystems.",
                color: "#f59e0b",
                bgColor: "rgba(245, 158, 11, 0.1)",
                borderColor: "rgba(245, 158, 11, 0.25)"
              },
              {
                imageSrc: "/Trust.png",
                title: "Trust & Transparency",
                desc: "Earning global confidence through integrity, open communication, and safety-first engineering.",
                color: "#22c55e",
                bgColor: "rgba(34, 197, 94, 0.1)",
                borderColor: "rgba(34, 197, 94, 0.25)"
              },
              {
                imageSrc: "/user_centric.png",
                title: "User-Centric Design",
                desc: "Designing intuitive, friction-free customer interfaces that prioritize human experiences and workflows.",
                color: "#ef4444",
                bgColor: "rgba(239, 68, 68, 0.1)",
                borderColor: "rgba(239, 68, 68, 0.25)"
              },
              {
                imageSrc: "/quality.png",
                title: "Quality First",
                desc: "Adhering to high-quality code, reliable deployments, and long-term product durability.",
                color: "#3b82f6",
                bgColor: "rgba(59, 130, 246, 0.1)",
                borderColor: "rgba(59, 130, 246, 0.25)"
              },
              {
                imageSrc: "/scalability.png",
                title: "Scalability",
                desc: "Architecting modular platforms and microservice systems ready for global enterprise operations.",
                color: "#a855f7",
                bgColor: "rgba(168, 85, 247, 0.1)",
                borderColor: "rgba(168, 85, 247, 0.25)"
              },
              {
                imageSrc: "/improvement.png",
                title: "Continuous Improvement",
                desc: "Committing to iterative feedback loops, rapid deployments, and steady growth.",
                color: "#f97316",
                bgColor: "rgba(249, 115, 22, 0.1)",
                borderColor: "rgba(249, 115, 22, 0.25)"
              }
            ].map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="group flex flex-col justify-between p-8 rounded-3xl bg-black/[0.01] border border-black/5 hover:border-black/10 transition-all duration-300 hover:bg-black/[0.025] shadow-lg themed-card"
              >
                <div>
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl relative"
                    style={{
                      background: `linear-gradient(135deg, ${value.bgColor}, transparent)`,
                      borderColor: value.borderColor,
                      boxShadow: `0 4px 15px ${value.bgColor}`
                    }}
                  >
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ boxShadow: `0 0 20px ${value.bgColor}, inset 0 0 10px ${value.bgColor}` }}
                    />
                    <Image src={value.imageSrc} alt={value.title} width={32} height={32} className="w-8 h-8 object-contain relative z-10" />
                  </div>
                  <h4 className="text-lg font-bold mb-3 text-brand-white group-hover:text-brand-white transition-colors">{value.title}</h4>
                  <p className="text-brand-light-grey/60 text-xs md:text-sm leading-relaxed font-light transition-colors group-hover:text-brand-light-grey/85">{value.desc}</p>
                </div>
                <div className="mt-6 h-[2px] w-0 bg-gradient-to-r from-[#e5a93c] to-[#b87333] transition-all duration-500 group-hover:w-full" />
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* 7. Contact CTA Section */}
      <section className="py-20 md:py-28 relative overflow-hidden bg-brand-black border-t border-black/5">
        <div className="absolute inset-0 bg-radial from-[#e5a93c]/5 to-transparent blur-3xl pointer-events-none" />
        <Container className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 text-brand-white">
          <div className="max-w-2xl text-center md:text-left w-full px-4 sm:px-0">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter mb-4 text-brand-white">Pioneer the Future With Us</h2>
            <div className="h-[3px] bg-gradient-to-r from-[#b87333] to-[#e5a93c] rounded-full mb-6 mx-auto md:mx-0 w-[80px]" />
            <p className="text-base md:text-lg text-brand-light-grey/70 mb-8 max-w-xl font-light leading-relaxed">
              BlackOriginX collaborates with institutional investors, digital designers, and engineering pioneers to scale high-quality digital products globally. Let's build together.
            </p>
            <Button
              size="lg"
              className="shadow-xl bg-gradient-to-r from-[#b87333] to-[#e5a93c] text-neutral-50 border-0 px-8 py-4 rounded-full"
              asChild
            >
              <Link href="/contact">Partner With Us</Link>
            </Button>
          </div>

          <div className="hidden lg:block">
            <div className="flex gap-4 items-end">
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  initial={{ height: 40 }}
                  whileInView={{ height: 40 + i * 40 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, delay: i * 0.15, ease: "easeOut" }}
                  className="w-16 border rounded-t-xl bg-black border-black"
                />
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
