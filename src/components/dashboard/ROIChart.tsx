"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
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

const DAILY_RATE = 0.014; // 1.4% daily reward rate
const REINVEST_RATE = 0.3; // 30% reinvestment

function generateROIData(balance: number) {
  const weeks = ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"];
  let current = balance;
  const initialBalance = balance || 100;

  return weeks.map((week, i) => {
    const weeklyReward = current * DAILY_RATE * 7;
    current += weeklyReward * REINVEST_RATE;
    const roi = Math.round(((current - initialBalance) / initialBalance) * 100);
    return { week, roi: Math.max(0, roi) };
  });
}

const mockROIData = [
  { week: "W1", roi: 12 },
  { week: "W2", roi: 19 },
  { week: "W3", roi: 28 },
  { week: "W4", roi: 34 },
  { week: "W5", roi: 45 },
  { week: "W6", roi: 52 },
  { week: "W7", roi: 61 },
  { week: "W8", roi: 74 },
];

export default function ROIChart() {
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

  const roiData = isConnected
    ? generateROIData(realBalance)
    : mockROIData;

  return (
    <div className="rounded-xl border border-[#1F1F1F] bg-[#111111] p-6">
      <h3 className="font-semibold text-white mb-1">ROI Forecast</h3>
      <p className="text-xs text-gray-500 mb-6">
        {isConnected
          ? `Projected 8-week return based on ${realBalance.toFixed(2)} hCASH`
          : "Projected return over 8 weeks"}
      </p>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={roiData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1F1F1F" />
          <XAxis dataKey="week" stroke="#444" tick={{ fill: "#666", fontSize: 12 }} />
          <YAxis stroke="#444" tick={{ fill: "#666", fontSize: 12 }} unit="%" />
          <Tooltip
            contentStyle={{ backgroundColor: "#111", border: "1px solid #1F1F1F", borderRadius: "8px" }}
            labelStyle={{ color: "#fff" }}
            itemStyle={{ color: "#aaa" }}
            formatter={(value) => [`${value}%`, "ROI"]}
          />
          <Line
            type="monotone"
            dataKey="roi"
            stroke="#FF0033"
            strokeWidth={2}
            dot={{ fill: "#FF0033", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}