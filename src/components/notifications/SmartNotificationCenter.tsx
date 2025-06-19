import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bell, 
  Settings, 
  Filter, 
  MarkAsRead,
  Trash2,
  Star,
  Clock,
  User,
  Calendar,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Info,
  Zap,
  Mail,
  Smartphone,
  Monitor,
  Volume2,
  VolumeX
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error' | 'urgent';
  category: 'payroll' | 'leave' | 'performance' | 'system' | 'recruitment';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  isStarred: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  actionRequired?: boolean;
  relatedUser?: string;
  metadata?: any;
}

interface NotificationPreferences {
  email: boolean;
  push: boolean;
  desktop: boolean;
  sound: boolean;
  categories: {
    payroll: boolean;
    leave: boolean;
    performance: boolean;
    system: boolean;
    recruitment: boolean;
  };
  frequency: 'immediate' | 'hourly' | 'daily';
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
  };
}

export const SmartNotificationCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState('notifications');
  const [filter, setFilter] = useState<'all' | 'unread' | 'starred' | 'urgent'>('all');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'urgent',
      category: 'payroll',
      title: 'Payroll Processing Required',
      message: 'Monthly payroll for March needs to be processed by end of day.',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      isRead: false,
      isStarred: true,
      priority: 'urgent',
      actionRequired: true,
      relatedUser: 'System'
    },
    {
      id: '2',
      type: 'info',
      category: 'leave',
      title: 'Leave Request Submitted',
      message: 'John Doe has submitted a vacation request for April 15-19.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isRead: false,
      isStarred: false,
      priority: 'medium',
      actionRequired: true,
      relatedUser: 'John Doe'
    },
    {
      id: '3',
      type: 'success',
      category: 'performance',
      title: 'Performance Review Completed',
      message: 'Q1 performance review for Sarah Connor has been completed.',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      isRead: true,
      isStarred: false,
      priority: 'low',
      actionRequired: false,
      relatedUser: 'Sarah Connor'
    },
    {
      id: '4',
      type: 'warning',
      category: 'system',
      title: 'System Maintenance Scheduled',
      message: 'Scheduled maintenance will occur tonight from 2 AM to 4 AM EST.',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      isRead: false,
      isStarred: false,
      priority: 'medium',
      actionRequired: false,
      relatedUser: 'System'
    }
  ]);

  const [preferences, setPreferences] = useState<NotificationPreferences>({
    email: true,
    push: true,
    desktop: false,
    sound: true,
    categories: {
      payroll: true,
      leave: true,
      performance: true,
      system: true,
      recruitment: true
    },
    frequency: 'immediate',
    quietHours: {
      enabled: true,
      start: '22:00',
      end: '08:00'
    }
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'urgent': return <AlertTriangle className="w-5 h-5 text-red-400" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'success': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'error': return <AlertTriangle className="w-5 h-5 text-red-400" />;
      default: return <Info className="w-5 h-5 text-blue-400" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'payroll': return <DollarSign className="w-4 h-4" />;
      case 'leave': return <Calendar className="w-4 h-4" />;
      case 'performance': return <Star className="w-4 h-4" />;
      case 'recruitment': return <User className="w-4 h-4" />;
      default: return <Settings className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'border-l-red-500 bg-red-500/5';
      case 'high': return 'border-l-orange-500 bg-orange-500/5';
      case 'medium': return 'border-l-yellow-500 bg-yellow-500/5';
      default: return 'border-l-blue-500 bg-blue-500/5';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    switch (filter) {
      case 'unread': return !notification.isRead;
      case 'starred': return notification.isStarred;
      case 'urgent': return notification.priority === 'urgent';
      default: return true;
    }
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const urgentCount = notifications.filter(n => n.priority === 'urgent').length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  const toggleStar = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isStarred: !n.isStarred } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Bell className="w-8 h-8 text-blue-400" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full">
                    {unreadCount}
                  </Badge>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Notifications</h1>
                <p className="text-slate-400">
                  {unreadCount} unread • {urgentCount} urgent
                </p>
              </div>
            </div>
          </div>

          <TabsList className="bg-slate-800/50 border-slate-700/50">
            <TabsTrigger value="notifications" className="data-[state=active]:bg-blue-600/20">
              Notifications
            </TabsTrigger>
            <TabsTrigger value="preferences" className="data-[state=active]:bg-blue-600/20">
              Preferences
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="notifications" className="space-y-6">
          {/* Filters and Actions */}
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-400 text-sm">Filter:</span>
                  {['all', 'unread', 'starred', 'urgent'].map((filterType) => (
                    <Button
                      key={filterType}
                      variant={filter === filterType ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFilter(filterType as any)}
                      className={filter === filterType ? 'bg-blue-600' : 'border-slate-600 text-slate-300'}
                    >
                      {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                      {filterType === 'unread' && unreadCount > 0 && (
                        <Badge className="ml-2 bg-red-500 text-white text-xs">
                          {unreadCount}
                        </Badge>
                      )}
                    </Button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={markAllAsRead}
                    disabled={unreadCount === 0}
                    className="border-slate-600 text-slate-300"
                  >
                    <MarkAsRead className="w-4 h-4 mr-2" />
                    Mark All Read
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications List */}
          <div className="space-y-3">
            {filteredNotifications.length === 0 ? (
              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardContent className="p-8 text-center">
                  <Bell className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                  <h3 className="text-white font-medium mb-2">No notifications</h3>
                  <p className="text-slate-400">You're all caught up!</p>
                </CardContent>
              </Card>
            ) : (
              filteredNotifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`
                    bg-slate-800/50 border-slate-700/50 border-l-4 transition-all duration-200 hover:bg-slate-800/70
                    ${getPriorityColor(notification.priority)}
                    ${!notification.isRead ? 'ring-1 ring-blue-500/20' : ''}
                  `}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        {getNotificationIcon(notification.type)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <h3 className={`font-medium ${!notification.isRead ? 'text-white' : 'text-slate-300'}`}>
                              {notification.title}
                            </h3>
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full" />
                            )}
                            {notification.actionRequired && (
                              <Badge className="bg-orange-500/20 text-orange-300 text-xs">
                                Action Required
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleStar(notification.id)}
                              className="h-8 w-8 p-0 text-slate-400 hover:text-yellow-400"
                            >
                              <Star className={`w-4 h-4 ${notification.isStarred ? 'text-yellow-400 fill-yellow-400' : ''}`} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteNotification(notification.id)}
                              className="h-8 w-8 p-0 text-slate-400 hover:text-red-400"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        <p className="text-slate-400 text-sm mb-3">{notification.message}</p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-xs text-slate-500">
                            <div className="flex items-center gap-1">
                              {getCategoryIcon(notification.category)}
                              <span className="capitalize">{notification.category}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {formatTimestamp(notification.timestamp)}
                            </div>
                            {notification.relatedUser && (
                              <div className="flex items-center gap-1">
                                <User className="w-3 h-3" />
                                {notification.relatedUser}
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            {notification.actionRequired && (
                              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-xs">
                                Take Action
                              </Button>
                            )}
                            {!notification.isRead && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                                className="border-slate-600 text-slate-300 text-xs"
                              >
                                Mark Read
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          {/* Delivery Methods */}
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="w-5 h-5 text-blue-400" />
                Delivery Methods
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { key: 'email', label: 'Email Notifications', icon: Mail, description: 'Receive notifications via email' },
                  { key: 'push', label: 'Push Notifications', icon: Smartphone, description: 'Browser push notifications' },
                  { key: 'desktop', label: 'Desktop Notifications', icon: Monitor, description: 'System desktop notifications' },
                  { key: 'sound', label: 'Sound Alerts', icon: Volume2, description: 'Audio notifications' }
                ].map((method) => (
                  <div key={method.key} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <method.icon className="w-5 h-5 text-blue-400" />
                      <div>
                        <div className="text-white font-medium">{method.label}</div>
                        <div className="text-slate-400 text-sm">{method.description}</div>
                      </div>
                    </div>
                    <Switch
                      checked={preferences[method.key as keyof typeof preferences] as boolean}
                      onCheckedChange={(checked) => 
                        setPreferences(prev => ({ ...prev, [method.key]: checked }))
                      }
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Categories */}
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">Notification Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(preferences.categories).map(([category, enabled]) => (
                <div key={category} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    {getCategoryIcon(category)}
                    <span className="text-white capitalize">{category}</span>
                  </div>
                  <Switch
                    checked={enabled}
                    onCheckedChange={(checked) => 
                      setPreferences(prev => ({
                        ...prev,
                        categories: { ...prev.categories, [category]: checked }
                      }))
                    }
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quiet Hours */}
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <VolumeX className="w-5 h-5 text-purple-400" />
                Quiet Hours
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-medium">Enable Quiet Hours</div>
                  <div className="text-slate-400 text-sm">Suppress non-urgent notifications during specified hours</div>
                </div>
                <Switch
                  checked={preferences.quietHours.enabled}
                  onCheckedChange={(checked) => 
                    setPreferences(prev => ({
                      ...prev,
                      quietHours: { ...prev.quietHours, enabled: checked }
                    }))
                  }
                />
              </div>
              
              {preferences.quietHours.enabled && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-white text-sm">Start Time</label>
                    <input
                      type="time"
                      value={preferences.quietHours.start}
                      onChange={(e) => 
                        setPreferences(prev => ({
                          ...prev,
                          quietHours: { ...prev.quietHours, start: e.target.value }
                        }))
                      }
                      className="w-full mt-1 bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-white text-sm">End Time</label>
                    <input
                      type="time"
                      value={preferences.quietHours.end}
                      onChange={(e) => 
                        setPreferences(prev => ({
                          ...prev,
                          quietHours: { ...prev.quietHours, end: e.target.value }
                        }))
                      }
                      className="w-full mt-1 bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};