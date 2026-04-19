"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Zap, User, Loader2 } from "lucide-react";
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

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

const suggestions = [
  "What should I upgrade next?",
  "How do I grow faster?",
  "Best ROI under 50 hCASH?",
  "Should I reinvest now?",
  "How many referrals do I need?",
];

export default function ChatWindow() {
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

  const dailyReward = parseFloat((realBalance * 0.014).toFixed(2));
  const referralEarnings = parseFloat((realBalance * 0.003).toFixed(2));
  const strategyScore = isConnected
    ? Math.min(99, Math.floor(50 + realBalance / 10))
    : 0;

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: isConnected
        ? `Hey! I'm HashGenius AI. I can see your wallet has ${realBalance.toFixed(2)} hCASH. I'm ready to help you maximize your mining strategy. What would you like to optimize?`
        : "Hey! I'm HashGenius AI. Connect your wallet so I can give you personalized mining strategy advice. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const history = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageText,
          history,
          walletData: {
            address: address || "Not connected",
            balance: realBalance.toFixed(2),
            dailyReward,
            referralEarnings,
            strategyScore,
          },
        }),
      });

      const data = await res.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message || "Sorry, I couldn't process that. Try again.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Connection error. Please try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] rounded-xl border border-[#1F1F1F] bg-[#111111] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#1F1F1F] bg-[#0A0A0A]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#FF0033] flex items-center justify-center shadow-neon">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="font-semibold text-white text-sm">HashGenius AI</div>
            <div className="flex items-center gap-1 text-xs text-green-400">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Online — Groq LLaMA 3
            </div>
          </div>
        </div>
        {isConnected && (
          <div className="text-xs text-gray-500 text-right">
            <div className="text-gray-300 font-semibold">{realBalance.toFixed(2)} hCASH</div>
            <div>live balance</div>
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  msg.role === "assistant"
                    ? "bg-[#FF0033]/10 text-[#FF0033]"
                    : "bg-[#1F1F1F] text-gray-400"
                }`}
              >
                {msg.role === "assistant" ? (
                  <Zap className="w-4 h-4" />
                ) : (
                  <User className="w-4 h-4" />
                )}
              </div>
              <div
                className={`max-w-[75%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "assistant"
                    ? "bg-[#0A0A0A] border border-[#1F1F1F] text-gray-200"
                    : "bg-[#FF0033] text-white"
                }`}
              >
                {msg.content}
              </div>
            </motion.div>
          ))}

          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-[#FF0033]/10 flex items-center justify-center">
                <Zap className="w-4 h-4 text-[#FF0033]" />
              </div>
              <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl px-4 py-3 flex items-center gap-2">
                <Loader2 className="w-4 h-4 text-[#FF0033] animate-spin" />
                <span className="text-sm text-gray-400">Analyzing strategy...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="px-6 pb-3 flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => sendMessage(s)}
              className="text-xs px-3 py-1.5 rounded-full border border-[#1F1F1F] text-gray-400 hover:border-[#FF0033]/50 hover:text-white transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="px-6 py-4 border-t border-[#1F1F1F] bg-[#0A0A0A]">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask HashMind AI anything..."
            className="flex-1 bg-[#111111] border border-[#1F1F1F] rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#FF0033]/50 transition-colors"
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            className="px-4 py-2.5 bg-[#FF0033] hover:bg-[#FF0033]/80 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}