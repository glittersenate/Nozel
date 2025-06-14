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

const ExecutiveCommandCenter: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
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
  );
};

export default ExecutiveCommandCenter;
