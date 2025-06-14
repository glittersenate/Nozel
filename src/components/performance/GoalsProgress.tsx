
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { usePerformance } from '@/hooks/usePerformance';

export const GoalsProgress = () => {
  const { getCurrentGoals } = usePerformance();
  const goals = getCurrentGoals();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in-progress':
        return 'bg-blue-500';
      case 'overdue':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Card className="bg-[#141a2e]/80 border border-blue-800/30">
      <CardHeader>
        <CardTitle className="text-xl text-white">Current Goals</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {goals.map((goal) => (
            <div key={goal.id} className="p-4 bg-blue-900/20 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-white">{goal.title}</h4>
                <Badge className={getStatusColor(goal.status)}>
                  {goal.status.replace('-', ' ')}
                </Badge>
              </div>
              <p className="text-sm text-blue-300 mb-3">{goal.description}</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-blue-300">Progress</span>
                  <span className="text-white">{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} className="h-2" />
                <div className="flex justify-between text-xs text-blue-300/70">
                  <span>Target: {goal.targetDate}</span>
                  {goal.rating && <span>Rating: {goal.rating}/5</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
