import React from 'react';
import { Layout } from "@/components/Layout";
import { PayrollDashboard } from '@/components/payroll/PayrollDashboard';

export default function Payroll() {
  return (
    <Layout>
      <div
        className="min-h-screen"
        style={{
          background: "rgba(20,26,46,0.7)",
        }}
      >
        <div className="container mx-auto py-10">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Payroll Management</h1>
            <p className="text-blue-300">Process payroll and manage employee compensation</p>
          </div>
          
          <PayrollDashboard />
        </div>
      </div>
    </Layout>
  );
}
