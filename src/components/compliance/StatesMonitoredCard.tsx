
import React from 'react';
import { MetricCard } from '@/components/common/MetricCard';
import { MapPin, Users, Clock, CheckCircle } from 'lucide-react';

export const StatesMonitoredCard = () => {
  const stateMetrics = [
    {
      title: 'Active States',
      value: '10',
      subtitle: 'Currently monitoring',
      icon: MapPin,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20'
    },
    {
      title: 'Pending Setup',
      value: '2',
      subtitle: 'OH, GA awaiting config',
      icon: Clock,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20'
    },
    {
      title: 'Employees Covered',
      value: '1,247',
      subtitle: 'Across all states',
      icon: Users,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20'
    },
    {
      title: 'Compliance Rate',
      value: '96.2%',
      subtitle: 'Last 30 days',
      icon: CheckCircle,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20',
      trend: {
        value: 2.1,
        isPositive: true
      }
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stateMetrics.map((metric, index) => (
        <MetricCard
          key={index}
          title={metric.title}
          value={metric.value}
          subtitle={metric.subtitle}
          icon={metric.icon}
          color={metric.color}
          bgColor={metric.bgColor}
          trend={metric.trend}
        />
      ))}
    </div>
  );
};
