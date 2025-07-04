
import React from 'react';
import { PayrollSummaryCards } from './PayrollSummaryCards';
import { PayrollTable } from './PayrollTable';
import { PayrollChart } from './PayrollChart';
import { PayrollScheduler } from './PayrollScheduler';
import { ScheduleStatusCard } from './ScheduleStatusCard';

export const PayrollDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">Payroll Management</h2>
            <p className="text-blue-300">Process payroll and manage employee compensation</p>
          </div>
          <PayrollScheduler />
        </div>
        <ScheduleStatusCard />
      </div>
      
      <PayrollSummaryCards />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PayrollChart />
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
          <div className="bg-[#141a2e]/60 border border-blue-800/30 rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-blue-300">March 2024 Payroll</span>
              <span className="text-green-400 text-sm">Completed</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-blue-300">February 2024 Payroll</span>
              <span className="text-green-400 text-sm">Paid</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-blue-300">January 2024 Payroll</span>
              <span className="text-green-400 text-sm">Paid</span>
            </div>
          </div>
        </div>
      </div>
      <PayrollTable />
    </div>
  );
};

