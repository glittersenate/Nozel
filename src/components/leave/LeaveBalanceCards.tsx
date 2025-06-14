
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Calendar, Coffee, Heart, Clock } from 'lucide-react';
import { useLeave } from '@/hooks/useLeave';

export const LeaveBalanceCards = () => {
  const { getLeaveBalance } = useLeave();
  const balance = getLeaveBalance();

  const leaveTypes = [
    {
      title: "Vacation",
      used: balance.vacation.used,
      remaining: balance.vacation.remaining,
      total: balance.vacation.accrued,
      icon: Calendar,
      color: "bg-blue-500",
    },
    {
      title: "Sick Leave",
      used: balance.sick.used,
      remaining: balance.sick.remaining,
      total: balance.sick.accrued,
      icon: Heart,
      color: "bg-red-500",
    },
    {
      title: "Personal",
      used: balance.personal.used,
      remaining: balance.personal.remaining,
      total: balance.personal.accrued,
      icon: Coffee,
      color: "bg-purple-500",
    },
    {
      title: "Comp Time",
      used: 2,
      remaining: 8,
      total: 10,
      icon: Clock,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {leaveTypes.map((leave) => (
        <Card key={leave.title} className="bg-[#141a2e]/80 border border-blue-800/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-300">
              {leave.title}
            </CardTitle>
            <leave.icon className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white mb-1">
              {leave.remaining} days
            </div>
            <p className="text-xs text-blue-300/70 mb-3">
              {leave.used} used of {leave.total}
            </p>
            <Progress 
              value={(leave.used / leave.total) * 100} 
              className="h-2"
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
