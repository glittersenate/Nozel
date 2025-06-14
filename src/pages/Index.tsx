
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
import { Play, DollarSign, Users, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const { employees } = useEmployees();
  const { metrics, isLive, toggleLiveMode } = useRealTimeData(employees);
  const navigate = useNavigate();

  const activeEmployees = employees.filter(emp => emp.status === 'active');
  const totalPayroll = activeEmployees.reduce((sum, emp) => sum + emp.salary, 0);
  const totalBonuses = 6750; // Mock bonuses data

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
            
            {/* Clean Payroll Card */}
            <Card className="bg-gradient-to-br from-slate-800/50 to-blue-900/30 border border-blue-500/20 backdrop-blur-xl max-w-md">
              <CardContent className="p-6">
                {/* Pay Period */}
                <div className="mb-6">
                  <p className="text-blue-300/70 text-sm mb-2">Pay Period</p>
                  <div className="flex items-center gap-2 text-white">
                    <Calendar className="w-4 h-4 text-blue-400" />
                    <span className="font-medium">Feb 1 - Feb 29, 2024</span>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{activeEmployees.length}</div>
                    <div className="text-xs text-blue-300/70">Employees</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">${totalPayroll.toLocaleString()}</div>
                    <div className="text-xs text-blue-300/70">Total Cost</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">${totalBonuses.toLocaleString()}</div>
                    <div className="text-xs text-blue-300/70">Bonuses</div>
                  </div>
                </div>

                {/* Run Payroll Button */}
                <Button
                  onClick={handleRunPayroll}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-4 rounded-2xl text-lg tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-xl border-0"
                >
                  <Play className="w-5 h-5 mr-2" />
                  RUN PAYROLL
                </Button>
              </CardContent>
            </Card>
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
