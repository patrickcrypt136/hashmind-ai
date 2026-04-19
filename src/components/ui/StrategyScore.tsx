"use client";
import { motion } from "framer-motion";
import { Brain } from "lucide-react";

export default function StrategyScore({ score = 87 }: { score?: number }) {
  const getColor = (s: number) => {
    if (s >= 80) return "#22c55e";
    if (s >= 60) return "#eab308";
    return "#FF0033";
  };

  const color = getColor(score);
  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (score / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-[#1F1F1F] bg-[#111111] p-6 flex items-center gap-6"
    >
      {/* Circle */}
      <div className="relative w-24 h-24 flex-shrink-0">
        <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#1F1F1F" strokeWidth="8" />
          <motion.circle
            cx="50" cy="50" r="40"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-white">{score}</span>
        </div>
      </div>

      {/* Text */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Brain className="w-4 h-4 text-[#FF0033]" />
          <span className="font-semibold text-white text-sm">Strategy Score</span>
        </div>
        <p className="text-xs text-gray-400 leading-relaxed">
          Your mining strategy is <span style={{ color }} className="font-semibold">
            {score >= 80 ? "excellent" : score >= 60 ? "good" : "needs work"}
          </span>. Upgrade Miner Titan to push above 90.
        </p>
        <div className="mt-2 text-xs text-gray-600">
          AI Confidence: <span className="text-gray-300">94%</span>
        </div>
      </div>
    </motion.div>
  );
}