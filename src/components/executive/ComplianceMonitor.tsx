
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Shield } from "lucide-react";

const issues = [
  { label: "Expiring Documents", value: 1 },
  { label: "Overdue Training", value: 2 },
  { label: "Recent Incidents", value: 0 }
];

const ComplianceMonitor: React.FC = () => (
  <Card className="bg-gradient-to-tr from-yellow-900/80 to-blue-900/70 border-yellow-800/40 shadow-md h-full">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 font-semibold text-white text-lg">
        <Shield className="w-6 h-6 text-yellow-200" />
        Compliance Monitor
      </CardTitle>
      <p className="text-blue-200/70 text-xs mt-1">Track critical compliance & risk signals for your org.</p>
    </CardHeader>
    <CardContent>
      <div className="space-y-2 pb-3">
        {issues.map((i) => (
          <div key={i.label} className="flex justify-between items-center">
            <span className="text-blue-100 font-medium">{i.label}</span>
            <span className={`px-3 py-0.5 rounded-xl text-sm font-bold
              ${i.value
                ? "bg-yellow-700/70 text-yellow-100"
                : "bg-blue-700/60 text-blue-100"
              }
            `}>{i.value}</span>
          </div>
        ))}
      </div>
      <div className="text-[13px] mt-2 text-yellow-300">
        2 overdue items. <span className="underline underline-offset-2">Review compliance dashboard</span>.
      </div>
      <div className="text-xs text-yellow-200 mt-4 opacity-80">Last audit passed.</div>
    </CardContent>
  </Card>
);

export default ComplianceMonitor;
