
import React, { useState } from 'react';
import { LeaveBalanceCards } from './LeaveBalanceCards';
import { LeaveRequestsTable } from './LeaveRequestsTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
        // Within last 30 days
        recent.push(req);
      } else {
        past.push(req);
      }
    });
    return { upcoming, recent, past };
  };

  const { upcoming, recent, past } = getSectionedLeaves();

  function handleExport() {
    // Placeholder - implement export logic or connect to real export
    alert("Export Leave Report triggered!");
  }
  function handleBulkApprove() {
    // Placeholder for bulk approve
    alert("Bulk Approve functionality triggered!");
  }
  function handleAddManual() {
    // Placeholder
    alert("Add Manual Leave Entry dialog would appear!");
  }
  function handleViewPolicies() {
    // Placeholder
    alert("Show Leave Policies dialog!");
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-4 items-center justify-between border-b border-blue-900/30 pb-5">
        <div>
          <h2 className="text-2xl font-bold text-white">HR Leave Management</h2>
          <p className="text-blue-300">Approve/decline leaves, manage balances, and analyze time off trends company-wide.</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button onClick={handleExport} className="bg-blue-600 hover:bg-blue-700 text-white" size="sm">
            Export Leave Report
          </Button>
          <Button onClick={handleBulkApprove} className="bg-green-600 hover:bg-green-700 text-white" size="sm">
            Bulk Approve Requests
          </Button>
          <Button onClick={handleAddManual} variant="outline" className="border-purple-400 text-purple-300" size="sm">
            Add Manual Leave Entry
          </Button>
          <Button onClick={handleViewPolicies} variant="secondary" className="bg-gray-800 text-blue-200" size="sm">
            View Leave Policies
          </Button>
        </div>
      </div>
      
      <LeaveBalanceCards />

      {/* Sorting controls */}
      <Card className="bg-[#141a2e]/80 border border-blue-800/30 mt-8">
        <CardHeader>
          <CardTitle className="text-xl text-white">Leave Requests Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-blue-300">Sort by:</span>
            <Button
              variant={sortBy === 'startDate' ? "default" : "outline"}
              size="sm"
              className="text-xs"
              onClick={() => setSortBy('startDate')}
            >
              Start Date
            </Button>
            <Button
              variant={sortBy === 'status' ? "default" : "outline"}
              size="sm"
              className="text-xs"
              onClick={() => setSortBy('status')}
            >
              Status
            </Button>
            <Button
              variant={sortBy === 'endDate' ? "default" : "outline"}
              size="sm"
              className="text-xs"
              onClick={() => setSortBy('endDate')}
            >
              End Date
            </Button>
            <Button
              variant={sortDir === 'asc' ? "default" : "outline"}
              size="sm"
              className="ml-4 text-xs"
              onClick={() => setSortDir(sortDir === 'asc' ? 'desc' : 'asc')}
            >
              {sortDir === 'asc' ? 'Ascending' : 'Descending'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Leaves */}
      <LeaveRequestsTable
        title="Upcoming Leaves"
        requests={upcoming}
        sortBy={sortBy}
        sortDir={sortDir}
        showActions
      />

      {/* Recent Leaves */}
      <LeaveRequestsTable
        title="Recent Leaves"
        requests={recent}
        sortBy={sortBy}
        sortDir={sortDir}
        showActions
      />
      {/* Past Leaves */}
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

