import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Progress } from "../components/ui/Progress";
import { Layout } from "../components/layout/Layout";
import { useAppContext } from "../store/AppContext";
import { Zap, Trophy, Activity, Award, ArrowRight, Swords } from "lucide-react";

export const DashboardPage = () => {
  const { state, dispatch } = useAppContext();
  const { user, quests, leaderboard, activity } = state;

  if (!user) return null;

  const nextLevelXp = user.level * 1000;
  const currentLevelXp = user.xp % 1000;

  const handleCompleteQuest = (id: string) => {
    dispatch({ type: "COMPLETE_QUEST", payload: id });
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column: User Stats & Progress */}
        <div className="space-y-8 lg:col-span-8">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold tracking-tighter">Dashboard</h1>
            <div className="flex items-center gap-2 rounded-full border border-[#1F7A6B]/20 bg-[#0F2F2B]/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-zinc-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#A3E635]/40 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#A3E635]" />
              </span>
              Live Session
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card className="relative overflow-hidden p-8">
              <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-[#1F7A6B]/10 blur-[80px]" />
              <div className="mb-6 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Current Level</span>
                  <span className="text-5xl font-bold tracking-tighter text-white">LVL {user.level}</span>
                </div>
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0F2F2B]/40 text-[#A3E635]">
                  <Award className="h-8 w-8" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-zinc-400">
                  <span>Progress to LVL {user.level + 1}</span>
                  <span>{currentLevelXp} / 1000 XP</span>
                </div>
                <Progress value={currentLevelXp} max={1000} />
              </div>
            </Card>

            <Card className="relative overflow-hidden p-8">
              <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-[#A3E635]/5 blur-[80px]" />
              <div className="mb-6 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Total XP</span>
                  <span className="text-5xl font-bold tracking-tighter text-white">{user.xp}</span>
                </div>
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0F2F2B]/40 text-[#1F7A6B]">
                  <Zap className="h-8 w-8" />
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-zinc-400">
                <Trophy className="h-4 w-4 text-[#A3E635]" />
                Global Rank: <span className="text-white">#{user.rank}</span>
              </div>
            </Card>
          </div>

          {/* Quick Actions / Active Quests */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tighter">Active Quests</h2>
              <Link to="/quests" className="text-sm font-bold text-[#A3E635] hover:underline">
                View All Quests
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {quests.filter(q => !q.completed).slice(0, 2).map((quest) => (
                <Card key={quest.id} className="group flex flex-col justify-between p-6">
                  <div>
                    <div className="mb-4 flex items-center justify-between">
                      <span className="rounded-full bg-[#0F2F2B]/40 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                        {quest.difficulty}
                      </span>
                      <span className="text-xs font-bold text-[#A3E635]">+{quest.xpReward} XP</span>
                    </div>
                    <h3 className="mb-2 text-xl font-bold group-hover:text-[#A3E635] transition-colors">
                      {quest.title}
                    </h3>
                    <p className="mb-6 text-sm leading-relaxed text-zinc-400">
                      {quest.description}
                    </p>
                  </div>
                  <Button onClick={() => handleCompleteQuest(quest.id)} className="w-full">
                    Complete Quest
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Mini Leaderboard & Activity */}
        <div className="space-y-8 lg:col-span-4">
          <Card className="p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tighter">Top Hackers</h2>
              <Link to="/leaderboard">
                <ArrowRight className="h-4 w-4 text-zinc-500 hover:text-white transition-colors" />
              </Link>
            </div>
            <div className="space-y-4">
              {leaderboard.slice(0, 5).map((entry) => (
                <div key={entry.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-4 text-xs font-bold text-zinc-500">#{entry.rank}</span>
                    <img src={entry.avatar} alt={entry.username} className="h-8 w-8 rounded-full border border-[#1F7A6B]/20" />
                    <span className="text-sm font-bold text-white">{entry.username}</span>
                  </div>
                  <span className="text-xs font-bold text-[#A3E635]">{entry.xp} XP</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tighter">Live Activity</h2>
              <Activity className="h-4 w-4 text-zinc-500" />
            </div>
            <div className="space-y-6">
              {activity.slice(0, 4).map((event) => (
                <div key={event.id} className="relative pl-6 before:absolute before:left-0 before:top-1.5 before:h-2 before:w-2 before:rounded-full before:bg-[#A3E635]">
                  <p className="text-sm leading-relaxed text-zinc-400">
                    <span className="font-bold text-white">{event.username}</span> {event.message}
                  </p>
                  <span className="text-[10px] font-medium uppercase tracking-widest text-zinc-600">
                    {event.timestamp}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};
