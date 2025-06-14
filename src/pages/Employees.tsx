import React, { useState } from 'react';
import { Plus, Search, Filter, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import EmployeeTable from '@/components/employees/EmployeeTable';
import AddEmployeeDialog from '@/components/employees/AddEmployeeDialog';
import EditEmployeeDialog from '@/components/employees/EditEmployeeDialog';
import EmployeeDetailDialog from "@/components/employees/EmployeeDetailDialog";
import EmployeeFilterDrawer from '@/components/employees/EmployeeFilterDrawer';
import BulkActions from '@/components/employees/BulkActions';
import AdvancedSearch from '@/components/AdvancedSearch';
import EmployeeProfileModal from '@/components/EmployeeProfileModal';
import ThemeToggle from '@/components/ThemeToggle';
import NotificationSystem from '@/components/NotificationSystem';
import { useToast } from '@/hooks/use-toast';
import { exportToCSV, formatEmployeeForExport } from '@/utils/exportUtils';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

export interface Employee {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  salary: number;
  startDate: string;
  status: 'active' | 'inactive';
}

export type SortConfig = {
  key: keyof Employee;
  direction: 'asc' | 'desc';
} | null;

const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@company.com',
    position: 'Software Engineer',
    department: 'Engineering',
    salary: 85000,
    startDate: '2023-01-15',
    status: 'active'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    position: 'HR Manager',
    department: 'Human Resources',
    salary: 75000,
    startDate: '2022-06-10',
    status: 'active'
  },
  {
    id: '3',
    name: 'Mike Davis',
    email: 'mike.davis@company.com',
    position: 'Marketing Specialist',
    department: 'Marketing',
    salary: 60000,
    startDate: '2023-03-20',
    status: 'active'
  },
  {
    id: '4',
    name: 'Emily Chen',
    email: 'emily.chen@company.com',
    position: 'Product Manager',
    department: 'Product',
    salary: 95000,
    startDate: '2022-09-05',
    status: 'inactive'
  }
];

const getUniqueDepartments = (employees: Employee[]) => {
  const depts = new Set<string>();
  employees.forEach((e) => depts.add(e.department));
  return Array.from(depts).sort();
};

