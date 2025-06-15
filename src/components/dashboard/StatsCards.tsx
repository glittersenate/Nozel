
import React from 'react';
import { Users, DollarSign, TrendingUp, Clock } from 'lucide-react';
import PremiumCard from '../common/PremiumCard';

interface Employee {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  salary: number;
  startDate: string;
  status: 'active' | 'inactive';
}

interface StatsCardsProps {
  employees: Employee[];
}

const StatsCards: React.FC<StatsCardsProps> = ({ employees }) => {
  const activeEmployees = employees.filter(emp => emp.status === 'active');
  const totalSalaries = activeEmployees.reduce((sum, emp) => sum + emp.salary, 0);
  const avgSalary = activeEmployees.length > 0 ? totalSalaries / activeEmployees.length : 0;
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  const recentHires = employees.filter(emp => new Date(emp.startDate) > threeMonthsAgo).length;

  const stats = [
    {
      title: 'Total Employees',
      value: employees.length.toString(),
      icon: Users,
      subtitle: "",
    },
    {
      title: 'Active Employees',
      value: activeEmployees.length.toString(),
      icon: TrendingUp,
      subtitle: "",
    },
    {
      title: 'Avg. Salary',
      value: `$${avgSalary.toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
      icon: DollarSign,
      subtitle: "",
    },
    {
      title: 'Recent Hires',
      value: recentHires.toString(),
      icon: Clock,
      subtitle: "Last 3 mo.",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <PremiumCard key={stat.title}>
          <div className="flex items-center justify-between pb-1">
            <span className="uppercase text-xs font-bold tracking-wider text-black/60 dark:text-blue-200/60">{stat.title}</span>
            <stat.icon className="w-5 h-5 text-black dark:text-blue-200" />
          </div>
          <div className="pt-2 pb-1">
            <span className="text-2xl font-bold text-black dark:text-white">{stat.value}</span>
          </div>
          {stat.subtitle && (
            <div className="text-xs text-black/40 dark:text-blue-300/50">{stat.subtitle}</div>
          )}
        </PremiumCard>
      ))}
    </div>
  );
};

export default StatsCards;
