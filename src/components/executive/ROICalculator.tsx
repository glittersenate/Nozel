
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

const ROICalculator: React.FC = () => (
  <Card className="bg-gradient-to-tr from-emerald-900/80 to-blue-900/70 border-emerald-800/40 shadow-md h-full">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 font-semibold text-white text-lg">
        <DollarSign className="w-6 h-6 text-emerald-200" />
        ROI Calculator
      </CardTitle>
      <p className="text-blue-200/70 text-xs mt-1">
        Calculate the return on investment for HR and business strategies.
      </p>
    </CardHeader>
    <CardContent>
      <div className="text-blue-100 mt-1">
        <span className="text-emerald-300/80 text-sm">ROI calculation tool coming soon.</span>
      </div>
    </CardContent>
  </Card>
);

export default ROICalculator;
