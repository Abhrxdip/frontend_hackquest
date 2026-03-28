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
      <div className="mb-12 flex flex-col items-center text-center">
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0F2F2B]/40 border border-[#1F7A6B]/20 text-[#A3E635]">
          <Swords className="h-8 w-8" />
        </div>
        <h1 className="mb-4 text-5xl font-bold tracking-tighter">Quest System</h1>
        <p className="max-w-2xl text-lg text-zinc-400">
          Complete challenges to earn XP, unlock achievements, and climb the global leaderboard.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {quests.map((quest, i) => (
          <motion.div
            key={quest.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <Card className={cn("relative flex h-full flex-col justify-between p-8", quest.completed && "border-[#A3E635]/20 bg-[#A3E635]/5")}>
              {quest.completed && (
                <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#A3E635] text-black shadow-lg">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
              )}
              
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <span className={cn(
                    "rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest",
                    quest.difficulty === "Easy" ? "bg-green-500/10 text-green-500" :
                    quest.difficulty === "Medium" ? "bg-[#A3E635]/10 text-[#A3E635]" :
                    "bg-red-500/10 text-red-500"
                  )}>
                    {quest.difficulty}
                  </span>
                  <div className="flex items-center gap-1 text-sm font-bold text-[#A3E635]">
                    <Zap className="h-4 w-4" />
                    +{quest.xpReward} XP
                  </div>
                </div>

                <h3 className="mb-3 text-2xl font-bold tracking-tight group-hover:text-[#A3E635] transition-colors">
                  {quest.title}
                </h3>
                <p className="mb-8 text-sm leading-relaxed text-zinc-400">
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
    </Layout>
  );
};
