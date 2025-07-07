
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Calculator, TrendingUp, Users, DollarSign, Target, Zap } from 'lucide-react';
import { Employee } from '@/types/employee';

interface ScenarioPlannerProps {
  employees: Employee[];
}

interface Scenario {
  id: string;
  name: string;
  description: string;
  changes: {
    headcountChange: number;
    salaryIncrease: number;
    departmentFocus: string;
  };
  impact: {
    costChange: number;
    productivityChange: number;
    retentionChange: number;
  };
}

export const ScenarioPlanner: React.FC<ScenarioPlannerProps> = ({ employees }) => {
  const [activeScenario, setActiveScenario] = useState<string | null>(null);
  const [headcountSlider, setHeadcountSlider] = useState([0]);
  const [salarySlider, setSalarySlider] = useState([0]);

  const currentPayroll = employees.reduce((sum, emp) => sum + emp.salary, 0);
  
  const scenarios: Scenario[] = [
    {
      id: 'expansion',
      name: 'Rapid Expansion',
      description: 'Add 25% more staff, focus on Engineering',
      changes: {
        headcountChange: 25,
        salaryIncrease: 5,
        departmentFocus: 'Engineering'
      },
      impact: {
        costChange: 32,
        productivityChange: 28,
        retentionChange: -5
      }
    },
    {
      id: 'optimization',
      name: 'Cost Optimization',
      description: 'Reduce overhead, increase efficiency',
      changes: {
        headcountChange: -10,
        salaryIncrease: 8,
        departmentFocus: 'Operations'
      },
      impact: {
        costChange: -15,
        productivityChange: 12,
        retentionChange: 15
      }
    },
    {
      id: 'retention',
      name: 'Talent Retention',
      description: 'Competitive compensation increases',
      changes: {
        headcountChange: 0,
        salaryIncrease: 15,
        departmentFocus: 'All'
      },
      impact: {
        costChange: 18,
        productivityChange: 22,
        retentionChange: 35
      }
    }
  ];

  const calculateCustomImpact = () => {
    const headcountChange = headcountSlider[0];
    const salaryChange = salarySlider[0];
    
    return {
      newPayroll: currentPayroll * (1 + headcountChange/100) * (1 + salaryChange/100),
      productivityGain: (headcountChange * 0.8) + (salaryChange * 0.6),
      retentionImpact: salaryChange * 2 - Math.abs(headcountChange) * 0.5
    };
  };

  const customImpact = calculateCustomImpact();

  return (
    <Card className="bg-[#0F1629]/90 border border-cyan-800/30">
      <CardHeader>
        <CardTitle className="text-white text-lg flex items-center gap-2">
          <Calculator className="w-5 h-5 text-cyan-400" />
          Scenario Planning Lab
          <Badge className="bg-cyan-500/20 text-cyan-300 ml-auto">
            What-If Analysis
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Interactive Sliders */}
        <div className="bg-gray-900/40 p-4 rounded-lg border border-cyan-800/20">
          <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Target className="w-4 h-4 text-cyan-400" />
            Custom Scenario Builder
          </h4>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-cyan-200 text-sm">Headcount Change</span>
                <span className="text-white font-semibold">{headcountSlider[0]}%</span>
              </div>
              <Slider
                value={headcountSlider}
                onValueChange={setHeadcountSlider}
                max={50}
                min={-30}
                step={5}
                className="w-full"
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-cyan-200 text-sm">Salary Increase</span>
                <span className="text-white font-semibold">{salarySlider[0]}%</span>
              </div>
              <Slider
                value={salarySlider}
                onValueChange={setSalarySlider}
                max={25}
                min={0}
                step={1}
                className="w-full"
              />
            </div>
          </div>

          {/* Real-time Impact Display */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="text-center">
              <div className="text-lg font-bold text-white">
                ${Math.round(customImpact.newPayroll).toLocaleString()}
              </div>
              <div className="text-xs text-cyan-300">New Annual Payroll</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-400">
                +{Math.round(customImpact.productivityGain)}%
              </div>
              <div className="text-xs text-cyan-300">Productivity Gain</div>
            </div>
            <div className="text-center">
              <div className={`text-lg font-bold ${customImpact.retentionImpact > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {customImpact.retentionImpact > 0 ? '+' : ''}{Math.round(customImpact.retentionImpact)}%
              </div>
              <div className="text-xs text-cyan-300">Retention Impact</div>
            </div>
          </div>
        </div>

        {/* Preset Scenarios */}
        <div className="space-y-3">
          <h4 className="text-white font-semibold mb-3">Preset Scenarios</h4>
          {scenarios.map((scenario) => (
            <div
              key={scenario.id}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                activeScenario === scenario.id
                  ? 'border-cyan-500/50 bg-cyan-500/10'
                  : 'border-gray-600/30 bg-gray-800/20 hover:border-cyan-500/30'
              }`}
              onClick={() => setActiveScenario(activeScenario === scenario.id ? null : scenario.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <h5 className="text-white font-medium">{scenario.name}</h5>
                <div className="flex gap-2">
                  <Badge className={`${
                    scenario.impact.costChange > 0 ? 'bg-red-500/20 text-red-300' : 'bg-green-500/20 text-green-300'
                  }`}>
                    {scenario.impact.costChange > 0 ? '+' : ''}{scenario.impact.costChange}% cost
                  </Badge>
                  <Badge className="bg-blue-500/20 text-blue-300">
                    +{scenario.impact.productivityChange}% productivity
                  </Badge>
                </div>
              </div>
              <p className="text-cyan-200/70 text-sm mb-3">{scenario.description}</p>
              
              {activeScenario === scenario.id && (
                <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-cyan-500/20">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-cyan-200">
                      <Users className="w-4 h-4" />
                      Headcount: {scenario.changes.headcountChange > 0 ? '+' : ''}{scenario.changes.headcountChange}%
                    </div>
                    <div className="flex items-center gap-2 text-sm text-cyan-200">
                      <DollarSign className="w-4 h-4" />
                      Salary Increase: +{scenario.changes.salaryIncrease}%
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-cyan-200">
                      <TrendingUp className="w-4 h-4" />
                      Retention: {scenario.impact.retentionChange > 0 ? '+' : ''}{scenario.impact.retentionChange}%
                    </div>
                    <Button 
                      size="sm" 
                      className="bg-cyan-600 hover:bg-cyan-700 text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Simulate scenario
                      }}
                    >
                      <Zap className="w-3 h-3 mr-1" />
                      Simulate
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
