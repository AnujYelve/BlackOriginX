"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { ArrowLeft, Scale, ShieldCheck, AlertTriangle, FileCheck, Gavel, Mail, Building2 } from "lucide-react";

export default function TermsPage() {
  const lastUpdated = "July 22, 2026";

  return (
    <main className="min-h-screen bg-brand-black text-brand-white pt-28 pb-24 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-radial from-[#e5a93c]/15 via-[#b87333]/5 to-transparent blur-3xl pointer-events-none" />

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
            <Scale size={22} className="text-[#e5a93c]" />
            <span className="text-xs uppercase tracking-[0.25em] text-copper-gradient font-bold">Legal & Governance</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight mb-4 text-brand-white">
            Terms of Service
          </h1>
          <div className="h-[3.5px] bg-gradient-to-r from-[#b87333] via-[#e5a93c] to-[#b87333] rounded-full mb-4 w-[120px] shadow-[0_0_12px_#e5a93c]" />
          <div className="flex flex-wrap items-center gap-4 text-xs text-brand-light-grey font-mono">
            <span>Effective Date: {lastUpdated}</span>
            <span>•</span>
            <span>BlackOriginX Private Limited</span>
          </div>
        </motion.div>

        {/* Terms Content Cards (Styled for Light Theme) */}
        <div className="space-y-8">
          {/* Section 1: Agreement */}
          <motion.section
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 sm:p-10 rounded-[28px] bg-white border border-black/5 shadow-[0_15px_35px_rgba(0,0,0,0.05)] hover:border-[#e5a93c]/30 transition-all duration-300"
          >
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mb-5 flex items-center gap-3.5 tracking-tight">
              <div className="w-10 h-10 rounded-xl bg-[#e5a93c]/15 border border-[#e5a93c]/40 flex items-center justify-center text-[#e5a93c] flex-shrink-0">
                <FileCheck size={20} />
              </div>
              1. Acceptance of Terms
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-light mb-4">
              By accessing or utilizing the digital platforms, venture products (including Torkk), corporate communications, or web applications operated by BlackOriginX Private Limited (&quot;BlackOriginX&quot;), you acknowledge and agree to be legally bound by these Terms of Service.
            </p>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-light">
              If you do not agree to these terms, you must refrain from accessing or utilizing our digital ecosystem.
            </p>
          </motion.section>

          {/* Section 2: Intellectual Property */}
          <motion.section
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 sm:p-10 rounded-[28px] bg-white border border-black/5 shadow-[0_15px_35px_rgba(0,0,0,0.05)] hover:border-[#e5a93c]/30 transition-all duration-300"
          >
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mb-5 flex items-center gap-3.5 tracking-tight">
              <div className="w-10 h-10 rounded-xl bg-[#b87333]/15 border border-[#b87333]/40 flex items-center justify-center text-[#e5a93c] flex-shrink-0">
                <ShieldCheck size={20} />
              </div>
              2. Intellectual Property Rights
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-light mb-4">
              All proprietary source code, graphic UI assets, brand logos, trademarks, corporate design systems, and software documentation are the sole intellectual property of BlackOriginX Private Limited.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-neutral-600 text-sm sm:text-base font-light">
              <li>No material from our website or brand assets may be copied, modified, or republished without explicit written authorization.</li>
              <li>Unauthorized commercial usage of the BlackOriginX mark or signature product marks (e.g., Torkk) will be prosecuted under law.</li>
            </ul>
          </motion.section>

          {/* Section 3: Warranties & Disclaimers */}
          <motion.section
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 sm:p-10 rounded-[28px] bg-white border border-black/5 shadow-[0_15px_35px_rgba(0,0,0,0.05)] hover:border-[#e5a93c]/30 transition-all duration-300"
          >
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mb-5 flex items-center gap-3.5 tracking-tight">
              <div className="w-10 h-10 rounded-xl bg-[#f59e0b]/15 border border-[#f59e0b]/40 flex items-center justify-center text-[#f59e0b] flex-shrink-0">
                <AlertTriangle size={20} />
              </div>
              3. Warranties & Limitations
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-light mb-4">
              Our website and venture materials are provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind. BlackOriginX does not warrant that site operations will be uninterrupted or error-free.
            </p>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-light">
              BlackOriginX Private Limited shall not be liable for direct, indirect, incidental, or consequential damages resulting from platform access or technical service downtime.
            </p>
          </motion.section>

          {/* Section 4: Jurisdiction & Legal Desk */}
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
                  <Gavel size={20} className="text-[#e5a93c]" />
                  <span className="text-xs uppercase tracking-widest text-[#e5a93c] font-bold">Governing Law</span>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-1">Gurugram, Haryana Jurisdiction</h3>
                <p className="text-xs text-neutral-600 font-light">Subject exclusively to the courts of Haryana, INDIA</p>
              </div>

              <a
                href="mailto:contact@blackoriginx.com"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#b87333] to-[#e5a93c] text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-xl transition-all"
              >
                <Mail size={16} /> Legal Desk Contact
              </a>
            </div>
          </motion.section>
        </div>
      </Container>
    </main>
  );
}
