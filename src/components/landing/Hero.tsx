"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, TrendingUp, Zap, Users } from "lucide-react";

const statsData = [
  { label: "Active Miners", value: "12,400+" },
  { label: "hCASH Distributed", value: "890K+" },
  { label: "Avg ROI Boost", value: "+34%" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-40" />

      {/* Red glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF0033]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — Text */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#FF0033]/30 bg-[#FF0033]/10 text-[#FF0033] text-xs font-medium mb-6"
            >
              <Zap className="w-3 h-3" />
              AI-Powered Mining Strategy
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              Mine Smarter.{" "}
              <span className="text-[#FF0033]">Earn Faster.</span>{" "}
              Dominate HashCash.
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-400 text-lg mb-8 leading-relaxed"
            >
              AI-powered strategy assistant that helps Club HashCash players
              maximize mining rewards, referrals, and upgrades — all in one
              premium dashboard.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Link href="/dashboard">
                <button className="flex items-center justify-center gap-2 px-6 py-3 bg-[#FF0033] hover:bg-[#FF0033]/80 text-white font-semibold rounded-lg transition-all duration-200 shadow-neon w-full sm:w-auto">
                  Launch App <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <button className="flex items-center justify-center gap-2 px-6 py-3 border border-[#1F1F1F] hover:border-[#FF0033]/50 text-gray-300 font-semibold rounded-lg transition-all duration-200 w-full sm:w-auto">
                <Play className="w-4 h-4 text-[#FF0033]" /> Watch Demo
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-3 gap-6"
            >
              {statsData.map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Animated Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Glow behind card */}
              <div className="absolute inset-0 bg-[#FF0033]/10 rounded-2xl blur-2xl" />

              {/* Main card */}
              <div className="relative rounded-2xl border border-[#1F1F1F] bg-[#111111] p-6 shadow-card">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm font-semibold text-gray-300">Live Dashboard</span>
                  <span className="flex items-center gap-1 text-xs text-green-400">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    Live
                  </span>
                </div>

                {/* Mock stat rows */}
                {[
                  { label: "Wallet Balance", value: "245 hCASH", icon: <Zap className="w-4 h-4 text-[#FF0033]" /> },
                  { label: "Daily Rewards", value: "3.4 hCASH", icon: <TrendingUp className="w-4 h-4 text-green-400" /> },
                  { label: "Referral Earnings", value: "0.8 hCASH/day", icon: <Users className="w-4 h-4 text-blue-400" /> },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between py-3 border-b border-[#1F1F1F] last:border-0">
                    <div className="flex items-center gap-2">
                      {row.icon}
                      <span className="text-sm text-gray-400">{row.label}</span>
                    </div>
                    <span className="text-sm font-bold text-white">{row.value}</span>
                  </div>
                ))}

                {/* Mock bar chart */}
                <div className="mt-6">
                  <div className="text-xs text-gray-500 mb-3">Weekly Rewards</div>
                  <div className="flex items-end gap-2 h-16">
                    {[60, 75, 65, 85, 90, 80, 88].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                        className="flex-1 rounded-t bg-[#FF0033]/60 hover:bg-[#FF0033] transition-colors"
                      />
                    ))}
                  </div>
                  <div className="flex justify-between mt-1">
                    {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                      <span key={i} className="text-[10px] text-gray-600 flex-1 text-center">{d}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}