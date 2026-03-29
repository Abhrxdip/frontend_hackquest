import React from "react";
import { Link } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { Progress } from "../components/ui/Progress";
import { Layout } from "../components/layout/Layout";
import { useAppContext } from "../store/AppContext";
import { Award, Zap, Activity, ArrowRight } from "lucide-react";

export const ProfilePage = () => {
  const { state } = useAppContext();
  const { user, achievements, activity } = state;

  if (!user) return null;

  const currentLevelXp = user.xp % 1000;

  return (
    <Layout>
      <section className="py-4 md:py-8 lg:py-12">
      <div className="grid grid-cols-1 gap-12 xl:gap-14 lg:grid-cols-12">
        {/* Left Column: Profile Info & Stats */}
        <div className="space-y-10 lg:col-span-5">
          <Card className="relative overflow-hidden p-8 text-center sm:p-10 xl:p-12">
            <div className="absolute -top-12 -left-12 h-48 w-48 rounded-full bg-[#1F7A6B]/10 blur-[80px]" />
            <img src={user.avatar} alt={user.username} className="mx-auto mb-7 h-36 w-36 rounded-full border-4 border-[#A3E635] shadow-2xl" />
            <h1 className="mb-2 text-4xl font-bold tracking-tight">{user.username}</h1>
            <span className="mb-8 block text-sm font-bold uppercase tracking-widest text-zinc-500">Rank #{user.rank}</span>
            
            <div className="mb-10 flex flex-wrap justify-center gap-8 sm:gap-10">
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-white">{user.level}</span>
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Level</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-[#A3E635]">{user.xp}</span>
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Total XP</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-white">{achievements.filter(a => a.unlocked).length}</span>
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Badges</span>
              </div>
            </div>

            <div className="space-y-2 text-left">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-zinc-500">
                <span>Level {user.level} Progress</span>
                <span>{currentLevelXp} / 1000 XP</span>
              </div>
              <Progress value={currentLevelXp} max={1000} />
            </div>
          </Card>

          <Card className="p-8 sm:p-10">
            <h2 className="mb-7 text-2xl font-bold tracking-tight">Wallet Identity</h2>
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#1F7A6B]/20 bg-[#0F2F2B]/40 p-5">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0F2F2B]/40">
                  <Zap className="h-5 w-5 text-[#A3E635]" />
                </div>
                <span className="break-all text-base font-bold text-white">{user.walletAddress}</span>
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Solana</span>
            </div>
          </Card>
        </div>

        {/* Right Column: Achievements & Recent Activity */}
        <div className="space-y-10 lg:col-span-7">
          <div className="space-y-8">
            <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Achievements</h2>
              <Link to="/achievements" className="flex items-center gap-1 text-base font-bold text-[#A3E635] hover:underline">
                View All <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
              {achievements.slice(0, 4).map((achievement) => (
                <Card key={achievement.id} className={achievement.unlocked ? "p-8 opacity-100" : "p-8 opacity-50 grayscale"}>
                  <div className="flex items-center gap-4">
                    <img src={achievement.image} alt={achievement.name} className="h-20 w-20 rounded-2xl border border-[#1F7A6B]/20" />
                    <div>
                      <h3 className="text-xl font-bold">{achievement.name}</h3>
                      <p className="text-sm leading-relaxed text-zinc-400">{achievement.description}</p>
                      <span className="mt-2 block text-xs font-bold uppercase tracking-widest text-[#A3E635]">{achievement.chain}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Recent Activity</h2>
              <Activity className="h-5 w-5 text-zinc-500" />
            </div>
            <div className="space-y-5">
              {activity.filter(e => e.username === user.username).map((event) => (
                <Card key={event.id} className="flex items-center gap-5 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0F2F2B]/40 text-[#A3E635]">
                    <Award className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <p className="text-base leading-relaxed text-zinc-400">
                      You {event.message}
                    </p>
                    <span className="text-xs font-medium uppercase tracking-widest text-zinc-600">
                      {event.timestamp}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
      </section>
    </Layout>
  );
};
