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
  const baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-all focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-[#134E4A] via-[#1F7A6B] to-[#A3E635] text-white shadow-[0_0_20px_rgba(163,230,53,0.2)] hover:shadow-[0_0_30px_rgba(163,230,53,0.4)]",
    secondary: "border border-[#1F7A6B]/30 bg-[#0F2F2B]/20 text-[#F5F5F5] hover:bg-[#0F2F2B]/40 backdrop-blur-sm",
    ghost: "text-[#A1A1AA] hover:text-[#F5F5F5]",
  };

  const sizes = {
    sm: "px-4 py-1.5 text-xs",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </motion.button>
  );
};
