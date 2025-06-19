import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Calendar,
  Activity,
  Zap,
  Eye,
  Grid3X3,
  Layout,
  Maximize2,
  RefreshCw,
  Filter,
  Download
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie
} from 'recharts';

// Mock data for visualizations
const performanceData = [
  { month: 'Jan', performance: 85, satisfaction: 78, productivity: 92 },
  { month: 'Feb', performance: 88, satisfaction: 82, productivity: 89 },
  { month: 'Mar', performance: 92, satisfaction: 85, productivity: 94 },
  { month: 'Apr', performance: 87, satisfaction: 80, productivity: 91 },
  { month: 'May', performance: 94, satisfaction: 88, productivity: 96 },
  { month: 'Jun', performance: 91, satisfaction: 86, productivity: 93 }
];

const departmentHeatmapData = [
  { dept: 'Engineering', metric: 'Performance', value: 94, color: '#10b981' },
  { dept: 'Engineering', metric: 'Satisfaction', value: 89, color: '#059669' },
  { dept: 'Engineering', metric: 'Retention', value: 96, color: '#047857' },
  { dept: 'Marketing', metric: 'Performance', value: 87, color: '#3b82f6' },
  { dept: 'Marketing', metric: 'Satisfaction', value: 85, color: '#2563eb' },
  { dept: 'Marketing', metric: 'Retention', value: 91, color: '#1d4ed8' },
  { dept: 'Sales', metric: 'Performance', value: 91, color: '#8b5cf6' },
  { dept: 'Sales', metric: 'Satisfaction', value: 88, color: '#7c3aed' },
  { dept: 'Sales', metric: 'Retention', value: 94, color: '#6d28d9' }
];

const scatterData = [
  { experience: 2, salary: 65000, performance: 85, dept: 'Engineering' },
  { experience: 5, salary: 95000, performance: 92, dept: 'Engineering' },
  { experience: 3, salary: 75000, performance: 88, dept: 'Marketing' },
  { experience: 7, salary: 110000, performance: 94, dept: 'Engineering' },
  { experience: 4, salary: 82000, performance: 90, dept: 'Sales' },
  { experience: 6, salary: 98000, performance: 89, dept: 'Marketing' }
];

interface DashboardLayoutProps {
  layoutType: 'executive' | 'manager' | 'hr' | 'analyst';
}

