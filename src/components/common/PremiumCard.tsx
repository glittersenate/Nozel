
import React from "react";
import { cn } from "@/lib/utils";

interface PremiumCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const PremiumCard: React.FC<PremiumCardProps> = ({ children, className = "", ...props }) => {
  // This component ensures: white/black in light, deep/dark premium in dark
  return (
    <div
      className={cn(
        // Light mode: white bg, strong shadow, soft border, pill corners
        "rounded-2xl shadow-lg border border-blue-100 bg-white text-black",
        // Padding/spacing matches Pay Period card
        "px-6 py-5",
        // Dark mode: premium blue/indigo bg, no white, all text white
        "dark:bg-gradient-to-br dark:from-[#1f2a46]/98 dark:to-[#203774]/94 dark:border-0 dark:shadow-glow dark:text-white",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default PremiumCard;
