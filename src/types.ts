export enum Difficulty {
  EASY = "Easy",
  MEDIUM = "Medium",
  HARD = "Hard",
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  difficulty: Difficulty;
  completed: boolean;
}

export interface User {
  id: string;
  username: string;
  avatar: string;
  xp: number;
  level: number;
  rank: number;
  walletAddress?: string;
}

export interface LeaderboardEntry {
  id: string;
  username: string;
  avatar: string;
  xp: number;
  rank: number;
}

export interface ActivityEvent {
  id: string;
  type: "QUEST_COMPLETED" | "LEVEL_UP" | "ACHIEVEMENT_UNLOCKED";
  username: string;
  message: string;
  timestamp: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  chain: "Solana" | "Algorand" | "Ethereum";
  unlocked: boolean;
  image: string;
}
