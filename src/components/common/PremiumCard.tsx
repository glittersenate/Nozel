
import React from "react";
import { cn } from "@/lib/utils";

/**
 * PremiumCard: A universal card with premium theming for both light and dark mode.
 * Light mode: white bg, soft border/shadow, black/gray text.
 * Dark mode: deep glass-gradient bg, neon border, premium shadow, white/neon text.
 */
interface PremiumCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const PremiumCard: React.FC<PremiumCardProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <div
      className={cn(
        // LIGHT MODE: pure white card, soft blue-gray border, strong shadow, pill radius
        "rounded-2xl shadow-lg border border-blue-100 bg-white text-black",
        "px-6 py-5",
        // DARK MODE: glassy-gradient bg, neon/glow border, everything white/neon
        "dark:bg-gradient-to-br dark:from-[#182235]/95 dark:via-[#1e2746]/92 dark:to-[#1b2744]/97",
        "dark:border dark:border-blue-500/20 dark:shadow-glow-lg dark:text-white",
        // Add a subtle glass effect/inner glow
        "dark:backdrop-blur-md dark:bg-opacity-90 dark:shadow-[0_8px_32px_0_rgba(31,48,85,0.36),0_1.5px_8px_0_rgba(63,168,255,0.12)]",
        "transition-all duration-300",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default PremiumCard;
