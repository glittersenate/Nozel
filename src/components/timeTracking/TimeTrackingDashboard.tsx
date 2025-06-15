
import React from 'react';
import { AIStatusInsight } from './AIStatusInsight';
import { TimeSummaryCards } from './TimeSummaryCards';
import { DailyTimesheet } from './DailyTimesheet';
import { WeeklyTimeChart } from './WeeklyTimeChart';

export const TimeTrackingDashboard = () => {
  return (
    <div className="max-w-4xl mx-auto w-full space-y-8 px-2 sm:px-6">
      {/* Cozy 2-column layout: AI insight + summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        <AIStatusInsight />
        <div className="flex flex-col justify-between">
          <TimeSummaryCards />
        </div>
      </div>
      {/* Chart: subtle cozy card */}
      <div className="bg-[#141a2e]/80 border border-blue-800/30 rounded-lg p-4">
        <WeeklyTimeChart />
      </div>
      {/* Daily table: small margin, comfy look */}
      <div>
        <DailyTimesheet />
      </div>
    </div>
  );
};
