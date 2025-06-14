
import React from 'react';
import { LeaveBalanceCards } from './LeaveBalanceCards';
import { LeaveRequestsTable } from './LeaveRequestsTable';
import { LeaveCalendar } from './LeaveCalendar';
import { RequestLeaveDialog } from './RequestLeaveDialog';

export const LeaveDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Leave Management</h2>
          <p className="text-blue-300">Manage time off requests and leave balances</p>
        </div>
        <RequestLeaveDialog />
      </div>
      
      <LeaveBalanceCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LeaveCalendar />
        <LeaveRequestsTable />
      </div>
    </div>
  );
};
