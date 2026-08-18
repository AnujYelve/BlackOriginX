"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { ShieldCheck, Zap, Activity, Cpu, Sparkles, Check, Server, Database } from "lucide-react";

export default function TorkkContent() {
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistEmail) return;
    setSubmitted(true);
  };

  const specsList = [
    { label: "Data Protocols", value: "MQTT / HTTPS (Geo-JSON payload)" },
    { label: "Edge Latency Rate", value: "< 120ms global synchronization" },
    { label: "Hardware Core", value: "ARM-Cortex M4 32-bit edge controller" },
    { label: "Platform Storage", value: "Distributed serverless ledger + Cache" },
    { label: "Telemetry Metrics", value: "GPS track, speed, state-of-health (SoH), cell thermal limits" },
    { label: "Integration APIs", value: "GraphQL, RESTful endpoints, Webhooks" }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-brand-black">
        {/* Glow Spheres */}
        <div className="absolute bottom-1/4 left-1/4 w-[350px] h-[350px] bg-[#b87333]/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-[350px] h-[350px] bg-[#e5a93c]/10 rounded-full blur-[100px] pointer-events-none" />

        <Container className="relative z-10 flex flex-col items-center justify-center gap-12 py-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl text-center"
          >
            <motion.div variants={fadeInUp} className="mb-4">
              <span className="px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase badge-copper">
                Incubated Venture
              </span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter mb-4 uppercase text-brand-white">
              Torkk
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-copper-gradient font-medium mb-6">
              Fairer Rides. Safer Journeys. 0% Commission.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-base md:text-lg text-brand-light-grey max-w-2xl mx-auto mb-10 font-light leading-relaxed px-4 sm:px-0">
              Torkk is India&apos;s zero-commission, safety-first ride-booking ecosystem by BlackOriginX. Drivers keep 100% of their trip earnings with flexible subscription plans, while passengers enjoy transparent fares with zero surge price manipulation and verified driver partners.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg"
                variant="outline"
                className="gap-2 border border-brand-white/20 hover:!border-transparent hover:!bg-gradient-to-r hover:!from-blue-600 hover:!to-purple-600 hover:!text-white text-brand-white rounded-full transition-all duration-300"
                asChild
              >
                <a href="https://torkk.in/" target="_blank" rel="noopener noreferrer">
                  Visit Torkk.in Official Site
                </a>
              </Button>
              <Button size="lg" variant="outline" className="text-brand-white border-black/20 hover:border-black/50" onClick={() => {
                const element = document.getElementById("specs");
                element?.scrollIntoView({ behavior: "smooth" });
              }}>
                View Platform Tech Specs
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-brand-black/90 relative z-10 border-t border-black/5">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Zap, title: "0% Commission", desc: "Drivers keep 100% of their earnings via transparent subscription plans with no hidden cut." },
              { icon: ShieldCheck, title: "100% Aadhaar Verified", desc: "Background-checked driver partners with biometric safety check-ins for total peace of mind." },
              { icon: Activity, title: "Emergency SOS & Live Tracking", desc: "1-tap direct connection to police control rooms and Torkk rapid dispatch units with live GPS." },
              { icon: Cpu, title: "AI-Based Ride Matching", desc: "Smart AI pairing algorithm connecting commuters with optimal nearby driver partners instantly." }
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group flex flex-col items-center text-center p-8 rounded-3xl bg-black/[0.01] border border-black/5 hover:bg-black/[0.03] hover:border-black/10 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-black/[0.03] border border-black/8 flex items-center justify-center mb-6 text-brand-light-grey group-hover:text-brand-white transition-all duration-300 group-hover:scale-110 group-hover:bg-black/10">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold mb-3 transition-colors text-brand-white group-hover:text-brand-white">{feature.title}</h4>
                <p className="text-brand-light-grey text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Specifications Section */}
      <section id="specs" className="py-24 bg-brand-dark-grey/10 border-t border-black/5 relative z-10 scroll-mt-20">
        <Container>
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-copper-gradient font-bold mb-2">Technical Specifications</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-brand-white mb-2">Ecosystem Architecture</h2>
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: "80px", opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="h-[3px] bg-gradient-to-r from-[#b87333] to-[#e5a93c] rounded-full mb-8"
              style={{ filter: "drop-shadow(0 2px 5px rgba(229, 169, 60, 0.4))" }}
            />
          </div>

          <div className="max-w-3xl mx-auto rounded-3xl border border-black/5 bg-black/[0.01] p-8 md:p-12 backdrop-blur-sm shadow-xl">
            <div className="flex flex-col divide-y divide-black/5">
              {specsList.map((spec, index) => (
                <div key={index} className="flex justify-between py-4 text-sm font-light">
                  <span className="text-brand-light-grey">{spec.label}</span>
                  <span className="text-brand-white font-semibold text-right">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Product Vision Section */}
      <section className="py-24 border-t border-black/5 overflow-hidden bg-brand-black">
        <Container>
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex-1"
            >
              <span className="text-xs uppercase tracking-[0.25em] text-copper-gradient font-bold mb-2 block">Our Design Philosophy</span>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 tracking-tight text-brand-white">The Torkk Vision</h2>
              <p className="text-brand-light-grey text-base md:text-lg leading-relaxed mb-6 font-light">
                The Torkk engineering thesis centers on open ecosystems. We believe that urban transit data shouldn't be trapped in siloed legacy systems. By building secure APIs and modular edge controllers, we enable city fleet operators to make real-time decisions, reducing grid congestion and energy footprint.
              </p>
              <p className="text-brand-light-grey text-base md:text-lg leading-relaxed font-light">
                Through proprietary machine learning frameworks, low-power IoT designs, and an intuitive user interface, we are building the digital nervous system for modern clean mobility networks.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex-1 w-full relative min-h-[350px] p-8 rounded-3xl overflow-hidden bg-black/[0.01] border border-black/5 flex flex-col justify-center gap-6"
            >
              <div className="absolute top-0 right-0 w-72 h-72 bg-radial from-[#b87333]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-black/[0.03] border border-black/8 flex items-center justify-center text-[#e5a93c]">
                  <Server size={20} />
                </div>
                <h4 className="text-lg font-bold text-brand-white">Edge Integration Dashboard</h4>
              </div>
              <p className="text-xs text-brand-light-grey leading-relaxed font-light mb-4">
                Our fleet telemetry connects directly with city smart grids, providing live charging demand and predictive maintenance analytics.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
                  <span className="text-[11px] font-mono text-brand-white">MQTT Gateway: ONLINE</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-[11px] font-mono text-brand-white">Telemetry Ingest Stream: 4.8k msg/sec</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-amber-400" />
                  <span className="text-[11px] font-mono text-brand-white">API Latency Avg: 98ms</span>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Waitlist Call to Action (Commented Out) */}
      {/*
      <section id="waitlist" className="py-32 relative overflow-hidden cta-mesh-bg border-t border-black/5 scroll-mt-20">
        <Container className="relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6 text-brand-white">Partner Sandbox Waitlist</h2>
            <p className="text-brand-light-grey text-lg mb-10 font-light">
              Join our developer waitlist to receive access to the sandboxed API endpoints, sample telematics datasets, and code integrations.
            </p>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  onSubmit={handleWaitlistSubmit}
                  className="flex flex-col sm:flex-row gap-3 w-full"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <input
                    type="email"
                    required
                    placeholder="Enter your business email address"
                    value={waitlistEmail}
                    onChange={(e) => setWaitlistEmail(e.target.value)}
                    className="flex-1 input-premium rounded-full px-6 py-3 text-brand-white focus:outline-none focus:ring-2 focus:ring-[#e5a93c]/35 transition-all font-light text-sm"
                  />
                  <Button type="submit" size="md" className="rounded-full shadow-lg bg-gradient-to-r from-[#b87333] to-[#e5a93c] text-white border-0">
                    Join Waitlist
                  </Button>
                </motion.form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-4 p-6 rounded-3xl bg-black/[0.02] border border-[#e5a93c]/20"
                >
                  <div className="w-12 h-12 rounded-full bg-[#e5a93c]/10 border border-[#e5a93c]/20 flex items-center justify-center text-[#e5a93c]">
                    <Check size={20} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-brand-white mb-1">Sandbox Token Pending</h4>
                    <p className="text-xs text-brand-light-grey">Verification link and developer keys sent to {waitlistEmail}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </Container>
      </section>
      */}
    </div>
  );
}
