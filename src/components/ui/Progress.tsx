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
      <div className="relative h-3 w-full overflow-hidden rounded-full border border-[#1F7A6B]/20 bg-[#0F2F2B]/35">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.1, ease: [0.2, 0.65, 0.2, 1] }}
          className="relative h-full rounded-full bg-gradient-to-r from-[#0F2F2B] via-[#1F7A6B] to-[#A3E635] shadow-[0_0_14px_rgba(163,230,53,0.35)]"
        />
      </div>
      {showValue && (
        <div className="mt-2 flex justify-between text-[11px] font-semibold uppercase tracking-widest text-zinc-500">
          <span>{value} XP</span>
          <span>{max} XP</span>
        </div>
      )}
    </div>
  );
};
