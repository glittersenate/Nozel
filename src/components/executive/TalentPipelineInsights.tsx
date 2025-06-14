
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, Calendar } from "lucide-react";

const pipelineStages = [
  { label: "Sourcing", value: 12 },
  { label: "Screening", value: 7 },
  { label: "Interview", value: 4 },
  { label: "Offer", value: 2 }
];

const TalentPipelineInsights: React.FC = () => (
  <Card className="bg-gradient-to-tr from-purple-900/80 to-blue-900/70 border-purple-800/40 shadow-md h-full">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 font-semibold text-white text-lg">
        <Users className="w-6 h-6 text-blue-200" />
        Talent Pipeline Insights
      </CardTitle>
      <p className="text-blue-200/80 text-xs mt-1">
        Overview of current candidate pipeline states & open roles.
      </p>
    </CardHeader>
    <CardContent>
      <div className="space-y-2 pb-2">
        {pipelineStages.map((stage) => (
          <div key={stage.label} className="flex justify-between items-center">
            <span className="text-blue-100 font-medium">{stage.label}</span>
            <span className="bg-blue-800/70 text-blue-200 px-3 py-0.5 rounded-xl text-sm font-bold">{stage.value}</span>
          </div>
        ))}
      </div>
      <div className="text-[13px] mt-2 text-blue-300">
        2 offers out, 4 candidates in final stage. Avg. time-to-hire: <span className="font-bold text-white">19 days</span>.
      </div>
      <div className="text-xs text-purple-200/80 mt-4 opacity-80">
        <Calendar className="inline w-4 h-4 mr-1" />
        Next hiring plan review: <span className="font-bold">June 30</span>
      </div>
    </CardContent>
  </Card>
);

export default TalentPipelineInsights;
