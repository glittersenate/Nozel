import React from 'react';
import { Layout } from "@/components/Layout";
import { TimeTrackingDashboard } from '@/components/timeTracking/TimeTrackingDashboard';

export default function TimeTracking() {
  return (
    <Layout>
      <div
        className="min-h-screen"
        style={{
          background: "rgba(20,26,46,0.7)",
        }}
      >
        <div className="container mx-auto py-10">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Time Tracking</h1>
            <p className="text-blue-300">Monitor employee work hours and attendance</p>
          </div>
          
          <TimeTrackingDashboard />
        </div>
      </div>
    </Layout>
  );
}
