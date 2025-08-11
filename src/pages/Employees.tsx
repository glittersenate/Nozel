
import React from 'react';
import { EmployeeTable } from '@/components/employees/EmployeeTable';
import { EmployeeFilterDrawer } from '@/components/employees/EmployeeFilterDrawer';
import { AddEmployeeDialog } from '@/components/employees/AddEmployeeDialog';
import { BulkActions } from '@/components/employees/BulkActions';
import { EmployeeUploadDialog } from '@/components/employees/EmployeeUploadDialog';

export default function Employees() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Employee Management</h1>
          <p className="text-muted-foreground">Manage your workforce and employee information</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex gap-2">
            <AddEmployeeDialog />
            <EmployeeUploadDialog />
          </div>
          <div className="flex gap-2 sm:ml-auto">
            <BulkActions />
            <EmployeeFilterDrawer />
          </div>
        </div>

        <EmployeeTable />
      </div>
    </div>
  );
}
