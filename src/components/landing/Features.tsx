"use client";
import { motion } from "framer-motion";
import { Brain, Calculator, Wallet, Users } from "lucide-react";

const features = [
  {
    icon: <Brain className="w-6 h-6" />,
    title: "AI Mining Advisor",
    description: "Get personalized upgrade recommendations and strategy insights powered by Gemini AI.",
    color: "text-[#FF0033]",
    glow: "group-hover:shadow-neon",
  },
  {
    icon: <Calculator className="w-6 h-6" />,
    title: "ROI Calculator",
    description: "Calculate break-even days, monthly estimates, and best next actions for your miners.",
    color: "text-blue-400",
    glow: "group-hover:shadow-[0_0_20px_#3b82f640]",
  },
  {
    icon: <Wallet className="w-6 h-6" />,
    title: "Wallet Analytics",
    description: "Track your hCASH balance, NFT miners, and earnings history in real time.",
    color: "text-purple-400",
    glow: "group-hover:shadow-[0_0_20px_#a855f740]",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Referral Growth Engine",
    description: "Optimize your referral strategy and track earnings from your network automatically.",
    color: "text-green-400",
    glow: "group-hover:shadow-[0_0_20px_#22c55e40]",
  },
];

export default function Features() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Everything You Need to{" "}
          <span className="text-[#FF0033]">Dominate</span>
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto">
          HashGenius combines real-time analytics, AI strategy, and wallet
          intelligence into one powerful platform.
        </p>
      </motion.div>

      {/* Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -6 }}
            className={`group relative rounded-xl border border-[#1F1F1F] bg-[#111111] p-6 cursor-pointer transition-all duration-300 ${feature.glow}`}
          >
            <div className={`${feature.color} mb-4`}>{feature.icon}</div>
            <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}