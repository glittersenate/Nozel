
import React from 'react';
import { Users, DollarSign, TrendingUp, Clock, Award, UserPlus } from 'lucide-react';
import { MetricCard } from '@/components/common/MetricCard';
import { Employee } from '@/types/employee';

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
      subtitle: `${activeEmployees.length} active`,
      icon: Users,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
      borderColor: 'border-blue-500/20',
      trend: { value: 8.2, isPositive: true }
    },
    {
      title: 'Monthly Payroll',
      value: `$${totalSalaries.toLocaleString()}`,
      subtitle: 'total compensation',
      icon: DollarSign,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/20',
      borderColor: 'border-emerald-500/20',
      trend: { value: 3.1, isPositive: true }
    },
    {
      title: 'Average Salary',
      value: `$${Math.round(avgSalary).toLocaleString()}`,
      subtitle: 'per employee',
      icon: TrendingUp,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/20',
      borderColor: 'border-amber-500/20',
      trend: { value: 5.7, isPositive: true }
    },
    {
      title: 'Recent Hires',
      value: recentHires,
      subtitle: 'last 3 months',
      icon: UserPlus,
      color: 'text-violet-400',
      bgColor: 'bg-violet-500/20',
      borderColor: 'border-violet-500/20',
      trend: { value: 12.5, isPositive: true }
    },
    {
      title: 'Top Department',
      value: topDepartment ? topDepartment[0] : 'N/A',
      subtitle: topDepartment ? `${topDepartment[1]} employees` : 'No data',
      icon: Award,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/20',
      borderColor: 'border-orange-500/20'
    },
    {
      title: 'Retention Rate',
      value: '94.2%',
      subtitle: 'year over year',
      icon: Clock,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/20',
      borderColor: 'border-cyan-500/20',
      trend: { value: 2.1, isPositive: true }
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 px-8 pt-8">
      {metrics.map((metric, index) => (
        <div 
          key={metric.title} 
          className={`animate-fade-in-scale animate-stagger-${Math.min(index + 1, 6)}`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <MetricCard {...metric} />
        </div>
      ))}
    </div>
  );
};

export default EnhancedStatsCards;
