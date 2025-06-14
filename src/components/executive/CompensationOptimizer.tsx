
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

const stats = [
  { label: "Avg Salary", value: "$87,000" },
  { label: "Pay Equity Score", value: "Good" },
  { label: "Above Market", value: "24%" }
];

const CompensationOptimizer: React.FC = () => (
  <Card className="bg-gradient-to-tr from-teal-900/80 to-blue-900/70 border-teal-800/40 shadow-md h-full">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 font-semibold text-white text-lg">
        <DollarSign className="w-6 h-6 text-green-200" />
        Compensation Optimizer
      </CardTitle>
      <p className="text-blue-200/70 text-xs mt-1">Salary & equity analysis, benchmarked against market data.</p>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 gap-2 pb-2">
        {stats.map(s => (
          <div key={s.label} className="flex justify-between items-center">
            <span className="text-blue-100 font-medium">{s.label}</span>
            <span className="bg-green-700/70 text-green-100 px-3 py-0.5 rounded-xl text-sm font-bold">{s.value}</span>
          </div>
        ))}
      </div>
      <div className="text-[13px] mt-2 text-green-200">
        <span className="text-white font-bold">Severe inequality risk</span> in Engineering team! Review pay bands.
      </div>
      <div className="text-xs text-green-300 mt-4 opacity-80">
        See detailed pay equity breakdown for all departments.
      </div>
    </CardContent>
  </Card>
);

export default CompensationOptimizer;
