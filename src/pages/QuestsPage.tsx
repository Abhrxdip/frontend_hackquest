import React from "react";
import { motion } from "motion/react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Layout } from "../components/layout/Layout";
import { useAppContext } from "../store/AppContext";
import { CheckCircle2, Swords, Zap } from "lucide-react";
import { cn } from "../lib/utils";

export const QuestsPage = () => {
  const { state, dispatch } = useAppContext();
  const { quests } = state;

  const handleCompleteQuest = (id: string) => {
    dispatch({ type: "COMPLETE_QUEST", payload: id });
  };

  return (
    <Layout>
      <section className="py-4 md:py-8 lg:py-12">
      <div className="mb-16 flex flex-col items-center text-center">
        <div className="mb-7 inline-flex h-20 w-20 items-center justify-center rounded-2xl border border-[#1F7A6B]/20 bg-[#0F2F2B]/40 text-[#A3E635]">
          <Swords className="h-10 w-10" />
        </div>
        <h1 className="mb-5 text-5xl font-bold leading-tight tracking-tight md:text-6xl">Quest System</h1>
        <p className="max-w-3xl text-xl leading-relaxed text-zinc-400 md:text-2xl">
          Complete challenges to earn XP, unlock achievements, and climb the global leaderboard.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {quests.map((quest, i) => (
          <motion.div
            key={quest.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <Card className={cn("relative flex h-full flex-col justify-between p-10", quest.completed && "border-[#A3E635]/20 bg-[#A3E635]/5")}>
              {quest.completed && (
                <div className="absolute -right-2 -top-2 flex h-9 w-9 items-center justify-center rounded-full bg-[#A3E635] text-black shadow-lg">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
              )}
              
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <span className={cn(
                    "rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest",
                    quest.difficulty === "Easy" ? "bg-green-500/10 text-green-500" :
                    quest.difficulty === "Medium" ? "bg-[#A3E635]/10 text-[#A3E635]" :
                    "bg-red-500/10 text-red-500"
                  )}>
                    {quest.difficulty}
                  </span>
                  <div className="flex items-center gap-2 text-base font-bold text-[#A3E635]">
                    <Zap className="h-5 w-5" />
                    +{quest.xpReward} XP
                  </div>
                </div>

                <h3 className="mb-4 text-3xl font-bold leading-tight tracking-tight transition-colors group-hover:text-[#A3E635]">
                  {quest.title}
                </h3>
                <p className="mb-10 text-base leading-relaxed text-zinc-400">
                  {quest.description}
                </p>
              </div>

              <Button
                onClick={() => handleCompleteQuest(quest.id)}
                disabled={quest.completed}
                className="w-full"
                variant={quest.completed ? "secondary" : "primary"}
              >
                {quest.completed ? "Quest Completed" : "Complete Quest"}
              </Button>
            </Card>
          </motion.div>
        ))}
      </div>
      </section>
    </Layout>
  );
};
