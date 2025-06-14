
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

const stats = [
  { label: "Employee Net Promoter Score", value: "54", subtitle: "Healthy" },
  { label: "Recent Pulse Survey", value: "76%", subtitle: "Completed" },
  { label: "Potential Burnout", value: "2", subtitle: "Flagged" }
];

const WellnessDashboard: React.FC = () => (
  <Card className="bg-gradient-to-tr from-pink-900/80 to-blue-900/70 border-pink-800/40 shadow-md h-full">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 font-semibold text-white text-lg">
        <Users className="w-6 h-6 text-pink-200" />
        Wellness & Sentiment
      </CardTitle>
      <p className="text-blue-200/70 text-xs mt-1">Track engagement, wellbeing & pulse survey trends.</p>
    </CardHeader>
    <CardContent>
      <div className="pb-2 space-y-2">
        {stats.map(s => (
          <div key={s.label} className="flex justify-between items-center">
            <div>
              <span className="text-blue-100 font-medium">{s.label}</span>
              <span className="ml-2 text-xs text-blue-300/70">{s.subtitle}</span>
            </div>
            <span className={`px-3 py-0.5 rounded-xl text-sm font-bold 
              ${s.label === "Potential Burnout" ? "bg-red-700/70 text-red-100" : "bg-blue-800/70 text-blue-100"}`}>
              {s.value}
            </span>
          </div>
        ))}
      </div>
      <div className="text-[13px] mt-2 text-blue-200">
        2 team members may be experiencing burnout.
      </div>
      <div className="text-xs text-pink-200 mt-4 opacity-80">Regular sentiment checks keep teams motivated.</div>
    </CardContent>
  </Card>
);

export default WellnessDashboard;
