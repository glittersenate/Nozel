
import React from 'react';
import { LeaveDashboard } from '@/components/leave/LeaveDashboard';

export default function Leave() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Leave Management</h1>
          <p className="text-muted-foreground">Manage time off requests and leave balances</p>
        </div>
        <LeaveDashboard />
      </div>
    </div>
  );
}
