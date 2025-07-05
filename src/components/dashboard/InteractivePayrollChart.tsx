
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, BarChart3, Calendar, Expand } from 'lucide-react';

const payrollData = [
  { month: 'Jan', amount: 485000, employees: 47 },
  { month: 'Feb', amount: 492000, employees: 48 },
  { month: 'Mar', amount: 510000, employees: 50 },
  { month: 'Apr', amount: 525000, employees: 52 },
  { month: 'May', amount: 535000, employees: 53 },
  { month: 'Jun', amount: 548000, employees: 54 },
];

export const InteractivePayrollChart: React.FC = () => {
  const [chartType, setChartType] = useState<'line' | 'area' | 'bar'>('area');
  const [isExpanded, setIsExpanded] = useState(false);

  const renderChart = () => {
    const commonProps = {
      data: payrollData,
      margin: { top: 5, right: 30, left: 20, bottom: 5 }
    };

    switch (chartType) {
      case 'line':
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="month" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip 
              formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']}
              labelClassName="text-sm font-medium"
            />
            <Line 
              type="monotone" 
              dataKey="amount" 
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        );
      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="month" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip 
              formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']}
              labelClassName="text-sm font-medium"
            />
            <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        );
      default: // area
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="month" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip 
              formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']}
              labelClassName="text-sm font-medium"
            />
            <Area 
              type="monotone" 
              dataKey="amount" 
              stroke="#3b82f6" 
              fill="url(#colorAmount)"
              strokeWidth={2}
            />
            <defs>
              <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05}/>
              </linearGradient>
            </defs>
          </AreaChart>
        );
    }
  };

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border-blue-200 dark:border-blue-800">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-blue-900 dark:text-blue-100 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Payroll Trends
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="flex bg-white dark:bg-slate-800 rounded-lg p-1 border">
              <Button
                size="sm"
                variant={chartType === 'line' ? 'default' : 'ghost'}
                onClick={() => setChartType('line')}
                className="h-7 px-2"
              >
                Line
              </Button>
              <Button
                size="sm"
                variant={chartType === 'area' ? 'default' : 'ghost'}
                onClick={() => setChartType('area')}
                className="h-7 px-2"
              >
                Area
              </Button>
              <Button
                size="sm"
                variant={chartType === 'bar' ? 'default' : 'ghost'}
                onClick={() => setChartType('bar')}
                className="h-7 px-2"
              >
                <BarChart3 className="w-3 h-3" />
              </Button>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-8 w-8 p-0"
            >
              <Expand className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className={isExpanded ? 'h-96' : 'h-64'}>
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
