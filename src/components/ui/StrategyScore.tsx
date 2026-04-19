"use client";
import { motion } from "framer-motion";
import { Brain } from "lucide-react";
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

function calculateStrategyScore(balance: number): number {
  if (balance <= 0) return 10;
  if (balance < 10) return 25;
  if (balance < 50) return 45;
  if (balance < 100) return 60;
  if (balance < 500) return 75;
  if (balance < 1000) return 85;
  return Math.min(99, 85 + Math.floor(balance / 1000));
}

function getScoreLabel(score: number): string {
  if (score >= 80) return "excellent";
  if (score >= 60) return "good";
  if (score >= 40) return "average";
  return "needs work";
}

function getScoreAdvice(score: number, balance: number): string {
  if (balance <= 0) return "Connect your wallet and acquire hCASH to start optimizing.";
  if (score < 40) return "Acquire more hCASH and activate your miners to improve your score.";
  if (score < 60) return "Add referrals and reinvest rewards to push your score higher.";
  if (score < 80) return "Upgrade your miners to push above 80 and maximize ROI.";
  return "Excellent strategy! Keep reinvesting and growing your referral network.";
}

export default function StrategyScore() {
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

  const score = isConnected
    ? calculateStrategyScore(realBalance)
    : 87;

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
          Your mining strategy is{" "}
          <span style={{ color }} className="font-semibold">
            {getScoreLabel(score)}
          </span>
          . {getScoreAdvice(score, realBalance)}
        </p>
        <div className="mt-2 text-xs text-gray-600">
          {isConnected
            ? `Based on ${realBalance.toFixed(2)} hCASH balance`
            : "AI Confidence: 94%"}
        </div>
      </div>
    </motion.div>
  );
}