
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Info, CheckCircle, Clock } from 'lucide-react';

export const RealTimeComplianceAlerts = () => {
  const alerts = [
    {
      id: 1,
      type: 'critical',
      title: 'California Break Law Violation',
      description: 'Employee John Doe worked 6+ hours without a meal break',
      timestamp: '2 minutes ago',
      icon: AlertCircle,
      dotColor: 'bg-red-500'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Overtime Threshold Approaching',
      description: 'Sarah Smith approaching 40 hour weekly limit',
      timestamp: '15 minutes ago',
      icon: Clock,
      dotColor: 'bg-yellow-500'
    },
    {
      id: 3,
      type: 'info',
      title: 'Texas Labor Law Update',
      description: 'New minimum wage regulations effective next month',
      timestamp: '1 hour ago',
      icon: Info,
      dotColor: 'bg-blue-500'
    },
    {
      id: 4,
      type: 'resolved',
      title: 'NY Sick Leave Policy Compliance',
      description: 'All employees have been updated with new sick leave balances',
      timestamp: '3 hours ago',
      icon: CheckCircle,
      dotColor: 'bg-green-500'
    }
  ];

  return (
    <Card className="glass-dark border-blue-500/20 mb-8">
      <CardHeader>
        <CardTitle className="text-white font-heading flex items-center gap-3">
          <AlertCircle className="w-6 h-6 text-orange-400" />
          Real-Time Compliance Alerts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.map((alert) => {
          const Icon = alert.icon;
          return (
            <div key={alert.id} className="flex items-start gap-4 p-4 bg-slate-800/30 rounded-xl hover:bg-slate-800/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${alert.dotColor} flex-shrink-0 mt-1`} />
                <div className="p-2 bg-slate-700/50 rounded-lg">
                  <Icon className="w-4 h-4 text-blue-300" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-white font-medium">{alert.title}</h4>
                  <span className="text-blue-300/70 text-xs">{alert.timestamp}</span>
                </div>
                <p className="text-blue-300/80 text-sm">{alert.description}</p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
