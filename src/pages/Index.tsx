
import React from 'react';
import { EnhancedStatsCards } from '@/components/dashboard/EnhancedStatsCards';
import { SalaryChart } from '@/components/dashboard/SalaryChart';
import { DepartmentChart } from '@/components/dashboard/DepartmentChart';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { PredictiveInsights } from '@/components/dashboard/PredictiveInsights';
import { LiveActivityFeed } from '@/components/dashboard/LiveActivityFeed';
import { RealTimeMetrics } from '@/components/dashboard/RealTimeMetrics';

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">HR Dashboard</h1>
          <p className="text-muted-foreground">Welcome to your comprehensive HR management system</p>
        </div>

        <div className="space-y-8">
          <EnhancedStatsCards />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SalaryChart />
            <DepartmentChart />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RecentActivity />
            </div>
            <div className="space-y-6">
              <PredictiveInsights />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LiveActivityFeed />
            <RealTimeMetrics />
          </div>
        </div>
      </div>
    </div>
  );
}
