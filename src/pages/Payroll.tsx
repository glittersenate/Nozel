
import React from 'react';
import { PayrollDashboard } from '@/components/payroll/PayrollDashboard';

export default function Payroll() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Payroll Management</h1>
          <p className="text-muted-foreground">Process payroll and manage employee compensation</p>
        </div>
        <PayrollDashboard />
      </div>
    </div>
  );
}
