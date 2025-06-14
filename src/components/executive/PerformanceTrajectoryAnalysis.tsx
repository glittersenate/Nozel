
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

const PerformanceTrajectoryAnalysis: React.FC = () => (
  <Card className="bg-gradient-to-tr from-purple-900/80 to-blue-900/70 border-purple-800/40 shadow-md h-full">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 font-semibold text-white text-lg">
        <TrendingUp className="w-6 h-6 text-purple-200" />
        Performance Trajectory Analysis
      </CardTitle>
      <p className="text-blue-200/70 text-xs mt-1">
        Visualize and forecast employee or team performance trends over time.
      </p>
    </CardHeader>
    <CardContent>
      <div className="text-blue-100 mt-1">
        {/* To be replaced with charts when logic is ready */}
        <span className="text-purple-300/80 text-sm">Predictive analytics for growth and at-risk talent coming soon.</span>
      </div>
    </CardContent>
  </Card>
);

export default PerformanceTrajectoryAnalysis;
