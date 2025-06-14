
import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import EmployeeTable from "@/components/employees/EmployeeTable";
import AddEmployeeDialog from "@/components/employees/AddEmployeeDialog";
import BulkActions from "@/components/employees/BulkActions";
import EmployeeFilterDrawer from "@/components/employees/EmployeeFilterDrawer";
import EmployeeProfileModal from "@/components/EmployeeProfileModal";
import EditEmployeeDialog from "@/components/employees/EditEmployeeDialog";
import { useEmployees } from "@/hooks/useEmployees";
import { Employee } from "@/types/employee";
import { Plus, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

const Employees = () => {
  const {
    employees,
    sortConfig,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    bulkDeleteEmployees,
    bulkUpdateStatus,
    sortEmployees
  } = useEmployees();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [filterState, setFilterState] = useState({ departments: [], statuses: [] });

  const allDepartments = Array.from(new Set(employees.map(emp => emp.department)));

  const handleViewEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowProfileModal(true);
  };

  const handleEditEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowEditDialog(true);
  };

  const handleBulkEmail = () => {
    console.log('Sending email to:', selectedIds);
  };

  const handleBulkExport = () => {
    console.log('Exporting employees:', selectedIds);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="container mx-auto py-10">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Employee Management</h1>
            <p className="text-blue-300">Manage your workforce and employee information</p>
          </div>
          
          <div className="flex gap-4 mb-6">
            <Button
              onClick={() => setShowAddDialog(true)}
              className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Employee
            </Button>
            <Button
              onClick={() => setShowFilterDrawer(true)}
              variant="outline"
              className="border-blue-600 text-blue-300 hover:bg-blue-600/10"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          {selectedIds.length > 0 && (
            <BulkActions
              selectedCount={selectedIds.length}
              onBulkDelete={() => {
                bulkDeleteEmployees(selectedIds);
                setSelectedIds([]);
              }}
              onBulkStatusChange={(status) => {
                bulkUpdateStatus(selectedIds, status);
                setSelectedIds([]);
              }}
              onBulkExport={handleBulkExport}
              onBulkEmail={handleBulkEmail}
            />
          )}
          
          <EmployeeTable
            employees={employees}
            onDeleteEmployee={deleteEmployee}
            onEditEmployee={handleEditEmployee}
            onViewEmployee={handleViewEmployee}
            sortConfig={sortConfig}
            onSort={sortEmployees}
            selectedIds={selectedIds}
            onSelectionChange={setSelectedIds}
          />

          <AddEmployeeDialog
            open={showAddDialog}
            onOpenChange={setShowAddDialog}
            onAddEmployee={addEmployee}
          />

          <EmployeeFilterDrawer
            open={showFilterDrawer}
            onOpenChange={setShowFilterDrawer}
            allDepartments={allDepartments}
            filterState={filterState}
            setFilterState={setFilterState}
            onClear={() => setFilterState({ departments: [], statuses: [] })}
          />

          <EmployeeProfileModal
            employee={selectedEmployee}
            open={showProfileModal}
            onOpenChange={setShowProfileModal}
          />

          <EditEmployeeDialog
            open={showEditDialog}
            onOpenChange={setShowEditDialog}
            employee={selectedEmployee}
            onUpdateEmployee={(updatedEmployee) => {
              updateEmployee(updatedEmployee);
              setShowEditDialog(false);
              setSelectedEmployee(null);
            }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Employees;
