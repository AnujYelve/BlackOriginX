"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { ArrowLeft, Shield, Lock, Eye, FileText, CheckCircle2, Server, Key, Mail, Building2, MapPin, Clock, UserCheck } from "lucide-react";

export default function PrivacyPage() {
  const lastUpdated = "July 20, 2026";

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
            <span>BLACKORIGINX PRIVATE LIMITED (Torkk)</span>
          </div>
        </motion.div>

        {/* Policy Content Cards */}
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
              1. Overview & Scope
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-light mb-4">
              BLACKORIGINX PRIVATE LIMITED (&quot;Company&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;Torkk&quot;) is committed to protecting your privacy. This Privacy Policy applies to the collection, processing, retrieval, disclosure, and protection of information across the Torkk Platform (`torkk.bike`, `torkk.rentals`, and Torkk mobile apps) and BlackOriginX websites.
            </p>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-light">
              It governs interactions with commuters (Customers), independent drivers (Captains), and two-wheeler rental providers (Vendor Partners) under the Information Technology Act, 2000 and applicable Indian laws.
            </p>
          </motion.section>

          {/* Section 2: Data We Collect */}
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
                { title: "Account & Contacts", desc: "Name, email, mobile number, payment details, and form submissions.", icon: Mail },
                { title: "KYC & Verification", desc: "For Captains & Vendors: Aadhaar, PAN, Driving License, RC, vehicle fitness/insurance certificates, and real-time selfies.", icon: UserCheck },
                { title: "SMS & Telemetry", desc: "OTP verification SMS with permissions, IP addresses, device OS, browser logs, and call recordings for safety.", icon: Server }
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

          {/* Section 3: Location Privacy Policy */}
          <motion.section
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 sm:p-10 rounded-[28px] bg-white border border-black/5 shadow-[0_15px_35px_rgba(0,0,0,0.05)] hover:border-[#e5a93c]/30 transition-all duration-300"
          >
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mb-5 flex items-center gap-3.5 tracking-tight">
              <div className="w-10 h-10 rounded-xl bg-[#e5a93c]/15 border border-[#e5a93c]/40 flex items-center justify-center text-[#e5a93c] flex-shrink-0">
                <MapPin size={20} />
              </div>
              3. Precise Location Privacy
            </h2>
            <div className="space-y-4 text-neutral-600 text-sm sm:text-base leading-relaxed font-light">
              <p>
                <strong>Drivers (Captains):</strong> Background and foreground location is collected <em>only</em> when the Captain switches status to &quot;On Duty&quot; or during an active trip, strictly to match nearby rides, provide navigation, and enable live commuter tracking. Background tracking automatically stops when switching to &quot;Off Duty&quot;.
              </p>
              <p>
                <strong>Commuters (Customers):</strong> Location is accessed from ride request initiation until trip completion to determine pickup/drop locations and ensure passenger safety.
              </p>
              <p className="text-xs font-semibold text-neutral-800 bg-[#fbfbfb] p-3 rounded-xl border border-black/5">
                🚫 Strict Promise: Location data is NEVER used for targeted advertising, marketing, profiling, or sold to third parties.
              </p>
            </div>
          </motion.section>

          {/* Section 4: Security, Monetization & Retention */}
          <motion.section
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 sm:p-10 rounded-[28px] bg-white border border-black/5 shadow-[0_15px_35px_rgba(0,0,0,0.05)] hover:border-[#e5a93c]/30 transition-all duration-300"
          >
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mb-5 tracking-tight">4. Security & Data Retention</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#fbfbfb] border border-black/5">
                <CheckCircle2 size={18} className="text-[#22c55e] flex-shrink-0 mt-0.5" />
                <span className="text-sm text-neutral-600 font-light"><strong>Zero Monetization:</strong> We never sell, rent, or trade your personal data to third-party advertisers.</span>
              </div>
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#fbfbfb] border border-black/5">
                <Lock size={18} className="text-[#e5a93c] flex-shrink-0 mt-0.5" />
                <span className="text-sm text-neutral-600 font-light"><strong>Encryption Standards:</strong> Data is protected using TLS 1.3 / AES-256 encryption protocols on secure servers.</span>
              </div>
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#fbfbfb] border border-black/5">
                <Clock size={18} className="text-[#3b82f6] flex-shrink-0 mt-0.5" />
                <span className="text-sm text-neutral-600 font-light"><strong>180-Day Post-Deletion Retention:</strong> Upon account cancellation, data is retained for up to <strong>180 days</strong> to satisfy legal obligations, prevent fraud, and resolve disputes, after which it is permanently deleted or anonymized.</span>
              </div>
            </div>
          </motion.section>

          {/* Section 5: Grievance Officer & Contact */}
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
                  <span className="text-xs uppercase tracking-widest text-[#e5a93c] font-bold">Grievance & Legal Officer</span>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-1">BLACKORIGINX Grievance Redressal</h3>
                <p className="text-xs text-neutral-600 font-light mb-1">Official Email: `nodalofficer@torkk.bike`</p>
                <p className="text-xs text-neutral-600 font-light">Support: `support@torkk.in` | Corporate: `contact@blackoriginx.com`</p>
              </div>

              <a
                href="mailto:nodalofficer@torkk.bike"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#b87333] to-[#e5a93c] text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-xl transition-all"
              >
                <Mail size={16} /> Contact Grievance Officer
              </a>
            </div>
          </motion.section>
        </div>
      </Container>
    </main>
  );
}

