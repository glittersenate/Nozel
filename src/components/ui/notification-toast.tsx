
import React from 'react';
import { Bell, X, Clock, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface NotificationItem {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionLabel?: string;
  onAction?: () => void;
}

interface NotificationToastProps {
  notification: NotificationItem;
  onMarkRead: (id: string) => void;
  onDismiss: (id: string) => void;
}

const getIcon = (type: NotificationItem['type']) => {
  switch (type) {
    case 'success': return <CheckCircle className="w-5 h-5 text-green-400" />;
    case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
    case 'error': return <AlertTriangle className="w-5 h-5 text-red-400" />;
    default: return <Info className="w-5 h-5 text-blue-400" />;
  }
};

const getColorClasses = (type: NotificationItem['type']) => {
  switch (type) {
    case 'success': return 'border-green-500/30 bg-green-500/10';
    case 'warning': return 'border-yellow-500/30 bg-yellow-500/10';
    case 'error': return 'border-red-500/30 bg-red-500/10';
    default: return 'border-blue-500/30 bg-blue-500/10';
  }
};

const NotificationToast: React.FC<NotificationToastProps> = ({
  notification,
  onMarkRead,
  onDismiss
}) => {
  return (
    <div className={`border rounded-lg p-4 ${getColorClasses(notification.type)} ${!notification.read ? 'shadow-lg' : 'opacity-75'}`}>
      <div className="flex items-start gap-3">
        {getIcon(notification.type)}
        <div className="flex-1">
          <h4 className="font-medium text-white text-sm">{notification.title}</h4>
          <p className="text-blue-200 text-xs mt-1">{notification.message}</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-1 text-blue-300/70 text-xs">
              <Clock className="w-3 h-3" />
              {notification.timestamp.toLocaleTimeString()}
            </div>
            {notification.actionLabel && notification.onAction && (
              <Button 
                size="sm" 
                variant="outline" 
                className="h-6 px-2 text-xs bg-blue-600/20 border-blue-500/30 hover:bg-blue-600/30"
                onClick={notification.onAction}
              >
                {notification.actionLabel}
              </Button>
            )}
          </div>
        </div>
        <Button
          size="sm"
          variant="ghost"
          className="h-6 w-6 p-0 hover:bg-white/10"
          onClick={() => onDismiss(notification.id)}
        >
          <X className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
};

export default NotificationToast;
