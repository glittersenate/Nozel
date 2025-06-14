
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
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  color = 'text-blue-400',
  bgColor = 'bg-blue-500/10',
  borderColor = 'border-blue-500/20',
  trend
}) => {
  return (
    <Card className="group glass-dark hover-lift shadow-glow border-0 rounded-3xl overflow-hidden animate-fade-in-scale relative">
      {/* Blue-themed background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-slate-800/20 to-blue-900/10 opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      
      {/* Blue floating orbs */}
      <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-cyan-400/15 rounded-full blur-xl animate-float" />
      <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-blue-500/20 to-slate-600/15 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }} />
      
      <CardContent className="relative p-8 z-10">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <p className="text-blue-200/80 text-sm font-medium font-heading tracking-wide uppercase">
                {title}
              </p>
              {trend && (
                <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono backdrop-blur-sm ${
                  trend.isPositive 
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 shadow-lg shadow-emerald-500/10' 
                    : 'bg-red-500/20 text-red-300 border border-red-400/30 shadow-lg shadow-red-500/10'
                }`}>
                  <span className="text-sm">{trend.isPositive ? '↗' : '↘'}</span>
                  <span className="font-semibold">{Math.abs(trend.value)}%</span>
                </div>
              )}
            </div>
            
            <div className="mb-4">
              <p className="text-5xl font-bold font-heading text-blue-100 tracking-tight leading-none">
                {typeof value === 'number' ? value.toLocaleString() : value}
              </p>
            </div>
            
            {subtitle && (
              <p className="text-blue-300/70 text-sm font-medium">
                {subtitle}
              </p>
            )}
          </div>
          
          <div className="ml-8">
            <div className={`${bgColor} p-5 rounded-3xl shadow-2xl border border-blue-400/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 backdrop-blur-sm`}>
              <Icon className={`w-10 h-10 ${color} group-hover:rotate-12 transition-transform duration-300 drop-shadow-lg`} />
            </div>
          </div>
        </div>
        
        {/* Blue-themed progress bar */}
        <div className="relative h-2 bg-gradient-to-r from-slate-800/60 via-blue-900/40 to-slate-800/60 rounded-full overflow-hidden backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-blue-500/30 to-cyan-500/30 rounded-full" />
          <div className="h-full bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 rounded-full transform origin-left scale-x-75 group-hover:scale-x-100 transition-transform duration-700 shadow-lg shadow-blue-500/20" />
        </div>
      </CardContent>
    </Card>
  );
};
