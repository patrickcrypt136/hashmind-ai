"use client";
import { motion } from "framer-motion";
import Sidebar from "@/components/layout/Sidebar";
import { Trophy, Medal, Zap, TrendingUp, Loader2 } from "lucide-react";
import { useAccount, useReadContract } from "wagmi";
import { formatUnits } from "viem";
import { useEffect, useState } from "react";

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

type Player = {
  address: string;
  balance: number;
  daily_reward: number;
  score: number;
  streak: number;
};

const rankColors: Record<number, string> = {
  0: "text-yellow-400",
  1: "text-gray-300",
  2: "text-amber-600",
};

const rankBg: Record<number, string> = {
  0: "border-yellow-400/30 bg-yellow-400/5",
  1: "border-gray-400/30 bg-gray-400/5",
  2: "border-amber-600/30 bg-amber-600/5",
};

export default function LeaderboardPage() {
  const { address, isConnected } = useAccount();
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [userStreak, setUserStreak] = useState(1);

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

  const dailyReward = parseFloat((realBalance * 0.014).toFixed(2));
  const score = Math.min(99, Math.floor(50 + realBalance / 10));

  // Register wallet and fetch leaderboard
  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        // Register current user if connected
        if (isConnected && address) {
          const res = await fetch("/api/leaderboard", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              address,
              balance: realBalance,
              dailyReward,
              score,
            }),
          });
          const data = await res.json();
          if (data.streak) setUserStreak(data.streak);
        }

        // Fetch all players
        const res = await fetch("/api/leaderboard");
        const data = await res.json();
        if (data.players) setPlayers(data.players);
      } catch (error) {
        console.error("Leaderboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [isConnected, address, realBalance]);

  const shortAddress = (addr: string) =>
    `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  return (
    <div className="flex min-h-screen bg-[#0A0A0A]">
      <Sidebar />
      <main className="flex-1 ml-60 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Leaderboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Top Club HashCash miners ranked by hCASH balance.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 text-[#FF0033] animate-spin" />
          </div>
        ) : (
          <>
            {/* Top 3 Podium */}
            {players.length >= 3 && (
              <div className="grid grid-cols-3 gap-4 mb-8">
                {players.slice(0, 3).map((player, i) => (
                  <motion.div
                    key={player.address}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`rounded-xl border p-5 text-center ${
                      rankBg[i] || "border-[#1F1F1F] bg-[#111111]"
                    }`}
                  >
                    <div className="flex justify-center mb-3">
                      {i === 0 ? (
                        <Trophy className="w-8 h-8 text-yellow-400" />
                      ) : (
                        <Medal className={`w-8 h-8 ${rankColors[i] || "text-gray-400"}`} />
                      )}
                    </div>
                    <div className={`text-2xl font-bold mb-1 ${rankColors[i] || "text-white"}`}>
                      #{i + 1}
                    </div>
                    <div className="text-xs font-mono text-gray-400 mb-3">
                      {shortAddress(player.address)}
                      {player.address === address && (
                        <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded bg-[#FF0033]/20 text-[#FF0033]">
                          You
                        </span>
                      )}
                    </div>
                    <div className="text-lg font-bold text-white">
                      {player.balance.toFixed(2)} hCASH
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {player.streak} day streak 🔥
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Full Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-xl border border-[#1F1F1F] bg-[#111111] overflow-hidden"
            >
              <div className="grid grid-cols-5 px-6 py-3 border-b border-[#1F1F1F] bg-[#0A0A0A]">
                {["Rank", "Address", "Balance", "Daily Reward", "Score"].map((h) => (
                  <div key={h} className="text-xs text-gray-500 font-medium">{h}</div>
                ))}
              </div>

              {players.length === 0 ? (
                <div className="px-6 py-12 text-center text-gray-500 text-sm">
                  No players yet. Connect your wallet to be the first!
                </div>
              ) : (
                players.map((player, i) => (
                  <motion.div
                    key={player.address}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    className={`grid grid-cols-5 px-6 py-4 border-b border-[#1F1F1F] last:border-0 hover:bg-[#1F1F1F]/30 transition-colors ${
                      player.address === address
                        ? "bg-[#FF0033]/5 border-l-2 border-l-[#FF0033]"
                        : ""
                    }`}
                  >
                    <div className={`text-sm font-bold ${rankColors[i] || "text-gray-400"}`}>
                      #{i + 1}
                    </div>
                    <div className="text-sm font-mono text-gray-300 flex items-center gap-1">
                      {shortAddress(player.address)}
                      {player.address === address && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#FF0033]/20 text-[#FF0033]">
                          You
                        </span>
                      )}
                    </div>
                    <div className="text-sm font-semibold text-white flex items-center gap-1">
                      <Zap className="w-3 h-3 text-[#FF0033]" />
                      {player.balance.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-400">
                      {player.daily_reward.toFixed(2)} hCASH
                    </div>
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
                ))
              )}
            </motion.div>

            {/* Daily Streak Banner */}
            {isConnected && (
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
                      Daily Streak — Day {userStreak} 🔥
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      Keep mining daily to maintain your streak bonus (+5% rewards)
                    </div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-[#FF0033]">+5%</div>
              </motion.div>
            )}
          </>
        )}
      </main>
    </div>
  );
}