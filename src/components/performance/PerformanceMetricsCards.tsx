
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Target, Clock, TrendingUp } from 'lucide-react';
import { usePerformance } from '@/hooks/usePerformance';

export const PerformanceMetricsCards = () => {
  const { getPerformanceMetrics } = usePerformance();
  const metrics = getPerformanceMetrics();

  const cards = [
    {
      title: "Average Rating",
      value: metrics.averageRating.toFixed(1),
      subtitle: "out of 5.0",
      icon: Star,
      color: "bg-yellow-500",
    },
    {
      title: "Reviews Completed",
      value: metrics.reviewsCompleted.toString(),
      subtitle: "this quarter",
      icon: Clock,
      color: "bg-green-500",
    },
    {
      title: "Pending Reviews",
      value: metrics.reviewsPending.toString(),
      subtitle: "awaiting completion",
      icon: TrendingUp,
      color: "bg-orange-500",
    },
    {
      title: "Goals Achieved",
      value: `${Math.round((metrics.goalsAchieved / metrics.totalGoals) * 100)}%`,
      subtitle: `${metrics.goalsAchieved}/${metrics.totalGoals} goals`,
      icon: Target,
      color: "bg-blue-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
            <p className="text-xs text-blue-300/70">
              {card.subtitle}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
