
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
    <div className="min-h-screen w-full flex bg-background">
      <div className="container mx-auto py-5 px-4">
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-1 bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent leading-tight tracking-tight">
                AI Compliance HQ
              </h1>
              <p className="text-muted-foreground text-base sm:text-lg opacity-80">
                Live payroll compliance monitoring across all 50 states.
              </p>
            </div>
          </div>

          {/* Compliance Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {complianceStats.map((stat, i) => (
              <Card
                key={stat.label}
                className="glass-dark border-0 shadow-lg rounded-2xl hover:scale-105 transition-transform duration-300"
              >
                <CardContent className="flex flex-row items-center gap-4 px-5 py-4">
                  <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-500 rounded-xl">
                    {stat.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xl font-bold text-foreground truncate">{stat.value}</div>
                    <div className="text-xs text-muted-foreground truncate">{stat.label}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="space-y-6">
          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ComplianceIssueChart />
            <RecentComplianceChecks />
          </div>

          {/* Real-Time Alerts and States Coverage */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Real-Time Compliance Alerts */}
            <Card className="glass-dark rounded-2xl border-0 shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-yellow-400" />
                  Real-Time Compliance Alerts
                </h2>
                <div className="space-y-3">
                  {complianceFeed.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-colors">
                      <span className={`rounded-full h-3 w-3 mt-1.5 flex-shrink-0 ${
                        item.type === "critical"
                          ? "bg-red-500 animate-pulse"
                          : item.type === "warning"
                          ? "bg-yellow-400"
                          : "bg-blue-400"
                      }`}/>
                      <div className="flex-1 min-w-0">
                        <p className="text-blue-100 font-medium text-sm leading-relaxed">{item.description}</p>
                        <span className="text-xs text-blue-300/70 mt-1 block">{item.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* US State Coverage */}
            <Card className="glass-dark rounded-2xl border-0 shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Globe className="w-6 h-6 text-blue-400" />
                  States Monitored
                </h2>
                <div className="flex flex-wrap gap-2">
                  {stateCoverage.map(state => (
                    <span
                      key={state}
                      className="bg-gradient-to-br from-blue-700 via-blue-400/70 to-purple-500/70 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-md hover:scale-105 transition-transform duration-200"
                    >
                      {state}
                    </span>
                  ))}
                  <span className="text-sm text-blue-300 font-medium opacity-50 ml-2 self-center">
                    +40 more states
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compliance;
