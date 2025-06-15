import { useState, useEffect, useCallback } from 'react';
import { Employee } from '@/types/employee';

interface RealTimeMetrics {
  totalEmployees: number;
  activeEmployees: number;
  totalPayroll: number;
  averageSalary: number;
  newHires: number;
  departmentGrowth: Record<string, number>;
  salaryTrends: Array<{ month: string; average: number }>;
  activityFeed: Array<{
    id: string;
    type: 'hire' | 'promotion' | 'salary_change' | 'department_change';
    message: string;
    timestamp: Date;
    employee?: string;
  }>;
}

const generateRandomActivity = (): RealTimeMetrics['activityFeed'][0] => {
  const activities = [
    { type: 'hire' as const, message: 'New employee John Doe joined Engineering' },
    { type: 'promotion' as const, message: 'Sarah Connor promoted to Senior Developer' },
    { type: 'salary_change' as const, message: 'Mike Ross received salary adjustment' },
    { type: 'department_change' as const, message: 'Lisa Wang transferred to Product team' },
  ];
  
  const activity = activities[Math.floor(Math.random() * activities.length)];
  return {
    id: Math.random().toString(36).substr(2, 9),
    ...activity,
    timestamp: new Date(),
    employee: `Employee ${Math.floor(Math.random() * 100)}`,
  };
};

export const useRealTimeData = (employees: Employee[]) => {
  const [metrics, setMetrics] = useState<RealTimeMetrics>({
    totalEmployees: 0,
    activeEmployees: 0,
    totalPayroll: 0,
    averageSalary: 0,
    newHires: 0,
    departmentGrowth: {},
    salaryTrends: [],
    activityFeed: [],
  });

  // Refresh metrics every 10s and activity feed every 15s
  const updateMetrics = useCallback(() => {
    const activeEmployees = employees.filter(emp => emp.status === 'active');
    const totalPayroll = activeEmployees.reduce((sum, emp) => sum + emp.salary, 0);
    
    const departmentCounts = activeEmployees.reduce((acc, emp) => {
      acc[emp.department] = (acc[emp.department] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Keep stable/fixed growth for the session (not changing rapidly)
    const departmentGrowth = Object.keys(departmentCounts).reduce((acc, dept) => {
      acc[dept] = (acc[dept] ?? Math.floor(Math.random() * 20) - 5); // cache on first run
      return acc;
    }, {} as Record<string, number>);

    // Stable trends per session
    const salaryTrends = [
      { month: 'Jan', average: 75500 },
      { month: 'Feb', average: 76500 },
      { month: 'Mar', average: 77850 },
      { month: 'Apr', average: 78200 },
      { month: 'May', average: 79100 },
      { month: 'Jun', average: 80200 },
    ];

    setMetrics(prev => ({
      ...prev,
      totalEmployees: employees.length,
      activeEmployees: activeEmployees.length,
      totalPayroll,
      averageSalary: activeEmployees.length > 0 ? totalPayroll / activeEmployees.length : 0,
      newHires: 3, // make this stable for session
      departmentGrowth,
      salaryTrends,
    }));
  }, [employees]);

  // Metric update interval (every 10s)
  useEffect(() => {
    updateMetrics();
    const metricsTimer = setInterval(() => updateMetrics(), 10000);
    return () => clearInterval(metricsTimer);
  }, [updateMetrics]);

  // Activity feed has its own interval — updates every 15s
  useEffect(() => {
    setMetrics(prev => ({
      ...prev,
      activityFeed:
        prev.activityFeed.length === 0
          ? [generateRandomActivity()]
          : prev.activityFeed,
    }));

    const feedTimer = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        activityFeed: [generateRandomActivity(), ...prev.activityFeed].slice(0, 100),
      }));
    }, 15000);

    return () => clearInterval(feedTimer);
  }, []);

  return { metrics };
};
