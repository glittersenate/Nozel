
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BellRing } from "lucide-react";

const CrisisManagementDashboard: React.FC = () => (
  <Card className="bg-gradient-to-tr from-red-900/80 to-blue-900/70 border-red-800/40 shadow-md h-full">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 font-semibold text-white text-lg">
        <BellRing className="w-6 h-6 text-red-200" />
        Crisis Management Dashboard
      </CardTitle>
      <p className="text-blue-200/70 text-xs mt-1">
        Monitor critical incidents and real-time responsive actions.
      </p>
    </CardHeader>
    <CardContent>
      <div className="text-blue-100 mt-1">
        <span className="text-red-300/80 text-sm">Crisis management module coming soon.</span>
      </div>
    </CardContent>
  </Card>
);

export default CrisisManagementDashboard;
