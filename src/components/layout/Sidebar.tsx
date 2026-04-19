"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Brain, Calculator, Trophy, Zap, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAccount, useReadContract } from "wagmi";
import { formatUnits } from "viem";
import { useState } from "react";

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

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "AI Assistant", href: "/assistant", icon: <Brain className="w-4 h-4" /> },
  { label: "ROI Calculator", href: "/calculator", icon: <Calculator className="w-4 h-4" /> },
  { label: "Leaderboard", href: "/leaderboard", icon: <Trophy className="w-4 h-4" /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { address, isConnected } = useAccount();
  const [mobileOpen, setMobileOpen] = useState(false);

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

  const formattedBalance =
    balance && decimals
      ? parseFloat(formatUnits(balance, decimals)).toFixed(2)
      : "—";

  const shortAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "Not connected";

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-[#1F1F1F]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#FF0033] flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-bold text-sm tracking-tight">
            HashMind <span className="text-[#FF0033]">AI</span>
          </span>
        </div>
        <button
          className="md:hidden text-gray-400 hover:text-white"
          onClick={() => setMobileOpen(false)}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
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
              {isConnected ? "Connected • Avalanche" : "Not Connected"}
            </div>
          </div>
          <div className="text-xs font-mono text-gray-300">{shortAddress}</div>
          <div className="text-xs text-[#FF0033] font-semibold mt-1">
            {formattedBalance} hCASH
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-[#0A0A0A] border-b border-[#1F1F1F]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#FF0033] flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-bold text-sm tracking-tight">
            HashMind <span className="text-[#FF0033]">AI</span>
          </span>
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          className="text-gray-400 hover:text-white"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div className={cn(
        "md:hidden fixed top-0 left-0 h-full w-60 bg-[#0A0A0A] border-r border-[#1F1F1F] flex flex-col z-50 transition-transform duration-300",
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <SidebarContent />
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-60 border-r border-[#1F1F1F] bg-[#0A0A0A] flex-col z-40">
        <SidebarContent />
      </aside>
    </>
  );
}