import React from "react";
import { Shield, Zap, AlertTriangle, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ComplianceIssueChart from "@/components/compliance/ComplianceIssueChart";
import RecentComplianceChecks from "@/components/compliance/RecentComplianceChecks";

// Mock compliance data
const complianceStats = [
  { label: "States Monitored", value: "50", icon: <Globe className="w-5 h-5 text-blue-400" /> },
  { label: "Issues Detected", value: "2", icon: <AlertTriangle className="w-5 h-5 text-yellow-400" /> },
  { label: "Critical Alerts", value: "1", icon: <Zap className="w-5 h-5 text-red-400" /> },
  { label: "Last Audit", value: "3h ago", icon: <Shield className="w-5 h-5 text-green-400" /> },
];

const complianceFeed = [
  { time: "10:18 AM", type: "critical", description: "Minimum wage law change flagged in California. Manual review needed." },
  { time: "09:44 AM", type: "info", description: "New overtime rules synced for New York." },
  { time: "08:05 AM", type: "warning", description: "Missing payroll tax update in Texas." },
  { time: "Yesterday", type: "info", description: "All state compliance checks passed." },
];

const stateCoverage = [
  "California", "Texas", "New York", "Florida", "Illinois", "Pennsylvania", "Ohio", "Georgia", "North Carolina", "Michigan"
];

const Compliance: React.FC = () => {
  return (
    <div
      className="min-h-screen w-full flex"
      style={{ background: "rgba(20,26,46,0.7)" }}
    >
      <div className="container mx-auto py-5">
        {/* Header Section */}
        <div className="mb-4 flex flex-col gap-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-[2rem] sm:text-4xl font-extrabold text-white mb-1 bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent leading-tight tracking-tight">
                  AI Compliance HQ
                </h1>
                <p className="text-blue-200 text-base sm:text-lg opacity-80">
                  Live payroll compliance monitoring across all 50 states.
                </p>
              </div>
            </div>
          </div>

          {/* Compliance Stats Cards */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {complianceStats.map((stat, i) => (
              <Card
                key={stat.label}
                className="border-0 shadow-lg rounded-2xl glass-dark px-0 py-0"
              >
                <CardContent className="flex flex-row items-center gap-4 px-5 py-4">
                  <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-500 rounded-xl">
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-blue-200">{stat.label}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-7">
          {/* Real-Time Compliance Alerts and Feed */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Compliance Alert Feed */}
            <Card className="glass-dark rounded-3xl border-0">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-yellow-400" />
                  Real-Time Compliance Alerts
                </h2>
                <ul className="divide-y divide-blue-800/30">
                  {complianceFeed.map((item, idx) => (
                    <li key={idx} className="py-3 flex items-start gap-3">
                      <span className={`rounded-full h-3 w-3 mt-1
                        ${
                          item.type === "critical"
                            ? "bg-red-500 animate-pulse"
                            : item.type === "warning"
                            ? "bg-yellow-400"
                            : "bg-blue-400"
                        }
                      `}/>
                      <div className="flex-1">
                        <p className="text-blue-100 font-medium">{item.description}</p>
                        <span className="text-xs text-blue-300/70">{item.time}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            {/* US State Coverage */}
            <Card className="glass-dark rounded-3xl border-0">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                  <Globe className="w-6 h-6 text-blue-400" />
                  States Monitored
                </h2>
                <div className="flex flex-wrap gap-2">
                  {stateCoverage.map(state => (
                    <span
                      key={state}
                      className="bg-gradient-to-br from-blue-700 via-blue-400/70 to-purple-500/70 text-white text-xs font-bold px-3 py-1 rounded-2xl shadow-premium"
                    >
                      {state}
                    </span>
                  ))}
                  <span className="text-sm text-blue-300 font-semibold opacity-40 ml-2 select-none">
                    ...and more
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* ADDED: Compliance Chart and Recent Checks */}
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
