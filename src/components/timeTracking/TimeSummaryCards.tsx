
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
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
      progress: (todaySummary.totalHours / 8) * 100,
      color: "bg-blue-500",
    },
    {
      title: "Weekly Hours",
      value: weeklySummary.totalHours.toFixed(1),
      subtitle: "of 40 hours",
      icon: Calendar,
      progress: (weeklySummary.totalHours / 40) * 100,
      color: "bg-green-500",
    },
    {
      title: "Overtime",
      value: weeklySummary.overtimeHours.toFixed(1),
      subtitle: "extra hours",
      icon: TrendingUp,
      progress: Math.min((weeklySummary.overtimeHours / 10) * 100, 100),
      color: weeklySummary.overtimeHours > 0 ? "bg-orange-500" : "bg-gray-500",
    },
    {
      title: "Break Time",
      value: weeklySummary.breakHours.toFixed(1),
      subtitle: "hours this week",
      icon: Coffee,
      progress: (weeklySummary.breakHours / 5) * 100,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card) => (
        <Card key={card.title} className="bg-[#141a2e]/80 border border-blue-800/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-300">
              {card.title}
            </CardTitle>
            <card.icon className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white mb-1">
              {card.value}
            </div>
            <p className="text-xs text-blue-300/70 mb-3">
              {card.subtitle}
            </p>
            <Progress 
              value={card.progress} 
              className="h-2"
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
