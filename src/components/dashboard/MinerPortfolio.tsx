"use client";
import { motion } from "framer-motion";
import { Zap, ArrowUp } from "lucide-react";
import { mockMiners } from "@/data/mock";

export default function MinerPortfolio() {
  return (
    <div className="rounded-xl border border-[#1F1F1F] bg-[#111111] p-6">
      <h3 className="font-semibold text-white mb-1">Miner Portfolio</h3>
      <p className="text-xs text-gray-500 mb-6">Your active NFT miners</p>

      <div className="flex flex-col gap-4">
        {mockMiners.map((miner, i) => (
          <motion.div
            key={miner.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="flex items-center justify-between p-4 rounded-lg border border-[#1F1F1F] bg-[#0A0A0A] hover:border-[#FF0033]/30 transition-colors"
          >
            {/* Left */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#FF0033]/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-[#FF0033]" />
              </div>
              <div>
                <div className="font-semibold text-white text-sm">{miner.name}</div>
                <div className="text-xs text-gray-500">Level {miner.level}</div>
              </div>
            </div>

            {/* Middle */}
            <div className="hidden sm:block text-center">
              <div className="text-sm font-bold text-white">{miner.dailyReward} hCASH</div>
              <div className="text-xs text-gray-500">per day</div>
            </div>

            {/* Efficiency bar */}
            <div className="hidden md:block w-24">
              <div className="text-xs text-gray-500 mb-1">Efficiency</div>
              <div className="w-full h-1.5 bg-[#1F1F1F] rounded-full">
                <div
                  className="h-1.5 rounded-full bg-[#FF0033]"
                  style={{ width: `${miner.efficiency}%` }}
                />
              </div>
              <div className="text-xs text-gray-400 mt-1">{miner.efficiency}%</div>
            </div>

            {/* Status + Upgrade cost */}
            <div className="text-right">
              <div className={`text-xs font-medium mb-1 ${miner.status === "active" ? "text-green-400" : "text-yellow-400"}`}>
                {miner.status === "active" ? "● Active" : "● Idle"}
              </div>
              <div className="text-xs text-gray-500">{miner.upgradeCost} hCASH to upgrade</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}