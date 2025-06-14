
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

const TeamChemistryAnalysis: React.FC = () => (
  <Card className="bg-gradient-to-tr from-pink-900/80 to-blue-900/70 border-pink-800/40 shadow-md h-full">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 font-semibold text-white text-lg">
        <Users className="w-6 h-6 text-pink-200" />
        Team Chemistry Analysis
      </CardTitle>
      <p className="text-blue-200/70 text-xs mt-1">
        Analyze collaboration, culture, and team synergy trends.
      </p>
    </CardHeader>
    <CardContent>
      <div className="text-blue-100 mt-1">
        <span className="text-pink-300/80 text-sm">Team dynamics & chemistry assessment dashboard coming soon.</span>
      </div>
    </CardContent>
  </Card>
);

export default TeamChemistryAnalysis;
