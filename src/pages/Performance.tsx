
import React from 'react';
import { PerformanceDashboard } from '@/components/performance/PerformanceDashboard';

export default function Performance() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Performance Management</h1>
          <p className="text-blue-300">Track employee performance and manage reviews</p>
        </div>
        
        <PerformanceDashboard />
      </div>
    </div>
  );
}
