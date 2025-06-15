
import React from 'react';
import { AIStatusInsight } from './AIStatusInsight';
import { TimeSummaryCards } from './TimeSummaryCards';
import { DailyTimesheet } from './DailyTimesheet';
import { WeeklyTimeChart } from './WeeklyTimeChart';

export const TimeTrackingDashboard = () => {
  return (
    <div className="w-full space-y-8 px-2 sm:px-6">
      {/* Force left-aligned: no centering */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start w-full">
        <AIStatusInsight />
        <div className="flex flex-col justify-between w-full">
          <TimeSummaryCards />
        </div>
      </div>
      {/* Chart: left-aligned under cards */}
      <div className="w-full">
        <div className="bg-[#141a2e]/80 border border-blue-800/30 rounded-lg p-4 w-full">
          <WeeklyTimeChart />
        </div>
      </div>
      {/* Daily table: left-aligned */}
      <div className="w-full">
        <DailyTimesheet />
      </div>
    </div>
  );
};
