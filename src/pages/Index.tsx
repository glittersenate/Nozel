
import React from "react";
import { Layout } from "@/components/Layout";
import { EnhancedStatsCards } from "@/components/dashboard/EnhancedStatsCards";
import { RealTimeMetrics } from "@/components/dashboard/RealTimeMetrics";
import { LiveActivityFeed } from "@/components/dashboard/LiveActivityFeed";
import { DepartmentChart } from "@/components/dashboard/DepartmentChart";
import { SalaryChart } from "@/components/dashboard/SalaryChart";
import { AIInsightsModule } from "@/components/dashboard/AIInsightsModule";
import { AnimatedPayrollButton } from "@/components/dashboard/AnimatedPayrollButton";

const Index = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="container mx-auto py-10">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">HR Dashboard</h1>
            <p className="text-blue-300">Welcome back! Here's what's happening with your organization today.</p>
          </div>
          
          <div className="space-y-6">
            <EnhancedStatsCards />
            <RealTimeMetrics />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <LiveActivityFeed />
              <AIInsightsModule />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DepartmentChart />
              <SalaryChart />
            </div>
            
            <div className="flex justify-center">
              <AnimatedPayrollButton />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
