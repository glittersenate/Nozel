
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  LineChart, 
  Line, 
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { TrendingUp, BarChart3, Activity, Maximize2, X } from 'lucide-react';

interface InteractivePayrollChartProps {
  isDemoMode: boolean;
}

export const InteractivePayrollChart: React.FC<InteractivePayrollChartProps> = ({ 
  isDemoMode 
}) => {
  const [chartType, setChartType] = useState<'line' | 'area' | 'bar'>('area');
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedDataPoint, setSelectedDataPoint] = useState<any>(null);

  const payrollData = [
    { month: 'Jan', grossPay: 450000, netPay: 360000, taxes: 90000, bonuses: 15000 },
    { month: 'Feb', grossPay: 465000, netPay: 372000, taxes: 93000, bonuses: 18000 },
    { month: 'Mar', grossPay: 478000, netPay: 382400, taxes: 95600, bonuses: 22000 },
    { month: 'Apr', grossPay: 485000, netPay: 388000, taxes: 97000, bonuses: 25000 },
    { month: 'May', grossPay: 492000, netPay: 393600, taxes: 98400, bonuses: 28000 },
    { month: 'Jun', grossPay: 498000, netPay: 398400, taxes: 99600, bonuses: 32000 },
  ];

  const handleDataPointClick = (data: any) => {
    setSelectedDataPoint(data);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1e293b] border border-blue-500/30 rounded-lg p-3 shadow-xl">
          <p className="text-blue-100 font-medium mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: ${entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    const commonProps = {
      data: payrollData,
      onClick: handleDataPointClick,
      style: { cursor: 'pointer' }
    };

    switch (chartType) {
      case 'line':
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis dataKey="month" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line type="monotone" dataKey="grossPay" stroke="#3b82f6" strokeWidth={3} name="Gross Pay" />
            <Line type="monotone" dataKey="netPay" stroke="#10b981" strokeWidth={3} name="Net Pay" />
            <Line type="monotone" dataKey="taxes" stroke="#f59e0b" strokeWidth={2} name="Taxes" />
          </LineChart>
        );
      
      case 'area':
        return (
          <AreaChart {...commonProps}>
            <defs>
              <linearGradient id="grossGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="netGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis dataKey="month" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area type="monotone" dataKey="grossPay" stackId="1" stroke="#3b82f6" fill="url(#grossGradient)" strokeWidth={2} name="Gross Pay" />
            <Area type="monotone" dataKey="netPay" stackId="2" stroke="#10b981" fill="url(#netGradient)" strokeWidth={2} name="Net Pay" />
          </AreaChart>
        );
      
      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis dataKey="month" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="grossPay" fill="#3b82f6" name="Gross Pay" />
            <Bar dataKey="netPay" fill="#10b981" name="Net Pay" />
            <Bar dataKey="taxes" fill="#f59e0b" name="Taxes" />
            <Bar dataKey="bonuses" fill="#8b5cf6" name="Bonuses" />
          </BarChart>
        );
    }
  };

  if (isExpanded) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-6xl h-5/6 bg-[#141a2e] border border-blue-800/30">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              Payroll Trends - Detailed View
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(false)}
              className="text-blue-300 hover:text-white"
            >
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="h-full">
            <div className="flex gap-2 mb-4">
              {(['line', 'area', 'bar'] as const).map((type) => (
                <Button
                  key={type}
                  variant={chartType === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setChartType(type)}
                  className="capitalize"
                >
                  {type}
                </Button>
              ))}
            </div>
            <ResponsiveContainer width="100%" height="80%">
              {renderChart()}
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Card className="bg-[#141a2e]/80 border border-blue-800/30">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            Interactive Payroll Trends
          </CardTitle>
          <div className="flex items-center gap-2">
            {isDemoMode && (
              <Badge className="bg-green-500/20 text-green-300 text-xs">
                Click to Explore
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(true)}
              className="text-blue-300 hover:text-white"
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="flex gap-2 mt-2">
          {(['line', 'area', 'bar'] as const).map((type) => (
            <Button
              key={type}
              variant={chartType === type ? "default" : "outline"}
              size="sm"
              onClick={() => setChartType(type)}
              className="capitalize text-xs"
            >
              {type === 'line' && <Activity className="w-3 h-3 mr-1" />}
              {type === 'area' && <TrendingUp className="w-3 h-3 mr-1" />}
              {type === 'bar' && <BarChart3 className="w-3 h-3 mr-1" />}
              {type}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          {renderChart()}
        </ResponsiveContainer>
        
        {selectedDataPoint && (
          <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <h4 className="text-sm font-semibold text-white mb-2">
              {selectedDataPoint.month} Details
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="text-blue-300">
                Gross: ${selectedDataPoint.grossPay?.toLocaleString()}
              </div>
              <div className="text-green-300">
                Net: ${selectedDataPoint.netPay?.toLocaleString()}
              </div>
              <div className="text-yellow-300">
                Taxes: ${selectedDataPoint.taxes?.toLocaleString()}
              </div>
              <div className="text-purple-300">
                Bonuses: ${selectedDataPoint.bonuses?.toLocaleString()}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
