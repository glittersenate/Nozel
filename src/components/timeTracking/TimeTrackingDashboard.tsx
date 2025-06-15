
import React from 'react';
import { AIStatusInsight } from './AIStatusInsight';
import { TimeSummaryCards } from './TimeSummaryCards';
import { DailyTimesheet } from './DailyTimesheet';
import { WeeklyTimeChart } from './WeeklyTimeChart';

export const TimeTrackingDashboard = () => {
  return (
    <div className="space-y-8">
      {/* Top row: 1 AI card + 4 summary cards, all equal width */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <AIStatusInsight />
        {/* We'll create 4 summary card "slots" to fill the grid */}
        <TimeSummaryCards />
      </div>
      {/* Middle: Quick Stats horizontal, dense cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="bg-[#141a2e]/70 border border-blue-800/30 rounded-lg p-6 flex flex-col items-center justify-center min-h-[120px]">
          <div className="text-3xl font-bold text-green-400">37.5</div>
          <div className="text-base text-blue-300">Hours This Week</div>
        </div>
        <div className="bg-[#141a2e]/70 border border-blue-800/30 rounded-lg p-6 flex flex-col items-center justify-center min-h-[120px]">
          <div className="text-3xl font-bold text-orange-400">3</div>
          <div className="text-base text-blue-300">Overtime Hours</div>
        </div>
        <div className="bg-[#141a2e]/70 border border-blue-800/30 rounded-lg p-6 flex flex-col items-center justify-center min-h-[120px]">
          <div className="text-3xl font-bold text-blue-400">7.5</div>
          <div className="text-base text-blue-300">Avg Hours/Day</div>
        </div>
        <div className="bg-[#141a2e]/70 border border-blue-800/30 rounded-lg p-6 flex flex-col items-center justify-center min-h-[120px]">
          <div className="text-3xl font-bold text-purple-400">5</div>
          <div className="text-base text-blue-300">Days Worked</div>
        </div>
      </div>
      {/* Chart full-width */}
      <div className="w-full">
        <WeeklyTimeChart />
      </div>
      {/* Daily table full-width */}
      <DailyTimesheet />
    </div>
  );
};
