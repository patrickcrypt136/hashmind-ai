"use client";
import { motion } from "framer-motion";
import { Brain, TrendingUp, Users, RefreshCw } from "lucide-react";

const recommendations = [
  {
    icon: <TrendingUp className="w-4 h-4" />,
    title: "Upgrade Miner Titan",
    description: "Highest output increase. Reaches ROI in 6 days.",
    badge: "+18% ROI",
    color: "text-[#FF0033]",
    bg: "bg-[#FF0033]/10",
    border: "border-[#FF0033]/20",
  },
  {
    icon: <Users className="w-4 h-4" />,
    title: "Launch Referral Campaign",
    description: "3 active referrals adds 0.9 hCASH/day passively.",
    badge: "+0.9/day",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/20",
  },
  {
    icon: <RefreshCw className="w-4 h-4" />,
    title: "Reinvest 30% of Rewards",
    description: "Compound growth accelerates break-even by 11 days.",
    badge: "-11 days",
    color: "text-green-400",
    bg: "bg-green-400/10",
    border: "border-green-400/20",
  },
];

export default function Recommendations() {
  return (
    <div className="rounded-xl border border-[#1F1F1F] bg-[#111111] p-6">
      <div className="flex items-center gap-2 mb-1">
        <Brain className="w-4 h-4 text-[#FF0033]" />
        <h3 className="font-semibold text-white">AI Recommendations</h3>
      </div>
      <p className="text-xs text-gray-500 mb-6">Personalized strategy from HashMind AI</p>

      <div className="flex flex-col gap-3">
        {recommendations.map((rec, i) => (
          <motion.div
            key={rec.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className={`flex items-start justify-between p-4 rounded-lg border ${rec.border} ${rec.bg}`}
          >
            <div className="flex items-start gap-3">
              <div className={`${rec.color} mt-0.5`}>{rec.icon}</div>
              <div>
                <div className="text-sm font-semibold text-white">{rec.title}</div>
                <div className="text-xs text-gray-400 mt-0.5">{rec.description}</div>
              </div>
            </div>
            <span className={`text-xs font-bold ${rec.color} whitespace-nowrap ml-4`}>
              {rec.badge}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}