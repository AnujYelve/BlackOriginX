"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { MapPin, Phone, Mail, CheckCircle2, AlertCircle, ArrowRight, Sparkles } from "lucide-react";

export default function ContactContent() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiryType: "general",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
          template_id: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
          user_id: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
          template_params: {
            name: formData.name,
            from_name: formData.name,
            email: formData.email,
            from_email: formData.email,
            reply_to: formData.email,
            inquiryType: formData.inquiryType,
            inquiry_type: formData.inquiryType,
            message: formData.message
          }
        }),
      });

      if (res.ok) {
        setStatus("success");
        // Store in DB asynchronously (non-blocking)
        fetch("/api/contact/store", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            inquiryType: formData.inquiryType,
            message: formData.message,
          }),
        }).catch((err) => console.error("Failed to store message in DB:", err));

        setFormData({ name: "", email: "", inquiryType: "general", message: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col min-h-screen pt-32 pb-24 bg-brand-black">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 px-4 sm:px-0">

          {/* Contact Details Column */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div>
              <motion.span variants={fadeInUp} className="text-xs uppercase tracking-[0.25em] text-[#e5a93c] font-bold mb-4 block">
                Office of Partnerships
              </motion.span>
              <motion.h1 variants={fadeInUp} className="text-4xl sm:text-6xl font-black tracking-tighter mb-6 text-brand-white">
                Get In Touch
              </motion.h1>
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "80px", opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="h-[3px] bg-gradient-to-r from-[#b87333] to-[#e5a93c] rounded-full mb-10"
                style={{ filter: "drop-shadow(0 2px 5px rgba(229, 169, 60, 0.4))" }}
              />
              <motion.p variants={fadeInUp} className="text-base md:text-lg text-brand-light-grey mb-12 font-light leading-relaxed">
                Connect with BlackOriginX. Whether exploring venture partnership models, co-incubation strategies, institutional investment avenues, or press inquiries, our advisory office is ready to evaluate your proposal.
              </motion.p>

              {/* Information Cards */}
              <div className="flex flex-col gap-6 mb-12">
                {[
                  { icon: Mail, label: "Email Address", val: "contact@blackoriginx.com", href: "mailto:contact@blackoriginx.com" },
                  { icon: MapPin, label: "Headquarters", val: "Gurugram, Haryana", href: null }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    variants={fadeInUp}
                    className="flex items-center gap-4 group bg-black/[0.02] border border-black/5 p-4 rounded-2xl hover:border-black/10 hover:bg-black/[0.03] transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-black/[0.03] border border-black/8 flex items-center justify-center flex-shrink-0 text-brand-light-grey group-hover:text-[#e5a93c] transition-all duration-300 group-hover:scale-105">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold tracking-widest text-brand-light-grey uppercase mb-0.5">{item.label}</h4>
                      {item.href ? (
                        <a href={item.href} className="text-sm md:text-base text-brand-white hover:text-brand-white transition-colors font-medium">
                          {item.val}
                        </a>
                      ) : (
                        <p className="text-sm md:text-base text-brand-white font-medium">{item.val}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Social handles block */}
            <motion.div variants={fadeInUp} className="mb-12">
              <h4 className="text-xs font-bold uppercase tracking-widest text-brand-light-grey mb-4">Follow us on Socials</h4>
              <div className="flex gap-4">
                {[
                  {
                    icon: (
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.77a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26Z" />
                      </svg>
                    ),
                    link: "https://www.linkedin.com/showcase/blackoriginx/",
                    label: "LinkedIn",
                    brandStyle: "text-[#0A66C2] bg-[#0A66C2]/10 border-[#0A66C2]/25 hover:bg-[#0A66C2]/20"
                  },
                  {
                    icon: (
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    ),
                    link: "https://x.com/blackoriginx_",
                    label: "X",
                    brandStyle: "text-brand-white bg-brand-white/10 border-brand-white/20 hover:bg-brand-white/20"
                  },
                  {
                    icon: (
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    ),
                    link: "https://www.instagram.com/blackoriginx",
                    label: "Instagram",
                    brandStyle: "text-[#E4405F] bg-[#E4405F]/10 border-[#E4405F]/25 hover:bg-[#E4405F]/20"
                  }
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-11 h-11 rounded-xl border flex items-center justify-center ${social.brandStyle} transition-all hover:scale-110 active:scale-95 shadow-sm`}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Embedded Google Map Component */}
            <motion.div
              variants={fadeInUp}
              className="w-full h-72 rounded-3xl overflow-hidden border border-black/10 shadow-xl relative group"
            >
              <a
                href="https://www.google.com/maps/place/Gurugram,+Haryana"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-3 left-3 z-10 bg-white/90 hover:bg-white text-blue-600 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-md border border-black/10 flex items-center gap-1.5 backdrop-blur-sm transition-all hover:scale-105"
              >
                Open in Maps
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112239.5!2d76.96!3d28.4594965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19d582e38859%3A0x2cf5fe8e5c64b1e!2sGurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full pointer-events-auto filter saturate-[1.1]"
              />
            </motion.div>
          </motion.div>

          {/* Form Content Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="bg-black/[0.01] border border-black/5 rounded-3xl p-8 md:p-12 backdrop-blur-md shadow-2xl relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-[#e5a93c]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

              <h3 className="text-3xl font-black mb-8 text-brand-white flex items-center gap-3">
                Send a Message <Sparkles size={20} className="text-[#e5a93c]" />
              </h3>

              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center py-16 text-center h-[420px]"
                  >
                    <CheckCircle2 className="w-16 h-16 text-green-400 mb-6 animate-pulse" />
                    <h4 className="text-2xl font-bold mb-2 text-brand-white">Message Transmitted</h4>
                    <p className="text-brand-light-grey/70 mb-8 max-w-sm font-light">Thank you for reaching out. Our partnerships advisory panel will review and respond shortly.</p>
                    <Button
                      variant="outline"
                      onClick={() => setStatus("idle")}
                      className="rounded-full border-black/10 hover:border-black/35 text-brand-white"
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
                    {status === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-400 text-sm"
                      >
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <p>Something went wrong. Please check your inputs and try again.</p>
                      </motion.div>
                    )}

                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-xs font-semibold tracking-wider text-brand-light-grey uppercase">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="input-premium focus:ring-1 focus:ring-[#e5a93c]/35 px-4 py-3 text-sm font-light"
                        placeholder="Ram"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-xs font-semibold tracking-wider text-brand-light-grey uppercase">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="input-premium focus:ring-1 focus:ring-[#e5a93c]/35 px-4 py-3 text-sm font-light"
                        placeholder="Ram@company.com"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="inquiryType" className="text-xs font-semibold tracking-wider text-brand-light-grey uppercase">Inquiry Type</label>
                      <div className="relative">
                        <select
                          id="inquiryType"
                          name="inquiryType"
                          value={formData.inquiryType}
                          onChange={handleInputChange}
                          className="w-full input-premium focus:ring-1 focus:ring-[#e5a93c]/35 appearance-none pr-10 cursor-pointer px-4 py-3 text-sm font-light"
                        >
                          <option value="general">General Partnership Inquiry</option>
                          <option value="investment">Venture Capital & Investment</option>
                          <option value="partnership">Brand Co-Incubation</option>
                          <option value="media">Media & Press Relations</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-brand-light-grey">
                          <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="message" className="text-xs font-semibold tracking-wider text-brand-light-grey uppercase">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="input-premium focus:ring-1 focus:ring-[#e5a93c]/35 resize-none px-4 py-3 text-sm font-light"
                        placeholder="How can we build together?"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full mt-4 rounded-full bg-gradient-to-r from-[#b87333] to-[#e5a93c] text-white border-0 shadow-lg shadow-[#b87333]/10 hover:shadow-[#b87333]/25 flex items-center justify-center gap-2 hover:scale-[1.01] transition-all"
                      disabled={status === "submitting"}
                    >
                      {status === "submitting" ? "Transmitting..." : "Send Message"}
                      {status !== "submitting" && <ArrowRight size={16} />}
                    </Button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </Container>
    </div>
  );
}
