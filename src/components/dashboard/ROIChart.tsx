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

const roiData = [
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
  return (
    <div className="rounded-xl border border-[#1F1F1F] bg-[#111111] p-6">
      <h3 className="font-semibold text-white mb-1">ROI Forecast</h3>
      <p className="text-xs text-gray-500 mb-6">Projected return over 8 weeks</p>
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