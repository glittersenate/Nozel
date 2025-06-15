
import React from 'react';
import { Layout } from "@/components/Layout";
import { PerformanceDashboard } from '@/components/performance/PerformanceDashboard';

export default function Performance() {
  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto py-10">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Performance Management</h1>
            <p className="text-muted-foreground">Track employee performance and manage reviews</p>
          </div>
          <PerformanceDashboard />
        </div>
      </div>
    </Layout>
  );
}
