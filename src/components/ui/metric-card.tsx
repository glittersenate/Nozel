
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: 'blue' | 'green' | 'yellow' | 'purple' | 'red';
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
  className?: string;
}

const colorClasses = {
  blue: {
    icon: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20'
  },
  green: {
    icon: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20'
  },
  yellow: {
    icon: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/20'
  },
  purple: {
    icon: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20'
  },
  red: {
    icon: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20'
  }
};

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon: Icon,
  color = 'blue',
  trend,
  className = ''
}) => {
  const colors = colorClasses[color];

  return (
    <Card className={`bg-[#141a2e]/80 border ${colors.border} rounded-xl p-6 hover:scale-105 transition-transform ${className}`}>
      <CardContent className="p-0">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-300/70 text-sm font-medium">{title}</p>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-2xl font-bold text-white">{value}</p>
              {trend && (
                <span className={`text-xs font-medium ${
                  trend.direction === 'up' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {trend.direction === 'up' ? '+' : '-'}{Math.abs(trend.value)}%
                </span>
              )}
            </div>
          </div>
          <div className={`${colors.bg} p-3 rounded-lg`}>
            <Icon className={`w-6 h-6 ${colors.icon}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
