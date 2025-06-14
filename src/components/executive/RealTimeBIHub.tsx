
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Monitor } from "lucide-react";

const RealTimeBIHub: React.FC = () => (
  <Card className="bg-gradient-to-tr from-blue-900/80 to-indigo-900/70 border-blue-800/40 shadow-md h-full">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 font-semibold text-white text-lg">
        <Monitor className="w-6 h-6 text-blue-200" />
        Real-time BI Hub
      </CardTitle>
      <p className="text-blue-200/70 text-xs mt-1">
        Business intelligence insights aggregated in real time.
      </p>
    </CardHeader>
    <CardContent>
      <div className="text-blue-100 mt-1">
        <span className="text-blue-300/80 text-sm">BI dashboard coming soon.</span>
      </div>
    </CardContent>
  </Card>
);

export default RealTimeBIHub;
