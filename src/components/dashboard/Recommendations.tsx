"use client";
import { motion } from "framer-motion";
import { Brain, TrendingUp, Users, RefreshCw, Zap } from "lucide-react";
import { useAccount, useReadContract } from "wagmi";
import { formatUnits } from "viem";

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

function getRecommendations(balance: number, isConnected: boolean) {
  if (!isConnected) {
    return [
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
  }

  // Real recommendations based on balance
  const dailyReward = balance * 0.014;
  const monthlyReward = dailyReward * 30;

  if (balance <= 0) {
    return [
      {
        icon: <Zap className="w-4 h-4" />,
        title: "Acquire hCASH Tokens",
        description: "You need hCASH to start mining. Get tokens to activate your miners.",
        badge: "Start now",
        color: "text-[#FF0033]",
        bg: "bg-[#FF0033]/10",
        border: "border-[#FF0033]/20",
      },
      {
        icon: <Users className="w-4 h-4" />,
        title: "Set Up Referral Link",
        description: "Earn passive hCASH by referring new players before you mine.",
        badge: "+30%",
        color: "text-blue-400",
        bg: "bg-blue-400/10",
        border: "border-blue-400/20",
      },
      {
        icon: <Brain className="w-4 h-4" />,
        title: "Ask AI for Strategy",
        description: "Get a personalized plan from HashMind AI to maximize your start.",
        badge: "Free",
        color: "text-green-400",
        bg: "bg-green-400/10",
        border: "border-green-400/20",
      },
    ];
  }

  if (balance < 50) {
    return [
      {
        icon: <RefreshCw className="w-4 h-4" />,
        title: "Reinvest All Rewards",
        description: `Your ${dailyReward.toFixed(2)} hCASH/day compounds faster at this balance tier.`,
        badge: "Max growth",
        color: "text-[#FF0033]",
        bg: "bg-[#FF0033]/10",
        border: "border-[#FF0033]/20",
      },
      {
        icon: <Users className="w-4 h-4" />,
        title: "Get 3 Referrals",
        description: "3 referrals would add 30% to your daily earnings immediately.",
        badge: "+30%/day",
        color: "text-blue-400",
        bg: "bg-blue-400/10",
        border: "border-blue-400/20",
      },
      {
        icon: <TrendingUp className="w-4 h-4" />,
        title: "Reach 50 hCASH",
        description: `You need ${(50 - balance).toFixed(2)} more hCASH to unlock the next reward tier.`,
        badge: "Next tier",
        color: "text-green-400",
        bg: "bg-green-400/10",
        border: "border-green-400/20",
      },
    ];
  }

  return [
    {
      icon: <TrendingUp className="w-4 h-4" />,
      title: "Upgrade Your Top Miner",
      description: `With ${balance.toFixed(2)} hCASH, upgrading now yields ROI in ${Math.ceil(22 / dailyReward)} days.`,
      badge: "+18% ROI",
      color: "text-[#FF0033]",
      bg: "bg-[#FF0033]/10",
      border: "border-[#FF0033]/20",
    },
    {
      icon: <RefreshCw className="w-4 h-4" />,
      title: "Reinvest 30% Monthly",
      description: `Reinvesting ${(monthlyReward * 0.3).toFixed(2)} hCASH/month accelerates your compound growth.`,
      badge: "Compound",
      color: "text-green-400",
      bg: "bg-green-400/10",
      border: "border-green-400/20",
    },
    {
      icon: <Users className="w-4 h-4" />,
      title: "Scale Referral Network",
      description: "5+ referrals creates significant passive income on top of mining.",
      badge: "+0.9/day",
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      border: "border-blue-400/20",
    },
  ];
}

export default function Recommendations() {
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
      ? parseFloat(formatUnits(balance, decimals))
      : 0;

  const recommendations = getRecommendations(realBalance, isConnected);

  return (
    <div className="rounded-xl border border-[#1F1F1F] bg-[#111111] p-6">
      <div className="flex items-center gap-2 mb-1">
        <Brain className="w-4 h-4 text-[#FF0033]" />
        <h3 className="font-semibold text-white">AI Recommendations</h3>
      </div>
      <p className="text-xs text-gray-500 mb-6">
        {isConnected
          ? "Personalized for your current balance"
          : "Personalized strategy from HashMind AI"}
      </p>

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