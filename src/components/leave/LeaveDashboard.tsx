
import React, { useState } from 'react';
import { LeaveRequestsTable } from './LeaveRequestsTable';
import { LeaveActionsToolbar } from './LeaveActionsToolbar';
import { LeaveSortingControls } from './LeaveSortingControls';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLeave } from '@/hooks/useLeave';

export const LeaveDashboard = () => {
  const { leaveRequests } = useLeave();
  const [sortBy, setSortBy] = useState<'startDate' | 'endDate' | 'status'>('startDate');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const getSectionedLeaves = () => {
    const today = new Date();
    const upcoming: typeof leaveRequests = [];
    const recent: typeof leaveRequests = [];
    const past: typeof leaveRequests = [];
    
    leaveRequests.forEach((req) => {
      const start = new Date(req.startDate);
      const end = new Date(req.endDate);
      if (start > today) {
        upcoming.push(req);
      } else if (end >= new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30)) {
        recent.push(req);
      } else {
        past.push(req);
      }
    });
    return { upcoming, recent, past };
  };

  const { upcoming, recent, past } = getSectionedLeaves();

  const handleExport = () => {
    alert("Export Leave Report triggered!");
  };

  const handleBulkApprove = () => {
    alert("Bulk Approve functionality triggered!");
  };

  const handleAddManual = () => {
    alert("Add Manual Leave Entry dialog would appear!");
  };

  const handleViewPolicies = () => {
    alert("Show Leave Policies dialog!");
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-4 items-center justify-between border-b border-blue-900/30 pb-5">
        <div>
          <h2 className="text-2xl font-bold text-white">HR Leave Management</h2>
          <p className="text-blue-300">Approve/decline leaves, manage balances, and analyze time off trends company-wide.</p>
        </div>
        <LeaveActionsToolbar
          onExport={handleExport}
          onBulkApprove={handleBulkApprove}
          onAddManual={handleAddManual}
          onViewPolicies={handleViewPolicies}
        />
      </div>

      <Card className="bg-[#141a2e]/80 border border-blue-800/30 mt-8">
        <CardHeader>
          <CardTitle className="text-xl text-white">Leave Requests Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <LeaveSortingControls
            sortBy={sortBy}
            sortDir={sortDir}
            onSortByChange={setSortBy}
            onSortDirChange={setSortDir}
          />
        </CardContent>
      </Card>

      <LeaveRequestsTable
        title="Upcoming Leaves"
        requests={upcoming}
        sortBy={sortBy}
        sortDir={sortDir}
        showActions
      />

      <LeaveRequestsTable
        title="Recent Leaves"
        requests={recent}
        sortBy={sortBy}
        sortDir={sortDir}
        showActions
      />

      <LeaveRequestsTable
        title="Past Leaves"
        requests={past}
        sortBy={sortBy}
        sortDir={sortDir}
        showActions={false}
      />
    </div>
  );
};
