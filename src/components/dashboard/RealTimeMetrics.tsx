
import React from 'react';
import { Activity, TrendingUp, Users, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
}

const RealTimeMetrics: React.FC<RealTimeMetricsProps & {
  metrics: RealTimeMetrics & {
    topGrowthDept?: { name: string; value: number } | null;
  }
}> = ({ metrics }) => {
  // NO per-render sorting, just use the stable topGrowthDept from metrics.
  const top = metrics.topGrowthDept ?? null;

  return (
    <Card
      className="shadow-lg rounded-2xl p-0 border bg-white dark:bg-gradient-to-br dark:from-[#1f2a46]/98 dark:to-[#203774]/94 text-black dark:text-white"
      style={{
        background: undefined,
        border: "1px solid rgba(87,120,255,0.06)",
      }}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3 text-slate-800 dark:text-blue-100">
            <Activity className="w-5 h-5 text-green-400" />
            Real-Time Metrics
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-100 dark:bg-[#0e1c38]/50 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-blue-400" />
              <span className="text-slate-700 dark:text-blue-300 text-sm">Active Employees</span>
            </div>
            <div className="text-2xl font-bold text-black dark:text-white">{metrics.activeEmployees}</div>
            <div className="text-xs text-slate-700 dark:text-blue-300/70">
              {metrics.newHires} new this month
            </div>
          </div>

          <div className="bg-slate-100 dark:bg-[#0e1c38]/50 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-5 h-5 text-yellow-400" />
              <span className="text-slate-700 dark:text-blue-300 text-sm">Monthly Payroll</span>
            </div>
            <div className="text-2xl font-bold text-black dark:text-white">
              ${metrics.totalPayroll.toLocaleString()}
            </div>
            <div className="text-xs text-slate-700 dark:text-blue-300/70">
              Avg: ${Math.round(metrics.averageSalary).toLocaleString()}
            </div>
          </div>

          <div className="bg-slate-100 dark:bg-[#0e1c38]/50 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <span className="text-slate-700 dark:text-blue-300 text-sm">Top Growth</span>
            </div>
            <div className="text-lg font-bold text-black dark:text-white">
              {top ? top.name : 'N/A'}
            </div>
            <div className="text-xs text-slate-700 dark:text-blue-300/70">
              {top ? `+${top.value}%` : 'No data'}
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-blue-800/30">
          <div className="flex items-center justify-center gap-2 text-xs text-slate-700 dark:text-blue-300/70">
            <div className="w-2 h-2 bg-green-400 rounded-full" />
            Data refreshes every 60 seconds
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default RealTimeMetrics;
