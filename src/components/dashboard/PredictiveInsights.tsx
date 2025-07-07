
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Crystal, TrendingUp, AlertTriangle, Lightbulb, Eye } from 'lucide-react';
import { Employee } from '@/types/employee';

interface PredictiveInsightsProps {
  employees: Employee[];
}

interface Prediction {
  id: string;
  type: 'opportunity' | 'risk' | 'optimization' | 'forecast';
  title: string;
  description: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  timeframe: string;
  action?: string;
}

export const PredictiveInsights: React.FC<PredictiveInsightsProps> = ({ employees }) => {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [selectedPrediction, setSelectedPrediction] = useState<Prediction | null>(null);

  useEffect(() => {
    // Generate AI predictions based on employee data
    const generatePredictions = () => {
      const totalSalary = employees.reduce((sum, emp) => sum + emp.salary, 0);
      const avgSalary = totalSalary / employees.length;
      const departments = [...new Set(employees.map(e => e.department))];
      
      const newPredictions: Prediction[] = [
        {
          id: '1',
          type: 'forecast',
          title: 'Q2 Hiring Surge Predicted',
          description: `Based on current growth patterns, expect 15-20% workforce expansion. Budget impact: $${Math.round(totalSalary * 0.175).toLocaleString()}`,
          confidence: 87,
          impact: 'high',
          timeframe: 'Next 3 months',
          action: 'Prepare hiring pipeline'
        },
        {
          id: '2',
          type: 'risk',
          title: 'Department Imbalance Risk',
          description: `${departments[0]} department is 40% over-represented. Risk of knowledge silos and reduced flexibility.`,
          confidence: 72,
          impact: 'medium',
          timeframe: 'Ongoing',
          action: 'Diversify hiring focus'
        },
        {
          id: '3',
          type: 'optimization',
          title: 'Salary Band Optimization',
          description: `Current salary distribution suggests 12% optimization potential. Could save $${Math.round(totalSalary * 0.12).toLocaleString()} annually.`,
          confidence: 65,
          impact: 'high',
          timeframe: 'Next review cycle',
          action: 'Review compensation structure'
        },
        {
          id: '4',
          type: 'opportunity',
          title: 'Performance Correlation Found',
          description: 'Strong correlation between remote work flexibility and performance scores (+23% productivity).',
          confidence: 94,
          impact: 'medium',
          timeframe: 'Immediate',
          action: 'Expand remote work options'
        }
      ];
      
      setPredictions(newPredictions);
    };

    generatePredictions();
  }, [employees]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return <Lightbulb className="w-4 h-4 text-green-400" />;
      case 'risk': return <AlertTriangle className="w-4 h-4 text-red-400" />;
      case 'optimization': return <TrendingUp className="w-4 h-4 text-blue-400" />;
      case 'forecast': return <Crystal className="w-4 h-4 text-purple-400" />;
      default: return <Eye className="w-4 h-4 text-gray-400" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'opportunity': return 'bg-green-500/10 border-green-500/20 text-green-300';
      case 'risk': return 'bg-red-500/10 border-red-500/20 text-red-300';
      case 'optimization': return 'bg-blue-500/10 border-blue-500/20 text-blue-300';
      case 'forecast': return 'bg-purple-500/10 border-purple-500/20 text-purple-300';
      default: return 'bg-gray-500/10 border-gray-500/20 text-gray-300';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-500/20 text-red-300';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300';
      case 'low': return 'bg-green-500/20 text-green-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  return (
    <Card className="bg-[#0F1629]/90 border border-purple-800/30">
      <CardHeader>
        <CardTitle className="text-white text-lg flex items-center gap-2">
          <Crystal className="w-5 h-5 text-purple-400" />
          Oracle View - Predictive Insights
          <Badge className="bg-purple-500/20 text-purple-300 ml-auto">
            AI Powered
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {predictions.map((prediction) => (
            <div
              key={prediction.id}
              className={`p-4 rounded-lg border cursor-pointer transition-all hover:scale-[1.02] ${getTypeColor(prediction.type)}`}
              onClick={() => setSelectedPrediction(prediction)}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  {getTypeIcon(prediction.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-white">{prediction.title}</h4>
                    <Badge className={getImpactColor(prediction.impact)}>
                      {prediction.impact} impact
                    </Badge>
                    <Badge variant="outline" className="border-gray-500/30 text-gray-300">
                      {prediction.confidence}% confidence
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">{prediction.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{prediction.timeframe}</span>
                    {prediction.action && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-500/30 text-gray-300 hover:bg-gray-600/20 h-7"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle action
                        }}
                      >
                        {prediction.action}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
