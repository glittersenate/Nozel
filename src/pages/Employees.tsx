
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
      <div
        className="min-h-screen bg-[rgba(20,26,46,0.7)] dark:bg-[rgba(20,26,46,0.7)] light:bg-[rgba(236,239,253,1)]"
      >
        <div className="container mx-auto py-5 px-2 sm:px-4 md:px-8 max-w-full">
          <div className="mb-6 mt-2 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 sm:gap-0">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white dark:text-white light:text-blue-900 mb-1">
                Employee Management
              </h1>
              <p className="text-blue-300 text-sm sm:text-base dark:text-blue-300 light:text-blue-700/80">
                Manage your workforce and employee information
              </p>
            </div>
          </div>
          
          <div className="flex flex-col xs:flex-row gap-2 xs:gap-4 mb-4 w-full">
            <Button
              onClick={() => setShowAddDialog(true)}
              className="w-full xs:w-auto bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 dark:from-blue-600 dark:to-blue-400 light:from-blue-500 light:to-blue-300"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Employee
            </Button>
            <Button
              onClick={() => setShowFilterDrawer(true)}
              variant="outline"
              className="w-full xs:w-auto border-blue-600 text-blue-300 hover:bg-blue-600/10 dark:border-blue-600 dark:text-blue-300 light:border-blue-400 light:text-blue-700 hover:light:bg-blue-100/80"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          {selectedIds.length > 0 && (
            <div className="mb-4">
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
            </div>
          )}

          {/* Responsive Table Wrapper */}
          <div className="w-full overflow-x-auto rounded-xl bg-white/90 dark:bg-[#181C2A]/90 light:bg-white/95 shadow-lg light:shadow-md">
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
          </div>

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
