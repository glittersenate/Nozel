import React from 'react';
import { Layout } from "@/components/Layout";
import { LeaveDashboard } from '@/components/leave/LeaveDashboard';

export default function Leave() {
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
            <h1 className="text-3xl font-bold text-white mb-2">Leave Management</h1>
            <p className="text-blue-300">Manage time off requests and leave balances</p>
          </div>
          
          <LeaveDashboard />
        </div>
      </div>
    </Layout>
  );
}
