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
  const baseStyles = "rounded-[24px] border border-[#1F7A6B]/20 bg-[#0B0F0F]/80 p-6 shadow-xl backdrop-blur-xl transition-all relative overflow-hidden group";
  
  if (isHoverable) {
    return (
      <motion.div
        whileHover={{ y: -6, borderColor: "rgba(163, 230, 53, 0.3)" }}
        className={cn(baseStyles, className)}
        {...props}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#134E4A]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative z-10">{children}</div>
      </motion.div>
    );
  }

  return (
    <div className={cn(baseStyles, className)} {...props}>
      {children}
    </div>
  );
};
