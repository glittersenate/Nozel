
import React, { useState } from 'react';
import EmployeeTable from '@/components/employees/EmployeeTable';
import EmployeeFilterDrawer from '@/components/employees/EmployeeFilterDrawer';
import AddEmployeeDialog from '@/components/employees/AddEmployeeDialog';
import BulkActions from '@/components/employees/BulkActions';
import EmployeeUploadDialog from '@/components/employees/EmployeeUploadDialog';
import { useEmployees } from '@/hooks/useEmployees';
import { useEmployeeFilters } from '@/hooks/useEmployeeFilters';
import { Employee } from '@/types/employee';

export default function Employees() {
  const { 
    employees, 
    addEmployee, 
    updateEmployee, 
    deleteEmployee, 
    bulkDeleteEmployees, 
    bulkUpdateStatus 
  } = useEmployees();

  const { 
    filters, 
    filteredEmployees, 
    updateFilter, 
    clearFilters, 
    activeFilterCount 
  } = useEmployeeFilters(employees);

  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

  // Get all unique departments for filter
  const allDepartments = [...new Set(employees.map(emp => emp.department))];

  const handleAddEmployee = (employeeData: Omit<Employee, 'id'>) => {
    addEmployee(employeeData);
    setAddDialogOpen(false);
  };

  const handleImportEmployees = (employeeList: Omit<Employee, 'id'>[]) => {
    employeeList.forEach(emp => addEmployee(emp));
    setUploadDialogOpen(false);
  };

  const handleBulkDelete = () => {
    bulkDeleteEmployees(selectedEmployees);
    setSelectedEmployees([]);
  };

  const handleBulkStatusChange = (status: 'active' | 'inactive') => {
    bulkUpdateStatus(selectedEmployees, status);
    setSelectedEmployees([]);
  };

  const handleBulkExport = () => {
    // Implementation for bulk export
    console.log('Exporting selected employees:', selectedEmployees);
  };

  const handleBulkEmail = () => {
    // Implementation for bulk email
    console.log('Sending email to selected employees:', selectedEmployees);
  };

  const handleDeleteEmployee = (id: string) => {
    deleteEmployee(id);
  };

  const handleEditEmployee = (employee: Employee) => {
    updateEmployee(employee.id, employee);
  };

  const handleViewEmployee = (employee: Employee) => {
    // Implementation for viewing employee details
    console.log('Viewing employee:', employee);
  };

  const handleSelectEmployee = (id: string, selected: boolean) => {
    if (selected) {
      setSelectedEmployees(prev => [...prev, id]);
    } else {
      setSelectedEmployees(prev => prev.filter(empId => empId !== id));
    }
  };

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      setSelectedEmployees(filteredEmployees.map(emp => emp.id));
    } else {
      setSelectedEmployees([]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Employee Management</h1>
          <p className="text-muted-foreground">Manage your workforce and employee information</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex gap-2">
            <AddEmployeeDialog 
              open={addDialogOpen}
              onOpenChange={setAddDialogOpen}
              onAddEmployee={handleAddEmployee}
            />
            <EmployeeUploadDialog 
              open={uploadDialogOpen}
              onOpenChange={setUploadDialogOpen}
              onImport={handleImportEmployees}
            />
          </div>
          <div className="flex gap-2 sm:ml-auto">
            <BulkActions 
              selectedCount={selectedEmployees.length}
              onBulkDelete={handleBulkDelete}
              onBulkStatusChange={handleBulkStatusChange}
              onBulkExport={handleBulkExport}
              onBulkEmail={handleBulkEmail}
            />
            <EmployeeFilterDrawer 
              open={filterDrawerOpen}
              onOpenChange={setFilterDrawerOpen}
              allDepartments={allDepartments}
              filterState={filters}
              setFilterState={(state) => {
                updateFilter('departments', state.departments);
                updateFilter('statuses', state.statuses);
              }}
              onClear={clearFilters}
            />
          </div>
        </div>

        <EmployeeTable 
          employees={filteredEmployees}
          onDeleteEmployee={handleDeleteEmployee}
          onEditEmployee={handleEditEmployee}
          onViewEmployee={handleViewEmployee}
          onSelectEmployee={handleSelectEmployee}
          onSelectAll={handleSelectAll}
          selectedEmployees={selectedEmployees}
          sortConfig={null}
        />
      </div>
    </div>
  );
}
