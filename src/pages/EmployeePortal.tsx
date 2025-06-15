
import React, { useState } from "react";
import PayslipHistory from "@/components/employeePortal/PayslipHistory";
import RequestTimeOff from "@/components/employeePortal/RequestTimeOff";
import ProfileSettings from "@/components/employeePortal/ProfileSettings";
import EmployeeStatsCards from "@/components/employeePortal/EmployeeStatsCards";
import CompanyDirectory from "@/components/employeePortal/CompanyDirectory";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, FileText, User, LogOut, UserCheck } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const actions = [
  {
    label: "Payslips",
    description: "View/download your payslips",
    icon: <FileText className="w-7 h-7 text-blue-400" />,
    component: "payslips",
  },
  {
    label: "Request Time Off",
    description: "Submit a request or view leave balance",
    icon: <Calendar className="w-7 h-7 text-green-400" />,
    component: "leave",
  },
  {
    label: "Profile",
    description: "View and update your info",
    icon: <User className="w-7 h-7 text-purple-400" />,
    component: "profile",
  },
  {
    label: "Directory",
    description: "Browse all employees",
    icon: <User className="w-7 h-7 text-yellow-400" />,
    component: "directory",
  }
];

const EmployeePortal: React.FC = () => {
  const [active, setActive] = useState<"payslips" | "leave" | "profile" | "directory">("payslips");
  const { logout, user } = useAuth();

  return (
    <div
      className="min-h-screen w-full flex"
      style={{ background: "rgba(20,26,46,0.7)" }}
    >
      <div className="container mx-auto py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6 pl-1">
          <div className="p-3 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
            <UserCheck className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent leading-tight tracking-tight">
              Employee Portal
            </h1>
            <p className="text-blue-200 text-base opacity-80">
              Hi {user?.name?.split(" ")[0] || "Employee"}, this is your self-service hub.
            </p>
          </div>
          <div className="sm:ml-auto flex gap-2 mt-3 sm:mt-0">
            <button
              type="button"
              onClick={logout}
              className="bg-red-600/90 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-xl shadow transition"
            >
              <LogOut className="w-5 h-5 inline mb-0.5 mr-1" />
              Log Out
            </button>
          </div>
        </div>

        {/* Dashboard Cards */}
        <EmployeeStatsCards />

        {/* Tab Actions */}
        <div className="flex gap-2 mb-7">
          {actions.map((act) => (
            <button
              key={act.label}
              className={`flex flex-col sm:flex-row items-center gap-1 sm:gap-2 px-4 py-2 rounded-2xl font-medium transition
                ${active === act.component
                  ? "bg-gradient-to-r from-blue-500/40 to-green-500/20 text-white shadow"
                  : "bg-blue-900/60 text-blue-100 hover:bg-blue-900/80"}
              `}
              onClick={() => setActive(act.component as any)}
            >
              <span>{act.icon}</span>
              <span>{act.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in">
          {active === "payslips" && <PayslipHistory />}
          {active === "leave" && <RequestTimeOff />}
          {active === "profile" && <ProfileSettings />}
          {active === "directory" && <CompanyDirectory />}
        </div>
      </div>
    </div>
  );
};

export default EmployeePortal;
