
import React from "react";
import { Layout } from "@/components/Layout";
import EnhancedStatsCards from "@/components/dashboard/EnhancedStatsCards";
import RealTimeMetrics from "@/components/dashboard/RealTimeMetrics";
import LiveActivityFeed from "@/components/dashboard/LiveActivityFeed";
import DepartmentChart from "@/components/dashboard/DepartmentChart";
import SalaryChart from "@/components/dashboard/SalaryChart";
import { AIInsightsModule } from "@/components/dashboard/AIInsightsModule";
import AnimatedPayrollButton from "@/components/dashboard/AnimatedPayrollButton";
import { useEmployees } from "@/hooks/useEmployees";
import { useRealTimeData } from "@/hooks/useRealTimeData";

const Index = () => {
  const { employees } = useEmployees();
  const { metrics, isLive, toggleLiveMode } = useRealTimeData(employees);

  const activeEmployees = employees.filter(emp => emp.status === 'active');
  const totalPayroll = activeEmployees.reduce((sum, emp) => sum + emp.salary, 0);

  const handleRunPayroll = () => {
    console.log('Running payroll for', activeEmployees.length, 'employees');
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="container mx-auto py-10">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">HR Dashboard</h1>
            <p className="text-blue-300">Welcome back! Here's what's happening with your organization today.</p>
          </div>
          
          <div className="space-y-6">
            <EnhancedStatsCards employees={employees} />
            <RealTimeMetrics 
              metrics={metrics} 
              isLive={isLive} 
              onToggleLive={toggleLiveMode} 
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <LiveActivityFeed 
                activities={metrics.activityFeed} 
                isLive={isLive} 
              />
              <AIInsightsModule employees={employees} isLive={isLive} />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DepartmentChart employees={employees} />
              <SalaryChart employees={employees} />
            </div>
            
            <div className="flex justify-center">
              <AnimatedPayrollButton 
                totalPayroll={totalPayroll}
                activeEmployees={activeEmployees.length}
                onRunPayroll={handleRunPayroll}
                canRunPayroll={true}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
