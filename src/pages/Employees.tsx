
import React from "react";
import { Layout } from "@/components/Layout";
import { EmployeeTable } from "@/components/employees/EmployeeTable";
import { AddEmployeeDialog } from "@/components/employees/AddEmployeeDialog";
import { BulkActions } from "@/components/employees/BulkActions";
import { EmployeeFilterDrawer } from "@/components/employees/EmployeeFilterDrawer";

const Employees = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="container mx-auto py-10">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Employee Management</h1>
            <p className="text-blue-300">Manage your workforce and employee information</p>
          </div>
          
          <div className="flex gap-4 mb-6">
            <AddEmployeeDialog />
            <BulkActions />
            <EmployeeFilterDrawer />
          </div>
          
          <EmployeeTable />
        </div>
      </div>
    </Layout>
  );
};

export default Employees;
