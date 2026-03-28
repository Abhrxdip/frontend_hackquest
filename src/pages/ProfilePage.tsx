import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Card } from "../components/ui/Card";
import { Progress } from "../components/ui/Progress";
import { Layout } from "../components/layout/Layout";
import { useAppContext } from "../store/AppContext";
import { User as UserIcon, Award, Trophy, Zap, Activity, ArrowRight } from "lucide-react";

export const ProfilePage = () => {
  const { state } = useAppContext();
  const { user, achievements, activity } = state;

  if (!user) return null;

  const currentLevelXp = user.xp % 1000;

  return (
    <Layout>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column: Profile Info & Stats */}
        <div className="space-y-8 lg:col-span-4">
          <Card className="relative overflow-hidden p-10 text-center">
            <div className="absolute -top-12 -left-12 h-48 w-48 rounded-full bg-[#1F7A6B]/10 blur-[80px]" />
            <img src={user.avatar} alt={user.username} className="mx-auto mb-6 h-32 w-32 rounded-full border-4 border-[#A3E635] shadow-2xl" />
            <h1 className="mb-1 text-3xl font-bold tracking-tighter">{user.username}</h1>
            <span className="mb-6 block text-xs font-bold uppercase tracking-widest text-zinc-500">Rank #{user.rank}</span>
            
            <div className="mb-8 flex justify-center gap-8">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-white">{user.level}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Level</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-[#A3E635]">{user.xp}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Total XP</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-white">{achievements.filter(a => a.unlocked).length}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Badges</span>
              </div>
            </div>

            <div className="space-y-2 text-left">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                <span>Level {user.level} Progress</span>
                <span>{currentLevelXp} / 1000 XP</span>
              </div>
              <Progress value={currentLevelXp} max={1000} />
            </div>
          </Card>

          <Card className="p-8">
            <h2 className="mb-6 text-xl font-bold tracking-tighter">Wallet Identity</h2>
            <div className="flex items-center justify-between rounded-xl border border-[#1F7A6B]/20 bg-[#0F2F2B]/40 p-4">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-[#0F2F2B]/40 flex items-center justify-center">
                  <Zap className="h-4 w-4 text-[#A3E635]" />
                </div>
                <span className="text-sm font-bold text-white">{user.walletAddress}</span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Solana</span>
            </div>
          </Card>
        </div>

        {/* Right Column: Achievements & Recent Activity */}
        <div className="space-y-8 lg:col-span-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tighter">Achievements</h2>
              <Link to="/achievements" className="flex items-center gap-1 text-sm font-bold text-[#A3E635] hover:underline">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {achievements.slice(0, 4).map((achievement) => (
                <Card key={achievement.id} className={achievement.unlocked ? "opacity-100" : "opacity-50 grayscale"}>
                  <div className="flex items-center gap-4">
                    <img src={achievement.image} alt={achievement.name} className="h-16 w-16 rounded-xl border border-[#1F7A6B]/20" />
                    <div>
                      <h3 className="text-lg font-bold">{achievement.name}</h3>
                      <p className="text-xs leading-relaxed text-zinc-400">{achievement.description}</p>
                      <span className="mt-2 block text-[10px] font-bold uppercase tracking-widest text-[#A3E635]">{achievement.chain}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tighter">Recent Activity</h2>
              <Activity className="h-4 w-4 text-zinc-500" />
            </div>
            <div className="space-y-4">
              {activity.filter(e => e.username === user.username).map((event) => (
                <Card key={event.id} className="flex items-center gap-4 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0F2F2B]/40 text-[#A3E635]">
                    <Award className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm leading-relaxed text-zinc-400">
                      You {event.message}
                    </p>
                    <span className="text-[10px] font-medium uppercase tracking-widest text-zinc-600">
                      {event.timestamp}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
