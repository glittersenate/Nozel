
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Activity, 
  Wifi, 
  Database, 
  Shield, 
  Zap,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';

interface StatusIndicator {
  id: string;
  name: string;
  status: 'online' | 'warning' | 'error';
  latency?: number;
  lastUpdated: Date;
  icon: React.ElementType;
}

export const RealTimeStatusIndicators: React.FC = () => {
  const [indicators, setIndicators] = useState<StatusIndicator[]>([
    {
      id: 'payroll-engine',
      name: 'Payroll Engine',
      status: 'online',
      latency: 23,
      lastUpdated: new Date(),
      icon: Zap
    },
    {
      id: 'database',
      name: 'Database',
      status: 'online',
      latency: 12,
      lastUpdated: new Date(),
      icon: Database
    },
    {
      id: 'compliance',
      name: 'Compliance Check',
      status: 'online',
      lastUpdated: new Date(),
      icon: Shield
    },
    {
      id: 'integration',
      name: 'Integrations',
      status: 'warning',
      lastUpdated: new Date(),
      icon: Wifi
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'error': return AlertTriangle;
      default: return Clock;
    }
  };

  return (
    <Card className="bg-[#141a2e]/80 border border-blue-800/30">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-green-400" />
            System Status
          </h3>
        </div>
        
        <div className="space-y-3">
          {indicators.map((indicator) => {
            const StatusIcon = getStatusIcon(indicator.status);
            const IconComponent = indicator.icon;
            
            return (
              <div key={indicator.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <IconComponent className="w-4 h-4 text-blue-300" />
                    <div 
                      className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${getStatusColor(indicator.status)}`}
                    />
                  </div>
                  <span className="text-sm text-blue-200">{indicator.name}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  {indicator.latency && (
                    <span className="text-xs text-blue-400 font-mono">
                      {indicator.latency}ms
                    </span>
                  )}
                  <StatusIcon className={`w-3 h-3 ${
                    indicator.status === 'online' ? 'text-green-400' :
                    indicator.status === 'warning' ? 'text-yellow-400' : 'text-red-400'
                  }`} />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
