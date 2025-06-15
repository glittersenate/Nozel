
import React from "react";
import FlightRiskPredictor from "./FlightRiskPredictor";
import PerformanceTrajectoryAnalysis from "./PerformanceTrajectoryAnalysis";
import CompensationIntelligence from "./CompensationIntelligence";
import TeamChemistryAnalysis from "./TeamChemistryAnalysis";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TalentPipelineInsights from "./TalentPipelineInsights";
import CompensationOptimizer from "./CompensationOptimizer";
import WellnessDashboard from "./WellnessDashboard";
import ComplianceMonitor from "./ComplianceMonitor";
import WorkforcePlanningPredictor from "./WorkforcePlanningPredictor";
import PerformanceAnalyticsHub from "./PerformanceAnalyticsHub";
import RealTimeBIHub from "./RealTimeBIHub";
import CrisisManagementDashboard from "./CrisisManagementDashboard";
import StrategicPlanningModule from "./StrategicPlanningModule";
import ROICalculator from "./ROICalculator";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

const ExecutiveCommandCenter: React.FC = () => {
  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen bg-gradient-to-br from-slate-950 via-blue-950/50 to-slate-950">
        {/* Sidebar is rendered here for desktop/mobile */}
        <AppSidebar />
        {/* Main area */}
        <div className="flex-1 flex flex-col">
          {/* Top bar with sidebar trigger and branding */}
          <div className="flex h-16 items-center justify-between px-2 md:px-6 glass-dark border-b border-blue-500/20 backdrop-blur-xl">
            <div className="flex items-center gap-3 xs:gap-4">
              {/* Hamburger */}
              <SidebarTrigger
                className="text-white bg-transparent hover:bg-blue-500/20 hover:text-blue-300 rounded-xl p-2 transition-all duration-200 w-10 h-10 flex items-center justify-center"
                style={{ fontSize: 24 }}
              />
              <div className="h-6 w-px bg-blue-500/30" />
              {/* Branding block */}
              <div className="flex items-center gap-3 animate-slide-in-right">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-glow animate-pulse-glow">
                    <span className="text-white font-bold text-sm font-heading">N</span>
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl opacity-30 blur animate-pulse" />
                </div>
                <div className="flex flex-col justify-center h-11">
                  <h1
                    className="text-lg sm:text-xl font-bold font-heading bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent leading-snug"
                    style={{ lineHeight: '1.2', marginBottom: '0.14em' }}
                  >
                    NozelPay
                  </h1>
                  <p
                    className="text-xs sm:text-sm text-blue-300/80 font-medium leading-tight"
                    style={{ lineHeight: '1.1' }}
                  >
                    HR Management System
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="container mx-auto py-8 flex-1">
            <Card className="bg-gradient-to-tr from-blue-900/80 to-blue-700/60 border-blue-800/40 mb-8 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl md:text-3xl font-bold text-white">
                  Executive Command Center
                </CardTitle>
                <p className="text-blue-300 mt-1">AI-powered insights for strategic HR decisions</p>
              </CardHeader>
              <CardContent>
                <div className="text-white text-lg mb-2">
                  Welcome to the Executive Command Center. Here you'll find advanced AI-driven analytics and actionable talent insights to steer your organization.
                </div>
              </CardContent>
            </Card>

            <div className="mb-8">
              <div className="text-white text-xl font-bold mb-2">Phase 1: AI-Powered Predictive Dashboard</div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                <FlightRiskPredictor />
                <PerformanceTrajectoryAnalysis />
                <CompensationIntelligence />
                <TeamChemistryAnalysis />
              </div>
            </div>

            <div className="mb-8">
              <div className="text-white text-xl font-bold mb-2">Phase 2: Executive Command Center (BI & Crisis)</div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                <RealTimeBIHub />
                <CrisisManagementDashboard />
                <StrategicPlanningModule />
                <ROICalculator />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-10">
              <TalentPipelineInsights />
              <CompensationOptimizer />
              <WellnessDashboard />
              <ComplianceMonitor />
              <WorkforcePlanningPredictor />
              <PerformanceAnalyticsHub />
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ExecutiveCommandCenter;
