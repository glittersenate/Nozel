
import React from 'react';
import { TimeTrackingDashboard } from '@/components/timeTracking/TimeTrackingDashboard';

export default function TimeTracking() {
  return (
    <div className="min-h-screen" style={{ background: "rgba(20,26,46,0.7)" }}>
      {/* Fully left-aligned: w-full, pl-8, no max-w or centering */}
      <div className="py-10 pl-8 pr-2 w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Time Tracking</h1>
          <p className="text-blue-300">Monitor employee work hours and attendance</p>
        </div>
        <TimeTrackingDashboard />
      </div>
    </div>
  );
}
