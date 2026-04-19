"use client";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";
import { Wallet, LogOut, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function WalletButton() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const [showMenu, setShowMenu] = useState(false);

  const shortAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "";

  if (isConnected) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#1F1F1F] bg-[#111111] text-sm text-gray-300 hover:border-[#FF0033]/30 transition-colors"
        >
          <div className="w-2 h-2 rounded-full bg-green-400" />
          {shortAddress}
          <ChevronDown className="w-3 h-3" />
        </button>

        {showMenu && (
          <div className="absolute right-0 top-10 rounded-lg border border-[#1F1F1F] bg-[#111111] p-2 w-40 z-50">
            <button
              onClick={() => { disconnect(); setShowMenu(false); }}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-400 hover:bg-[#1F1F1F] rounded-lg transition-colors"
            >
              <LogOut className="w-3 h-3" />
              Disconnect
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={() => connect({ connector: injected() })}
      className="flex items-center gap-2 px-4 py-2 bg-[#FF0033] hover:bg-[#FF0033]/80 text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-neon"
    >
      <Wallet className="w-4 h-4" />
      Connect Wallet
    </button>
  );
}