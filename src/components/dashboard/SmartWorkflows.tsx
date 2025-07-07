
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Workflow, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  ArrowDown, 
  Play,
  Pause,
  RotateCcw,
  Zap
} from 'lucide-react';
import { Employee } from '@/types/employee';

interface SmartWorkflowsProps {
  employees: Employee[];
}

interface WorkflowSuggestion {
  id: string;
  title: string;
  description: string;
  category: 'automation' | 'optimization' | 'compliance' | 'engagement';
  priority: 'high' | 'medium' | 'low';
  estimatedTime: string;
  potentialSaving: string;
  status: 'suggested' | 'in-progress' | 'completed';
  progress: number;
  steps: string[];
}

export const SmartWorkflows: React.FC<SmartWorkflowsProps> = ({ employees }) => {
  const [workflows, setWorkflows] = useState<WorkflowSuggestion[]>([]);
  const [activeWorkflow, setActiveWorkflow] = useState<string | null>(null);

  useEffect(() => {
    // Generate smart workflow suggestions based on employee data
    const generateWorkflows = () => {
      const departmentCounts = employees.reduce((acc, emp) => {
        acc[emp.department] = (acc[emp.department] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const suggestions: WorkflowSuggestion[] = [
        {
          id: 'auto-onboarding',
          title: 'Automated Onboarding Pipeline',
          description: 'Create smart onboarding sequences that adapt based on role, department, and employee preferences.',
          category: 'automation',
          priority: 'high',
          estimatedTime: '2 hours',
          potentialSaving: '8 hours/week',
          status: 'suggested',
          progress: 0,
          steps: [
            'Set up role-based document templates',
            'Configure department-specific checklists',
            'Create automated welcome sequences',
            'Integrate with IT provisioning systems'
          ]
        },
        {
          id: 'performance-insights',
          title: 'Predictive Performance Analytics',
          description: 'AI-driven performance tracking that identifies potential issues before they impact productivity.',
          category: 'optimization',
          priority: 'high',
          estimatedTime: '1.5 hours',
          potentialSaving: '12 hours/month',
          status: 'in-progress',
          progress: 65,
          steps: [
            'Analyze historical performance data',
            'Set up predictive models',
            'Create alert thresholds',
            'Configure manager notifications'
          ]
        },
        {
          id: 'compliance-monitoring',
          title: 'Smart Compliance Monitoring',
          description: 'Automated compliance checks with real-time alerts for regulatory requirements.',
          category: 'compliance',
          priority: 'high',
          estimatedTime: '3 hours',
          potentialSaving: '6 hours/week',
          status: 'suggested',
          progress: 0,
          steps: [
            'Map regulatory requirements',
            'Set up automated monitoring',
            'Create compliance dashboards',
            'Configure audit trails'
          ]
        },
        {
          id: 'engagement-optimization',
          title: 'Employee Engagement Optimizer',
          description: 'AI-powered suggestions to improve team engagement based on sentiment analysis and feedback patterns.',
          category: 'engagement',
          priority: 'medium',
          estimatedTime: '1 hour',
          potentialSaving: '4 hours/week',
          status: 'completed',
          progress: 100,
          steps: [
            'Analyze feedback patterns',
            'Generate engagement insights',
            'Create action recommendations',
            'Monitor improvement metrics'
          ]
        }
      ];

      setWorkflows(suggestions);
    };

    generateWorkflows();
  }, [employees]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-300 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'automation': return <Zap className="w-4 h-4" />;
      case 'optimization': return <ArrowDown className="w-4 h-4" />;
      case 'compliance': return <CheckCircle className="w-4 h-4" />;
      case 'engagement': return <Clock className="w-4 h-4" />;
      default: return <Workflow className="w-4 h-4" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'suggested': return <AlertCircle className="w-4 h-4 text-orange-400" />;
      case 'in-progress': return <Play className="w-4 h-4 text-blue-400" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-400" />;
      default: return <Pause className="w-4 h-4 text-gray-400" />;
    }
  };

  const startWorkflow = (workflowId: string) => {
    setWorkflows(prev => prev.map(wf => 
      wf.id === workflowId 
        ? { ...wf, status: 'in-progress', progress: 10 }
        : wf
    ));
  };

  return (
    <Card className="bg-[#0F1629]/90 border border-indigo-800/30">
      <CardHeader>
        <CardTitle className="text-white text-lg flex items-center gap-2">
          <Workflow className="w-5 h-5 text-indigo-400" />
          Smart Workflows
          <Badge className="bg-indigo-500/20 text-indigo-300 ml-auto">
            AI Orchestrated
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {workflows.map((workflow) => (
          <div
            key={workflow.id}
            className={`p-4 rounded-lg border transition-all cursor-pointer ${
              activeWorkflow === workflow.id
                ? 'border-indigo-500/50 bg-indigo-500/10'
                : 'border-gray-600/30 bg-gray-800/20 hover:border-indigo-500/30'
            }`}
            onClick={() => setActiveWorkflow(activeWorkflow === workflow.id ? null : workflow.id)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                {getCategoryIcon(workflow.category)}
                <div>
                  <h4 className="text-white font-semibold">{workflow.title}</h4>
                  <p className="text-indigo-200/70 text-sm">{workflow.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon(workflow.status)}
                <Badge className={getPriorityColor(workflow.priority)} variant="outline">
                  {workflow.priority}
                </Badge>
              </div>
            </div>

            <div className="flex items-center justify-between mb-3">
              <div className="flex gap-4 text-sm text-indigo-300">
                <span>⏱️ {workflow.estimatedTime}</span>
                <span>💰 Saves {workflow.potentialSaving}</span>
              </div>
              {workflow.status === 'in-progress' && (
                <div className="flex items-center gap-2">
                  <Progress value={workflow.progress} className="w-20 h-2" />
                  <span className="text-xs text-indigo-300">{workflow.progress}%</span>
                </div>
              )}
            </div>

            {activeWorkflow === workflow.id && (
              <div className="mt-4 pt-4 border-t border-indigo-500/20">
                <h5 className="text-white font-medium mb-3">Workflow Steps:</h5>
                <div className="space-y-2 mb-4">
                  {workflow.steps.map((step, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-indigo-200">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                        workflow.status === 'completed' || (workflow.status === 'in-progress' && index < 2)
                          ? 'bg-green-500/20 text-green-300'
                          : 'bg-gray-600/20 text-gray-400'
                      }`}>
                        {workflow.status === 'completed' || (workflow.status === 'in-progress' && index < 2) ? '✓' : index + 1}
                      </div>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  {workflow.status === 'suggested' && (
                    <Button 
                      size="sm" 
                      className="bg-indigo-600 hover:bg-indigo-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        startWorkflow(workflow.id);
                      }}
                    >
                      <Play className="w-3 h-3 mr-1" />
                      Start Workflow
                    </Button>
                  )}
                  {workflow.status === 'in-progress' && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-indigo-500/30 text-indigo-300"
                    >
                      <Pause className="w-3 h-3 mr-1" />
                      Pause
                    </Button>
                  )}
                  {workflow.status === 'completed' && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-green-500/30 text-green-300"
                    >
                      <RotateCcw className="w-3 h-3 mr-1" />
                      Run Again
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
