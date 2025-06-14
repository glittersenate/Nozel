
import React from 'react';
import { Layout } from "@/components/Layout";
import { TimeTrackingDashboard } from '@/components/timeTracking/TimeTrackingDashboard';

export default function TimeTracking() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
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
