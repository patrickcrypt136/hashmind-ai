export const mockWallet = {
  address: "0x1A2b...9F3c",
  balance: 245,
  dailyRewards: 3.4,
  referralEarnings: 0.8,
  nftCount: 3,
  efficiencyScore: 87,
};

export const mockMiners = [
  { id: 1, name: "Miner Alpha", level: 2, dailyReward: 1.2, upgradeCost: 15, efficiency: 82, status: "active" as const },
  { id: 2, name: "Miner Titan", level: 3, dailyReward: 1.5, upgradeCost: 22, efficiency: 91, status: "active" as const },
  { id: 3, name: "Miner Nano", level: 1, dailyReward: 0.7, upgradeCost: 8, efficiency: 65, status: "idle" as const },
];

export const mockRewardHistory = [
  { day: "Mon", rewards: 2.8, referral: 0.6 },
  { day: "Tue", rewards: 3.1, referral: 0.7 },
  { day: "Wed", rewards: 2.9, referral: 0.5 },
  { day: "Thu", rewards: 3.4, referral: 0.8 },
  { day: "Fri", rewards: 3.7, referral: 0.9 },
  { day: "Sat", rewards: 3.2, referral: 0.8 },
  { day: "Sun", rewards: 3.4, referral: 0.8 },
];

export const mockLeaderboard = [
  { rank: 1, address: "0xA1b2...3C4d", rewards: 1240, referrals: 34, score: 98 },
  { rank: 2, address: "0xF9e8...7D6c", rewards: 1105, referrals: 28, score: 94 },
  { rank: 3, address: "0x2B3c...4E5f", rewards: 987,  referrals: 22, score: 91 },
  { rank: 4, address: "0x1A2b...9F3c", rewards: 892,  referrals: 19, score: 87 },
  { rank: 5, address: "0x7G8h...1I2j", rewards: 743,  referrals: 15, score: 82 },
];