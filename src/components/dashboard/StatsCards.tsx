"use client";
import { motion } from "framer-motion";
import { Wallet, Zap, TrendingUp, Users } from "lucide-react";
import { useAccount, useReadContract } from "wagmi";
import { formatUnits } from "viem";
import { mockWallet } from "@/data/mock";

const HCASH_CONTRACT = "0xBa5444409257967E5E50b113C395A766B0678C03";

const ERC20_ABI = [
  {
    name: "balanceOf",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "decimals",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint8" }],
  },
] as const;

export default function StatsCards() {
  const { address, isConnected } = useAccount();

  const { data: balance } = useReadContract({
    address: HCASH_CONTRACT,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  const { data: decimals } = useReadContract({
    address: HCASH_CONTRACT,
    abi: ERC20_ABI,
    functionName: "decimals",
    query: { enabled: !!address },
  });

  const realBalance =
    balance && decimals
      ? parseFloat(formatUnits(balance, decimals)).toFixed(2)
      : null;

  const dailyReward = isConnected
  ? (parseFloat(realBalance ?? "0") * 0.014).toFixed(2)
  : mockWallet.dailyRewards;

const referralEarnings = isConnected
  ? (parseFloat(realBalance ?? "0") * 0.003).toFixed(2)
  : mockWallet.referralEarnings;

const efficiencyScore = isConnected
  ? Math.min(99, Math.floor(50 + parseFloat(realBalance ?? "0") / 10))
  : mockWallet.efficiencyScore;
  const stats = [
    {
      label: "Wallet Balance",
      value: isConnected
      ? `${realBalance ?? "0.00"} hCASH`
      : `${mockWallet.balance} hCASH`,
      icon: <Wallet className="w-5 h-5" />,
      color: "text-[#FF0033]",
      bg: "bg-[#FF0033]/10",
      change: isConnected ? "Live balance" : "+12.4% this week",
    },
    {
      label: "hCASH Rewards / Day",
      value: `${dailyReward} hCASH`,
      icon: <Zap className="w-5 h-5" />,
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
      change: "+5.2% this week",
    },
    {
      label: "Miner Efficiency Score",
      value: `${efficiencyScore}/100`,
      icon: <TrendingUp className="w-5 h-5" />,
      color: "text-green-400",
      bg: "bg-green-400/10",
      change: "+3.1% this week",
    },
    {
      label: "Referral Earnings",
      value: `${referralEarnings} hCASH/day`,
      icon: <Users className="w-5 h-5" />,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      change: "+8.7% this week",
    },
  ];

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
          <div className="text-xs text-green-400">{stat.change}</div>
        </motion.div>
      ))}
    </div>
  );
}