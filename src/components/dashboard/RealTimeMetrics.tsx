
import React from 'react';
import { TrendingUp, TrendingDown, Users, DollarSign, UserPlus, Activity } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface RealTimeMetricsProps {
  metrics: {
    totalEmployees: number;
    activeEmployees: number;
    totalPayroll: number;
    averageSalary: number;
    newHires: number;
    departmentGrowth: Record<string, number>;
  };
  isLive: boolean;
  onToggleLive: () => void;
}

const RealTimeMetrics: React.FC<RealTimeMetricsProps> = ({
  metrics,
  isLive,
  onToggleLive
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getGrowthIcon = (growth: number) => {
    return growth >= 0 ? (
      <TrendingUp className="w-4 h-4 text-green-400" />
    ) : (
      <TrendingDown className="w-4 h-4 text-red-400" />
    );
  };

  const getGrowthColor = (growth: number) => {
    return growth >= 0 ? 'text-green-400' : 'text-red-400';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-blue-100">Real-time Analytics</h2>
        <Button
          onClick={onToggleLive}
          variant={isLive ? "destructive" : "default"}
          className={`${isLive ? 'animate-pulse' : ''}`}
        >
          <Activity className="w-4 h-4 mr-2" />
          {isLive ? 'Stop Live' : 'Start Live'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-[#141a2e]/80 border-blue-950">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-300">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{metrics.totalEmployees}</div>
            <p className="text-xs text-blue-300">
              {metrics.activeEmployees} active
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[#141a2e]/80 border-blue-950">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-300">Total Payroll</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{formatCurrency(metrics.totalPayroll)}</div>
            <p className="text-xs text-blue-300">
              Monthly expenses
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[#141a2e]/80 border-blue-950">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-300">Average Salary</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{formatCurrency(metrics.averageSalary)}</div>
            <p className="text-xs text-green-400">
              +5.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[#141a2e]/80 border-blue-950">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-300">New Hires</CardTitle>
            <UserPlus className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{metrics.newHires}</div>
            <p className="text-xs text-blue-300">
              This month
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-[#141a2e]/80 border-blue-950">
        <CardHeader>
          <CardTitle className="text-blue-100">Department Growth</CardTitle>
          <CardDescription className="text-blue-300">
            Real-time department performance metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(metrics.departmentGrowth).map(([dept, growth]) => (
              <div key={dept} className="flex items-center justify-between p-3 bg-[#1a2550]/50 rounded-lg">
                <span className="text-blue-200 font-medium">{dept}</span>
                <div className="flex items-center gap-2">
                  {getGrowthIcon(growth)}
                  <span className={`text-sm font-bold ${getGrowthColor(growth)}`}>
                    {growth > 0 ? '+' : ''}{growth}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RealTimeMetrics;
