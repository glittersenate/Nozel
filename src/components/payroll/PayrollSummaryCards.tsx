
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Users, Calendar, TrendingUp } from 'lucide-react';
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
      color: "bg-green-500",
    },
    {
      title: "Total Deductions",
      value: `$${summary.totalDeductions.toLocaleString()}`,
      subtitle: "taxes & benefits",
      icon: TrendingUp,
      color: "bg-red-500",
    },
    {
      title: "Net Payroll",
      value: `$${summary.totalNetPay.toLocaleString()}`,
      subtitle: "to be paid",
      icon: DollarSign,
      color: "bg-blue-500",
    },
    {
      title: "Employees",
      value: summary.employeeCount.toString(),
      subtitle: "in payroll",
      icon: Users,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <Card key={card.title} className="bg-white dark:bg-[#141a2e]/80 border border-blue-800/30 text-black dark:text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-800 dark:text-blue-300">
              {card.title}
            </CardTitle>
            <card.icon className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black dark:text-white mb-1">
              {card.value}
            </div>
            <p className="text-xs text-slate-700 dark:text-blue-300/70">
              {card.subtitle}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
