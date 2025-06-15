
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, FileText, Gift } from "lucide-react";

interface EmployeeStatsCardsProps {
  leaveBalance?: number;
  payslipsCount?: number;
  nextHoliday?: string;
}

const EmployeeStatsCards: React.FC<EmployeeStatsCardsProps> = ({
  leaveBalance = 12,
  payslipsCount = 6,
  nextHoliday = "July 4, 2025 (Independence Day)",
}) => {
  return (
    <div className="grid xs:grid-cols-2 md:grid-cols-3 gap-5 mb-8">
      <Card className="bg-blue-950/70 border-0 rounded-2xl shadow glass-dark">
        <CardContent className="flex items-center gap-3 py-6 px-5">
          <div className="bg-blue-500/90 p-3 rounded-xl flex items-center justify-center">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{leaveBalance}</div>
            <div className="text-blue-200/80 text-sm font-medium">Leave Days Left</div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-green-900/70 border-0 rounded-2xl shadow glass-dark">
        <CardContent className="flex items-center gap-3 py-6 px-5">
          <div className="bg-green-500/90 p-3 rounded-xl flex items-center justify-center">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{payslipsCount}</div>
            <div className="text-blue-200/80 text-sm font-medium">Payslips</div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-purple-900/80 border-0 rounded-2xl shadow glass-dark">
        <CardContent className="flex items-center gap-3 py-6 px-5">
          <div className="bg-purple-500/90 p-3 rounded-xl flex items-center justify-center">
            <Gift className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="text-base font-bold text-white">{nextHoliday}</div>
            <div className="text-blue-200/80 text-xs font-medium">Next Holiday</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeStatsCards;
