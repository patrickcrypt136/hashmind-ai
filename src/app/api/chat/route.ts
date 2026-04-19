import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const SYSTEM_PROMPT = `You are HashMind AI, an expert strategy assistant for Club HashCash players.
You help players maximize their mining rewards, referrals, upgrades, and ROI.

The user has these miners:
- Miner Alpha: Level 2, earns 1.2 hCASH/day, upgrade costs 15 hCASH
- Miner Titan: Level 3, earns 1.5 hCASH/day, upgrade costs 22 hCASH
- Miner Nano: Level 1, earns 0.7 hCASH/day, upgrade costs 8 hCASH

Wallet balance: 245 hCASH
Daily rewards: 3.4 hCASH
Referral earnings: 0.8 hCASH/day

Always give confident, specific, data-driven advice. Keep responses concise and actionable.
Use numbers and percentages. Never be vague. Format with short paragraphs, no markdown headers.`;

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    console.log("GROQ_API_KEY exists:", !!process.env.GROQ_API_KEY);
    console.log("Message received:", message);

    const messages = [
      { role: "system" as const, content: SYSTEM_PROMPT },
      ...history.map((msg: { role: string; content: string }) => ({
        role: msg.role === "assistant" ? "assistant" as const : "user" as const,
        content: msg.content,
      })),
      { role: "user" as const, content: message },
    ];

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages,
      max_tokens: 512,
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content || "No response generated.";

    console.log("Groq response:", response);

    return NextResponse.json({ message: response });
  } catch (error: unknown) {
    console.error("Groq API full error:", error);
    return NextResponse.json(
      { error: "Failed to get response", details: String(error) },
      { status: 500 }
    );
  }
}