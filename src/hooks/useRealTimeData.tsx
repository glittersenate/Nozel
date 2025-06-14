
import { useState, useEffect, useCallback } from 'react';
import { Employee } from '@/pages/Employees';

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

  const [isLive, setIsLive] = useState(false);

  const updateMetrics = useCallback(() => {
    const activeEmployees = employees.filter(emp => emp.status === 'active');
    const totalPayroll = activeEmployees.reduce((sum, emp) => sum + emp.salary, 0);
    
    const departmentCounts = activeEmployees.reduce((acc, emp) => {
      acc[emp.department] = (acc[emp.department] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Simulate growth percentages
    const departmentGrowth = Object.keys(departmentCounts).reduce((acc, dept) => {
      acc[dept] = Math.floor(Math.random() * 20) - 5; // -5% to +15% growth
      return acc;
    }, {} as Record<string, number>);

    // Generate salary trends
    const salaryTrends = [
      { month: 'Jan', average: 75000 + Math.random() * 10000 },
      { month: 'Feb', average: 76000 + Math.random() * 10000 },
      { month: 'Mar', average: 77500 + Math.random() * 10000 },
      { month: 'Apr', average: 78000 + Math.random() * 10000 },
      { month: 'May', average: 79000 + Math.random() * 10000 },
      { month: 'Jun', average: 80000 + Math.random() * 10000 },
    ];

    setMetrics(prev => ({
      totalEmployees: employees.length,
      activeEmployees: activeEmployees.length,
      totalPayroll,
      averageSalary: activeEmployees.length > 0 ? totalPayroll / activeEmployees.length : 0,
      newHires: Math.floor(Math.random() * 5),
      departmentGrowth,
      salaryTrends,
      activityFeed: isLive ? [generateRandomActivity(), ...prev.activityFeed.slice(0, 9)] : prev.activityFeed,
    }));
  }, [employees, isLive]);

  useEffect(() => {
    updateMetrics();
  }, [updateMetrics]);

  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      updateMetrics();
    }, 3000); // Update every 3 seconds when live

    return () => clearInterval(interval);
  }, [isLive, updateMetrics]);

  const toggleLiveMode = () => {
    setIsLive(!isLive);
  };

  return { metrics, isLive, toggleLiveMode };
};
