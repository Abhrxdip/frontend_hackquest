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
  const others = leaderboard.slice(3);

  return (
    <Layout>
      <div className="mb-12 flex flex-col items-center text-center">
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0F2F2B]/40 border border-[#1F7A6B]/20 text-[#A3E635]">
          <Trophy className="h-8 w-8" />
        </div>
        <h1 className="mb-4 text-5xl font-bold tracking-tighter">Global Rankings</h1>
        <p className="max-w-2xl text-lg text-zinc-400">
          The best hackers in the world, ranked by total XP and achievements.
        </p>
      </div>

      {/* Top 3 Section */}
      <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
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
              "relative flex w-full flex-col items-center p-10",
              i === 0 ? "border-[#A3E635]/30 bg-[#A3E635]/5 shadow-[#A3E635]/10" : "bg-[#0F2F2B]/20"
            )}>
              <div className="absolute -top-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#0B0F0F] border border-[#1F7A6B]/20 shadow-xl">
                {i === 0 ? <Crown className="h-6 w-6 text-[#A3E635]" /> : 
                 i === 1 ? <Medal className="h-6 w-6 text-zinc-300" /> : 
                 <Medal className="h-6 w-6 text-[#1F7A6B]" />}
              </div>
              
              <img src={entry.avatar} alt={entry.username} className={cn(
                "mb-6 h-24 w-24 rounded-full border-4",
                i === 0 ? "border-[#A3E635]" : i === 1 ? "border-zinc-400" : "border-[#1F7A6B]"
              )} />
              
              <h3 className="mb-1 text-2xl font-bold tracking-tight">{entry.username}</h3>
              <span className="mb-4 text-xs font-bold uppercase tracking-widest text-zinc-500">Rank #{entry.rank}</span>
              
              <div className="flex items-center gap-2 text-3xl font-bold text-[#A3E635]">
                {entry.xp} <span className="text-sm font-medium uppercase tracking-widest text-zinc-500">XP</span>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Full List Section */}
      <Card className="p-0 overflow-hidden">
        <div className="grid grid-cols-12 border-b border-[#1F7A6B]/20 bg-[#0F2F2B]/40 px-8 py-4 text-xs font-bold uppercase tracking-widest text-zinc-500">
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
                "grid grid-cols-12 items-center px-8 py-6 transition-colors hover:bg-[#1F7A6B]/5",
                user?.id === entry.id && "bg-[#A3E635]/5"
              )}
            >
              <div className="col-span-1 text-sm font-bold text-zinc-500">#{entry.rank}</div>
              <div className="col-span-6 flex items-center gap-4">
                <img src={entry.avatar} alt={entry.username} className="h-10 w-10 rounded-full border border-[#1F7A6B]/20" />
                <div className="flex flex-col">
                  <span className="text-base font-bold text-white">{entry.username}</span>
                  {user?.id === entry.id && <span className="text-[10px] font-bold uppercase tracking-widest text-[#A3E635]">You</span>}
                </div>
              </div>
              <div className="col-span-3 text-right text-base font-bold text-[#A3E635]">{entry.xp} XP</div>
              <div className="col-span-2 flex justify-end text-[#A3E635]">
                <TrendingUp className="h-4 w-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </Layout>
  );
};
