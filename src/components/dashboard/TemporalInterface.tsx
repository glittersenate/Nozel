
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { 
  Clock, 
  Rewind, 
  FastForward, 
  Calendar, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  RotateCcw
} from 'lucide-react';
import { Employee } from '@/types/employee';

interface TemporalInterfaceProps {
  employees: Employee[];
}

interface TimelineEvent {
  id: string;
  timestamp: Date;
  type: 'payroll' | 'hiring' | 'review' | 'compliance';
  title: string;
  impact: 'positive' | 'negative' | 'neutral';
  description: string;
}

interface FuturePrediction {
  month: number;
  headcount: number;
  payroll: number;
  turnover: number;
  satisfaction: number;
}

export const TemporalInterface: React.FC<TemporalInterfaceProps> = ({ employees }) => {
  const [selectedTimestamp, setSelectedTimestamp] = useState<Date>(new Date());
  const [timeSlider, setTimeSlider] = useState([0]); // -12 to +12 months
  const [viewMode, setViewMode] = useState<'historical' | 'future'>('future');

  const currentPayroll = employees.reduce((sum, emp) => sum + emp.salary, 0);

  // Mock historical events
  const historicalEvents: TimelineEvent[] = [
    {
      id: '1',
      timestamp: new Date(2024, 0, 15), // Jan 15, 2024
      type: 'hiring',
      title: 'Engineering Team Expansion',
      impact: 'positive',
      description: 'Added 5 senior engineers, boosting development capacity'
    },
    {
      id: '2',
      timestamp: new Date(2024, 1, 28), // Feb 28, 2024
      type: 'payroll',
      title: 'Annual Salary Review',
      impact: 'positive',
      description: 'Implemented 8% average salary increase across all departments'
    },
    {
      id: '3',
      timestamp: new Date(2024, 2, 10), // Mar 10, 2024
      type: 'compliance',
      title: 'Compliance Audit Complete',
      impact: 'neutral',
      description: 'Passed quarterly compliance check with minor recommendations'
    }
  ];

  // Generate future predictions
  const generateFuturePredictions = (): FuturePrediction[] => {
    const predictions: FuturePrediction[] = [];
    const baseHeadcount = employees.length;
    const basePayroll = currentPayroll;

    for (let i = 1; i <= 12; i++) {
      const growthFactor = 1 + (i * 0.02); // 2% monthly growth
      const seasonalityFactor = 1 + Math.sin(i * Math.PI / 6) * 0.1; // Seasonal variation
      
      predictions.push({
        month: i,
        headcount: Math.round(baseHeadcount * growthFactor),
        payroll: Math.round(basePayroll * growthFactor * seasonalityFactor),
        turnover: Math.max(5, 15 - i * 0.5), // Decreasing turnover over time
        satisfaction: Math.min(95, 70 + i * 1.5) // Increasing satisfaction
      });
    }

    return predictions;
  };

  const futurePredictions = generateFuturePredictions();
  const selectedMonthOffset = timeSlider[0];
  
  const getSelectedData = () => {
    if (selectedMonthOffset === 0) {
      return {
        headcount: employees.length,
        payroll: currentPayroll,
        turnover: 12,
        satisfaction: 78
      };
    } else if (selectedMonthOffset > 0) {
      const prediction = futurePredictions[selectedMonthOffset - 1];
      return prediction || futurePredictions[futurePredictions.length - 1];
    } else {
      // Historical data (simplified)
      const historicalFactor = 1 + (selectedMonthOffset * 0.05);
      return {
        headcount: Math.round(employees.length * historicalFactor),
        payroll: Math.round(currentPayroll * historicalFactor),
        turnover: 12 + Math.abs(selectedMonthOffset) * 2,
        satisfaction: 78 + selectedMonthOffset * 3
      };
    }
  };

  const selectedData = getSelectedData();
  const getTimeLabel = () => {
    if (selectedMonthOffset === 0) return 'Current';
    if (selectedMonthOffset > 0) return `+${selectedMonthOffset} months`;
    return `${selectedMonthOffset} months`;
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'payroll': return <TrendingUp className="w-4 h-4" />;
      case 'hiring': return <CheckCircle className="w-4 h-4" />;
      case 'compliance': return <AlertTriangle className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive': return 'text-green-400';
      case 'negative': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <Card className="bg-[#0F1629]/90 border border-purple-800/30">
      <CardHeader>
        <CardTitle className="text-white text-lg flex items-center gap-2">
          <Clock className="w-5 h-5 text-purple-400" />
          Temporal Interface
          <Badge className="bg-purple-500/20 text-purple-300 ml-auto">
            Time Travel
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Time Navigation */}
        <div className="bg-gray-900/40 p-4 rounded-lg border border-purple-800/20">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-white font-semibold">Navigate Timeline</h4>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={viewMode === 'historical' ? 'default' : 'outline'}
                onClick={() => setViewMode('historical')}
                className="border-purple-500/30"
              >
                <Rewind className="w-3 h-3 mr-1" />
                Historical
              </Button>
              <Button
                size="sm"
                variant={viewMode === 'future' ? 'default' : 'outline'}
                onClick={() => setViewMode('future')}
                className="border-purple-500/30"
              >
                <FastForward className="w-3 h-3 mr-1" />
                Future
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-purple-200 text-sm">Time Offset</span>
                <span className="text-white font-semibold">{getTimeLabel()}</span>
              </div>
              <Slider
                value={timeSlider}
                onValueChange={setTimeSlider}
                max={12}
                min={-12}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-purple-300 mt-1">
                <span>-12 months</span>
                <span>Now</span>
                <span>+12 months</span>
              </div>
            </div>
          </div>
        </div>

        {/* Current State Display */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-900/40 p-3 rounded-lg border border-purple-800/20 text-center">
            <div className="text-lg font-bold text-white">{selectedData.headcount}</div>
            <div className="text-xs text-purple-300">Employees</div>
          </div>
          <div className="bg-gray-900/40 p-3 rounded-lg border border-purple-800/20 text-center">
            <div className="text-lg font-bold text-white">${selectedData.payroll.toLocaleString()}</div>
            <div className="text-xs text-purple-300">Monthly Payroll</div>
          </div>
          <div className="bg-gray-900/40 p-3 rounded-lg border border-purple-800/20 text-center">
            <div className="text-lg font-bold text-red-400">{selectedData.turnover}%</div>
            <div className="text-xs text-purple-300">Turnover Rate</div>
          </div>
          <div className="bg-gray-900/40 p-3 rounded-lg border border-purple-800/20 text-center">
            <div className="text-lg font-bold text-green-400">{selectedData.satisfaction}%</div>
            <div className="text-xs text-purple-300">Satisfaction</div>
          </div>
        </div>

        {/* Timeline Events */}
        {viewMode === 'historical' && (
          <div className="space-y-3">
            <h4 className="text-white font-semibold">Historical Events</h4>
            {historicalEvents.map((event) => (
              <div key={event.id} className="flex items-start gap-3 p-3 bg-gray-900/40 rounded-lg border border-purple-800/20">
                <div className={`mt-1 ${getImpactColor(event.impact)}`}>
                  {getEventIcon(event.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="text-white font-medium text-sm">{event.title}</h5>
                    <span className="text-xs text-purple-300">
                      {event.timestamp.toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-purple-200/70 text-xs">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Future Predictions */}
        {viewMode === 'future' && selectedMonthOffset > 0 && (
          <div className="space-y-3">
            <h4 className="text-white font-semibold">AI Predictions</h4>
            <div className="p-4 bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-lg border border-purple-500/30">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-purple-400" />
                <span className="text-white font-medium">Growth Trajectory</span>
                <Badge className="bg-purple-500/20 text-purple-300">87% confidence</Badge>
              </div>
              <p className="text-purple-200/70 text-sm mb-3">
                Based on current trends, expect steady growth with seasonal variations in Q4.
                Retention improvements show strong correlation with satisfaction initiatives.
              </p>
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                <RotateCcw className="w-3 h-3 mr-1" />
                Create Scenario
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
