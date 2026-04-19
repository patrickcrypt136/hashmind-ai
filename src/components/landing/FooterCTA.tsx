"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

export default function FooterCTA() {
  return (
    <section className="py-24 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto text-center rounded-2xl border border-[#FF0033]/20 bg-[#FF0033]/5 p-12 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-radial from-[#FF0033]/10 to-transparent pointer-events-none" />
        <Zap className="w-10 h-10 text-[#FF0033] mx-auto mb-6" />
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Start Winning With HashGenius AI Today
        </h2>
        <p className="text-gray-400 mb-8">
          Join thousands of Club HashCash players already using AI to maximize
          their mining rewards.
        </p>
        <Link href="/dashboard">
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF0033] hover:bg-[#FF0033]/80 text-white font-bold rounded-lg transition-all duration-200 shadow-neon text-lg">
            Launch App <ArrowRight className="w-5 h-5" />
          </button>
        </Link>
      </motion.div>

      {/* Bottom footer */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-[#1F1F1F] flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-[#FF0033]" />
          <span>HashGenius AI</span>
        </div>
        <span>© 2026 HashGenius. Built for Club HashCash players.</span>
      </div>
    </section>
  );
}