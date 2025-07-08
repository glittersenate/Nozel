
import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import EnhancedStatsCards from "@/components/dashboard/EnhancedStatsCards";
import RealTimeMetrics from "@/components/dashboard/RealTimeMetrics";
import LiveActivityFeed from "@/components/dashboard/LiveActivityFeed";
import DepartmentChart from "@/components/dashboard/DepartmentChart";
import SalaryChart from "@/components/dashboard/SalaryChart";
import { AIInsightsModule } from "@/components/dashboard/AIInsightsModule";
import { RealTimeStatusIndicators } from "@/components/dashboard/RealTimeStatusIndicators";
import { InteractivePayrollChart } from "@/components/dashboard/InteractivePayrollChart";
import { PredictiveInsights } from "@/components/dashboard/PredictiveInsights";
import { useEmployees } from "@/hooks/useEmployees";
import { useRealTimeData } from "@/hooks/useRealTimeData";
import { Button } from "@/components/ui/button";
import { Play, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import EmployeePortal from "./EmployeePortal";

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
    <div className="min-h-screen w-full flex bg-background">
      <div className="container mx-auto py-5">
        {/* Header Section */}
        <div className="mb-4 flex flex-col gap-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between">
            <div>
              <h1 className="text-[2rem] sm:text-4xl font-extrabold text-foreground mb-1 bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent leading-tight tracking-tight">
                HR Dashboard
              </h1>
              <p className="text-muted-foreground text-base sm:text-lg opacity-80">
                Welcome back! Here's what's happening with your organization today.
              </p>
            </div>
          </div>

          {/* Premium Payroll Summary Card */}
          <div className="w-full">
            <Card
              className="w-full border-0 shadow-lg rounded-2xl p-0"
              style={{
                boxShadow: "0 6px 32px 0 rgba(0,20,66,0.15), 0 2px 24px 0 #427DFF1a",
                background:
                  "linear-gradient(115deg,rgba(31,42,70,0.98) 65%,rgba(32,55,116,0.94) 100%)",
                border: "1px solid rgba(87,120,255,0.06)"
              }}
            >
              <CardContent className="!p-0">
                <div className="flex items-center px-5 py-4 gap-4 flex-wrap justify-between">
                  <div className="flex flex-col gap-1 flex-1 min-w-0">
                    <span className="text-xs sm:text-sm uppercase tracking-wide font-bold text-blue-100/70 whitespace-nowrap">
                      Pay Period
                    </span>
                    <div className="flex items-center gap-1 text-white text-[15px] sm:text-base font-semibold whitespace-nowrap">
                      <Calendar className="w-4 h-4 text-blue-300 mr-1" />
                      <span>Feb 1 - Feb 29, 2024</span>
                    </div>
                  </div>
                  <Button
                    onClick={handleRunPayroll}
                    className="bg-gradient-to-br from-blue-700 to-blue-500 hover:from-blue-500 hover:to-blue-500 text-white font-bold px-0 py-3 rounded-xl h-11 w-11 shrink-0 shadow-md border-0 flex items-center justify-center ring-1 ring-blue-600/60"
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
                    <div className="text-lg font-bold text-white">{activeEmployees.length}</div>
                    <div className="text-xs text-blue-200 font-medium">Employees</div>
                  </div>
                  <div className="text-center flex-1 min-w-[120px]">
                    <div className="text-lg font-bold text-white">${totalPayroll.toLocaleString()}</div>
                    <div className="text-xs text-blue-200 font-medium">Total Cost</div>
                  </div>
                  <div className="text-center flex-1 min-w-[84px]">
                    <div className="text-lg font-bold text-white">${totalBonuses.toLocaleString()}</div>
                    <div className="text-xs text-blue-200 font-medium">Bonuses</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <EnhancedStatsCards employees={employees} />

        <div className="space-y-7">
          <RealTimeMetrics metrics={metrics} />

          {/* Oracle View - Predictive Insights */}
          <PredictiveInsights employees={employees} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <LiveActivityFeed activities={metrics.activityFeed} />
            </div>
            <RealTimeStatusIndicators />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <InteractivePayrollChart />
            <AIInsightsModule employees={employees} isLive={false} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DepartmentChart employees={employees} />
            <SalaryChart employees={employees} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
