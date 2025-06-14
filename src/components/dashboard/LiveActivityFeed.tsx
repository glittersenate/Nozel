
import React from 'react';
import { Clock, UserPlus, TrendingUp, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Activity {
  id: string;
  type: 'hire' | 'promotion' | 'salary_change' | 'department_change';
  message: string;
  timestamp: Date;
  employee?: string;
}

interface LiveActivityFeedProps {
  activities: Activity[];
  isLive: boolean;
}

const LiveActivityFeed: React.FC<LiveActivityFeedProps> = ({ activities, isLive }) => {
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'hire': return UserPlus;
      case 'promotion': return TrendingUp;
      case 'salary_change': return TrendingUp;
      case 'department_change': return Calendar;
      default: return Clock;
    }
  };

  const getActivityColor = (type: Activity['type']) => {
    switch (type) {
      case 'hire': return 'text-green-400';
      case 'promotion': return 'text-blue-400';
      case 'salary_change': return 'text-yellow-400';
      case 'department_change': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <Card className="bg-[#1a2550]/70 border-blue-950 shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-blue-100">
          <Clock className="w-5 h-5 text-blue-400" />
          Live Activity Feed
          {isLive && (
            <Badge variant="default" className="bg-green-600 text-white">
              Live
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-80 overflow-y-auto">
          {activities.length === 0 ? (
            <p className="text-blue-300/70 text-center py-4">No recent activities</p>
          ) : (
            activities.slice(0, 10).map((activity) => {
              const Icon = getActivityIcon(activity.type);
              return (
                <div key={activity.id} className="flex items-start gap-3 p-3 bg-[#0e1c38]/50 rounded-lg">
                  <div className={`p-2 rounded-lg bg-[#141a2e]`}>
                    <Icon className={`w-4 h-4 ${getActivityColor(activity.type)}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-blue-200 leading-relaxed">{activity.message}</p>
                    <p className="text-xs text-blue-300/70 mt-1">
                      {activity.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveActivityFeed;
