
import React from "react";
import { Layout } from "@/components/Layout";
import { Shield } from "lucide-react";

const Compliance: React.FC = () => {
  return (
    <Layout>
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">AI Compliance HQ</h1>
            <p className="text-blue-300">Real-time payroll compliance monitoring</p>
          </div>
        </div>
        <div className="glass-dark rounded-3xl p-8 border border-blue-500/20">
          <p className="text-blue-200 text-lg">
            AI Compliance dashboard coming soon - this will be your command center for 
            real-time compliance monitoring across all 50 states.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Compliance;
