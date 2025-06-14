
import React from "react";
import FlightRiskPredictor from "./FlightRiskPredictor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FlightRiskPredictor />
        {/* Future widgets (TalentPipeline, CompensationOptimizer, etc) can go here */}
        <div className="rounded-2xl shadow bg-[#172142]/50 border border-purple-700/40 flex flex-col justify-center items-center min-h-[300px]">
          <span className="text-blue-200 opacity-70">More executive intelligence coming soon…</span>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveCommandCenter;
