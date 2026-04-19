"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Sidebar from "@/components/layout/Sidebar";
import { Calculator, TrendingUp, Zap, ArrowRight } from "lucide-react";
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

type Results = {
  breakEvenDays: number;
  monthlyReward: number;
  yearlyReward: number;
  bestAction: string;
  roi: number;
};

export default function CalculatorPage() {
  const { address } = useAccount();
  const [miners, setMiners] = useState(3);
  const [dailyReward, setDailyReward] = useState(3.4);
  const [upgradeCost, setUpgradeCost] = useState(22);
  const [referrals, setReferrals] = useState(2);
  const [results, setResults] = useState<Results | null>(null);

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

  // Pre-fill daily reward based on real balance
  useEffect(() => {
    if (balance && decimals) {
      const realBalance = parseFloat(formatUnits(balance, decimals));
      const estimatedDailyReward = parseFloat((realBalance * 0.014).toFixed(2));
      if (estimatedDailyReward > 0) {
        setDailyReward(estimatedDailyReward);
      }
    }
  }, [balance, decimals]);

  const calculate = () => {
    const totalDailyReward = dailyReward * miners + referrals * 0.5;
    const monthlyReward = totalDailyReward * 30;
    const yearlyReward = totalDailyReward * 365;
    const breakEvenDays = totalDailyReward > 0 ? Math.ceil(upgradeCost / totalDailyReward) : 0;
    const roi =
      upgradeCost > 0
        ? parseFloat(((yearlyReward / upgradeCost) * 100).toFixed(1))
        : 0;

    setResults({
      breakEvenDays,
      monthlyReward,
      yearlyReward,
      bestAction:
        totalDailyReward < 5
          ? "Consider upgrading your miners or increasing referrals."
          : "Keep mining and reinvest rewards for better ROI.",
      roi,
    });
  };

  return (
    <div className="flex min-h-screen bg-[#0A0A0A]">
      <Sidebar />
      <main className="flex-1 ml-60 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">ROI Calculator</h1>
          <p className="text-sm text-gray-500 mt-1">
            Calculate break-even days, monthly rewards, and best next actions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Inputs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-[#1F1F1F] bg-[#111111] p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <Calculator className="w-5 h-5 text-[#FF0033]" />
              <h2 className="font-semibold text-white">Your Mining Setup</h2>
            </div>

            <div className="flex flex-col gap-5">
              {/* Miners */}
              <div>
                <label className="text-sm text-gray-400 mb-2 block">
                  Number of Miners
                </label>
                <input
                  type="number"
                  value={miners}
                  onChange={(e) => setMiners(Number(e.target.value))}
                  min={1}
                  max={20}
                  className="w-full bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#FF0033]/50 transition-colors"
                />
              </div>

              {/* Daily Reward */}
              <div>
                <label className="text-sm text-gray-400 mb-2 block">
                  Daily Reward (hCASH)
                </label>
                <input
                  type="number"
                  value={dailyReward}
                  onChange={(e) => setDailyReward(Number(e.target.value))}
                  min={0}
                  step={0.1}
                  className="w-full bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#FF0033]/50 transition-colors"
                />
              </div>

              {/* Upgrade Cost */}
              <div>
                <label className="text-sm text-gray-400 mb-2 block">
                  Upgrade Cost (hCASH)
                </label>
                <input
                  type="number"
                  value={upgradeCost}
                  onChange={(e) => setUpgradeCost(Number(e.target.value))}
                  min={0}
                  className="w-full bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#FF0033]/50 transition-colors"
                />
              </div>

              {/* Referrals */}
              <div>
                <label className="text-sm text-gray-400 mb-2 block">
                  Active Referrals
                </label>
                <input
                  type="number"
                  value={referrals}
                  onChange={(e) => setReferrals(Number(e.target.value))}
                  min={0}
                  className="w-full bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#FF0033]/50 transition-colors"
                />
              </div>

              {/* Calculate Button */}
              <button
                onClick={calculate}
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#FF0033] hover:bg-[#FF0033]/80 text-white font-semibold rounded-lg transition-all duration-200 shadow-neon"
              >
                Calculate ROI <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Results */}
          <div className="flex flex-col gap-4">
            {!results ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-xl border border-[#1F1F1F] bg-[#111111] p-6 flex flex-col items-center justify-center h-full text-center gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-[#FF0033]/10 flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-[#FF0033]" />
                </div>
                <p className="text-gray-400 text-sm">
                  Fill in your mining setup and click Calculate to see your ROI breakdown.
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-4"
              >
                {/* Stat cards */}
                {[
                  {
                    label: "Break-even Days",
                    value: `${results.breakEvenDays} days`,
                    color: "text-[#FF0033]",
                    bg: "bg-[#FF0033]/10",
                  },
                  {
                    label: "Monthly Reward",
                    value: `${results.monthlyReward.toFixed(1)} hCASH`,
                    color: "text-green-400",
                    bg: "bg-green-400/10",
                  },
                  {
                    label: "Yearly Reward",
                    value: `${results.yearlyReward.toFixed(1)} hCASH`,
                    color: "text-blue-400",
                    bg: "bg-blue-400/10",
                  },
                  {
                    label: "Annual ROI",
                    value: `${results.roi}%`,
                    color: "text-yellow-400",
                    bg: "bg-yellow-400/10",
                  },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center justify-between rounded-xl border border-[#1F1F1F] bg-[#111111] px-6 py-4"
                  >
                    <span className="text-sm text-gray-400">{stat.label}</span>
                    <span className={`text-xl font-bold ${stat.color}`}>
                      {stat.value}
                    </span>
                  </motion.div>
                ))}

                {/* Best Action */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="rounded-xl border border-[#FF0033]/20 bg-[#FF0033]/5 p-5"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-[#FF0033]" />
                    <span className="text-sm font-semibold text-white">
                      Best Next Action
                    </span>
                  </div>
                  <p className="text-sm text-gray-300">{results.bestAction}</p>
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}