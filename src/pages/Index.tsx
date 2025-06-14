
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
          {/* Header Section with Enhanced Payroll Button */}
          <div className="mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
                HR Dashboard
              </h1>
              <p className="text-blue-300 text-lg">Welcome back! Here's what's happening with your organization today.</p>
            </div>
            
            {/* Premium Payroll Button */}
            <div className="relative group">
              {/* Animated background glow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 rounded-3xl blur-xl opacity-60 group-hover:opacity-90 animate-pulse-glow transition-all duration-500" />
              
              {/* Main button container */}
              <div className="relative glass-dark rounded-3xl p-1 border border-emerald-400/30 shadow-2xl">
                <Button
                  onClick={handleRunPayroll}
                  size="lg"
                  className="relative w-full bg-gradient-to-r from-emerald-600 via-green-600 to-blue-600 hover:from-emerald-500 hover:via-green-500 hover:to-blue-500 text-white font-bold rounded-3xl px-8 py-6 shadow-2xl transform transition-all duration-300 hover:scale-105 group-hover:shadow-emerald-500/30 border-0"
                >
                  {/* Button content */}
                  <div className="flex items-center gap-4">
                    {/* Animated icon container */}
                    <div className="relative">
                      <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30">
                        <Zap className="w-7 h-7 text-white group-hover:rotate-12 transition-transform duration-300" />
                      </div>
                      {/* Pulse effect */}
                      <div className="absolute inset-0 w-12 h-12 bg-white/10 rounded-2xl animate-ping opacity-75" />
                    </div>
                    
                    {/* Text content */}
                    <div className="text-left">
                      <div className="text-xl font-bold tracking-tight">Process Payroll</div>
                      <div className="text-sm opacity-90 flex items-center gap-3 mt-1">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{activeEmployees.length} employees</span>
                        </div>
                        <div className="w-1 h-1 bg-white/60 rounded-full" />
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          <span>${totalPayroll.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Arrow indicator */}
                    <div className="ml-2">
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 rounded-3xl" />
                </Button>
              </div>
              
              {/* Status indicator */}
              <div className="absolute -top-2 -right-2">
                <div className="flex items-center gap-1 bg-green-500/20 backdrop-blur-sm border border-green-400/40 rounded-full px-3 py-1">
                  <CheckCircle2 className="w-3 h-3 text-green-400" />
                  <span className="text-xs text-green-300 font-medium">Ready</span>
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
