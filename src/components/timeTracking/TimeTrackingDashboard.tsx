
import React from 'react';
import { AIStatusInsight } from './AIStatusInsight';
import { TimeSummaryCards } from './TimeSummaryCards';
import { DailyTimesheet } from './DailyTimesheet';
import { WeeklyTimeChart } from './WeeklyTimeChart';

export const TimeTrackingDashboard = () => {
  return (
    <div className="w-full px-1 sm:px-4 md:px-8 space-y-8">
      {/* Responsive row: On mobile, stack; on md+, AI card and summary cards in a row */}
      <div className="grid md:grid-cols-[1fr,auto] grid-cols-1 gap-4 md:gap-6 items-stretch">
        {/* AI card always at the start */}
        <AIStatusInsight />
        {/* Summary cards - horizontal scroll on mobile */}
        <div className="md:flex md:flex-col">
          <div className="flex md:grid md:grid-cols-4 gap-4 overflow-x-auto md:overflow-visible pb-2 md:pb-0 -mx-2 md:mx-0 px-2 md:px-0">
            {/* Fix: TimeSummaryCards renders all cards horizontally in mobile */}
            <TimeSummaryCards />
          </div>
        </div>
      </div>

      {/* Chart and Timesheet should be left-aligned and full width */}
      <div className="bg-[#141a2e]/80 border border-blue-800/30 rounded-lg p-4 w-full">
        <WeeklyTimeChart />
      </div>
      <div>
        <DailyTimesheet />
      </div>
    </div>
  );
};
