import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { message, history, walletData } = await req.json();

    const SYSTEM_PROMPT = `You are HashMind AI, an expert strategy assistant for Club HashCash players.
You help players maximize their mining rewards, referrals, upgrades, and ROI.

Current player data:
- Wallet address: ${walletData?.address || "Not connected"}
- hCASH Balance: ${walletData?.balance || 0} hCASH
- Estimated daily reward: ${walletData?.dailyReward || 0} hCASH/day
- Estimated referral earnings: ${walletData?.referralEarnings || 0} hCASH/day
- Strategy score: ${walletData?.strategyScore || 0}/100

Always give confident, specific, data-driven advice based on the player's REAL balance above.
Keep responses concise and actionable. Use numbers and percentages.
Never be vague. Format with short paragraphs, no markdown headers.
If balance is 0, advise them on how to get started with hCASH.`;

    const messages = [
      { role: "system" as const, content: SYSTEM_PROMPT },
      ...history.map((msg: { role: string; content: string }) => ({
        role: msg.role === "assistant" ? "assistant" as const : "user" as const,
        content: msg.content,
      })),
      { role: "user" as const, content: message },
    ];

    const completion = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      messages,
      max_tokens: 512,
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content || "No response generated.";

    return NextResponse.json({ message: response });
  } catch (error: unknown) {
    console.error("Groq API full error:", error);
    return NextResponse.json(
      { error: "Failed to get response", details: String(error) },
      { status: 500 }
    );
  }
}