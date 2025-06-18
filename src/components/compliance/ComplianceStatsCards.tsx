
import React from 'react';
import { MetricCard } from '@/components/common/MetricCard';
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
      {stats.map((stat, index) => (
        <MetricCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          color={stat.color}
          bgColor={stat.bgColor}
        />
      ))}
    </div>
  );
};
