import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  color?: string;
  bgColor?: string;
  borderColor?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  truncateValue?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  color = 'text-blue-400',
  bgColor = 'bg-blue-500/10',
  borderColor = 'border-blue-500/20',
  trend,
  truncateValue
}) => {
  return (
    <Card
      className="group border-none rounded-2xl overflow-hidden shadow-glow-lg animate-fade-in-scale relative min-h-[128px] bg-white dark:glass-premium text-black dark:text-white"
      style={{
        padding: 0,
        margin: 0,
      }}
    >
      {/* Subtle layered gradients for glass morph look */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/4 via-slate-400/10 to-transparent pointer-events-none z-0 dark:bg-gradient-to-br dark:from-blue-700/5 dark:via-cyan-800/5 dark:to-white/0" />
      {/* faint highlight line */}
      <div className="absolute top-0 left-4 right-4 h-1 bg-gradient-to-r from-slate-400/30 via-slate-200/10 to-transparent rounded-full blur-md z-10 dark:bg-gradient-to-r dark:from-blue-300/30 dark:via-cyan-200/10 dark:to-transparent" />

      <CardContent className="relative px-4 py-4 sm:px-6 sm:py-5 z-10">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`
                  font-heading font-semibold
                  text-[10px] xs:text-xs sm:text-sm
                  tracking-widest
                  text-slate-800/80 dark:text-blue-200/80
                  uppercase
                  whitespace-nowrap
                  sm:whitespace-normal
                  leading-snug
                  block
                  max-w-[10em] sm:max-w-full
                `}
                style={{
                  overflow: "visible",
                  textOverflow: "initial",
                  lineHeight: "1.15",
                  minHeight: "1.2em",
                }}
              >
                {title}
              </span>
              {trend && (
                <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-opacity-20 border shadow-md 
                  ${trend.isPositive
                    ? 'bg-emerald-600/20 text-emerald-300 border-emerald-700/30'
                    : 'bg-red-600/20 text-red-300 border-red-700/30'
                  }
                `}>
                  <span className="text-xs">{trend.isPositive ? '↗' : '↘'}</span>
                  <span className="font-bold">{Math.abs(trend.value)}%</span>
                </div>
              )}
            </div>

            <div className="mb-1">
              <span
                className={`
                  font-extrabold font-heading bg-gradient-to-r from-black via-neutral-700 to-slate-400 bg-clip-text text-transparent dark:bg-gradient-to-r dark:from-white dark:via-blue-100 dark:to-cyan-200 dark:bg-clip-text dark:text-transparent
                  text-lg sm:text-xl lg:text-2xl tracking-tight leading-none block
                  ${truncateValue ? "truncate max-w-[110px]" : ""}
                `}
                title={typeof value === 'string' ? value : undefined}
                style={{ letterSpacing: '-0.025em' }}
              >
                {typeof value === 'number' ? value.toLocaleString() : value}
              </span>
            </div>

            {subtitle && (
              <div className="text-slate-800/80 dark:text-blue-300/80 text-[11px] sm:text-xs font-medium truncate">
                {subtitle}
              </div>
            )}
          </div>

          <div className="ml-2 flex-shrink-0">
            <div className={`${bgColor} p-2 sm:p-3 rounded-xl border border-white/10 shadow-lg group-hover:scale-105 group-hover:rotate-3 transition-all duration-300`}>
              <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${color} group-hover:rotate-12 transition-transform duration-300 drop-shadow-md`} />
            </div>
          </div>
        </div>
        {/* Stylized micro progress "bar" for extra polish */}
        <div className="relative h-1 bg-slate-200 rounded-full mt-3 overflow-hidden shadow-inner dark:bg-slate-900/40">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-400/30 via-slate-200/20 to-slate-200/30 rounded-full dark:bg-gradient-to-r dark:from-blue-700/30 dark:via-purple-800/20 dark:to-cyan-800/30" />
          <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 rounded-full transition-transform duration-700 shadow-xl shadow-blue-800/30"
            style={{ width: '75%' }} />
        </div>
      </CardContent>
    </Card>
  );
};
