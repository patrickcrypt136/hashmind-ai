import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Leaderboard POST received:", body);
    const { address, balance, dailyReward, score } = body;

    if (!address) {
      console.log("No address provided");
      return NextResponse.json({ error: "No address" }, { status: 400 });
    }

    // Check if user exists
    const { data: existing } = await supabase
      .from("leaderboard")
      .select("*")
      .eq("address", address)
      .single();

    const now = new Date();
    let streak = 1;

    if (existing) {
      const lastSeen = new Date(existing.last_seen);
      const hoursDiff = (now.getTime() - lastSeen.getTime()) / (1000 * 60 * 60);

      if (hoursDiff < 48) {
        streak = existing.streak + 1;
      }

      await supabase
        .from("leaderboard")
        .update({
          balance,
          daily_reward: dailyReward,
          score,
          streak,
          last_seen: now.toISOString(),
        })
        .eq("address", address);
    } else {
      await supabase.from("leaderboard").insert({
        address,
        balance,
        daily_reward: dailyReward,
        score,
        streak: 1,
        last_seen: now.toISOString(),
      });
    }

    return NextResponse.json({ success: true, streak });
  } catch (error) {
    console.error("Leaderboard error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("leaderboard")
      .select("*")
      .order("balance", { ascending: false })
      .limit(10);

    if (error) throw error;

    return NextResponse.json({ players: data });
  } catch (error) {
    console.error("Leaderboard fetch error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}