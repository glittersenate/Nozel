
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CalendarClock } from "lucide-react";

const StrategicPlanningModule: React.FC = () => (
  <Card className="bg-gradient-to-tr from-cyan-900/80 to-blue-900/70 border-cyan-800/40 shadow-md h-full">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 font-semibold text-white text-lg">
        <CalendarClock className="w-6 h-6 text-cyan-200" />
        Strategic Planning Module
      </CardTitle>
      <p className="text-blue-200/70 text-xs mt-1">
        Scenario planning, business forecasts, and strategic tools.
      </p>
    </CardHeader>
    <CardContent>
      <div className="text-blue-100 mt-1">
        <span className="text-cyan-300/80 text-sm">Strategic planning coming soon.</span>
      </div>
    </CardContent>
  </Card>
);

export default StrategicPlanningModule;
