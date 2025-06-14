import React from 'react';
import { Activity, TrendingUp, Users, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface RealTimeMetrics {
  totalEmployees: number;
  activeEmployees: number;
  totalPayroll: number;
  averageSalary: number;
  newHires: number;
  departmentGrowth: Record<string, number>;
}

interface RealTimeMetricsProps {
  metrics: RealTimeMetrics;
  isLive: boolean;
  onToggleLive: () => void;
}

const RealTimeMetrics: React.FC<RealTimeMetricsProps> = ({ metrics, isLive, onToggleLive }) => {
  const topGrowthDept = Object.entries(metrics.departmentGrowth)
    .sort(([,a], [,b]) => b - a)[0];

  return (
    <Card
      className="shadow-lg rounded-2xl p-0 border"
      style={{
        background: "linear-gradient(115deg,rgba(31,42,70,0.98) 65%,rgba(32,55,116,0.94) 100%)",
        border: "1px solid rgba(87,120,255,0.06)",
      }}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3 text-blue-100">
            <Activity className="w-5 h-5 text-green-400" />
            Real-Time Metrics
          </CardTitle>
          <Button
            onClick={onToggleLive}
            size="sm"
            variant={isLive ? "default" : "outline"}
            className={isLive ? "bg-green-600 hover:bg-green-700" : "border-blue-600 text-blue-300"}
          >
            {isLive ? 'Stop Live' : 'Go Live'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#0e1c38]/50 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-blue-400" />
              <span className="text-blue-300 text-sm">Active Employees</span>
            </div>
            <div className="text-2xl font-bold text-white">{metrics.activeEmployees}</div>
            <div className="text-xs text-blue-300/70">
              {metrics.newHires} new this month
            </div>
          </div>

          <div className="bg-[#0e1c38]/50 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-5 h-5 text-yellow-400" />
              <span className="text-blue-300 text-sm">Monthly Payroll</span>
            </div>
            <div className="text-2xl font-bold text-white">
              ${metrics.totalPayroll.toLocaleString()}
            </div>
            <div className="text-xs text-blue-300/70">
              Avg: ${Math.round(metrics.averageSalary).toLocaleString()}
            </div>
          </div>

          <div className="bg-[#0e1c38]/50 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <span className="text-blue-300 text-sm">Top Growth</span>
            </div>
            <div className="text-lg font-bold text-white">
              {topGrowthDept ? topGrowthDept[0] : 'N/A'}
            </div>
            <div className="text-xs text-blue-300/70">
              {topGrowthDept ? `+${topGrowthDept[1]}%` : 'No data'}
            </div>
          </div>
        </div>

        {isLive && (
          <div className="mt-4 pt-4 border-t border-blue-800/30">
            <div className="flex items-center justify-center gap-2 text-xs text-blue-300/70">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Live data updating every 3 seconds
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RealTimeMetrics;
