import React from 'react';
import { Users, DollarSign, TrendingUp, Clock, Award, UserPlus } from 'lucide-react';
import { MetricCard } from '@/components/common/MetricCard';
import { Employee } from '@/types/employee';
import PremiumCard from '../common/PremiumCard';

interface EnhancedStatsCardsProps {
  employees: Employee[];
}

const EnhancedStatsCards: React.FC<EnhancedStatsCardsProps> = ({ employees }) => {
  const activeEmployees = employees.filter(emp => emp.status === 'active');
  const totalSalaries = activeEmployees.reduce((sum, emp) => sum + emp.salary, 0);
  const avgSalary = activeEmployees.length > 0 ? totalSalaries / activeEmployees.length : 0;
  
  // Calculate employees hired in last 3 months
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  const recentHires = employees.filter(emp => new Date(emp.startDate) > threeMonthsAgo).length;

  // Get top department by employee count
  const departmentCounts = activeEmployees.reduce((acc, emp) => {
    acc[emp.department] = (acc[emp.department] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const topDepartment = Object.entries(departmentCounts)
    .sort(([,a], [,b]) => b - a)[0];

  const metrics = [
    {
      title: 'Total Employees',
      value: employees.length,
      icon: Users,
      subtitle: `${activeEmployees.length} active`,
    },
    {
      title: 'Monthly Payroll',
      value: `$${totalSalaries.toLocaleString()}`,
      icon: DollarSign,
      subtitle: 'total compensation',
    },
    {
      title: 'Average Salary',
      value: `$${Math.round(avgSalary).toLocaleString()}`,
      icon: TrendingUp,
      subtitle: 'per employee',
    },
    {
      title: 'Recent Hires',
      value: recentHires,
      icon: UserPlus,
      subtitle: 'last 3 months',
    },
    {
      title: 'Top Department',
      value: topDepartment ? topDepartment[0] : 'N/A',
      icon: Award,
      subtitle: topDepartment ? `${topDepartment[1]} employees` : 'No data',
    },
    {
      title: 'Retention Rate',
      value: '94.2%',
      icon: Clock,
      subtitle: 'year over year',
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 mb-8 px-0 sm:px-0 pt-2">
      {metrics.map((metric, idx) => (
        <PremiumCard key={metric.title}>
          <div className="flex items-center justify-between pb-1">
            <span className="uppercase text-xs font-bold tracking-wider text-black/60 dark:text-blue-200/60">{metric.title}</span>
            <metric.icon className="w-5 h-5 text-black dark:text-blue-200" />
          </div>
          <div className="pt-2 pb-1">
            <span className="text-2xl font-bold text-black dark:text-white truncate">{typeof metric.value === "number" ? metric.value.toLocaleString() : metric.value}</span>
          </div>
          {metric.subtitle && (
            <div className="text-xs text-black/40 dark:text-blue-300/50 truncate">{metric.subtitle}</div>
          )}
        </PremiumCard>
      ))}
    </div>
  );
};

export default EnhancedStatsCards;
