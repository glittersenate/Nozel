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
  const [metrics, setMetrics] = useState<RealTimeMetrics & {
    topGrowthDept?: { name: string; value: number } | null
  }>({
    totalEmployees: 0,
    activeEmployees: 0,
    totalPayroll: 0,
    averageSalary: 0,
    newHires: 0,
    departmentGrowth: {},
    salaryTrends: [],
    activityFeed: [],
    topGrowthDept: null,
  });

  // --- Stable department growth for session ----
  const [stableGrowth, setStableGrowth] = useState<Record<string, number>>({});
  const [stableTopGrowth, setStableTopGrowth] = useState<{ name: string; value: number } | null>(null);

  // Stable initialization of department growth for the session
  useEffect(() => {
    const activeEmployees = employees.filter(emp => emp.status === 'active');
    const departmentCounts = activeEmployees.reduce((acc, emp) => {
      acc[emp.department] = (acc[emp.department] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    const growth: Record<string, number> = {};
    Object.keys(departmentCounts).forEach(dept => {
      // Generate stable random number for each department once per session
      growth[dept] = Math.floor(Math.random() * 20) - 5;
    });
    setStableGrowth(growth);

    // Also compute top growth department stably
    let top: { name: string; value: number } | null = null;
    Object.entries(growth).forEach(([name, value]) => {
      if (!top || value > top.value) {
        top = { name, value };
      }
    });
    setStableTopGrowth(top);
    // eslint-disable-next-line
  }, [employees.map(e => e.department).sort().join()]); // run only when department list changes

  // Refresh metrics every 10s and activity feed every 45s
  const updateMetrics = useCallback(() => {
    const activeEmployees = employees.filter(emp => emp.status === 'active');
    const totalPayroll = activeEmployees.reduce((sum, emp) => sum + emp.salary, 0);

    // Use stableGrowth for departmentGrowth and stableTopGrowth for topGrowthDept
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
      newHires: 3, // stable for session
      departmentGrowth: stableGrowth,
      salaryTrends,
      topGrowthDept: stableTopGrowth,
    }));
  }, [employees, stableGrowth, stableTopGrowth]);

  // Metric update interval (every 10s)
  useEffect(() => {
    updateMetrics();
    const metricsTimer = setInterval(() => updateMetrics(), 10000);
    return () => clearInterval(metricsTimer);
  }, [updateMetrics]);

  // Activity feed (every 45s)
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
    }, 45000);

    return () => clearInterval(feedTimer);
  }, []);

  return { metrics };
};
