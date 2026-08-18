"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, Lock, ArrowRight, AlertCircle } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
        setLoading(false);
        return;
      }

      router.push(callbackUrl);
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-md mx-4"
    >
      {/* Card */}
      <div className="bg-[#111111] themed-card border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-[#b87333]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-radial from-[#e5a93c]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Logo */}
        <div className="flex justify-center mb-8 relative z-10">
          <Image
            src="/logo.jpg.jpeg"
            alt="BlackOriginX Logo"
            width={160}
            height={40}
            className="object-contain"
            style={{ width: "auto", height: "32px" }}
            priority
          />
        </div>

        {/* Title */}
        <div className="text-center mb-8 relative z-10">
          <h1 className="text-2xl font-black text-white tracking-tight mb-2">
            Admin Dashboard
          </h1>
          <p className="text-sm text-white/50 font-light">
            Sign in to manage your platform
          </p>
        </div>

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-400 text-sm relative z-10"
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative z-10">
          {/* Email */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="admin-email"
              className="text-xs font-semibold tracking-wider text-white/50 uppercase"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="email"
                id="admin-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white font-light placeholder:text-white/25 focus:outline-none focus:border-[#e5a93c]/40 focus:ring-1 focus:ring-[#e5a93c]/20 transition-all"
                placeholder="admin@blackoriginx.com"
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="admin-password"
              className="text-xs font-semibold tracking-wider text-white/50 uppercase"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="password"
                id="admin-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white font-light placeholder:text-white/25 focus:outline-none focus:border-[#e5a93c]/40 focus:ring-1 focus:ring-[#e5a93c]/20 transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full mt-2 h-12 rounded-xl bg-gradient-to-r from-[#b87333] to-[#e5a93c] text-white text-sm font-semibold tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-[#b87333]/20 hover:shadow-[#b87333]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Sign In
                <ArrowRight size={16} />
              </>
            )}
          </motion.button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs text-white/25 mt-8 relative z-10">
          BlackOriginX Admin Panel • Secure Access
        </p>
      </div>
    </motion.div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-8 h-8 border-2 border-[#b87333]/20 border-t-[#b87333] rounded-full animate-spin" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
