import React from "react";
import { motion } from "motion/react";
import { Card } from "../components/ui/Card";
import { Layout } from "../components/layout/Layout";
import { useAppContext } from "../store/AppContext";
import { Activity, Zap, Award, Swords } from "lucide-react";
import { cn } from "../lib/utils";

export const ActivityPage = () => {
  const { state } = useAppContext();
  const { activity } = state;

  return (
    <Layout>
      <div className="mb-12 flex flex-col items-center text-center">
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0F2F2B]/40 border border-[#1F7A6B]/20 text-[#A3E635]">
          <Activity className="h-8 w-8" />
        </div>
        <h1 className="mb-4 text-5xl font-bold tracking-tighter">Global Live Feed</h1>
        <p className="max-w-2xl text-lg text-zinc-400">
          Real-time updates from the HackQuest community. See what other hackers are building.
        </p>
      </div>

      <div className="mx-auto max-w-3xl space-y-4">
        {activity.map((event, i) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <Card className="flex items-center gap-6 p-6">
              <div className={cn(
                "flex h-12 w-12 items-center justify-center rounded-xl bg-[#0F2F2B]/40",
                event.type === "QUEST_COMPLETED" ? "text-[#A3E635]" :
                event.type === "LEVEL_UP" ? "text-green-500" :
                "text-[#1F7A6B]"
              )}>
                {event.type === "QUEST_COMPLETED" ? <Swords className="h-6 w-6" /> :
                 event.type === "LEVEL_UP" ? <Zap className="h-6 w-6" /> :
                 <Award className="h-6 w-6" />}
              </div>
              
              <div className="flex-1">
                <p className="text-base leading-relaxed text-zinc-400">
                  <span className="font-bold text-white">{event.username}</span> {event.message}
                </p>
                <div className="mt-1 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-zinc-600">
                  <span>{event.timestamp}</span>
                  <span className="h-1 w-1 rounded-full bg-zinc-800" />
                  <span>{event.type.replace("_", " ")}</span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Layout>
  );
};
