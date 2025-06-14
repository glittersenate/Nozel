
import React from 'react';
import { Users, DollarSign, TrendingUp, Clock, AlertCircle } from 'lucide-react';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';

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

  const stats = [
    {
      title: 'Total Employees',
      value: employees.length.toString(),
      subtitle: `${activeEmployees.length} active, ${employees.length - activeEmployees.length} inactive`,
      icon: Users,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      hoverGlow: 'hover:shadow-blue-500/25',
      tooltip: 'Complete headcount across all departments and status levels'
    },
    {
      title: 'Active Employees',
      value: activeEmployees.length.toString(),
      subtitle: 'Currently employed',
      icon: TrendingUp,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
      hoverGlow: 'hover:shadow-green-500/25',
      tooltip: 'Employees with active status, eligible for payroll'
    },
    {
      title: 'Upcoming Payroll',
      value: `$${totalSalaries.toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
      subtitle: `Avg: $${avgSalary.toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
      icon: DollarSign,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/20',
      hoverGlow: 'hover:shadow-yellow-500/25',
      tooltip: 'Total monthly payroll cost for all active employees'
    },
    {
      title: 'Recent Hires',
      value: recentHires.toString(),
      subtitle: 'Last 3 months',
      icon: Clock,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
      hoverGlow: 'hover:shadow-purple-500/25',
      tooltip: 'New employees onboarded in the past 90 days'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <HoverCard key={stat.title}>
          <HoverCardTrigger asChild>
            <div
              className={`bg-[#141a2e]/80 dark:bg-[#141a2e]/80 light:bg-white border ${stat.borderColor} rounded-xl p-6 hover:scale-105 transition-all duration-300 cursor-pointer hover:shadow-lg ${stat.hoverGlow} group`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-blue-300/70 dark:text-blue-300/70 light:text-gray-600 text-sm font-medium mb-1">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-white dark:text-white light:text-gray-900 mb-1 group-hover:scale-105 transition-transform">
                    {stat.value}
                  </p>
                  <p className="text-xs text-blue-300/50 dark:text-blue-300/50 light:text-gray-500">
                    {stat.subtitle}
                  </p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg group-hover:scale-110 transition-transform`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="w-80 bg-[#1a2550]/95 border-blue-800/30 text-blue-100">
            <div className="flex items-start gap-3">
              <div className={`${stat.bgColor} p-2 rounded-lg`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">{stat.title}</h4>
                <p className="text-sm text-blue-200/80">{stat.tooltip}</p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  );
};

export default EnhancedStatsCards;
