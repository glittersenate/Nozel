
import React, { useState, useEffect } from 'react';
import { User, AlertCircle, TrendingDown, Heart, MessageSquare, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface FlightRiskEmployee {
  id: string;
  name: string;
  position: string;
  department: string;
  riskScore: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  factors: {
    engagement: number;
    performance: number;
    satisfaction: number;
    workload: number;
  };
  indicators: string[];
  recommendations: string[];
  avatar?: string;
}

interface TeamMoodMetrics {
  overall: number;
  departments: { name: string; mood: number; trend: 'up' | 'down' | 'stable' }[];
  recentEvents: { event: string; impact: 'positive' | 'negative'; date: string }[];
}

export const FlightRiskAnalyzer: React.FC = () => {
  const [riskEmployees, setRiskEmployees] = useState<FlightRiskEmployee[]>([]);
  const [teamMood, setTeamMood] = useState<TeamMoodMetrics | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    loadFlightRiskData();
  }, []);

  const loadFlightRiskData = async () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      setRiskEmployees([
        {
          id: '1',
          name: 'Sarah Johnson',
          position: 'Senior Developer',
          department: 'Engineering',
          riskScore: 78,
          riskLevel: 'high',
          factors: {
            engagement: 45,
            performance: 85,
            satisfaction: 40,
            workload: 90
          },
          indicators: [
            'Decreased Slack activity (-40%)',
            'Missing team meetings (3 last week)',
            'No code reviews in 5 days',
            'Overtime hours increased 60%'
          ],
          recommendations: [
            'Schedule 1:1 with manager immediately',
            'Reduce workload by 20%',
            'Offer flexible work arrangements',
            'Consider promotion discussion'
          ]
        },
        {
          id: '2',
          name: 'Mike Chen',
          position: 'Marketing Manager',
          department: 'Marketing',
          riskScore: 65,
          riskLevel: 'medium',
          factors: {
            engagement: 60,
            performance: 75,
            satisfaction: 55,
            workload: 85
          },
          indicators: [
            'LinkedIn activity increased',
            'Requesting more vacation days',
            'Performance slightly declining'
          ],
          recommendations: [
            'Career development conversation',
            'Team building activities',
            'Skills training opportunities'
          ]
        }
      ]);

      setTeamMood({
        overall: 73,
        departments: [
          { name: 'Engineering', mood: 68, trend: 'down' },
          { name: 'Marketing', mood: 75, trend: 'stable' },
          { name: 'Sales', mood: 82, trend: 'up' },
          { name: 'HR', mood: 79, trend: 'up' }
        ],
        recentEvents: [
          { event: 'Team lunch organized', impact: 'positive', date: '2024-03-15' },
          { event: 'Project deadline moved up', impact: 'negative', date: '2024-03-12' },
          { event: 'New hire welcomed', impact: 'positive', date: '2024-03-10' }
        ]
      });

      setIsAnalyzing(false);
    }, 1500);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'critical': return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'high': return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
      case 'medium': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      default: return 'text-green-500 bg-green-500/10 border-green-500/20';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingDown className="w-3 h-3 text-green-400 rotate-180" />;
      case 'down': return <TrendingDown className="w-3 h-3 text-red-400" />;
      default: return <div className="w-3 h-3 bg-blue-400 rounded-full" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Flight Risk Dashboard */}
      <Card className="bg-slate-800/60 border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-400" />
            Flight Risk Analysis
            {isAnalyzing && <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse" />}
            <Badge variant="destructive" className="ml-auto">
              {riskEmployees.filter(e => e.riskLevel === 'high' || e.riskLevel === 'critical').length} High Risk
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {riskEmployees.map((employee) => (
              <div key={employee.id} className="bg-slate-700/50 rounded-lg p-4 border border-slate-600/30">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-blue-100 font-semibold">{employee.name}</h3>
                      <p className="text-blue-300/70 text-sm">{employee.position} • {employee.department}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={getRiskColor(employee.riskLevel)}>
                      {employee.riskLevel} risk
                    </Badge>
                    <div className="text-2xl font-bold text-white mt-1">
                      {employee.riskScore}%
                    </div>
                  </div>
                </div>

                {/* Risk Factors */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  {Object.entries(employee.factors).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-xs text-blue-300/70 capitalize mb-1">{key}</div>
                      <Progress 
                        value={value} 
                        className="h-2 mb-1"
                        style={{
                          background: value < 50 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)'
                        }}
                      />
                      <div className="text-xs text-blue-200">{value}%</div>
                    </div>
                  ))}
                </div>

                {/* Key Indicators */}
                <div className="mb-4">
                  <h4 className="text-blue-300 text-sm font-medium mb-2 flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    Key Indicators
                  </h4>
                  <div className="space-y-1">
                    {employee.indicators.slice(0, 2).map((indicator, i) => (
                      <div key={i} className="text-xs text-blue-200/80 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                        {indicator}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Schedule 1:1
                  </Button>
                  <Button size="sm" variant="outline" className="border-blue-500/30">
                    View Details
                  </Button>
                  <Button size="sm" variant="outline" className="border-blue-500/30">
                    Create Action Plan
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Team Mood Analytics */}
      {teamMood && (
        <Card className="bg-slate-800/60 border-blue-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Heart className="w-5 h-5 text-pink-400" />
              Team Mood Analytics
              <Badge variant="outline" className="ml-auto">
                {teamMood.overall}% Overall
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Department Moods */}
              <div>
                <h4 className="text-blue-300 text-sm font-medium mb-3">Department Mood</h4>
                <div className="space-y-3">
                  {teamMood.departments.map((dept, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-blue-200 text-sm">{dept.name}</span>
                        {getTrendIcon(dept.trend)}
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={dept.mood} className="w-20 h-2" />
                        <span className="text-blue-100 text-sm font-medium">
                          {dept.mood}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Events */}
              <div>
                <h4 className="text-blue-300 text-sm font-medium mb-3">Recent Impact Events</h4>
                <div className="space-y-2">
                  {teamMood.recentEvents.map((event, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        event.impact === 'positive' ? 'bg-green-400' : 'bg-red-400'
                      }`} />
                      <div className="flex-1">
                        <div className="text-blue-200 text-sm">{event.event}</div>
                        <div className="text-blue-300/60 text-xs">{event.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
