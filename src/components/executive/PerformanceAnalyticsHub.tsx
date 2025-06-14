
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

const performanceTrends = [
  { label: "Avg Goal Progress", value: "78%" },
  { label: "Review Completion", value: "93%" },
  { label: "Top Dept", value: "Product" }
];

const PerformanceAnalyticsHub: React.FC = () => (
  <Card className="bg-gradient-to-tr from-indigo-900/80 to-blue-900/70 border-indigo-800/40 shadow-md h-full">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 font-semibold text-white text-lg">
        <BarChart3 className="w-6 h-6 text-indigo-200" />
        Performance Analytics
      </CardTitle>
      <p className="text-blue-200/70 text-xs mt-1">Review performance trends, review completion & top teams.</p>
    </CardHeader>
    <CardContent>
      <div className="pb-2 space-y-2">
        {performanceTrends.map(s => (
          <div key={s.label} className="flex justify-between items-center">
            <span className="text-blue-100 font-medium">{s.label}</span>
            <span className="bg-indigo-700/70 text-indigo-100 px-3 py-0.5 rounded-xl text-sm font-bold">{s.value}</span>
          </div>
        ))}
      </div>
      <div className="text-[13px] mt-2 text-blue-200">
        Product Dept. leads in review completion and goal achievement.
      </div>
      <div className="text-xs text-indigo-200 mt-4 opacity-80">Data powered by AI review engine.</div>
    </CardContent>
  </Card>
);

export default PerformanceAnalyticsHub;
