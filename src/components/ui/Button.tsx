import React from "react";
import { cn } from "../../lib/utils";
import { motion, HTMLMotionProps } from "motion/react";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = ({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) => {
  const baseStyles = "group relative inline-flex items-center justify-center overflow-hidden rounded-full font-semibold tracking-[0.015em] leading-tight transition-all duration-300 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50";
  
  const variants = {
    primary: "bg-gradient-to-r from-[#0f3d38] via-[#1F7A6B] to-[#A3E635] text-white shadow-[0_12px_35px_rgba(31,122,107,0.4)] hover:shadow-[0_16px_42px_rgba(163,230,53,0.35)]",
    secondary: "border border-[#1F7A6B]/30 glass-panel text-[#F5F5F5] hover:border-[#A3E635]/35 hover:bg-[#0F2F2B]/55",
    ghost: "text-[#A1A1AA] hover:bg-[#1F7A6B]/10 hover:text-[#F5F5F5]",
  };

  const sizes = {
    sm: "px-5 py-2 text-sm",
    md: "px-7 py-3 text-base",
    lg: "px-10 py-4 text-lg",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -1 }}
      whileTap={{ scale: 0.98, y: 0 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {variant !== "ghost" && (
        <span className="pointer-events-none absolute inset-0 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[130%]" />
      )}
    </motion.button>
  );
};
