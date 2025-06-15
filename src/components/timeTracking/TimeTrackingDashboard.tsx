
import React from 'react';
import { AIStatusInsight } from './AIStatusInsight';
import { TimeSummaryCards } from './TimeSummaryCards';
import { DailyTimesheet } from './DailyTimesheet';
import { WeeklyTimeChart } from './WeeklyTimeChart';

export const TimeTrackingDashboard = () => {
  return (
    <div className="space-y-8">
      {/* Header row: AI Status (1/4) and Summary Cards (3/4) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 flex">
          <AIStatusInsight />
        </div>
        <div className="lg:col-span-3 flex items-stretch">
          <TimeSummaryCards />
        </div>
      </div>
      
      {/* Middle row: Chart (2/3 width) and Quick Stats (1/3 width) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <WeeklyTimeChart />
        </div>
        <div className="lg:col-span-1 flex flex-col justify-stretch">
          <div className="space-y-4 h-full">
            <h3 className="text-lg font-semibold text-white">Quick Stats</h3>
            <div className="grid grid-cols-2 gap-4 h-full">
              <div className="bg-[#141a2e]/60 border border-blue-800/30 rounded-lg p-4 flex flex-col items-center justify-center">
                <div className="text-2xl font-bold text-green-400">37.5</div>
                <div className="text-sm text-blue-300">Hours This Week</div>
              </div>
              <div className="bg-[#141a2e]/60 border border-blue-800/30 rounded-lg p-4 flex flex-col items-center justify-center">
                <div className="text-2xl font-bold text-orange-400">3</div>
                <div className="text-sm text-blue-300">Overtime Hours</div>
              </div>
              <div className="bg-[#141a2e]/60 border border-blue-800/30 rounded-lg p-4 flex flex-col items-center justify-center">
                <div className="text-2xl font-bold text-blue-400">7.5</div>
                <div className="text-sm text-blue-300">Avg Hours/Day</div>
              </div>
              <div className="bg-[#141a2e]/60 border border-blue-800/30 rounded-lg p-4 flex flex-col items-center justify-center">
                <div className="text-2xl font-bold text-purple-400">5</div>
                <div className="text-sm text-blue-300">Days Worked</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-width daily table */}
      <DailyTimesheet />
    </div>
  );
};

