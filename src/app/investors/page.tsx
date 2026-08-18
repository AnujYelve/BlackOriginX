"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import {
  TrendingUp,
  Shield,
  Zap,
  Target,
  Users,
  Compass,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Sparkles,
  Building,
  DollarSign,
  Globe,
  X,
} from "lucide-react";
import Link from "next/link";

export default function InvestorsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    country: "",
    investmentType: "Venture Capital",
    investmentSize: "$500k - $2M",
    message: "",
    preferredDate: "",
    preferredTime: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/investors/meeting", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const json = await res.json();
      if (json.success) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-brand-black">
      {/* 1. Premium Hero Section */}
      <section className="relative w-full min-h-[85vh] flex items-center justify-center pt-28 pb-20 overflow-hidden bg-brand-black">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-radial from-[#b87333]/15 via-[#e5a93c]/5 to-transparent blur-[120px] pointer-events-none" />

        <Container>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center max-w-4xl mx-auto px-4"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.25em] text-[#e5a93c] bg-[#b87333]/10 border border-[#b87333]/25 mb-6"
            >
              <Sparkles size={14} /> For Investors
            </motion.span>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-7xl font-black tracking-tight text-brand-white mb-8 leading-[1.1]"
            >
              Building India&apos;s Future Mobility Ecosystem.
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg sm:text-xl text-brand-light-grey font-light leading-relaxed max-w-2xl mx-auto mb-10"
            >
              BlackOriginX scales technology-driven, high-margin mobility ventures designed for generational value creation and sustainable market leadership.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setModalOpen(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#b87333] to-[#e5a93c] text-white font-semibold text-base shadow-xl shadow-[#b87333]/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <Calendar size={18} /> Schedule Meeting
              </button>
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-4 rounded-full border border-black/15 text-brand-white font-semibold text-base hover:bg-black/[0.04] hover:border-black/30 transition-all flex items-center justify-center gap-2"
              >
                Contact Founder <ArrowRight size={18} />
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* 2. Key Investment Highlights Grid */}
      <section className="py-24 border-t border-black/5 bg-black/[0.01]">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16 px-4">
            <h2 className="text-3xl font-black tracking-tight text-brand-white mb-4">
              Strategic Investment Pillars
            </h2>
            <p className="text-sm text-brand-light-grey/70 font-light">
              Structured for scalability, high capital efficiency, and rapid market penetration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 sm:px-0">
            {[
              {
                icon: TrendingUp,
                title: "Venture Scaling Model",
                desc: "Shared R&D, supply chain, and brand incubation infrastructure lowers customer acquisition cost and accelerates time-to-market.",
              },
              {
                icon: Zap,
                title: "Clean Energy Integration",
                desc: "Direct alignment with India's EV adoption mandate and sustainable smart mobility infrastructure growth.",
              },
              {
                icon: Shield,
                title: "Governance & Transparency",
                desc: "Institutional-grade financial reporting, independent advisory board, and strict risk compliance.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-black/[0.01] border border-black/8 rounded-3xl p-8 hover:border-[#b87333]/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#b87333]/15 to-[#e5a93c]/5 border border-[#b87333]/20 flex items-center justify-center text-[#e5a93c] mb-6">
                  <item.icon size={22} />
                </div>
                <h3 className="text-xl font-bold text-brand-white mb-3">{item.title}</h3>
                <p className="text-sm text-brand-light-grey/70 font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. Corporate Growth & Long-Term Strategy */}
      <section className="py-24 border-t border-black/5">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center px-4 sm:px-0">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-[0.2em] text-[#e5a93c] font-bold">
                Long-Term Vision
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-brand-white tracking-tight leading-tight">
                Capital Deployment & Expansion Roadmap
              </h2>
              <p className="text-base text-brand-light-grey font-light leading-relaxed">
                BlackOriginX operates at the intersection of Hardware Engineering, Embedded Systems, and Clean Energy software.
              </p>
              <div className="space-y-4 pt-4">
                {[
                  "Phased capital deployment across high-yield product lines",
                  "Direct-to-consumer and B2B fleet operator distribution channels",
                  "Proprietary battery management & telemetry software stack",
                  "Modular manufacturing partnership frameworks",
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-[#e5a93c] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-brand-white/80 font-medium">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 bg-gradient-to-br from-[#111111] to-[#0a0a0a] themed-card border border-black/10 rounded-3xl p-8 sm:p-12 shadow-2xl relative">
              <h3 className="text-2xl font-bold text-brand-white mb-6">Schedule Investor Briefing</h3>
              <p className="text-sm text-brand-light-grey/70 font-light mb-8">
                Connect directly with our leadership team for confidential investment decks, financial models, and growth projections.
              </p>
              <button
                onClick={() => setModalOpen(true)}
                className="w-full py-4 rounded-full bg-gradient-to-r from-[#b87333] to-[#e5a93c] text-white font-semibold text-sm shadow-xl flex items-center justify-center gap-2 hover:scale-[1.01] transition-transform"
              >
                <Calendar size={16} /> Request Meeting Slots
              </button>
            </div>
          </div>
        </Container>
      </section>

      {/* Schedule Meeting Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
              onClick={() => setModalOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-2xl themed-card bg-[#111111] border border-white/10 rounded-3xl p-8 md:p-10 text-brand-white shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-brand-white/50 hover:text-brand-white transition-all"
              >
                <X size={18} />
              </button>

              <h3 className="text-2xl font-black text-brand-white mb-2">Schedule Investor Meeting</h3>
              <p className="text-xs text-brand-light-grey/60 mb-6">
                Fill out the request form below. Our founder&apos;s office will review and confirm.
              </p>

              {status === "success" ? (
                <div className="text-center py-12 space-y-4">
                  <CheckCircle2 size={48} className="text-green-400 mx-auto animate-bounce" />
                  <h4 className="text-xl font-bold">Request Received</h4>
                  <p className="text-sm text-brand-light-grey/70 max-w-sm mx-auto font-light">
                    Thank you. Our investor relations office will get back to you with confirmed meeting details within 24 hours.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setStatus("idle");
                      setModalOpen(false);
                    }}
                    className="rounded-full mt-4"
                  >
                    Close Window
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {status === "error" && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                      Failed to submit. Please check inputs and try again.
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-brand-light-grey/50 mb-1.5 block">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Ram"
                        className="input-premium px-4 py-2.5 text-xs w-full"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-brand-light-grey/50 mb-1.5 block">Company / Fund</label>
                      <input
                        type="text"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        placeholder="Venture Capital Fund"
                        className="input-premium px-4 py-2.5 text-xs w-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-brand-light-grey/50 mb-1.5 block">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="Ram@fund.com"
                        className="input-premium px-4 py-2.5 text-xs w-full"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-brand-light-grey/50 mb-1.5 block">Phone Number</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="input-premium px-4 py-2.5 text-xs w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-brand-light-grey/50 mb-1.5 block">Country</label>
                    <input
                      type="text"
                      value={form.country}
                      onChange={(e) => setForm({ ...form, country: e.target.value })}
                      placeholder="India"
                      className="input-premium px-4 py-2.5 text-xs w-full"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-brand-light-grey/50 mb-1.5 block">Preferred Date</label>
                      <input
                        type="date"
                        value={form.preferredDate}
                        onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
                        className="input-premium px-4 py-2.5 text-xs w-full cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-brand-light-grey/50 mb-1.5 block">Preferred Time</label>
                      <input
                        type="text"
                        value={form.preferredTime}
                        onChange={(e) => setForm({ ...form, preferredTime: e.target.value })}
                        placeholder="e.g. 2:00 PM, Afternoon"
                        className="input-premium px-4 py-2.5 text-xs w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-brand-light-grey/50 mb-1.5 block">Investment Goals / Message</label>
                    <textarea
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Share brief context..."
                      className="input-premium px-4 py-2.5 text-xs w-full resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#b87333] to-[#e5a93c] text-white font-semibold text-sm shadow-xl flex items-center justify-center gap-2 hover:scale-[1.01] transition-transform disabled:opacity-50 mt-4"
                  >
                    {status === "submitting" ? "Submitting..." : "Submit Meeting Request"}
                    {status !== "submitting" && <ArrowRight size={16} />}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
