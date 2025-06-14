
import React from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, FileText, User, LogOut, UserCheck } from "lucide-react";

const actions = [
  {
    label: "View Payslips",
    description: "Access your monthly payslips and payment records.",
    icon: <FileText className="w-7 h-7 text-blue-400" />,
  },
  {
    label: "Request Time Off",
    description: "Easily request vacation, sick leave, and more.",
    icon: <Calendar className="w-7 h-7 text-green-400" />,
  },
  {
    label: "Update Profile",
    description: "Manage your contact info and password securely.",
    icon: <User className="w-7 h-7 text-purple-400" />,
  },
  {
    label: "Log Out",
    description: "Sign out of your account securely.",
    icon: <LogOut className="w-7 h-7 text-red-400" />,
  },
];

const EmployeePortal: React.FC = () => {
  return (
    <Layout>
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
                Your self-service hub
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <Card className="glass-dark rounded-3xl border-0 shadow-lg">
              <CardContent className="p-7">
                <p className="text-blue-200 text-lg">
                  Welcome! The self-service portal is in development.
                  Soon you'll be able to view your payslips, request time off,
                  and update your personal details—all in one place.
                </p>
              </CardContent>
            </Card>
            {/* Feature actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              {actions.map((action, idx) => (
                <Card
                  key={action.label}
                  className="glass-dark border-0 rounded-2xl hover-lift transition-shadow duration-200"
                >
                  <CardContent className="flex gap-4 items-center px-5 py-4">
                    <div className="p-3 sm:p-4 bg-gradient-to-br from-blue-900/70 to-blue-700/40 rounded-lg flex items-center justify-center">
                      {action.icon}
                    </div>
                    <div>
                      <div className="text-base font-bold text-white">{action.label}</div>
                      <div className="text-xs text-blue-200">{action.description}</div>
                      {/* Replace with action button or feature UI when implemented */}
                      <span className="inline-block mt-1 px-2 py-0.5 rounded bg-blue-600/20 text-xs text-blue-200 opacity-70">
                        Coming soon
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmployeePortal;