export const ModernDashboardLayouts: React.FC<DashboardLayoutProps> = ({ layoutType }) => {
  const [selectedChart, setSelectedChart] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [drillDownData, setDrillDownData] = useState<any>(null);

  const handleChartClick = (chartType: string, data?: any) => {
    setSelectedChart(chartType);
    setDrillDownData(data);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900/95 border border-blue-500/30 rounded-lg p-3 shadow-xl backdrop-blur-sm">
          <p className="text-blue-100 font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
              {entry.name === 'Salary' ? '$' : entry.name.includes('Performance') ? '%' : ''}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const LoadingOverlay = () => (
    <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center rounded-lg z-10">
      <div className="flex items-center gap-2 text-blue-300">
        <RefreshCw className="w-5 h-5 animate-spin" />
        <span className="text-sm font-medium">Refreshing data...</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Dashboard Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-white">Analytics Dashboard</h2>
          <Badge variant="outline" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
            {layoutType.charAt(0).toUpperCase() + layoutType.slice(1)} View
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="border-blue-500/30 text-blue-300 hover:bg-blue-500/10"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline" size="sm" className="border-blue-500/30 text-blue-300 hover:bg-blue-500/10">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="border-blue-500/30 text-blue-300 hover:bg-blue-500/10">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Layout 1: Executive Overview */}
      {layoutType === 'executive' && (
        <div className="grid grid-cols-12 gap-6">
          {/* Key Metrics Row */}
          <div className="col-span-12 grid grid-cols-4 gap-4">
            {[
              { title: 'Total Employees', value: '247', change: '+12%', icon: Users, color: 'blue' },
              { title: 'Monthly Payroll', value: '$1.2M', change: '+5.2%', icon: DollarSign, color: 'green' },
              { title: 'Avg Performance', value: '4.2/5', change: '+0.3', icon: TrendingUp, color: 'purple' },
              { title: 'Retention Rate', value: '94.2%', change: '+2.1%', icon: Activity, color: 'orange' }
            ].map((metric, index) => (
              <Card key={index} className="relative overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 hover:border-blue-500/30 transition-all duration-300 group cursor-pointer">
                {isRefreshing && <LoadingOverlay />}
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <metric.icon className={`w-8 h-8 text-${metric.color}-400`} />
                    <Badge className={`bg-${metric.color}-500/20 text-${metric.color}-300`}>
                      {metric.change}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-white">{metric.value}</p>
                    <p className="text-sm text-slate-400">{metric.title}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Performance Trend Chart */}
          <Card className="col-span-8 relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50">
            {isRefreshing && <LoadingOverlay />}
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-400" />
                Performance Trends
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleChartClick('performance-trend')}
                className="text-blue-300 hover:text-blue-200"
              >
                <Maximize2 className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="performanceGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip content={<CustomTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="performance" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    fill="url(#performanceGradient)"
                    onClick={(data) => handleChartClick('performance-drill', data)}
                    style={{ cursor: 'pointer' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Department Heatmap */}
          <Card className="col-span-4 relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50">
            {isRefreshing && <LoadingOverlay />}
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Grid3X3 className="w-5 h-5 text-green-400" />
                Department Heatmap
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2">
                {departmentHeatmapData.map((item, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-lg flex items-center justify-center text-white text-xs font-bold cursor-pointer hover:scale-105 transition-transform"
                    style={{ backgroundColor: item.color }}
                    onClick={() => handleChartClick('heatmap-drill', item)}
                  >
                    {item.value}%
                  </div>
                ))}
              </div>
              <div className="mt-4 space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Performance</span>
                  <span>Satisfaction</span>
                  <span>Retention</span>
                </div>
                {['Engineering', 'Marketing', 'Sales'].map((dept) => (
                  <div key={dept} className="text-slate-300">{dept}</div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Layout 2: Manager View */}
      {layoutType === 'manager' && (
        <div className="grid grid-cols-12 gap-6">
          {/* Team Performance Scatter Plot */}
          <Card className="col-span-8 relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50">
            {isRefreshing && <LoadingOverlay />}
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-purple-400" />
                Team Performance vs Experience
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <ScatterChart data={scatterData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                  <XAxis dataKey="experience" stroke="#9ca3af" name="Experience (years)" />
                  <YAxis dataKey="salary" stroke="#9ca3af" name="Salary" />
                  <Tooltip content={<CustomTooltip />} />
                  <Scatter 
                    dataKey="performance" 
                    fill="#8b5cf6"
                    onClick={(data) => handleChartClick('scatter-drill', data)}
                    style={{ cursor: 'pointer' }}
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Quick Actions Panel */}
          <Card className="col-span-4 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { action: 'Schedule 1:1s', count: 3, color: 'blue' },
                { action: 'Review Timesheets', count: 7, color: 'green' },
                { action: 'Approve Requests', count: 2, color: 'orange' },
                { action: 'Send Feedback', count: 5, color: 'purple' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors cursor-pointer">
                  <span className="text-white text-sm">{item.action}</span>
                  <Badge className={`bg-${item.color}-500/20 text-${item.color}-300`}>
                    {item.count}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Drill-down Modal */}
      {selectedChart && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <Card className="w-4/5 h-4/5 bg-slate-900 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">
                Detailed View: {selectedChart.replace('-', ' ').toUpperCase()}
              </CardTitle>
              <Button
                variant="ghost"
                onClick={() => setSelectedChart(null)}
                className="text-slate-400 hover:text-white"
              >
                ×
              </Button>
            </CardHeader>
            <CardContent className="h-full">
              <div className="text-white">
                <p>Detailed drill-down view for {selectedChart}</p>
                {drillDownData && (
                  <pre className="mt-4 p-4 bg-slate-800 rounded text-sm">
                    {JSON.stringify(drillDownData, null, 2)}
                  </pre>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};