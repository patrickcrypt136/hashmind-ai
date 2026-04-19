"use client";
import { motion } from "framer-motion";
import Sidebar from "@/components/layout/Sidebar";
import { mockLeaderboard } from "@/data/mock";
import { Trophy, Medal, Zap, TrendingUp } from "lucide-react";

const rankColors: Record<number, string> = {
  1: "text-yellow-400",
  2: "text-gray-300",
  3: "text-amber-600",
};

const rankBg: Record<number, string> = {
  1: "border-yellow-400/30 bg-yellow-400/5",
  2: "border-gray-400/30 bg-gray-400/5",
  3: "border-amber-600/30 bg-amber-600/5",
};

export default function LeaderboardPage() {
  return (
    <div className="flex min-h-screen bg-[#0A0A0A]">
      <Sidebar />
      <main className="flex-1 ml-60 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Leaderboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Top Club HashCash miners ranked by total rewards.
          </p>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {mockLeaderboard.slice(0, 3).map((player, i) => (
            <motion.div
              key={player.rank}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-xl border p-5 text-center ${
                rankBg[player.rank] || "border-[#1F1F1F] bg-[#111111]"
              }`}
            >
              <div className="flex justify-center mb-3">
                {player.rank === 1 ? (
                  <Trophy className="w-8 h-8 text-yellow-400" />
                ) : (
                  <Medal
                    className={`w-8 h-8 ${rankColors[player.rank] || "text-gray-400"}`}
                  />
                )}
              </div>
              <div
                className={`text-2xl font-bold mb-1 ${
                  rankColors[player.rank] || "text-white"
                }`}
              >
                #{player.rank}
              </div>
              <div className="text-xs font-mono text-gray-400 mb-3">
                {player.address}
              </div>
              <div className="text-lg font-bold text-white">
                {player.rewards} hCASH
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {player.referrals} referrals
              </div>
            </motion.div>
          ))}
        </div>

        {/* Full Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl border border-[#1F1F1F] bg-[#111111] overflow-hidden"
        >
          {/* Table Header */}
          <div className="grid grid-cols-5 px-6 py-3 border-b border-[#1F1F1F] bg-[#0A0A0A]">
            {["Rank", "Address", "Total Rewards", "Referrals", "Score"].map(
              (h) => (
                <div key={h} className="text-xs text-gray-500 font-medium">
                  {h}
                </div>
              )
            )}
          </div>

          {/* Rows */}
          {mockLeaderboard.map((player, i) => (
            <motion.div
              key={player.rank}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              className={`grid grid-cols-5 px-6 py-4 border-b border-[#1F1F1F] last:border-0 hover:bg-[#1F1F1F]/30 transition-colors ${
                player.address === "0x1A2b...9F3c"
                  ? "bg-[#FF0033]/5 border-l-2 border-l-[#FF0033]"
                  : ""
              }`}
            >
              {/* Rank */}
              <div
                className={`text-sm font-bold ${
                  rankColors[player.rank] || "text-gray-400"
                }`}
              >
                #{player.rank}
              </div>

              {/* Address */}
              <div className="text-sm font-mono text-gray-300 flex items-center gap-1">
                {player.address}
                {player.address === "0x1A2b...9F3c" && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#FF0033]/20 text-[#FF0033]">
                    You
                  </span>
                )}
              </div>

              {/* Rewards */}
              <div className="text-sm font-semibold text-white flex items-center gap-1">
                <Zap className="w-3 h-3 text-[#FF0033]" />
                {player.rewards} hCASH
              </div>

              {/* Referrals */}
              <div className="text-sm text-gray-400">{player.referrals}</div>

              {/* Score */}
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-[#1F1F1F] rounded-full max-w-[80px]">
                  <div
                    className="h-1.5 rounded-full bg-[#FF0033]"
                    style={{ width: `${player.score}%` }}
                  />
                </div>
                <span className="text-xs text-gray-400">{player.score}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Daily Streak Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 rounded-xl border border-[#FF0033]/20 bg-[#FF0033]/5 p-5 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-[#FF0033]" />
            <div>
              <div className="text-sm font-semibold text-white">
                Daily Streak — Day 7 🔥
              </div>
              <div className="text-xs text-gray-400 mt-0.5">
                Keep mining daily to maintain your streak bonus (+5% rewards)
              </div>
            </div>
          </div>
          <div className="text-2xl font-bold text-[#FF0033]">+5%</div>
        </motion.div>
      </main>
    </div>
  );
}