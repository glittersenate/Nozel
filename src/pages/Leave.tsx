
import React from 'react';
import { Layout } from "@/components/Layout";
import { LeaveDashboard } from '@/components/leave/LeaveDashboard';

export default function Leave() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="container mx-auto py-10">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Leave Management</h1>
            <p className="text-blue-300">Manage time off requests and leave balances</p>
          </div>
          
          <LeaveDashboard />
        </div>
      </div>
    </Layout>
  );
}
