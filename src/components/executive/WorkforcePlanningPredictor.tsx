
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

const projections = [
  { label: "Growth Needed", value: "+3%", subtitle: "Next Quarter" },
  { label: "Critical Gaps", value: "2", subtitle: "Engineering" },
  { label: "Attrition Forecast", value: "Low", subtitle: "" }
];

const WorkforcePlanningPredictor: React.FC = () => (
  <Card className="bg-gradient-to-tr from-blue-900/80 to-blue-700/50 border-blue-800/40 shadow-md h-full">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 font-semibold text-white text-lg">
        <Users className="w-6 h-6 text-blue-200" />
        Workforce Planning
      </CardTitle>
      <p className="text-blue-200/70 text-xs mt-1">Predict future workforce & coverage needs with AI.</p>
    </CardHeader>
    <CardContent>
      <div className="pb-2 space-y-2">
        {projections.map(s => (
          <div key={s.label} className="flex justify-between items-center">
            <div>
              <span className="text-blue-100 font-medium">{s.label}</span>
              {s.subtitle && <span className="ml-2 text-xs text-blue-300/70">{s.subtitle}</span>}
            </div>
            <span className={`${s.label === "Critical Gaps" ? "bg-red-700/70 text-red-100" : "bg-blue-800/70 text-blue-100"} px-3 py-0.5 rounded-xl text-sm font-bold`}>
              {s.value}
            </span>
          </div>
        ))}
      </div>
      <div className="text-[13px] mt-2 text-blue-200">
        Engineering team coverage is at risk. Consider proactive hiring.
      </div>
      <div className="text-xs text-blue-200 mt-4 opacity-80">AI-powered forecast updated daily.</div>
    </CardContent>
  </Card>
);

export default WorkforcePlanningPredictor;
