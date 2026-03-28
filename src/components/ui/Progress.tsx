import React from "react";
import { cn } from "../../lib/utils";
import { motion } from "motion/react";

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  showValue?: boolean;
}

export const Progress = ({
  value,
  max = 100,
  className,
  showValue = false,
}: ProgressProps) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn("w-full", className)}>
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-[#0F2F2B]/40">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-[#0F2F2B] via-[#1F7A6B] to-[#A3E635] shadow-[0_0_10px_rgba(163,230,53,0.3)]"
        />
      </div>
      {showValue && (
        <div className="mt-2 flex justify-between text-[10px] font-medium uppercase tracking-widest text-zinc-500">
          <span>{value} XP</span>
          <span>{max} XP</span>
        </div>
      )}
    </div>
  );
};
