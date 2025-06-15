
import React, { useState } from 'react';
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
}

const LiveActivityFeed: React.FC<LiveActivityFeedProps> = ({ activities }) => {
  const [showAll, setShowAll] = useState(false);

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

  const displayActivities = showAll ? activities : activities.slice(0, 10);

  return (
    <Card
      className="shadow-lg rounded-2xl p-0 border"
      style={{
        background: "linear-gradient(115deg,rgba(31,42,70,0.98) 65%,rgba(32,55,116,0.94) 100%)",
        border: "1px solid rgba(87,120,255,0.06)",
      }}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-blue-100">
          <Clock className="w-5 h-5 text-blue-400" />
          Live Activity Feed
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="ml-auto px-2 py-1 text-xs rounded bg-blue-800 text-blue-100 hover:bg-blue-700 transition-colors"
            aria-label="See all activity"
          >
            {showAll ? "Hide" : "See all"}
          </button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-80 overflow-y-auto">
          {activities.length === 0 ? (
            <p className="text-blue-300/70 text-center py-4">No recent activities</p>
          ) : (
            displayActivities.map((activity) => {
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
        <div className="flex justify-center mt-3">
          <span className="text-xs text-blue-300/70">
            Updates every 15 seconds
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveActivityFeed;
