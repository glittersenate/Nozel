
import React, { useState } from 'react';
import { Clock, UserPlus, TrendingUp, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';

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
  const [seeAllOpen, setSeeAllOpen] = useState(false);

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

  // For main feed, show only latest 10
  const displayActivities = activities.slice(0, 10);

  return (
    <>
      <Card
        className="shadow-lg rounded-2xl p-0 border h-full"
        style={{
          background: "linear-gradient(115deg,rgba(31,42,70,0.98) 65%,rgba(32,55,116,0.94) 100%)",
          border: "1px solid rgba(87,120,255,0.06)",
          minHeight: "0",     // allow container to shrink
          height: "74%",      // reduced about 30% (was 100%/default)
          maxHeight: "285px", // shrink the maxHeight to be about 30% less
          display: "flex",
          flexDirection: "column"
        }}
      >
        <CardHeader className="py-3 px-4"> {/* less vertical padding */}
          <CardTitle className="flex items-center gap-3 text-blue-100 text-base">
            <Clock className="w-5 h-5 text-blue-400" />
            Live Activity Feed
            <button
              type="button"
              onClick={() => setSeeAllOpen(true)}
              className="ml-auto px-2 py-1 text-xs rounded bg-blue-800 text-blue-100 hover:bg-blue-700 transition-colors"
              aria-label="See all activity"
            >
              See all
            </button>
          </CardTitle>
        </CardHeader>
        <CardContent className="py-2 px-4 flex-grow"> {/* less vertical padding */}
          <div className="space-y-2"> {/* less spacing */}
            {activities.length === 0 ? (
              <p className="text-blue-300/70 text-center py-4">No recent activities</p>
            ) : (
              displayActivities.map((activity) => {
                const Icon = getActivityIcon(activity.type);
                return (
                  <div key={activity.id} className="flex items-start gap-2 p-2 bg-[#0e1c38]/50 rounded-lg">
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
          <div className="flex justify-center mt-2">
            <span className="text-xs text-blue-300/70">
              Updates every 15 seconds
            </span>
          </div>
        </CardContent>
      </Card>

      {/* See All Dialog */}
      <Dialog open={seeAllOpen} onOpenChange={setSeeAllOpen}>
        <DialogContent className="max-w-3xl bg-[#151e34] text-blue-100 p-0">
          <DialogHeader className="px-6 pt-6 pb-2">
            <DialogTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-400" />
              All Activities
            </DialogTitle>
            <DialogClose asChild>
              <button
                className="absolute right-4 top-4 text-blue-300 hover:text-white transition-colors"
                aria-label="Close"
              >
                ×
              </button>
            </DialogClose>
          </DialogHeader>
          <div className="px-6 pb-6 max-h-[75vh] overflow-y-auto">
            {activities.length === 0 ? (
              <p className="text-blue-300/70 text-center py-8">No activities yet</p>
            ) : (
              <div className="space-y-3">
                {activities.map((activity) => {
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
                })}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LiveActivityFeed;

