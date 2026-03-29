import React from "react";
import { motion } from "motion/react";
import { Card } from "../components/ui/Card";
import { Layout } from "../components/layout/Layout";
import { useAppContext } from "../store/AppContext";
import { Award, Shield, Zap, Globe, Lock } from "lucide-react";
import { cn } from "../lib/utils";

export const AchievementsPage = () => {
  const { state } = useAppContext();
  const { achievements } = state;

  return (
    <Layout>
      <section className="py-4 md:py-8 lg:py-12">
      <div className="mb-16 flex flex-col items-center text-center">
        <div className="mb-7 inline-flex h-20 w-20 items-center justify-center rounded-2xl border border-[#1F7A6B]/20 bg-[#0F2F2B]/40 text-[#A3E635]">
          <Award className="h-10 w-10" />
        </div>
        <h1 className="mb-5 text-5xl font-bold leading-tight tracking-tight md:text-6xl">NFT Achievements</h1>
        <p className="max-w-3xl text-xl leading-relaxed text-zinc-400 md:text-2xl">
          Your skills, verified on-chain. Unlock badges as you complete quests and contribute to the community.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {achievements.map((achievement, i) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <Card className={cn(
              "group relative flex flex-col items-center p-10 text-center transition-all",
              achievement.unlocked ? "border-[#A3E635]/20 bg-[#A3E635]/5" : "opacity-50 grayscale"
            )}>
              {!achievement.unlocked && (
                <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-black/40 backdrop-blur-[2px]">
                  <div className="flex flex-col items-center gap-2">
                    <Lock className="h-8 w-8 text-zinc-500" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Locked</span>
                  </div>
                </div>
              )}
              
              <motion.div
                whileHover={{ rotateY: 180 }}
                transition={{ duration: 0.6 }}
                className="relative mb-7 h-36 w-36 perspective-1000"
              >
                <img 
                  src={achievement.image} 
                  alt={achievement.name} 
                  className="h-full w-full rounded-2xl border border-[#1F7A6B]/20 shadow-2xl" 
                />
                <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#0F2F2B]/20 via-[#1F7A6B]/20 to-[#A3E635]/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>

              <h3 className="mb-3 text-2xl font-bold leading-tight tracking-tight">{achievement.name}</h3>
              <p className="mb-7 text-sm leading-relaxed text-zinc-400">{achievement.description}</p>
              
              <div className="mt-auto flex items-center gap-2 rounded-full bg-[#0F2F2B]/40 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#A3E635]">
                <Globe className="h-4 w-4" />
                {achievement.chain}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      </section>
    </Layout>
  );
};
