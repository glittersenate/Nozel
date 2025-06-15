
import React from 'react';
import { AIStatusInsight } from './AIStatusInsight';
import { TimeSummaryCards } from './TimeSummaryCards';
import { DailyTimesheet } from './DailyTimesheet';
import { WeeklyTimeChart } from './WeeklyTimeChart';

export const TimeTrackingDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <AIStatusInsight />
        </div>
        <div className="lg:col-span-2">
          <TimeSummaryCards />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WeeklyTimeChart />
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Quick Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#141a2e]/60 border border-blue-800/30 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-400">37.5</div>
              <div className="text-sm text-blue-300">Hours This Week</div>
            </div>
            <div className="bg-[#141a2e]/60 border border-blue-800/30 rounded-lg p-4">
              <div className="text-2xl font-bold text-orange-400">3</div>
              <div className="text-sm text-blue-300">Overtime Hours</div>
            </div>
            <div className="bg-[#141a2e]/60 border border-blue-800/30 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-400">7.5</div>
              <div className="text-sm text-blue-300">Avg Hours/Day</div>
            </div>
            <div className="bg-[#141a2e]/60 border border-blue-800/30 rounded-lg p-4">
              <div className="text-2xl font-bold text-purple-400">5</div>
              <div className="text-sm text-blue-300">Days Worked</div>
            </div>
          </div>
        </div>
      </div>

      <DailyTimesheet />
    </div>
  );
};

