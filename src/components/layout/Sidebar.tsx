"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Brain, Calculator, Trophy, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAccount } from "wagmi";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "AI Assistant", href: "/assistant", icon: <Brain className="w-4 h-4" /> },
  { label: "ROI Calculator", href: "/calculator", icon: <Calculator className="w-4 h-4" /> },
  { label: "Leaderboard", href: "/leaderboard", icon: <Trophy className="w-4 h-4" /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { address, isConnected } = useAccount();

  const shortAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "0x1A2b...9F3c";

  return (
    <aside className="fixed left-0 top-0 h-full w-60 border-r border-[#1F1F1F] bg-[#0A0A0A] flex flex-col z-40">
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-5 border-b border-[#1F1F1F]">
        <div className="w-7 h-7 rounded-lg bg-[#FF0033] flex items-center justify-center">
          <Zap className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="font-bold text-sm tracking-tight">
          HashMind <span className="text-[#FF0033]">AI</span>
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                active
                  ? "bg-[#FF0033]/10 text-[#FF0033] border border-[#FF0033]/20"
                  : "text-gray-400 hover:text-white hover:bg-[#111111]"
              )}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Wallet info */}
      <div className="px-4 py-4 border-t border-[#1F1F1F]">
        <div className="rounded-lg bg-[#111111] border border-[#1F1F1F] p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <div className={`w-1.5 h-1.5 rounded-full ${isConnected ? "bg-green-400" : "bg-gray-600"}`} />
            <div className="text-xs text-gray-500">
              {isConnected ? "Connected" : "Not Connected"}
            </div>
          </div>
          <div className="text-xs font-mono text-gray-300">{shortAddress}</div>
          <div className="text-xs text-[#FF0033] font-semibold mt-1">245 hCASH</div>
        </div>
      </div>
    </aside>
  );
}