const Employees = () => {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [detailEmployee, setDetailEmployee] = useState<Employee | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profileEmployee, setProfileEmployee] = useState<Employee | null>(null);
  const { toast } = useToast();

  // Advanced search filters
  const [advancedFilters, setAdvancedFilters] = useState({
    searchTerm: '',
    departments: [],
    salaryRange: { min: null, max: null },
    dateRange: { from: '', to: '' },
    status: []
  });

  // Filter state and filter drawer open
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [filterState, setFilterState] = useState<{ departments: string[]; statuses: Array<'active' | 'inactive'> }>({
    departments: [],
    statuses: []
  });

  // New: sorting state
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);

  // Keyboard shortcuts
  useKeyboardShortcuts([
    {
      key: 'n',
      ctrl: true,
      action: () => setIsAddDialogOpen(true),
      description: 'Add new employee'
    },
    {
      key: 'e',
      ctrl: true,
      action: handleExportData,
      description: 'Export data'
    }
  ]);

  const allDepartments = getUniqueDepartments(employees);

  // Enhanced filtering logic
  const filteredAndSortedEmployees = employees
    .filter(emp => {
      // Advanced search filters
      if (advancedFilters.searchTerm && !emp.name.toLowerCase().includes(advancedFilters.searchTerm.toLowerCase()) &&
          !emp.email.toLowerCase().includes(advancedFilters.searchTerm.toLowerCase()) &&
          !emp.department.toLowerCase().includes(advancedFilters.searchTerm.toLowerCase()) &&
          !emp.position.toLowerCase().includes(advancedFilters.searchTerm.toLowerCase())) {
        return false;
      }

      // Salary range filter
      if (advancedFilters.salaryRange.min && emp.salary < advancedFilters.salaryRange.min) return false;
      if (advancedFilters.salaryRange.max && emp.salary > advancedFilters.salaryRange.max) return false;

      // Department filters
      if (advancedFilters.departments.length > 0 && !advancedFilters.departments.includes(emp.department)) return false;

      // Status filters
      if (advancedFilters.status.length > 0 && !advancedFilters.status.includes(emp.status)) return false;

      return true;
    })
    .sort((a, b) => {
      if (!sortConfig) return 0;

      const { key, direction } = sortConfig;
      let aValue = a[key];
      let bValue = b[key];

      // Handle different data types
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (key === 'startDate') {
        aValue = new Date(aValue as string).getTime();
        bValue = new Date(bValue as string).getTime();
      }

      if (aValue < bValue) {
        return direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

  const handleSort = (key: keyof Employee) => {
    setSortConfig(current => {
      if (!current || current.key !== key) {
        return { key, direction: 'asc' };
      }
      if (current.direction === 'asc') {
        return { key, direction: 'desc' };
      }
      return null; // Clear sorting
    });
  };

  const handleAddEmployee = (newEmployee: Omit<Employee, 'id'>) => {
    const employee: Employee = {
      ...newEmployee,
      id: Math.random().toString(36).substr(2, 9)
    };
    setEmployees([...employees, employee]);
    setIsAddDialogOpen(false);
    toast({
      title: "Employee Added",
      description: `${employee.name} has been successfully added to the system.`,
    });
  };

  const handleDeleteEmployee = (id: string) => {
    const employee = employees.find(emp => emp.id === id);
    setEmployees(employees.filter(emp => emp.id !== id));
    toast({
      title: "Employee Removed",
      description: `${employee?.name} has been removed from the system.`,
      variant: "destructive",
    });
  };

  const handleExportData = () => {
    const exportData = formatEmployeeForExport(filteredAndSortedEmployees);
    exportToCSV(exportData, `employees-export-${new Date().toISOString().split('T')[0]}`);
    toast({
      title: "Export Complete",
      description: `Successfully exported ${exportData.length} employee records to CSV.`,
    });
  };

  const handleEditEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsEditDialogOpen(true);
  };

  const handleUpdateEmployee = (updated: Employee) => {
    setEmployees((prev) =>
      prev.map((e) => (e.id === updated.id ? updated : e))
    );
    setIsEditDialogOpen(false);
    toast({
      title: "Employee Updated",
      description: `${updated.name}'s information has been updated.`,
    });
  };

  const handleViewEmployee = (employee: Employee) => {
    setDetailEmployee(employee);
    setIsDetailDialogOpen(true);
  };

  // New bulk action handlers
  const handleBulkDelete = () => {
    const remainingEmployees = employees.filter(emp => !selectedEmployeeIds.includes(emp.id));
    setEmployees(remainingEmployees);
    setSelectedEmployeeIds([]);
    toast({
      title: "Employees Deleted",
      description: `${selectedEmployeeIds.length} employees have been removed.`,
      variant: "destructive",
    });
  };

  const handleBulkStatusChange = (status: 'active' | 'inactive') => {
    const updatedEmployees = employees.map(emp => 
      selectedEmployeeIds.includes(emp.id) ? { ...emp, status } : emp
    );
    setEmployees(updatedEmployees);
    setSelectedEmployeeIds([]);
    toast({
      title: "Status Updated",
      description: `${selectedEmployeeIds.length} employees marked as ${status}.`,
    });
  };

  const handleBulkExport = () => {
    const selectedEmployees = employees.filter(emp => selectedEmployeeIds.includes(emp.id));
    const exportData = formatEmployeeForExport(selectedEmployees);
    exportToCSV(exportData, `selected-employees-${new Date().toISOString().split('T')[0]}`);
    toast({
      title: "Export Complete",
      description: `Exported ${selectedEmployees.length} selected employees.`,
    });
  };

  const handleBulkEmail = () => {
    toast({
      title: "Email Feature",
      description: `Email functionality for ${selectedEmployeeIds.length} employees coming soon!`,
    });
  };

  const handleViewEmployeeProfile = (employee: Employee) => {
    setProfileEmployee(employee);
    setIsProfileModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0e1c38] to-[#12284a] dark:from-[#0e1c38] dark:to-[#12284a] light:from-gray-50 light:to-gray-100 text-white dark:text-white light:text-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Employee Management</h1>
            <p className="text-blue-300 dark:text-blue-300 light:text-gray-600">
              Manage your team members with advanced tools
              <span className="ml-2 text-sm opacity-75">
                Press <kbd className="px-1 py-0.5 bg-blue-600/20 rounded text-xs">Ctrl+N</kbd> to add employee
              </span>
            </p>
          </div>
          <div className="flex gap-3">
            <ThemeToggle />
            <NotificationSystem />
            <Button
              variant="outline"
              onClick={handleExportData}
              className="bg-[#141a2e]/60 dark:bg-[#141a2e]/60 light:bg-white border-blue-800/30 dark:border-blue-800/30 light:border-gray-300 text-blue-200 dark:text-blue-200 light:text-gray-700 hover:bg-[#141a2e]/80"
            >
              <Download className="w-4 h-4 mr-2" />
              Export ({filteredAndSortedEmployees.length})
            </Button>
            <Button
              onClick={() => setIsAddDialogOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Employee
            </Button>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#141a2e]/80 dark:bg-[#141a2e]/80 light:bg-white border border-blue-950 dark:border-blue-950 light:border-gray-200 rounded-xl p-6">
            <h3 className="text-blue-300 dark:text-blue-300 light:text-gray-600 text-sm font-medium">Total Employees</h3>
            <p className="text-2xl font-bold text-white dark:text-white light:text-gray-900 mt-1">{employees.length}</p>
          </div>
          <div className="bg-[#141a2e]/80 dark:bg-[#141a2e]/80 light:bg-white border border-blue-950 dark:border-blue-950 light:border-gray-200 rounded-xl p-6">
            <h3 className="text-blue-300 dark:text-blue-300 light:text-gray-600 text-sm font-medium">Active</h3>
            <p className="text-2xl font-bold text-green-400 mt-1">
              {employees.filter(emp => emp.status === 'active').length}
            </p>
          </div>
          <div className="bg-[#141a2e]/80 dark:bg-[#141a2e]/80 light:bg-white border border-blue-950 dark:border-blue-950 light:border-gray-200 rounded-xl p-6">
            <h3 className="text-blue-300 dark:text-blue-300 light:text-gray-600 text-sm font-medium">Filtered</h3>
            <p className="text-2xl font-bold text-blue-400 mt-1">
              {filteredAndSortedEmployees.length}
            </p>
          </div>
          <div className="bg-[#141a2e]/80 dark:bg-[#141a2e]/80 light:bg-white border border-blue-950 dark:border-blue-950 light:border-gray-200 rounded-xl p-6">
            <h3 className="text-blue-300 dark:text-blue-300 light:text-gray-600 text-sm font-medium">Selected</h3>
            <p className="text-2xl font-bold text-purple-400 mt-1">
              {selectedEmployeeIds.length}
            </p>
          </div>
        </div>

        {/* Advanced Search Bar */}
        <div className="bg-[#141a2e]/80 dark:bg-[#141a2e]/80 light:bg-white border border-blue-950 dark:border-blue-950 light:border-gray-200 rounded-xl p-6 mb-6">
          <AdvancedSearch
            filters={advancedFilters}
            onFiltersChange={setAdvancedFilters}
            availableDepartments={allDepartments}
          />
        </div>

        {/* Bulk Actions */}
        <BulkActions
          selectedCount={selectedEmployeeIds.length}
          onBulkDelete={handleBulkDelete}
          onBulkStatusChange={handleBulkStatusChange}
          onBulkExport={handleBulkExport}
          onBulkEmail={handleBulkEmail}
        />

        {/* Employee Table */}
        <EmployeeTable
          employees={filteredAndSortedEmployees}
          onDeleteEmployee={handleDeleteEmployee}
          onEditEmployee={handleEditEmployee}
          onViewEmployee={handleViewEmployeeProfile}
          sortConfig={sortConfig}
          onSort={handleSort}
          selectedIds={selectedEmployeeIds}
          onSelectionChange={setSelectedEmployeeIds}
        />

        {/* All Dialogs */}
        <AddEmployeeDialog
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          onAddEmployee={handleAddEmployee}
        />

        <EditEmployeeDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          employee={selectedEmployee}
          onUpdateEmployee={handleUpdateEmployee}
        />

        <EmployeeDetailDialog
          open={isDetailDialogOpen}
          onOpenChange={setIsDetailDialogOpen}
          employee={detailEmployee}
        />

        <EmployeeProfileModal
          employee={profileEmployee}
          open={isProfileModalOpen}
          onOpenChange={setIsProfileModalOpen}
        />
      </div>
    </div>
  );
};

export default Employees;
