
import React, { useState, useEffect } from 'react';
import { Bell, X, CheckCircle, AlertTriangle, Info, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'urgent';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

const NotificationSystem: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'urgent',
      title: 'Payroll Due Tomorrow',
      message: 'Monthly payroll processing is scheduled for tomorrow at 9 AM',
      timestamp: new Date(),
      read: false
    },
    {
      id: '2',
      type: 'success',
      title: 'Employee Added',
      message: 'John Smith successfully added to Engineering team',
      timestamp: new Date(Date.now() - 3600000),
      read: false
    },
    {
      id: '3',
      type: 'info',
      title: 'System Update',
      message: 'New analytics features are now available',
      timestamp: new Date(Date.now() - 7200000),
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      case 'urgent': return <Zap className="w-4 h-4 text-red-400" />;
      default: return <Info className="w-4 h-4 text-blue-400" />;
    }
  };

  const getTimeAgo = (timestamp: Date) => {
    const diff = Date.now() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="relative h-9 w-9 bg-[#141a2e]/60 hover:bg-[#141a2e]/80 border border-blue-800/30"
        >
          <Bell className="h-4 w-4 text-blue-200" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-80 bg-[#141a2e] border-blue-800/30 text-blue-100 max-h-96 overflow-y-auto"
      >
        <div className="p-3 border-b border-blue-800/30">
          <h3 className="font-semibold">Notifications</h3>
          <p className="text-xs text-blue-300">{unreadCount} unread</p>
        </div>
        <div className="max-h-64 overflow-y-auto">
          {notifications.map((notification) => (
            <div 
              key={notification.id}
              className={`p-3 border-b border-blue-800/20 hover:bg-blue-600/10 ${!notification.read ? 'bg-blue-600/5' : ''}`}
            >
              <div className="flex items-start gap-3">
                {getIcon(notification.type)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className={`text-sm font-medium ${!notification.read ? 'text-blue-100' : 'text-blue-300'}`}>
                      {notification.title}
                    </h4>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0 hover:bg-red-600/20"
                      onClick={() => removeNotification(notification.id)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                  <p className="text-xs text-blue-300 mt-1">{notification.message}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-blue-400">{getTimeAgo(notification.timestamp)}</span>
                    {!notification.read && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 px-2 text-xs hover:bg-blue-600/20"
                        onClick={() => markAsRead(notification.id)}
                      >
                        Mark read
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationSystem;
