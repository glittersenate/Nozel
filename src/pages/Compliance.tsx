
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ComplianceIssueChart } from '@/components/compliance/ComplianceIssueChart';
import { RecentComplianceChecks } from '@/components/compliance/RecentComplianceChecks';
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  FileText,
  Users,
  AlertCircle,
  TrendingUp
} from 'lucide-react';

export default function Compliance() {
  const complianceMetrics = [
    { label: 'Overall Compliance Score', value: 92, color: 'text-green-600' },
    { label: 'Active Policies', value: 24, color: 'text-blue-600' },
    { label: 'Pending Reviews', value: 3, color: 'text-yellow-600' },
    { label: 'Critical Issues', value: 0, color: 'text-red-600' }
  ];

  const recentAudits = [
    { name: 'GDPR Compliance Review', date: '2024-03-01', status: 'completed', score: 95 },
    { name: 'Data Security Audit', date: '2024-02-28', status: 'completed', score: 88 },
    { name: 'Employee Privacy Check', date: '2024-02-25', status: 'in-progress', score: null },
    { name: 'Payroll Compliance', date: '2024-02-20', status: 'completed', score: 92 }
  ];

  const complianceAreas = [
    { 
      name: 'Data Privacy (GDPR)', 
      status: 'compliant', 
      lastCheck: '2024-03-01',
      score: 95
    },
    { 
      name: 'Employment Law', 
      status: 'compliant', 
      lastCheck: '2024-02-28',
      score: 88
    },
    { 
      name: 'Health & Safety', 
      status: 'review-needed', 
      lastCheck: '2024-02-15',
      score: 75
    },
    { 
      name: 'Financial Reporting', 
      status: 'compliant', 
      lastCheck: '2024-03-05',
      score: 92
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant':
        return 'bg-green-500';
      case 'review-needed':
        return 'bg-yellow-500';
      case 'non-compliant':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant':
        return <CheckCircle className="w-4 h-4" />;
      case 'review-needed':
        return <AlertTriangle className="w-4 h-4" />;
      case 'non-compliant':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">AI Compliance Management</h1>
          <p className="text-muted-foreground">Monitor and maintain regulatory compliance across all HR processes</p>
        </div>

        {/* Compliance Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {complianceMetrics.map((metric, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
                    <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}{metric.label.includes('Score') ? '%' : ''}</p>
                  </div>
                  <div className="p-2 bg-muted rounded-lg">
                    {metric.label.includes('Score') && <TrendingUp className="w-6 h-6 text-green-600" />}
                    {metric.label.includes('Policies') && <FileText className="w-6 h-6 text-blue-600" />}
                    {metric.label.includes('Pending') && <Clock className="w-6 h-6 text-yellow-600" />}
                    {metric.label.includes('Issues') && <Shield className="w-6 h-6 text-red-600" />}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ComplianceIssueChart />
          <RecentComplianceChecks />
        </div>

        {/* Compliance Areas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Compliance Areas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceAreas.map((area, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge className={getStatusColor(area.status)}>
                        {getStatusIcon(area.status)}
                      </Badge>
                      <div>
                        <p className="font-medium">{area.name}</p>
                        <p className="text-sm text-muted-foreground">Last checked: {area.lastCheck}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{area.score}%</p>
                      <Progress value={area.score} className="w-20 h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Recent Audits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAudits.map((audit, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{audit.name}</p>
                        <p className="text-sm text-muted-foreground">{audit.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {audit.score && (
                        <span className="text-sm font-medium">{audit.score}%</span>
                      )}
                      <Badge 
                        variant={audit.status === 'completed' ? 'default' : 'secondary'}
                        className={audit.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'}
                      >
                        {audit.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
