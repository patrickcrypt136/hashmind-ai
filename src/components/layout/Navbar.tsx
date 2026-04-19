"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";
import WalletButton from "@/components/ui/WalletButton";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#1F1F1F] bg-[#0A0A0A]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#FF0033] flex items-center justify-center shadow-neon">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">
              HashGenius <span className="text-[#FF0033]">AI</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {["Features", "Dashboard", "Docs"].map((item) => (
              <Link
                key={item}
                href={item === "Dashboard" ? "/dashboard" : "#"}
                className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Wallet Button */}
          <div className="hidden md:block">
            <WalletButton />
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-t border-[#1F1F1F] bg-[#0A0A0A] px-4 py-4 flex flex-col gap-4"
        >
          {["Features", "Dashboard", "Docs"].map((item) => (
            <Link
              key={item}
              href={item === "Dashboard" ? "/dashboard" : "#"}
              className="text-sm text-gray-400 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </Link>
          ))}
          <WalletButton />
        </motion.div>
      )}
    </nav>
  );
}