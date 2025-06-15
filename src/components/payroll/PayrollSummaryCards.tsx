
import React from 'react';
import PremiumCard from '../common/PremiumCard';
import { DollarSign, Users, TrendingUp } from 'lucide-react';
import { usePayroll } from '@/hooks/usePayroll';

export const PayrollSummaryCards = () => {
  const { getCurrentPeriodSummary } = usePayroll();
  const summary = getCurrentPeriodSummary();

  const cards = [
    {
      title: "Total Gross Pay",
      value: `$${summary.totalGrossPay.toLocaleString()}`,
      subtitle: "this period",
      icon: DollarSign,
    },
    {
      title: "Total Deductions",
      value: `$${summary.totalDeductions.toLocaleString()}`,
      subtitle: "taxes & benefits",
      icon: TrendingUp,
    },
    {
      title: "Net Payroll",
      value: `$${summary.totalNetPay.toLocaleString()}`,
      subtitle: "to be paid",
      icon: DollarSign,
    },
    {
      title: "Employees",
      value: summary.employeeCount.toString(),
      subtitle: "in payroll",
      icon: Users,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <PremiumCard key={card.title}>
          <div className="flex items-center justify-between pb-1">
            <span className="uppercase text-xs font-bold tracking-wider text-black/60 dark:text-blue-200/60">{card.title}</span>
            <card.icon className="w-5 h-5 text-black dark:text-blue-200" />
          </div>
          <div className="pt-2 pb-1">
            <span className="text-2xl font-bold text-black dark:text-white">{card.value}</span>
          </div>
          {card.subtitle && (
            <div className="text-xs text-black/40 dark:text-blue-300/50">{card.subtitle}</div>
          )}
        </PremiumCard>
      ))}
    </div>
  );
};
