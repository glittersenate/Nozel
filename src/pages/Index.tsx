
import React, { useState, useEffect } from 'react';
import EnhancedStatsCards from '@/components/dashboard/EnhancedStatsCards';
import SalaryChart from '@/components/dashboard/SalaryChart';
import DepartmentChart from '@/components/dashboard/DepartmentChart';
import RecentActivity from '@/components/dashboard/RecentActivity';
import { PredictiveInsights } from '@/components/dashboard/PredictiveInsights';
import LiveActivityFeed from '@/components/dashboard/LiveActivityFeed';
import RealTimeMetrics from '@/components/dashboard/RealTimeMetrics';
import { useEmployees } from '@/hooks/useEmployees';

export default function Index() {
  const { employees } = useEmployees();
  const [activities, setActivities] = useState([]);
  const [metrics, setMetrics] = useState({
    totalEmployees: 0,
    activeEmployees: 0,
    totalPayroll: 0,
    averageSalary: 0,
    newHires: 0,
    departmentGrowth: {},
    topGrowthDept: null
  });

  useEffect(() => {
    // Calculate metrics from employees
    const activeEmps = employees.filter(emp => emp.status === 'active');
    const totalSalary = activeEmps.reduce((sum, emp) => sum + emp.salary, 0);
    const avgSalary = activeEmps.length > 0 ? totalSalary / activeEmps.length : 0;
    
    // Calculate new hires (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const newHires = employees.filter(emp => new Date(emp.startDate) > thirtyDaysAgo).length;

    // Calculate department growth (mock data)
    const departmentGrowth = {
      'Engineering': 15,
      'Marketing': 8,
      'Sales': 12,
      'HR': 5
    };
    
    const topGrowthDept = Object.entries(departmentGrowth)
      .sort(([,a], [,b]) => b - a)[0];

    setMetrics({
      totalEmployees: employees.length,
      activeEmployees: activeEmps.length,
      totalPayroll: totalSalary,
      averageSalary: avgSalary,
      newHires: newHires,
      departmentGrowth: departmentGrowth,
      topGrowthDept: topGrowthDept ? { name: topGrowthDept[0], value: topGrowthDept[1] } : null
    });

    // Generate mock activities
    const mockActivities = [
      {
        id: '1',
        type: 'hire' as const,
        message: 'New employee Sarah Johnson joined Engineering',
        timestamp: new Date()
      },
      {
        id: '2',
        type: 'promotion' as const,
        message: 'John Doe promoted to Senior Developer',
        timestamp: new Date()
      }
    ];
    setActivities(mockActivities);
  }, [employees]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">HR Dashboard</h1>
          <p className="text-muted-foreground">Welcome to your comprehensive HR management system</p>
        </div>

        <div className="space-y-8">
          <EnhancedStatsCards employees={employees} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SalaryChart employees={employees} />
            <DepartmentChart employees={employees} />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RecentActivity employees={employees} />
            </div>
            <div className="space-y-6">
              <PredictiveInsights employees={employees} />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LiveActivityFeed activities={activities} />
            <RealTimeMetrics metrics={metrics} />
          </div>
        </div>
      </div>
    </div>
  );
}
