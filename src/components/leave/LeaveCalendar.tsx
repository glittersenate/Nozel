
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const LeaveCalendar = () => {
  const upcomingLeave = [
    {
      id: '1',
      employee: 'John Doe',
      type: 'vacation',
      dates: 'Mar 15-19',
      days: 5
    },
    {
      id: '2',
      employee: 'Jane Smith',
      type: 'sick',
      dates: 'Mar 20',
      days: 1
    },
    {
      id: '3',
      employee: 'Mike Johnson',
      type: 'personal',
      dates: 'Mar 22',
      days: 1
    },
    {
      id: '4',
      employee: 'Sarah Connor',
      type: 'vacation',
      dates: 'Mar 25-29',
      days: 5
    }
  ];

  const getLeaveTypeColor = (type: string) => {
    switch (type) {
      case 'vacation':
        return 'bg-blue-500';
      case 'sick':
        return 'bg-red-500';
      case 'personal':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Card className="bg-[#141a2e]/80 border border-blue-800/30">
      <CardHeader>
        <CardTitle className="text-xl text-white">Upcoming Leave</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingLeave.map((leave) => (
            <div key={leave.id} className="flex items-center justify-between p-3 bg-blue-900/20 rounded-lg">
              <div className="flex items-center gap-3">
                <Badge className={getLeaveTypeColor(leave.type)}>
                  {leave.type}
                </Badge>
                <div>
                  <div className="font-medium text-white">{leave.employee}</div>
                  <div className="text-sm text-blue-300">{leave.dates}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white font-medium">{leave.days} days</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
