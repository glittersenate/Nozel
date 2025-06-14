
import React, { useEffect, useRef } from 'react';
import { Clock, User, TrendingUp, Building, UserPlus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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

const getActivityIcon = (type: Activity['type']) => {
  switch (type) {
    case 'hire': return <UserPlus className="w-4 h-4 text-green-400" />;
    case 'promotion': return <TrendingUp className="w-4 h-4 text-blue-400" />;
    case 'salary_change': return <TrendingUp className="w-4 h-4 text-yellow-400" />;
    case 'department_change': return <Building className="w-4 h-4 text-purple-400" />;
    default: return <User className="w-4 h-4 text-blue-400" />;
  }
};

const getActivityColor = (type: Activity['type']) => {
  switch (type) {
    case 'hire': return 'bg-green-400/20 text-green-300 border-green-400/30';
    case 'promotion': return 'bg-blue-400/20 text-blue-300 border-blue-400/30';
    case 'salary_change': return 'bg-yellow-400/20 text-yellow-300 border-yellow-400/30';
    case 'department_change': return 'bg-purple-400/20 text-purple-300 border-purple-400/30';
    default: return 'bg-blue-400/20 text-blue-300 border-blue-400/30';
  }
};

const LiveActivityFeed: React.FC<LiveActivityFeedProps> = ({ activities, isLive }) => {
  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (feedRef.current && activities.length > 0) {
      feedRef.current.scrollTop = 0;
    }
  }, [activities]);

  return (
    <Card className="bg-[#141a2e]/80 border-blue-950 h-96">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-blue-100 flex items-center gap-2">
            Live Activity Feed
            {isLive && (
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            )}
          </CardTitle>
        </div>
        <CardDescription className="text-blue-300">
          Real-time employee activities and updates
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div 
          ref={feedRef}
          className="max-h-64 overflow-y-auto px-6 pb-6 space-y-3"
        >
          {activities.length === 0 ? (
            <div className="text-center py-8 text-blue-300/70">
              <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No activities yet. Start live mode to see updates!</p>
            </div>
          ) : (
            activities.map((activity, index) => (
              <div 
                key={activity.id}
                className={`flex items-start gap-3 p-3 rounded-lg bg-[#1a2550]/30 transition-all duration-500 ${
                  index === 0 && isLive ? 'animate-pulse bg-blue-600/10' : ''
                }`}
              >
                <div className="flex-shrink-0 mt-1">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-blue-100">{activity.message}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-blue-300/70 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {activity.timestamp.toLocaleTimeString()}
                    </span>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getActivityColor(activity.type)}`}
                    >
                      {activity.type.replace('_', ' ')}
                    </Badge>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveActivityFeed;
