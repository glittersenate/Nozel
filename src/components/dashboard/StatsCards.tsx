import React from 'react';
import { Users, DollarSign, TrendingUp, Clock } from 'lucide-react';

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
  
  // Calculate employees hired in last 3 months
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  const recentHires = employees.filter(emp => new Date(emp.startDate) > threeMonthsAgo).length;

  const stats = [
    {
      title: 'Total Employees',
      value: employees.length.toString(),
      icon: Users,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    },
    {
      title: 'Active Employees',
      value: activeEmployees.length.toString(),
      icon: TrendingUp,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20'
    },
    {
      title: 'Avg. Salary',
      value: `$${avgSalary.toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
      icon: DollarSign,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/20'
    },
    {
      title: 'Recent Hires',
      value: recentHires.toString(),
      icon: Clock,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className={`bg-white dark:bg-[#141a2e]/80 border ${stat.borderColor} rounded-xl p-6 hover:scale-105 transition-transform text-black dark:text-white`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-800/70 dark:text-blue-300/70 text-sm font-medium">{stat.title}</p>
              <p className="text-2xl font-bold text-black dark:text-white mt-1">{stat.value}</p>
            </div>
            <div className={`${stat.bgColor} p-3 rounded-lg`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
