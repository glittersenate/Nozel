
import React from 'react';
import { Layout } from "@/components/Layout";
import { PerformanceDashboard } from '@/components/performance/PerformanceDashboard';

export default function Performance() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-[#171d37] via-[#182249]/85 to-[#181f36]">
        <div className="container mx-auto py-10">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Performance Management</h1>
            <p className="text-blue-300">Track employee performance and manage reviews</p>
          </div>
          
          <PerformanceDashboard />
        </div>
      </div>
    </Layout>
  );
}
