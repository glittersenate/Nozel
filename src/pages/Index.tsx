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
import { useAuth } from "@/contexts/AuthContext";
import EmployeePortal from "./EmployeePortal";
import { cn } from "@/lib/utils";

const Index = () => {
  const { employees } = useEmployees();
  const { metrics } = useRealTimeData(employees);
  const navigate = useNavigate();
  const { user } = useAuth();

  // If the current user is an employee, show Employee Portal
  if (user && user.role === "employee") {
    return <EmployeePortal />;
  }

  const activeEmployees = employees.filter(emp => emp.status === 'active');
  const totalPayroll = activeEmployees.reduce((sum, emp) => sum + emp.salary, 0);
  const totalBonuses = 6750; // Mock bonuses data

  const handleRunPayroll = () => {
    navigate('/payroll');
  };

  return (
    <Layout>
      <div
        className="min-h-screen w-full flex"
      >
        <div className="container mx-auto py-5">
          {/* Header Section */}
          <div className="mb-4 flex flex-col gap-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between">
              <div>
                <h1 className="text-[2rem] sm:text-4xl font-extrabold text-black dark:text-white mb-1 bg-gradient-to-r from-black via-slate-800 to-slate-600 bg-clip-text text-transparent dark:bg-gradient-to-r dark:from-white dark:via-blue-100 dark:to-cyan-200 dark:bg-clip-text dark:text-transparent leading-tight tracking-tight">
                  HR Dashboard
                </h1>
                <p className="text-slate-800 dark:text-blue-200 text-base sm:text-lg opacity-80">
                  Welcome back! Here's what's happening with your organization today.
                </p>
              </div>
            </div>

            {/* Premium Payroll Summary Card */}
            <div className="w-full">
              <div
                className={cn(
                  // LIGHT: white card
                  "w-full bg-white dark:bg-none border-0 shadow-lg rounded-2xl p-0",
                  // DARK: true glass/gradient premium card restore
                  "dark:bg-gradient-to-br dark:from-[#223364]/95 dark:via-[#202649]/94 dark:to-[#18315c]/93",
                  "dark:border dark:border-blue-400/20 dark:shadow-glow-lg",
                  "transition-all duration-300"
                )}
                style={{
                  // sub-shadow on both modes
                  boxShadow:
                    "0 6px 32px 0 rgba(16,26,56,0.19), 0 2px 18px 0 #4f8cff0c",
                  border: "1px solid rgba(87,120,255,0.06)"
                }}
              >
                <CardContent className="!p-0 text-black dark:text-white">
                  <div className="flex items-center px-5 py-4 gap-4 flex-wrap justify-between">
                    <div className="flex flex-col gap-1 flex-1 min-w-0">
                      <span className="text-xs sm:text-sm uppercase tracking-wide font-bold text-slate-800/70 dark:text-blue-100/90 whitespace-nowrap">
                        Pay Period
                      </span>
                      <div className="flex items-center gap-1 text-black dark:text-white text-[15px] sm:text-base font-semibold whitespace-nowrap">
                        <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-300 mr-1" />
                        <span>Feb 1 - Feb 29, 2024</span>
                      </div>
                    </div>
                    <Button
                      onClick={handleRunPayroll}
                      className={cn(
                        "bg-sky-500 hover:bg-sky-600 dark:bg-gradient-to-br dark:from-blue-700 dark:to-blue-500",
                        "text-white font-bold px-0 py-3 rounded-xl h-11 w-11 shrink-0 shadow-md border-0 flex items-center justify-center ring-1 ring-blue-400/60",
                        "transition-all duration-300"
                      )}
                      style={{
                        minWidth: '2.5rem',
                        minHeight: '2.5rem',
                        boxShadow: '0 3px 16px 0 #203e7780,0 1px 5px 0 #8fc1ff40'
                      }}
                    >
                      <Play className="w-5 h-5" />
                    </Button>
                  </div>
                  <div className="flex justify-between items-end gap-4 px-5 pb-4 pt-1 flex-wrap">
                    <div className="text-center flex-1 min-w-[84px]">
                      <div className="text-lg font-bold text-black dark:text-white">{activeEmployees.length}</div>
                      <div className="text-xs text-slate-700 dark:text-blue-200 font-medium">Employees</div>
                    </div>
                    <div className="text-center flex-1 min-w-[120px]">
                      <div className="text-lg font-bold text-black dark:text-white">${totalPayroll.toLocaleString()}</div>
                      <div className="text-xs text-slate-700 dark:text-blue-200 font-medium">Total Cost</div>
                    </div>
                    <div className="text-center flex-1 min-w-[84px]">
                      <div className="text-lg font-bold text-black dark:text-white">${totalBonuses.toLocaleString()}</div>
                      <div className="text-xs text-slate-700 dark:text-blue-200 font-medium">Bonuses</div>
                    </div>
                  </div>
                </CardContent>
              </div>
            </div>
          </div>
          
          {/* Key Metrics Grid */}
          <EnhancedStatsCards employees={employees} />

          <div className="space-y-7">
            <RealTimeMetrics 
              metrics={metrics} 
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <LiveActivityFeed 
                activities={metrics.activityFeed} 
              />
              <AIInsightsModule employees={employees} isLive={false} />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
