
import React, { useState, useEffect } from 'react';
import { TrendingUp, AlertTriangle, DollarSign, Brain, Target, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface PredictiveForecast {
  period: string;
  predictedCost: number;
  confidence: number;
  factors: string[];
}

interface PayrollAnomaly {
  id: string;
  type: 'duplicate' | 'overtime' | 'unusual_pattern' | 'compliance';
  severity: 'low' | 'medium' | 'high';
  description: string;
  employee?: string;
  suggestedAction: string;
}

interface SmartInsight {
  type: 'optimization' | 'warning' | 'opportunity';
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  action: string;
}

export const PredictivePayrollEngine: React.FC = () => {
  const [forecasts, setForecasts] = useState<PredictiveForecast[]>([]);
  const [anomalies, setAnomalies] = useState<PayrollAnomaly[]>([]);
  const [insights, setInsights] = useState<SmartInsight[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    loadPredictiveData();
  }, []);

  const loadPredictiveData = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setForecasts([
        {
          period: 'Q1 2025',
          predictedCost: 485000,
          confidence: 94,
          factors: ['Seasonal hiring', 'Performance bonuses', 'Market adjustments']
        },
        {
          period: 'Q2 2025',
          predictedCost: 512000,
          confidence: 87,
          factors: ['New hires planned', 'Salary increases', 'Overtime trends']
        }
      ]);

      setAnomalies([
        {
          id: '1',
          type: 'overtime',
          severity: 'high',
          description: 'John Smith logged 65 hours this week (30% above normal)',
          employee: 'John Smith',
          suggestedAction: 'Review workload distribution or approve overtime'
        },
        {
          id: '2',
          type: 'unusual_pattern',
          severity: 'medium',
          description: 'Engineering team showing 15% increase in weekend work',
          suggestedAction: 'Investigate project deadlines and resource allocation'
        }
      ]);

      setInsights([
        {
          type: 'optimization',
          title: 'Payroll Processing Optimization',
          description: 'Switch to bi-weekly payroll could save $12K annually in processing costs',
          impact: 'medium',
          action: 'Schedule meeting with finance team'
        },
        {
          type: 'opportunity',
          title: 'Tax Credit Opportunity',
          description: 'R&D tax credits available for 8 engineering employees (~$45K potential savings)',
          impact: 'high',
          action: 'Consult with tax advisor'
        }
      ]);

      setIsAnalyzing(false);
    }, 2000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-400 bg-red-500/10';
      case 'medium': return 'text-yellow-400 bg-yellow-500/10';
      default: return 'text-blue-400 bg-blue-500/10';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      default: return 'text-blue-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Predictive Forecasting */}
      <Card className="bg-slate-800/60 border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-400" />
            AI Payroll Forecasting
            {isAnalyzing && <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse" />}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {forecasts.map((forecast, index) => (
              <div key={index} className="bg-slate-700/50 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-blue-300 font-semibold">{forecast.period}</h4>
                  <Badge variant="outline" className="text-xs">
                    {forecast.confidence}% confidence
                  </Badge>
                </div>
                <div className="text-2xl font-bold text-white mb-2">
                  ${forecast.predictedCost.toLocaleString()}
                </div>
                <Progress value={forecast.confidence} className="mb-3" />
                <div className="space-y-1">
                  {forecast.factors.map((factor, i) => (
                    <div key={i} className="text-xs text-blue-200/70 flex items-center gap-1">
                      <Target className="w-3 h-3" />
                      {factor}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Anomaly Detection */}
      <Card className="bg-slate-800/60 border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            Smart Anomaly Detection
            <Badge variant="destructive" className="text-xs">
              {anomalies.length} issues detected
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {anomalies.map((anomaly) => (
              <div key={anomaly.id} className="bg-slate-700/50 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge className={getSeverityColor(anomaly.severity)}>
                      {anomaly.severity}
                    </Badge>
                    <span className="text-blue-300 text-sm capitalize">
                      {anomaly.type.replace('_', ' ')}
                    </span>
                  </div>
                  <Button size="sm" variant="outline" className="text-xs">
                    Review
                  </Button>
                </div>
                <p className="text-blue-100 text-sm mb-2">{anomaly.description}</p>
                <div className="text-xs text-blue-200/70 flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  Suggested: {anomaly.suggestedAction}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Smart Insights */}
      <Card className="bg-slate-800/60 border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            AI-Powered Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {insights.map((insight, index) => (
              <div key={index} className="bg-slate-700/50 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${getImpactColor(insight.impact)}`}>
                      {insight.title}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {insight.impact} impact
                    </Badge>
                  </div>
                  <Button size="sm" className="text-xs">
                    Take Action
                  </Button>
                </div>
                <p className="text-blue-100 text-sm mb-2">{insight.description}</p>
                <div className="text-xs text-blue-200/70 flex items-center gap-1">
                  <DollarSign className="w-3 h-3" />
                  Next step: {insight.action}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
