
import React from "react";
import { Users, AlertTriangle, TrendingDown, ShieldAlert } from "lucide-react";
import { useFlightRisk } from "@/hooks/useFlightRisk";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const riskColors = {
  High: "bg-red-600/70 text-white",
  Medium: "bg-yellow-500/70 text-white",
  Low: "bg-green-600/70 text-white"
};

const riskIcon = {
  High: <AlertTriangle className="w-5 h-5 text-red-400" />,
  Medium: <ShieldAlert className="w-5 h-5 text-yellow-300" />,
  Low: <Users className="w-5 h-5 text-green-400" />
};

const FlightRiskPredictor: React.FC = () => {
  const { summary, topRisks } = useFlightRisk();

  return (
    <Card className="bg-gradient-to-tr from-blue-950/80 to-blue-800/50 border-blue-800/40">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-white">
          <TrendingDown className="w-6 h-6 text-red-400" />
          Employee Flight Risk Predictor
        </CardTitle>
        <p className="text-blue-200 text-xs mt-1">
          Predicts which employees are at risk of turnover, powered by simulated AI analysis.
        </p>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="text-xl font-bold text-white flex items-center">
            <span>Predicted Flight Risk:</span>
            <span
              className={`ml-4 px-3 py-1 rounded-full text-base font-semibold ${riskColors[summary.overallRisk]}`}
            >
              {riskIcon[summary.overallRisk]}
              <span className="ml-2">{summary.overallRisk}</span>
            </span>
          </div>
          <div className="text-xs text-blue-200 mt-1">
            {summary.message}
          </div>
        </div>
        <div>
          <div className="font-semibold text-blue-300 mb-2">Top At-Risk Employees</div>
          <div className="space-y-2">
            {topRisks.map((emp) => (
              <div
                key={emp.id}
                className="flex items-center justify-between bg-blue-900/40 rounded-lg p-2"
              >
                <div>
                  <span className="text-white font-medium">{emp.name}</span>
                  <span className="ml-2 text-blue-300/90 text-xs">{emp.position}</span>
                  <span className="ml-2 text-violet-400/80 text-xs">{emp.department}</span>
                </div>
                <Badge
                  className={`ml-4 ${riskColors[emp.riskLevel]}`}
                >
                  {riskIcon[emp.riskLevel]}
                  <span className="ml-2">{emp.riskLevel}</span>
                </Badge>
              </div>
            ))}
            {topRisks.length === 0 && (
              <div className="text-blue-200/70 italic">No flight risks detected 🎉</div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlightRiskPredictor;
