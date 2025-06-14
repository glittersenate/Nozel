
import React from 'react';
import { Layout } from "@/components/Layout";
import { PayrollDashboard } from '@/components/payroll/PayrollDashboard';

export default function Payroll() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
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
