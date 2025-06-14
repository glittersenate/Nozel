
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
import { Play, DollarSign, Users, Zap, ArrowRight, CheckCircle2 } from "lucide-react";
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
          {/* Header Section with Compact Payroll Button */}
          <div className="mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
                HR Dashboard
              </h1>
              <p className="text-blue-300 text-lg">Welcome back! Here's what's happening with your organization today.</p>
            </div>
            
            {/* Compact Premium Payroll Button */}
            <div className="relative group">
              {/* Subtle glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl blur-md opacity-40 group-hover:opacity-70 transition-all duration-300" />
              
              <Button
                onClick={handleRunPayroll}
                className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-500 hover:via-purple-500 hover:to-indigo-500 text-white font-semibold rounded-2xl px-6 py-3 h-auto shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border-0 group"
              >
                <div className="flex items-center gap-3">
                  {/* Icon with subtle animation */}
                  <div className="w-8 h-8 bg-white/15 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <Play className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  
                  {/* Text content - more compact */}
                  <div className="text-left">
                    <div className="text-base font-bold">Process Payroll</div>
                    <div className="text-xs opacity-80 flex items-center gap-2">
                      <span>{activeEmployees.length} employees</span>
                      <span>•</span>
                      <span>${(totalPayroll/1000).toFixed(0)}k</span>
                    </div>
                  </div>
                  
                  {/* Arrow with hover effect */}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 opacity-70 group-hover:opacity-100" />
                </div>
                
                {/* Subtle shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 rounded-2xl" />
              </Button>
              
              {/* Compact status indicator */}
              <div className="absolute -top-1 -right-1">
                <div className="flex items-center gap-1 bg-emerald-500/90 backdrop-blur-sm rounded-full px-2 py-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  <span className="text-xs text-white font-medium">Ready</span>
                </div>
              </div>
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
