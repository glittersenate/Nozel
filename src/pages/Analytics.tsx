
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, TrendingUp, Users, Clock, Target, Brain, Zap, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState<string>('last-30-days');
  const [department, setDepartment] = useState<string>('all');

  const analyticsCards = [
    {
      title: 'Employee Satisfaction',
      value: '87%',
      change: '+5.2%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/20'
    },
    {
      title: 'Productivity Index',
      value: '92.4',
      change: '+8.1%',
      trend: 'up',
      icon: Target,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20'
    },
    {
      title: 'Retention Rate',
      value: '94.2%',
      change: '+2.1%',
      trend: 'up',
      icon: Users,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20'
    },
    {
      title: 'Avg. Working Hours',
      value: '40.2h',
      change: '-1.5%',
      trend: 'down',
      icon: Clock,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/20'
    }
  ];

  const insights = [
    {
      type: 'opportunity',
      title: 'Recruitment Efficiency',
      description: 'Engineering team hiring is 23% faster than last quarter',
      impact: 'High',
      action: 'Review best practices for other departments'
    },
    {
      type: 'warning',
      title: 'Overtime Trends',
      description: 'Marketing team showing 15% increase in overtime hours',
      impact: 'Medium',
      action: 'Consider workload redistribution'
    },
    {
      type: 'success',
      title: 'Performance Reviews',
      description: '98% completion rate for Q1 performance reviews',
      impact: 'High',
      action: 'Maintain current review process'
    }
  ];

  const departmentMetrics = [
    { name: 'Engineering', employees: 45, productivity: 94, satisfaction: 89, color: 'bg-blue-500' },
    { name: 'Marketing', employees: 23, productivity: 87, satisfaction: 85, color: 'bg-green-500' },
    { name: 'Sales', employees: 31, productivity: 91, satisfaction: 88, color: 'bg-purple-500' },
    { name: 'HR', employees: 12, productivity: 89, satisfaction: 92, color: 'bg-orange-500' },
    { name: 'Finance', employees: 18, productivity: 93, satisfaction: 86, color: 'bg-cyan-500' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10">
        <div className="mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
              Advanced Analytics
            </h1>
            <p className="text-blue-300 text-lg">Deep insights and predictive analytics for your workforce</p>
          </div>
          
          <div className="flex items-center gap-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-48 bg-slate-800/50 border-blue-500/30 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-blue-500/30 text-white">
                <SelectItem value="last-7-days">Last 7 days</SelectItem>
                <SelectItem value="last-30-days">Last 30 days</SelectItem>
                <SelectItem value="last-90-days">Last 90 days</SelectItem>
                <SelectItem value="last-year">Last year</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger className="w-48 bg-slate-800/50 border-blue-500/30 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-blue-500/30 text-white">
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="hr">Human Resources</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {analyticsCards.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card key={index} className="glass-dark border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`${metric.bgColor} p-3 rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-6 h-6 ${metric.color}`} />
                    </div>
                    <Badge variant={metric.trend === 'up' ? 'default' : 'destructive'} className="text-xs">
                      {metric.change}
                    </Badge>
                  </div>
                  <h3 className="text-blue-200 text-sm font-medium mb-2">{metric.title}</h3>
                  <p className="text-3xl font-bold text-white">{metric.value}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* AI Insights */}
          <Card className="glass-dark border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-white font-heading flex items-center gap-3">
                <Brain className="w-6 h-6 text-purple-400" />
                AI-Powered Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {insights.map((insight, index) => (
                <div key={index} className="p-4 bg-slate-800/30 rounded-xl border-l-4 border-blue-500/50">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-medium">{insight.title}</h4>
                    <Badge 
                      variant={insight.type === 'success' ? 'default' : insight.type === 'warning' ? 'destructive' : 'secondary'}
                      className="text-xs"
                    >
                      {insight.impact} Impact
                    </Badge>
                  </div>
                  <p className="text-blue-300/80 text-sm mb-2">{insight.description}</p>
                  <p className="text-blue-200 text-xs font-medium">
                    💡 {insight.action}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Department Performance */}
          <Card className="glass-dark border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-white font-heading flex items-center gap-3">
                <BarChart3 className="w-6 h-6 text-blue-400" />
                Department Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {departmentMetrics.map((dept, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${dept.color}`} />
                      <span className="text-white font-medium">{dept.name}</span>
                      <span className="text-blue-300/70 text-sm">({dept.employees} employees)</span>
                    </div>
                    <div className="text-right">
                      <div className="text-white text-sm font-medium">
                        {dept.productivity}% productivity
                      </div>
                      <div className="text-blue-300/70 text-xs">
                        {dept.satisfaction}% satisfaction
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1 bg-slate-700/50 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${dept.color}`}
                        style={{ width: `${dept.productivity}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Predictive Analytics */}
        <Card className="glass-dark border-blue-500/20">
          <CardHeader>
            <CardTitle className="text-white font-heading flex items-center gap-3">
              <Zap className="w-6 h-6 text-yellow-400" />
              Predictive Analytics & Forecasting
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
                <h4 className="text-white font-semibold mb-2">Turnover Risk</h4>
                <p className="text-3xl font-bold text-blue-400 mb-2">4.2%</p>
                <p className="text-blue-300/80 text-sm">Predicted for next quarter</p>
              </div>
              
              <div className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20">
                <h4 className="text-white font-semibold mb-2">Hiring Needs</h4>
                <p className="text-3xl font-bold text-green-400 mb-2">12</p>
                <p className="text-green-300/80 text-sm">New positions by Q2</p>
              </div>
              
              <div className="p-6 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-xl border border-orange-500/20">
                <h4 className="text-white font-semibold mb-2">Budget Impact</h4>
                <p className="text-3xl font-bold text-orange-400 mb-2">+8.3%</p>
                <p className="text-orange-300/80 text-sm">Payroll increase forecast</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
