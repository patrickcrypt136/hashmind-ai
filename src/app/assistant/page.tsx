import Sidebar from "@/components/layout/Sidebar";
import ChatWindow from "@/components/assistant/ChatWindow";
import { Brain, Zap } from "lucide-react";

export default function AssistantPage() {
  return (
    <div className="flex min-h-screen bg-[#0A0A0A]">
      <Sidebar />
      <main className="flex-1 ml-60 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">AI Assistant</h1>
            <p className="text-sm text-gray-500 mt-1">
            Powered by Groq LLaMA 3.3 — personalized mining strategy
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#FF0033]/20 bg-[#FF0033]/10">
            <Zap className="w-3 h-3 text-[#FF0033]" />
            <span className="text-xs text-[#FF0033] font-medium">AI Active</span>
          </div>
        </div>

        {/* Chat */}
        <ChatWindow />
      </main>
    </div>
  );
}