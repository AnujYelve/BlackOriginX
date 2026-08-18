"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { ArrowLeft, Shield, Lock, Eye, FileText, CheckCircle2, Server, Key, Mail, Building2 } from "lucide-react";

export default function PrivacyPage() {
  const lastUpdated = "July 22, 2026";

  return (
    <main className="min-h-screen bg-brand-black text-brand-white pt-28 pb-24 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-radial from-[#b87333]/15 via-[#e5a93c]/5 to-transparent blur-3xl pointer-events-none" />

      <Container className="relative z-10 max-w-4xl px-4 sm:px-6">
        {/* Navigation Back Link */}
        <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#e5a93c] hover:text-[#b87333] transition-colors mb-10 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </motion.div>

        {/* Page Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-14">
          <div className="flex items-center gap-2 mb-3">
            <Shield size={22} className="text-[#e5a93c]" />
            <span className="text-xs uppercase tracking-[0.25em] text-copper-gradient font-bold">Data Privacy & Protection</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight mb-4 text-brand-white">
            Privacy Policy
          </h1>
          <div className="h-[3.5px] bg-gradient-to-r from-[#b87333] via-[#e5a93c] to-[#b87333] rounded-full mb-4 w-[120px] shadow-[0_0_12px_#e5a93c]" />
          <div className="flex flex-wrap items-center gap-4 text-xs text-brand-light-grey font-mono">
            <span>Last Updated: {lastUpdated}</span>
            <span>•</span>
            <span>BlackOriginX Private Limited</span>
          </div>
        </motion.div>

        {/* Policy Content Cards (Styled for Light Theme) */}
        <div className="space-y-8">
          {/* Section 1: Overview */}
          <motion.section
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 sm:p-10 rounded-[28px] bg-white border border-black/5 shadow-[0_15px_35px_rgba(0,0,0,0.05)] hover:border-[#e5a93c]/30 transition-all duration-300"
          >
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mb-5 flex items-center gap-3.5 tracking-tight">
              <div className="w-10 h-10 rounded-xl bg-[#e5a93c]/15 border border-[#e5a93c]/40 flex items-center justify-center text-[#e5a93c] flex-shrink-0">
                <Lock size={20} />
              </div>
              1. Overview & Commitment
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-light mb-4">
              BlackOriginX Private Limited (&quot;BlackOriginX&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates as a technology company and venture builder. We prioritize data privacy and enforce rigorous administrative, physical, and technical safeguards across our platforms, including signature products like Torkk.
            </p>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-light">
              This Privacy Policy details the policies governing the collection, processing, protection, and retention of user data when interacting with our corporate site or digital applications.
            </p>
          </motion.section>

          {/* Section 2: Data Collection */}
          <motion.section
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 sm:p-10 rounded-[28px] bg-white border border-black/5 shadow-[0_15px_35px_rgba(0,0,0,0.05)] hover:border-[#e5a93c]/30 transition-all duration-300"
          >
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mb-6 flex items-center gap-3.5 tracking-tight">
              <div className="w-10 h-10 rounded-xl bg-[#b87333]/15 border border-[#b87333]/40 flex items-center justify-center text-[#e5a93c] flex-shrink-0">
                <Eye size={20} />
              </div>
              2. Data We Collect
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { title: "Contact Submissions", desc: "Name, business email address, organization name, and partnership message details provided explicitly via forms.", icon: Mail },
                { title: "Waitlist Access", desc: "Email address, country of residence, and product interest submitted for early access passes.", icon: Key },
                { title: "Telemetry & Logs", desc: "IP address, device browser type, operational OS, and aggregated usage statistics.", icon: Server }
              ].map((c, i) => (
                <div key={i} className="p-5 rounded-2xl bg-[#fbfbfb] border border-black/5 flex flex-col justify-between">
                  <div>
                    <c.icon size={20} className="text-[#e5a93c] mb-3" />
                    <h3 className="text-base font-bold text-neutral-900 mb-2">{c.title}</h3>
                    <p className="text-xs text-neutral-600 leading-relaxed font-light">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Section 3: Processing Operations */}
          <motion.section
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 sm:p-10 rounded-[28px] bg-white border border-black/5 shadow-[0_15px_35px_rgba(0,0,0,0.05)] hover:border-[#e5a93c]/30 transition-all duration-300"
          >
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mb-6 flex items-center gap-3.5 tracking-tight">
              <div className="w-10 h-10 rounded-xl bg-[#3b82f6]/15 border border-[#3b82f6]/40 flex items-center justify-center text-[#60a5fa] flex-shrink-0">
                <FileText size={20} />
              </div>
              3. Purpose of Processing
            </h2>
            <div className="space-y-3">
              {[
                "Evaluating and processing strategic partnership, co-incubation, and institutional investment inquiries.",
                "Delivering product availability updates and early access notifications for Torkk.",
                "Maintaining platform security, mitigating cyber threats, and optimizing server response latency.",
                "Fulfilling regulatory, legal, and corporate auditing obligations under applicable law."
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3 p-3.5 rounded-xl bg-[#fbfbfb] border border-black/5">
                  <CheckCircle2 size={18} className="text-[#22c55e] flex-shrink-0" />
                  <span className="text-sm text-neutral-600 font-light">{text}</span>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Section 4: Data Security & Non-Disclosure */}
          <motion.section
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 sm:p-10 rounded-[28px] bg-white border border-black/5 shadow-[0_15px_35px_rgba(0,0,0,0.05)] hover:border-[#e5a93c]/30 transition-all duration-300"
          >
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mb-5 tracking-tight">4. Data Security & Non-Disclosure</h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-light mb-4">
              BlackOriginX strictly adheres to a zero data monetization policy. We do NOT sell, rent, or trade personal data to third-party advertisers or data brokers.
            </p>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-light">
              All transmitted data is encrypted using industry-standard TLS 1.3 / AES-256 protocols and stored on secure cloud infrastructure operating under strict access management.
            </p>
          </motion.section>

          {/* Section 5: Data Protection Officer Contact */}
          <motion.section
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 sm:p-10 rounded-[28px] bg-white border border-[#e5a93c]/40 shadow-[0_20px_50px_rgba(184,115,51,0.08)]"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Building2 size={20} className="text-[#e5a93c]" />
                  <span className="text-xs uppercase tracking-widest text-[#e5a93c] font-bold">Data Privacy Contact</span>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-1">BlackOriginX Data Advisory Office</h3>
                <p className="text-xs text-neutral-600 font-light">Headquarters: Gurugram, Haryana, INDIA</p>
              </div>

              <a
                href="mailto:contact@blackoriginx.com"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#b87333] to-[#e5a93c] text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-xl transition-all"
              >
                <Mail size={16} /> Contact Privacy Desk
              </a>
            </div>
          </motion.section>
        </div>
      </Container>
    </main>
  );
}
