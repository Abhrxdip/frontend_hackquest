import React from "react";
import { motion } from "motion/react";
import { Card } from "../components/ui/Card";
import { Layout } from "../components/layout/Layout";
import { useAppContext } from "../store/AppContext";
import { Trophy, Medal, Crown, TrendingUp } from "lucide-react";
import { cn } from "../lib/utils";

export const LeaderboardPage = () => {
  const { state } = useAppContext();
  const { leaderboard, user } = state;

  const topThree = leaderboard.slice(0, 3);

  return (
    <Layout>
      <section className="space-y-14 py-4 md:py-8 lg:py-12">
      <div className="mb-16 flex flex-col items-center text-center">
        <div className="mb-7 inline-flex h-20 w-20 items-center justify-center rounded-2xl border border-[#1F7A6B]/20 bg-[#0F2F2B]/40 text-[#A3E635]">
          <Trophy className="h-10 w-10" />
        </div>
        <h1 className="mb-5 text-5xl font-bold leading-tight tracking-tight md:text-6xl">Global Rankings</h1>
        <p className="max-w-3xl text-xl leading-relaxed text-zinc-400 md:text-2xl">
          The best hackers in the world, ranked by total XP and achievements.
        </p>
      </div>

      {/* Top 3 Section */}
      <div className="mb-20 grid grid-cols-1 gap-10 md:grid-cols-3 xl:gap-12">
        {topThree.map((entry, i) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.2, duration: 0.6 }}
            className={cn(
              "relative flex flex-col items-center text-center",
              i === 0 ? "order-1 md:order-2" : i === 1 ? "order-2 md:order-1" : "order-3"
            )}
          >
            <Card className={cn(
              "relative flex w-full flex-col items-center p-12",
              i === 0 ? "border-[#A3E635]/30 bg-[#A3E635]/5 shadow-[#A3E635]/10" : "bg-[#0F2F2B]/20"
            )}>
              <div className="absolute -top-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#0B0F0F] border border-[#1F7A6B]/20 shadow-xl">
                {i === 0 ? <Crown className="h-6 w-6 text-[#A3E635]" /> : 
                 i === 1 ? <Medal className="h-6 w-6 text-zinc-300" /> : 
                 <Medal className="h-6 w-6 text-[#1F7A6B]" />}
              </div>
              
              <img src={entry.avatar} alt={entry.username} className={cn(
                "mb-7 h-28 w-28 rounded-full border-4",
                i === 0 ? "border-[#A3E635]" : i === 1 ? "border-zinc-400" : "border-[#1F7A6B]"
              )} />
              
              <h3 className="mb-1 text-3xl font-bold tracking-tight">{entry.username}</h3>
              <span className="mb-5 text-sm font-bold uppercase tracking-widest text-zinc-500">Rank #{entry.rank}</span>
              
              <div className="flex items-center gap-2 text-4xl font-bold text-[#A3E635]">
                {entry.xp} <span className="text-sm font-semibold uppercase tracking-widest text-zinc-500">XP</span>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Full List Section */}
      <Card className="overflow-hidden p-0">
        <div className="hidden grid-cols-12 border-b border-[#1F7A6B]/20 bg-[#0F2F2B]/40 px-10 py-5 text-sm font-bold uppercase tracking-widest text-zinc-500 md:grid">
          <div className="col-span-1">Rank</div>
          <div className="col-span-6">Hacker</div>
          <div className="col-span-3 text-right">Total XP</div>
          <div className="col-span-2 text-right">Trend</div>
        </div>
        
        <div className="divide-y divide-[#1F7A6B]/10">
          {leaderboard.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className={cn(
                "flex flex-col gap-4 px-5 py-5 transition-colors hover:bg-[#1F7A6B]/5 md:grid md:grid-cols-12 md:items-center md:px-10 md:py-7",
                user?.id === entry.id && "bg-[#A3E635]/5"
              )}
            >
              <div className="text-xs font-bold uppercase tracking-widest text-zinc-500 md:col-span-1 md:text-base md:normal-case md:tracking-normal">#{entry.rank}</div>
              <div className="flex items-center gap-5 md:col-span-6">
                <img src={entry.avatar} alt={entry.username} className="h-12 w-12 rounded-full border border-[#1F7A6B]/20" />
                <div className="flex flex-col">
                  <span className="text-base font-bold text-white md:text-lg">{entry.username}</span>
                  {user?.id === entry.id && <span className="text-xs font-bold uppercase tracking-widest text-[#A3E635]">You</span>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 md:contents">
                <div className="rounded-xl border border-[#1F7A6B]/20 bg-[#0F2F2B]/30 px-3 py-2 text-sm font-bold text-[#A3E635] md:col-span-3 md:rounded-none md:border-0 md:bg-transparent md:p-0 md:text-right md:text-lg">
                  <span className="mr-2 text-[11px] font-bold uppercase tracking-widest text-zinc-500 md:hidden">XP</span>
                  {entry.xp} XP
                </div>
                <div className="flex items-center justify-end gap-2 rounded-xl border border-[#1F7A6B]/20 bg-[#0F2F2B]/30 px-3 py-2 text-[#A3E635] md:col-span-2 md:justify-end md:rounded-none md:border-0 md:bg-transparent md:p-0">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 md:hidden">Trend</span>
                  <TrendingUp className="h-5 w-5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
        </section>
    </Layout>
  );
};
