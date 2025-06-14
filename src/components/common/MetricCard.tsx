
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
    <Card className="group glass-dark hover-lift shadow-glow border-0 rounded-2xl overflow-hidden animate-fade-in-scale">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-cyan-600/5 opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/2 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      
      <CardContent className="relative p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <p className="text-blue-200/80 text-sm font-medium font-heading tracking-wide uppercase">
                {title}
              </p>
              {trend && (
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-mono ${
                  trend.isPositive 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}>
                  <span>{trend.isPositive ? '↗' : '↘'}</span>
                  <span>{Math.abs(trend.value)}%</span>
                </div>
              )}
            </div>
            
            <div className="mb-3">
              <p className="text-4xl font-bold font-heading text-white tracking-tight leading-none">
                {typeof value === 'number' ? value.toLocaleString() : value}
              </p>
            </div>
            
            {subtitle && (
              <p className="text-blue-300/60 text-sm font-medium">
                {subtitle}
              </p>
            )}
          </div>
          
          <div className="ml-6">
            <div className={`${bgColor} p-4 rounded-2xl shadow-lg border border-white/10 group-hover:scale-110 transition-all duration-300`}>
              <Icon className={`w-8 h-8 ${color} group-hover:rotate-12 transition-transform duration-300`} />
            </div>
          </div>
        </div>
        
        <div className="h-1 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 rounded-full transform origin-left scale-x-75 group-hover:scale-x-100 transition-transform duration-700" />
        </div>
      </CardContent>
    </Card>
  );
};
