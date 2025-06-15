import React, { useState, useEffect } from 'react';
import { PerformanceMetricsCards } from './PerformanceMetricsCards';
import { PerformanceReviewsTable } from './PerformanceReviewsTable';
import { GoalsProgress } from './GoalsProgress';
import { CreateReviewDialog } from './CreateReviewDialog';
import { MetricsCardsSkeleton, GoalsProgressSkeleton, ReviewsTableSkeleton } from './PerformanceSkeletons';
import { PerformanceProvider } from '@/contexts/PerformanceContext';

export const PerformanceDashboard = () => {
  // Simulate loading state for progressive enhancement
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <PerformanceProvider>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">Performance Management</h2>
            <p className="text-blue-300">Track employee performance and manage reviews</p>
          </div>
          <CreateReviewDialog />
        </div>

        {loading ? <MetricsCardsSkeleton /> : <PerformanceMetricsCards />}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {loading ? <GoalsProgressSkeleton /> : <GoalsProgress />}
          {loading ? <ReviewsTableSkeleton /> : <PerformanceReviewsTable />}
        </div>
      </div>
    </PerformanceProvider>
  );
};
