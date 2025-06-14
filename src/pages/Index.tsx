
import React from "react";
import { Layout } from "@/components/Layout";
import EnhancedStatsCards from "@/components/dashboard/EnhancedStatsCards";
import RealTimeMetrics from "@/components/dashboard/RealTimeMetrics";
import LiveActivityFeed from "@/components/dashboard/LiveActivityFeed";
import DepartmentChart from "@/components/dashboard/DepartmentChart";
import SalaryChart from "@/components/dashboard/SalaryChart";
import { AIInsightsModule } from "@/components/dashboard/AIInsightsModule";
import { useEmployees } from "@/hooks/useEmployees";
import { useRealTimeData } from "@/hooks/useRealTimeData";
import { Button } from "@/components/ui/button";
import { Play, DollarSign, Users, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { employees } = useEmployees();
  const { metrics, isLive, toggleLiveMode } = useRealTimeData(employees);
  const navigate = useNavigate();

  const activeEmployees = employees.filter(emp => emp.status === 'active');
  const totalPayroll = activeEmployees.reduce((sum, emp) => sum + emp.salary, 0);

  const handleRunPayroll = () => {
    navigate('/payroll');
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="container mx-auto py-10">
          {/* Header Section */}
          <div className="mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
                HR Dashboard
              </h1>
              <p className="text-blue-300 text-lg">Welcome back! Here's what's happening with your organization today.</p>
            </div>
            
            {/* Enhanced Payroll Button */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-600 via-emerald-600 to-blue-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse" />
              <Button
                onClick={handleRunPayroll}
                size="lg"
                className="relative bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105 group-hover:shadow-green-500/25"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Zap className="w-6 h-6" />
                    <div className="absolute inset-0 animate-ping">
                      <Zap className="w-6 h-6 opacity-75" />
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="text-lg font-bold">Process Payroll</div>
                    <div className="text-sm opacity-90 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {activeEmployees.length} employees
                      <DollarSign className="w-4 h-4 ml-2" />
                      ${totalPayroll.toLocaleString()}
                    </div>
                  </div>
                </div>
              </Button>
            </div>
          </div>
          
          <div className="space-y-8">
            <EnhancedStatsCards employees={employees} />
            <RealTimeMetrics 
              metrics={metrics} 
              isLive={isLive} 
              onToggleLive={toggleLiveMode} 
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <LiveActivityFeed 
                activities={metrics.activityFeed} 
                isLive={isLive} 
              />
              <AIInsightsModule employees={employees} isLive={isLive} />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <DepartmentChart employees={employees} />
              <SalaryChart employees={employees} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
