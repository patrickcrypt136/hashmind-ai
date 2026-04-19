"use client";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { mockRewardHistory } from "@/data/mock";

export default function RewardChart() {
  return (
    <div className="rounded-xl border border-[#1F1F1F] bg-[#111111] p-6">
      <h3 className="font-semibold text-white mb-1">Reward Growth</h3>
      <p className="text-xs text-gray-500 mb-6">Weekly mining + referral earnings</p>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={mockRewardHistory}>
          <defs>
            <linearGradient id="rewardGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF0033" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#FF0033" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="referralGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1F1F1F" />
          <XAxis dataKey="day" stroke="#444" tick={{ fill: "#666", fontSize: 12 }} />
          <YAxis stroke="#444" tick={{ fill: "#666", fontSize: 12 }} />
          <Tooltip
            contentStyle={{ backgroundColor: "#111", border: "1px solid #1F1F1F", borderRadius: "8px" }}
            labelStyle={{ color: "#fff" }}
            itemStyle={{ color: "#aaa" }}
          />
          <Legend wrapperStyle={{ color: "#666", fontSize: "12px" }} />
          <Area type="monotone" dataKey="rewards" stroke="#FF0033" fill="url(#rewardGrad)" strokeWidth={2} />
          <Area type="monotone" dataKey="referral" stroke="#3b82f6" fill="url(#referralGrad)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}