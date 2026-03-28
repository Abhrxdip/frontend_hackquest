import { Quest, Difficulty, LeaderboardEntry, ActivityEvent, Achievement } from "./types";

export const MOCK_QUESTS: Quest[] = [
  {
    id: "1",
    title: "The Genesis Block",
    description: "Complete your first hackathon registration.",
    xpReward: 100,
    difficulty: Difficulty.EASY,
    completed: false,
  },
  {
    id: "2",
    title: "Smart Contract Wizard",
    description: "Deploy a smart contract to a testnet.",
    xpReward: 250,
    difficulty: Difficulty.MEDIUM,
    completed: false,
  },
  {
    id: "3",
    title: "Frontend Master",
    description: "Build a responsive UI with Tailwind CSS.",
    xpReward: 150,
    difficulty: Difficulty.EASY,
    completed: false,
  },
  {
    id: "4",
    title: "Security Auditor",
    description: "Find a vulnerability in a sample contract.",
    xpReward: 500,
    difficulty: Difficulty.HARD,
    completed: false,
  },
  {
    id: "5",
    title: "Community Pillar",
    description: "Help three people in the Discord channel.",
    xpReward: 200,
    difficulty: Difficulty.MEDIUM,
    completed: false,
  },
  {
    id: "6",
    title: "The Architect",
    description: "Design a full-stack system architecture.",
    xpReward: 400,
    difficulty: Difficulty.HARD,
    completed: false,
  },
];

export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { id: "1", username: "VitalikB", avatar: "https://picsum.photos/seed/vitalik/100/100", xp: 12500, rank: 1 },
  { id: "2", username: "SatoshiN", avatar: "https://picsum.photos/seed/satoshi/100/100", xp: 11200, rank: 2 },
  { id: "3", username: "AdaL", avatar: "https://picsum.photos/seed/ada/100/100", xp: 9800, rank: 3 },
  { id: "4", username: "AlanT", avatar: "https://picsum.photos/seed/alan/100/100", xp: 8500, rank: 4 },
  { id: "5", username: "GraceH", avatar: "https://picsum.photos/seed/grace/100/100", xp: 7200, rank: 5 },
];

export const MOCK_ACTIVITY: ActivityEvent[] = [
  {
    id: "1",
    type: "QUEST_COMPLETED",
    username: "VitalikB",
    message: "completed 'Smart Contract Wizard'",
    timestamp: "2 mins ago",
  },
  {
    id: "2",
    type: "LEVEL_UP",
    username: "AdaL",
    message: "reached Level 15",
    timestamp: "5 mins ago",
  },
  {
    id: "3",
    type: "ACHIEVEMENT_UNLOCKED",
    username: "SatoshiN",
    message: "unlocked 'The Genesis Block' badge",
    timestamp: "10 mins ago",
  },
];

export const MOCK_ACHIEVEMENTS: Achievement[] = [
  {
    id: "1",
    name: "Early Adopter",
    description: "Joined HackQuest in the first week.",
    chain: "Solana",
    unlocked: true,
    image: "https://picsum.photos/seed/badge1/200/200",
  },
  {
    id: "2",
    name: "Code Warrior",
    description: "Completed 10 quests in a single hackathon.",
    chain: "Algorand",
    unlocked: true,
    image: "https://picsum.photos/seed/badge2/200/200",
  },
  {
    id: "3",
    name: "Bug Hunter",
    description: "Reported a critical security vulnerability.",
    chain: "Ethereum",
    unlocked: false,
    image: "https://picsum.photos/seed/badge3/200/200",
  },
  {
    id: "4",
    name: "Mentor",
    description: "Helped 50 developers in the community.",
    chain: "Solana",
    unlocked: false,
    image: "https://picsum.photos/seed/badge4/200/200",
  },
];
