
import React from "react";
import { Shield } from "lucide-react";
import ComplianceIssueChart from "@/components/compliance/ComplianceIssueChart";
import RecentComplianceChecks from "@/components/compliance/RecentComplianceChecks";
import { ComplianceStatsCards } from "@/components/compliance/ComplianceStatsCards";
import { RealTimeComplianceAlerts } from "@/components/compliance/RealTimeComplianceAlerts";
import { StatesMonitoredCard } from "@/components/compliance/StatesMonitoredCard";

const Compliance: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex bg-background">
      <div className="container mx-auto py-5">
        {/* Header Section */}
        <div className="mb-4 flex flex-col gap-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-[2rem] sm:text-4xl font-extrabold text-foreground mb-1 bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent leading-tight tracking-tight">
                  AI Compliance HQ
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg opacity-80">
                  Live payroll compliance monitoring across all 50 states.
                </p>
              </div>
            </div>
          </div>

          {/* Compliance Stats Cards */}
          <ComplianceStatsCards />
        </div>

        <div className="space-y-7">
          {/* Real-Time Compliance Alerts */}
          <RealTimeComplianceAlerts />
          
          {/* States Monitored Cards */}
          <StatesMonitoredCard />
          
          {/* Compliance Chart and Recent Checks */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ComplianceIssueChart />
            <RecentComplianceChecks />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compliance;
