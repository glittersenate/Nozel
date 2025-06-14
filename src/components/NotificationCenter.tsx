
import React from 'react';
import { Bell, CheckCircle, AlertCircle, Clock } from 'lucide-react';

const notifications = [
  {
    id: 1,
    type: 'success',
    icon: CheckCircle,
    title: 'Payroll Completed',
    message: 'March payroll has been successfully processed',
    time: '2 minutes ago',
  },
  {
    id: 2,
    type: 'warning',
    icon: AlertCircle,
    title: 'Tax Filing Due',
    message: 'Quarterly tax filing due in 5 days',
    time: '1 hour ago',
  },
  {
    id: 3,
    type: 'info',
    icon: Clock,
    title: 'Time Off Request',
    message: '3 new time off requests pending approval',
    time: '3 hours ago',
  },
];

const NotificationCenter = () => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Bell className="w-5 h-5 text-blue-400" />
          Recent Activity
        </h2>
        <span className="text-xs text-blue-300/70">View all</span>
      </div>
      <div className="space-y-3">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="flex items-start gap-3 p-3 rounded-lg bg-[#141a2e]/60 border border-blue-950/50 hover:bg-[#141a2e]/80 transition-colors"
          >
            <notification.icon 
              className={`w-4 h-4 mt-0.5 ${
                notification.type === 'success' ? 'text-green-400' :
                notification.type === 'warning' ? 'text-yellow-400' :
                'text-blue-400'
              }`} 
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-blue-100">{notification.title}</p>
              <p className="text-xs text-blue-300/70 mt-1">{notification.message}</p>
              <p className="text-xs text-blue-400/50 mt-1">{notification.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationCenter;
