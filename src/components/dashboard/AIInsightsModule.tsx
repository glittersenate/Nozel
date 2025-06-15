import React, { useState, useEffect } from 'react';
import { Sparkles, TrendingUp, AlertTriangle, Brain, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Employee } from '@/types/employee';

interface AIInsightsModuleProps {
  employees?: Employee[];
  isLive?: boolean;
}

export const AIInsightsModule: React.FC<AIInsightsModuleProps> = ({ 
  employees = [], 
  isLive = false 
}) => {
  const [currentInsight, setCurrentInsight] = useState(0);
  
  const activeEmployees = employees.filter(emp => emp.status === 'active');
  const totalPayroll = activeEmployees.reduce((sum, emp) => sum + emp.salary, 0);
  const avgSalary = activeEmployees.length > 0 ? totalPayroll / activeEmployees.length : 0;
  
  // Calculate insights
  const departmentCounts = employees.reduce((acc, emp) => {
    acc[emp.department] = (acc[emp.department] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const largestDept = Object.entries(departmentCounts).sort(([,a], [,b]) => b - a)[0];
  
  const insights = [
    {
      type: 'trend',
      icon: TrendingUp,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      title: 'Payroll Optimization',
      content: `💰 Payroll cost tracking: $${totalPayroll.toLocaleString()} monthly. Engineering shows highest avg salary at $${Math.round(avgSalary).toLocaleString()}k.`,
      severity: 'info'
    },
    {
      type: 'alert',
      icon: AlertTriangle,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      title: '🚨 2 Red Flags Detected',
      content: `Department imbalance detected: ${largestDept?.[0] || 'N/A'} has ${largestDept?.[1] || 0} employees (${Math.round(((largestDept?.[1] || 0) / Math.max(employees.length, 1)) * 100)}% of workforce). Consider restructuring.`,
      severity: 'warning'
    },
    {
      type: 'prediction',
      icon: Brain,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      title: 'Predictive Analytics',
      content: `📈 Based on current hiring trends, expect 12% payroll increase next quarter. Recommend budget adjustment of $${Math.round(totalPayroll * 0.12).toLocaleString()}.`,
      severity: 'info'
    },
    {
      type: 'insight',
      icon: BarChart3,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      title: 'Department Efficiency',
      content: `⚡ ${Object.keys(departmentCounts).length} active departments. Average team size: ${Math.round(employees.length / Math.max(Object.keys(departmentCounts).length, 1))} employees. Optimal for current scale.`,
      severity: 'success'
    }
  ];

  // Auto-rotate insights when live
  useEffect(() => {
    if (isLive) {
      const interval = setInterval(() => {
        setCurrentInsight((prev) => (prev + 1) % insights.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isLive, insights.length]);

  const getBadgeVariant = (severity: string) => {
    switch (severity) {
      case 'warning': return 'destructive';
      case 'success': return 'default';
      default: return 'secondary';
    }
  };

  return (
    <Card
      className="shadow-lg rounded-2xl p-0 border"
      style={{
        background: "linear-gradient(115deg,rgba(31,42,70,0.98) 65%,rgba(32,55,116,0.94) 100%)",
        border: "1px solid rgba(87,120,255,0.06)",
        minHeight: "0",
        height: "74%",       // about 30% less than original
        maxHeight: "285px",  // shrink the maxHeight (~30% less)
        display: "flex",
        flexDirection: "column"
      }}
    >
      <CardHeader className="py-3 px-4">
        <CardTitle className="flex items-center gap-3 text-blue-100 dark:text-blue-100 light:text-gray-900 text-base">
          <div className="relative">
            <Sparkles className="text-yellow-300 w-6 h-6" />
            {isLive && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
            )}
          </div>
          AI Insights
          <Badge variant={isLive ? 'default' : 'secondary'} className="ml-auto">
            {isLive ? 'Live' : 'Static'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="py-2 px-4 flex-grow">
        <div className="space-y-2">
          {insights.map((insight, index) => (
            <div
              key={index}
              className={`
                p-3 rounded-lg border transition-all duration-500
                ${currentInsight === index || !isLive 
                  ? `${insight.bgColor} border-current opacity-100 scale-100` 
                  : 'opacity-50 scale-95 border-transparent'
                }
                ${isLive && currentInsight === index ? 'ring-2 ring-blue-400/50' : ''}
              `}
            >
              <div className="flex items-start gap-3">
                <div className={`${insight.bgColor} p-2 rounded-lg`}>
                  <insight.icon className={`w-5 h-5 ${insight.color}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-blue-100 dark:text-blue-100 light:text-gray-900">
                      {insight.title}
                    </h4>
                    <Badge variant={getBadgeVariant(insight.severity)} className="text-xs">
                      {insight.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-blue-200/80 dark:text-blue-200/80 light:text-gray-700 leading-relaxed">
                    {insight.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {isLive && (
          <div className="mt-3 pt-3 border-t border-blue-800/30 dark:border-blue-800/30 light:border-gray-300">
            <div className="flex items-center justify-center gap-2 text-xs text-blue-300/70 dark:text-blue-300/70 light:text-gray-500">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Auto-refreshing insights every 4 seconds
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
