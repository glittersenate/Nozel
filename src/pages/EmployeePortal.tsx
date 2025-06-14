
import React from "react";
import { Layout } from "@/components/Layout";
import { UserCheck } from "lucide-react";

const EmployeePortal: React.FC = () => {
  return (
    <Layout>
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl">
            <UserCheck className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Employee Portal</h1>
            <p className="text-blue-300">Self-service hub for employees</p>
          </div>
        </div>
        <div className="glass-dark rounded-3xl p-8 border border-blue-500/20">
          <p className="text-blue-200 text-lg">
            Employee portal coming soon - employees will be able to view payslips, 
            request time off, and manage their personal information here.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default EmployeePortal;
