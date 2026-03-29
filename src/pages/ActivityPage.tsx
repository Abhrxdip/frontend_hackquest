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
      <section className="py-4 md:py-8 lg:py-12">
      <div className="mb-16 flex flex-col items-center text-center">
        <div className="mb-7 inline-flex h-20 w-20 items-center justify-center rounded-2xl border border-[#1F7A6B]/20 bg-[#0F2F2B]/40 text-[#A3E635]">
          <Activity className="h-10 w-10" />
        </div>
        <h1 className="mb-5 text-5xl font-bold leading-tight tracking-tight md:text-6xl">Global Live Feed</h1>
        <p className="max-w-3xl text-xl leading-relaxed text-zinc-400 md:text-2xl">
          Real-time updates from the HackQuest community. See what other hackers are building.
        </p>
      </div>

      <div className="mx-auto w-full max-w-[1500px] space-y-8">
        {activity.map((event, i) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <Card className="flex items-center gap-8 p-8 lg:p-10">
              <div className={cn(
                "flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0F2F2B]/40",
                event.type === "QUEST_COMPLETED" ? "text-[#A3E635]" :
                event.type === "LEVEL_UP" ? "text-green-500" :
                "text-[#1F7A6B]"
              )}>
                {event.type === "QUEST_COMPLETED" ? <Swords className="h-7 w-7" /> :
                 event.type === "LEVEL_UP" ? <Zap className="h-7 w-7" /> :
                 <Award className="h-7 w-7" />}
              </div>
              
              <div className="flex-1">
                <p className="text-lg leading-relaxed text-zinc-400">
                  <span className="font-bold text-white">{event.username}</span> {event.message}
                </p>
                <div className="mt-2 flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-zinc-600">
                  <span>{event.timestamp}</span>
                  <span className="h-1 w-1 rounded-full bg-zinc-800" />
                  <span>{event.type.replace("_", " ")}</span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      </section>
    </Layout>
  );
};
