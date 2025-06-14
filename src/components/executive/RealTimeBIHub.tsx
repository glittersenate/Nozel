
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Users, DollarSign, TrendingUp } from "lucide-react";
import { useEmployees } from "@/hooks/useEmployees";
import { useRealTimeData } from "@/hooks/useRealTimeData";

// Executive-focused metrics card component
const RealTimeBIHub: React.FC = () => {
  const { employees } = useEmployees();
  const { metrics, isLive, toggleLiveMode } = useRealTimeData(employees);

  const topGrowthDept = Object.entries(metrics.departmentGrowth)
    .sort(([, a], [, b]) => b - a)[0];

  return (
    <Card className="bg-gradient-to-tr from-blue-900/80 to-indigo-900/70 border-blue-800/40 shadow-md h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-semibold text-white text-lg">
          <Activity className="w-6 h-6 text-blue-200" />
          Real-time BI Hub
        </CardTitle>
        <p className="text-blue-200/70 text-xs mt-1">
          Live business intelligence insights—executive overview.
        </p>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between">
        <div className="space-y-5">
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-blue-300" />
              <span className="text-blue-100 font-medium text-base">Active Employees:</span>
              <span className="ml-auto text-lg text-white font-bold">{metrics.activeEmployees}</span>
            </div>
            <div className="flex items-center gap-3">
              <DollarSign className="w-5 h-5 text-emerald-300" />
              <span className="text-blue-100 font-medium text-base">Payroll This Month:</span>
              <span className="ml-auto text-lg text-white font-bold">${metrics.totalPayroll.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-violet-300" />
              <span className="text-blue-100 font-medium text-base">Top Growth Dept:</span>
              <span className="ml-auto text-lg text-blue-200 font-bold">{topGrowthDept ? topGrowthDept[0] : "N/A"}</span>
              <span className="ml-2 text-xs text-blue-400">{topGrowthDept ? `+${topGrowthDept[1]}%` : ""}</span>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-yellow-200" />
              <span className="text-blue-100 font-medium text-base">New Hires This Month:</span>
              <span className="ml-auto text-lg text-white font-bold">{metrics.newHires}</span>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <Button
              onClick={toggleLiveMode}
              size="sm"
              variant={isLive ? "default" : "outline"}
              className={isLive ? "bg-green-600 hover:bg-green-700 text-white" : "border-blue-600 text-blue-300"}
            >
              {isLive ? "Stop Live" : "Go Live"}
            </Button>
            {isLive && (
              <div className="flex items-center gap-2 text-xs text-green-300">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Live updating every 3 seconds
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RealTimeBIHub;

