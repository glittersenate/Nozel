
import React from 'react';
import { MetricCard } from '@/components/common/MetricCard';
import { AlertCircle, Info, CheckCircle, Clock } from 'lucide-react';

export const RealTimeComplianceAlerts = () => {
  const alerts = [
    {
      title: 'CA Break Law Violation',
      subtitle: 'John Doe - 2 min ago',
      value: 'CRITICAL',
      icon: AlertCircle,
      color: 'text-red-400',
      bgColor: 'bg-red-500/20'
    },
    {
      title: 'Overtime Approaching',
      subtitle: 'Sarah Smith - 15 min ago',
      value: 'WARNING',
      icon: Clock,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20'
    },
    {
      title: 'TX Labor Law Update',
      subtitle: 'System - 1 hour ago',
      value: 'INFO',
      icon: Info,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20'
    },
    {
      title: 'NY Sick Leave Policy',
      subtitle: 'Completed - 3 hours ago',
      value: 'RESOLVED',
      icon: CheckCircle,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {alerts.map((alert, index) => (
        <MetricCard
          key={index}
          title={alert.title}
          value={alert.value}
          subtitle={alert.subtitle}
          icon={alert.icon}
          color={alert.color}
          bgColor={alert.bgColor}
          truncateValue={true}
        />
      ))}
    </div>
  );
};
