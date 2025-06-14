
import React from 'react';
import { PerformanceMetricsCards } from './PerformanceMetricsCards';
import { PerformanceReviewsTable } from './PerformanceReviewsTable';
import { GoalsProgress } from './GoalsProgress';
import { CreateReviewDialog } from './CreateReviewDialog';

export const PerformanceDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Performance Management</h2>
          <p className="text-blue-300">Track employee performance and manage reviews</p>
        </div>
        <CreateReviewDialog />
      </div>
      
      <PerformanceMetricsCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GoalsProgress />
        <PerformanceReviewsTable />
      </div>
    </div>
  );
};
