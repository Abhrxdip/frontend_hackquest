import React from "react";
import { cn } from "../../lib/utils";
import { motion, HTMLMotionProps } from "motion/react";

interface CardProps extends HTMLMotionProps<"div"> {
  isHoverable?: boolean;
}

export const Card = ({
  children,
  className,
  isHoverable = true,
  ...props
}: CardProps) => {
  const baseStyles = "glass-panel group relative overflow-hidden rounded-[30px] border border-[#1F7A6B]/20 p-8 md:p-9 shadow-xl transition-all duration-300";
  
  if (isHoverable) {
    return (
      <motion.div
        whileHover={{
          y: -11,
          scale: 1.015,
          rotateX: 5,
          rotateY: -5,
          borderColor: "rgba(163, 230, 53, 0.34)",
        }}
        transition={{ type: "spring", stiffness: 250, damping: 18 }}
        style={{ transformStyle: "preserve-3d" }}
        className={cn("will-change-transform [transform-style:preserve-3d]", baseStyles, className)}
        {...props}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#134E4A]/12 via-transparent to-[#A3E635]/6 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="pointer-events-none absolute -left-1/2 top-0 h-px w-full bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 transition-all duration-700 group-hover:left-full group-hover:opacity-100" />
        <div className="pointer-events-none absolute inset-x-8 bottom-0 h-20 rounded-full bg-[#A3E635]/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
        <div className="relative z-10 [transform:translateZ(26px)]">{children}</div>
      </motion.div>
    );
  }

  return (
    <div className={cn(baseStyles, className)} {...props}>
      {children}
    </div>
  );
};
