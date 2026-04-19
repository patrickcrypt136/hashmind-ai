"use client";
import { motion } from "framer-motion";
import { Wallet, Zap, TrendingUp, Users } from "lucide-react";
import { mockWallet } from "@/data/mock";

const stats = [
  {
    label: "Wallet Balance",
    value: `${mockWallet.balance} hCASH`,
    icon: <Wallet className="w-5 h-5" />,
    color: "text-[#FF0033]",
    bg: "bg-[#FF0033]/10",
    change: "+12.4%",
  },
  {
    label: "hCASH Rewards / Day",
    value: `${mockWallet.dailyRewards} hCASH`,
    icon: <Zap className="w-5 h-5" />,
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
    change: "+5.2%",
  },
  {
    label: "Miner Efficiency Score",
    value: `${mockWallet.efficiencyScore}/100`,
    icon: <TrendingUp className="w-5 h-5" />,
    color: "text-green-400",
    bg: "bg-green-400/10",
    change: "+3.1%",
  },
  {
    label: "Referral Earnings",
    value: `${mockWallet.referralEarnings} hCASH/day`,
    icon: <Users className="w-5 h-5" />,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    change: "+8.7%",
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          whileHover={{ y: -4 }}
          className="rounded-xl border border-[#1F1F1F] bg-[#111111] p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-400">{stat.label}</span>
            <div className={`${stat.bg} ${stat.color} p-2 rounded-lg`}>
              {stat.icon}
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
          <div className="text-xs text-green-400">{stat.change} this week</div>
        </motion.div>
      ))}
    </div>
  );
}