
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
    <Card className={`bg-[#141a2e]/80 border ${borderColor} rounded-xl hover:scale-105 transition-all duration-300 shadow-lg`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-blue-300/70 text-sm font-medium mb-1">{title}</p>
            <p className="text-2xl font-bold text-white mb-1">
              {typeof value === 'number' ? value.toLocaleString() : value}
            </p>
            {subtitle && (
              <p className="text-xs text-blue-300/70">{subtitle}</p>
            )}
            {trend && (
              <div className={`text-xs mt-1 ${trend.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                {trend.isPositive ? '↗' : '↘'} {Math.abs(trend.value)}%
              </div>
            )}
          </div>
          <div className={`${bgColor} p-3 rounded-lg`}>
            <Icon className={`w-6 h-6 ${color}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
