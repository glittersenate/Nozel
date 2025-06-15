
import React from 'react';
import PremiumCard from '../common/PremiumCard';
import { Clock, Calendar, TrendingUp, Coffee } from 'lucide-react';
import { useTimeTracking } from '@/hooks/useTimeTracking';

export const TimeSummaryCards = () => {
  const { getTodaySummary, getWeeklySummary } = useTimeTracking();
  
  const todaySummary = getTodaySummary();
  const weeklySummary = getWeeklySummary();

  const cards = [
    {
      title: "Today's Hours",
      value: todaySummary.totalHours.toFixed(1),
      subtitle: "hours worked",
      icon: Clock,
    },
    {
      title: "Weekly Hours",
      value: weeklySummary.totalHours.toFixed(1),
      subtitle: "of 40 hours",
      icon: Calendar,
    },
    {
      title: "Overtime",
      value: weeklySummary.overtimeHours.toFixed(1),
      subtitle: "extra hours",
      icon: TrendingUp,
    },
    {
      title: "Break Time",
      value: weeklySummary.breakHours.toFixed(1),
      subtitle: "hours this week",
      icon: Coffee,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card) => (
        <PremiumCard key={card.title}>
          <div className="flex items-center justify-between pb-1">
            <span className="uppercase text-xs font-bold tracking-wider text-black/60 dark:text-blue-200/60">{card.title}</span>
            <card.icon className="w-5 h-5 text-black dark:text-blue-200" />
          </div>
          <div className="pt-2 pb-1">
            <span className="text-2xl font-bold text-black dark:text-white">{card.value}</span>
          </div>
          {card.subtitle && (
            <div className="text-xs text-black/40 dark:text-blue-300/50">{card.subtitle}</div>
          )}
        </PremiumCard>
      ))}
    </div>
  );
};
