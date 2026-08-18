"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import {
  Target,
  Eye,
  Award,
  Lightbulb,
  Shield,
  Rocket,
  Mail,
  TrendingUp,
  Cpu,
  Layers,
  Heart,
  Users
} from "lucide-react";
import Image from "next/image";

export default function AboutContent() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const isTimelineInView = useInView(timelineRef, { once: true, margin: "-100px" });

  const timelineSteps = [
    {
      phase: "01",
      year: "2026",
      title: "Company Foundation",
      desc: "BlackOriginX is established as a technology company focused on building innovative digital products and software ecosystems.",
      icon: Layers
    },
    {
      phase: "02",
      year: "2026",
      title: "Signature Venture",
      desc: "Incubation and active development of Torkk, addressing connected telemetry systems and smart mobility integrations.",
      icon: Cpu
    },
    {
      phase: "03",
      year: "Upcoming",
      title: "Upcoming Ventures",
      desc: "",
      icon: Rocket
    }
  ];

  return (
    <div className="flex flex-col min-h-screen pt-32 pb-24 bg-brand-black">
      {/* 1. Header & Company Story */}
      <section className="mb-32 relative">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-[#b87333]/5 blur-[120px] pointer-events-none" />

        <Container>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center px-4 sm:px-0"
          >
            {/* Story Content */}
            <div className="lg:col-span-12 max-w-4xl flex flex-col justify-center">
              <motion.span variants={fadeInUp} className="text-xs uppercase tracking-[0.25em] text-[#b87333] font-bold mb-4">
                Corporate Genesis
              </motion.span>
              <motion.h1
                variants={fadeInUp}
                className="text-4xl sm:text-6xl font-black tracking-tighter mb-8 text-brand-white leading-tight"
              >
                Pioneering the Transition to <br />
                <span className="text-copper-gradient">Next-Gen Digital Solutions</span>
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="text-lg md:text-xl text-brand-light-grey/85 leading-relaxed font-light mb-6"
              >
                BlackOriginX Private Limited is a technology company focused on building innovative digital products that solve real-world problems through technology, design, and scalable solutions.
              </motion.p>
              <motion.p
                variants={fadeInUp}
                className="text-sm md:text-base text-brand-light-grey/60 leading-relaxed font-light"
              >
                We operate as a product venture incubator and technology holding company, developing high-performance digital ecosystems. With a strong commitment to building future-ready technology products, our focus centers on rapid innovation and precise execution to create long-term value.
              </motion.p>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* 2. Vision & Mission Section */}
      <section className="py-20 md:py-28 bg-brand-dark-grey/10 border-t border-b border-black/5 relative mb-12 md:mb-16">
        <Container>
          <div className="flex flex-col items-center text-center mb-24 px-4">
            <span className="text-xs uppercase tracking-[0.25em] text-copper-gradient font-bold mb-3">Core Philosophy</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-brand-white mb-4">
              Vision & Mission
            </h2>
            <div className="h-[3px] w-[80px] bg-gradient-to-r from-[#b87333] to-[#e5a93c] rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto px-4 sm:px-0">
            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="group p-8 md:p-10 rounded-3xl border border-black/5 bg-black/[0.01] hover:bg-black/[0.025] hover:border-black/10 transition-all duration-300 flex flex-col justify-between"
            >
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
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="group p-8 md:p-10 rounded-3xl border border-black/5 bg-black/[0.01] hover:bg-black/[0.025] hover:border-black/10 transition-all duration-300 flex flex-col justify-between"
            >
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

      {/* 3. Core Values Section */}
      <section className="py-20 md:py-28 bg-brand-black mb-12 md:mb-16 relative">
        <Container>
          <div className="flex flex-col items-center text-center mb-24 px-4">
            <span className="text-xs uppercase tracking-[0.25em] text-copper-gradient font-bold mb-3">Foundational Standards</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-brand-white mb-4">Our Core Values</h2>
            <div className="h-[3px] w-[80px] bg-gradient-to-r from-[#b87333] to-[#e5a93c] rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 sm:px-0">
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
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group p-8 rounded-3xl border border-black/5 bg-black/[0.01] hover:bg-black/[0.02] transition-all duration-300"
              >
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
                <h4 className="text-lg font-bold text-brand-white mb-2">{value.title}</h4>
                <p className="text-sm text-brand-light-grey/50 leading-relaxed font-light">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Company Timeline */}
      <section id="timeline" className="scroll-mt-24 py-20 md:py-28 bg-brand-dark-grey/10 border-t border-b border-black/5 mb-12 md:mb-16 relative">
        <Container>
          <div className="flex flex-col items-center text-center mb-24 px-4">
            <span className="text-xs uppercase tracking-[0.25em] text-copper-gradient font-bold mb-3">Milestones Path</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-brand-white mb-4">Company Timeline</h2>
            <div className="h-[3px] w-[80px] bg-gradient-to-r from-[#b87333] to-[#e5a93c] rounded-full" />
          </div>

          <div ref={timelineRef} className="relative max-w-5xl mx-auto px-4 sm:px-0">
            {/* Vertical timeline center line */}
            <motion.div
              initial={{ height: 0 }}
              animate={isTimelineInView ? { height: "100%" } : {}}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute left-4 md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-[#b87333] via-[#e5a93c] to-black/5 -translate-x-1/2"
            />

            <div className="flex flex-col gap-16 md:gap-24 relative z-10">
              {timelineSteps.map((step, i) => {
                const IconComponent = step.icon;
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, delay: i * 0.15 }}
                    className={`flex flex-col md:flex-row items-start ${i % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
                  >
                    {/* Left/Right Text Container */}
                    <div className="w-full md:w-1/2 pl-16 pr-4 md:px-12 flex justify-start md:justify-end">
                      <div className={`max-w-md ${i % 2 !== 0 ? "md:text-left" : "md:text-right text-left"}`}>
                        <span className="inline-block text-xs font-bold tracking-[0.2em] text-[#b87333] mb-3 px-3 py-1 rounded-full bg-black/[0.03] border border-black/8">
                          {step.year}
                        </span>
                        <h4 className="text-2xl font-bold text-brand-white mb-3">{step.title}</h4>
                        <p className="text-sm text-brand-light-grey/60 leading-relaxed font-light">{step.desc}</p>
                      </div>
                    </div>

                    {/* Timeline Node Icon in center */}
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-brand-black border-2 border-[#b87333] flex items-center justify-center z-20 shadow-[0_0_15px_rgba(184,115,51,0.2)]">
                      <IconComponent size={18} className="text-[#b87333]" />
                    </div>

                    {/* Empty spacer block for desktop */}
                    <div className="w-full md:w-1/2 hidden md:block" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* 5. Leadership Section */}
      <section id="leadership" className="py-20 md:py-28 bg-brand-black scroll-mt-24">
        <Container>
          <div className="flex flex-col items-center text-center mb-24 px-4">
            <span className="text-xs uppercase tracking-[0.25em] text-copper-gradient font-bold mb-3">Ecosystem Advisory</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-brand-white mb-4">Our Leadership</h2>
            <div className="h-[3px] w-[80px] bg-gradient-to-r from-[#b87333] to-[#e5a93c] rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-4 sm:px-0">
            {[
              {
                name: "Shivasheesh Kumar",
                role: "Founder & CEO",
                bio: "Driving the strategic direction and operational execution of BlackOriginX and its portfolio brands, focusing on digital product design, deep tech, and scalable software ecosystems.",
                linkedin: "https://www.linkedin.com/in/shivasheeshkumar/",
                email: "shivasheeshkumar@icloud.com"
              },
              {
                name: "Ms. Mithlesh Kumari",
                role: "Co-Founder",
                bio: "Steering corporate governance, organizational development, and key growth partnerships for BlackOriginX and its portfolio brands.",
                linkedin: "",
                email: "founder@blackoriginx.com"
              },
              {
                name: "Tanush Bhatnagar",
                role: "Co-Founder, Advisory",
                bio: "Guiding technical and strategic directions as an advisory partner, with a core focus on expanding and scaling Torkk's connected smart mobility ecosystem.",
                linkedin: "",
                email: "tanush.bhatnagar@torkk.in"
              },
              {
                name: "Ecosystem Advisory Board",
                role: "Co-Founding Advisors",
                bio: "Composed of industry veterans in software engineering, digital design, and venture scaling, providing direct oversight and growth acceleration support.",
                linkedin: "",
                email: "contact@blackoriginx.com"
              }
            ].map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                whileHover={{ y: -6 }}
                className="group flex flex-col justify-between p-8 rounded-3xl bg-black/[0.01] border border-black/5 hover:bg-black/[0.025] hover:border-black/10 transition-all duration-300"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h4 className="text-2xl font-bold text-brand-white transition-colors">{member.name}</h4>
                      <span className="text-xs font-semibold tracking-[0.2em] text-copper-gradient uppercase mt-1 block">{member.role}</span>
                    </div>
                  </div>
                  <p className="text-sm md:text-base text-brand-light-grey/60 leading-relaxed font-light mb-8">{member.bio}</p>
                </div>
                <div className="pt-4 border-t border-[#ECEAF4]/80 flex items-center gap-3">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="w-10 h-10 rounded-full bg-[#0A66C2] text-white flex items-center justify-center hover:scale-110 shadow-md shadow-[#0A66C2]/25 transition-all duration-200"
                    >
                      <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.6a1.4 1.4 0 1 0 1.4 1.4 1.4 1.4 0 0 0-1.4-1.4z" />
                      </svg>
                    </a>
                  )}

                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      aria-label="Email"
                      className="w-10 h-10 rounded-full bg-white border border-slate-200/90 flex items-center justify-center hover:scale-110 shadow-md shadow-slate-200/60 transition-all duration-200"
                    >
                      <svg className="w-5.5 h-5.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#4285F4" d="M20 18h-2V9.25L12 13.5 6 9.25V18H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h1.5L12 8.5 18.5 4H20c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2z" />
                        <path fill="#EA4335" d="M18.5 4L12 8.5 5.5 4H4c-1.1 0-2 .9-2 2v.5L12 13.5 22 6.5V6c0-1.1-.9-2-2-2h-1.5z" />
                        <path fill="#34A853" d="M2 16v.5c0 1.1.9 2 2 2h2v-8L2 7.5V16z" />
                        <path fill="#FBBC04" d="M22 16v-8.5l-4 3v8h2c1.1 0 2-.9 2-2z" />
                      </svg>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
