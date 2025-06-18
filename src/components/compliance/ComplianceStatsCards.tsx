
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, AlertTriangle, Clock, CheckCircle } from 'lucide-react';

export const ComplianceStatsCards = () => {
  const stats = [
    {
      title: 'States Monitored',
      value: '12',
      icon: Shield,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20'
    },
    {
      title: 'Issues Detected',
      value: '3',
      icon: AlertTriangle,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/20'
    },
    {
      title: 'Critical Alerts',
      value: '1',
      icon: Clock,
      color: 'text-red-400',
      bgColor: 'bg-red-500/20'
    },
    {
      title: 'Last Audit',
      value: '98%',
      icon: CheckCircle,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="glass-dark border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.bgColor} p-3 rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
              <h3 className="text-blue-200 text-sm font-medium mb-2">{stat.title}</h3>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
