import React, { useState } from 'react';
import { Plus, Search, Filter, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import EmployeeTable from '@/components/employees/EmployeeTable';
import AddEmployeeDialog from '@/components/employees/AddEmployeeDialog';
import EditEmployeeDialog from '@/components/employees/EditEmployeeDialog';
import EmployeeDetailDialog from "@/components/employees/EmployeeDetailDialog";
import EmployeeFilterDrawer from '@/components/employees/EmployeeFilterDrawer';
import { useToast } from '@/hooks/use-toast';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [detailEmployee, setDetailEmployee] = useState<Employee | null>(null);
  const { toast } = useToast();

  // New: filter state and filter drawer open
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [filterState, setFilterState] = useState<{ departments: string[]; statuses: Array<'active' | 'inactive'> }>({
    departments: [],
    statuses: []
  });

  const allDepartments = getUniqueDepartments(employees);

  // Enhanced: apply filters and search to employee list
  const filteredEmployees = employees
    .filter(emp => {
      // Filter by departments if any
      if (filterState.departments.length > 0 && !filterState.departments.includes(emp.department)) {
        return false;
      }
      // Filter by status if any
      if (filterState.statuses.length > 0 && !filterState.statuses.includes(emp.status)) {
        return false;
      }
      return true;
    })
    .filter(employee =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
    toast({
      title: "Export Started",
      description: "Employee data is being exported to CSV...",
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0e1c38] to-[#12284a] text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Employee Management</h1>
            <p className="text-blue-300">Manage your team members and their information</p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleExportData}
              className="bg-[#141a2e]/60 border-blue-800/30 text-blue-200 hover:bg-[#141a2e]/80"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#141a2e]/80 border border-blue-950 rounded-xl p-6">
            <h3 className="text-blue-300 text-sm font-medium">Total Employees</h3>
            <p className="text-2xl font-bold text-white mt-1">{employees.length}</p>
          </div>
          <div className="bg-[#141a2e]/80 border border-blue-950 rounded-xl p-6">
            <h3 className="text-blue-300 text-sm font-medium">Active</h3>
            <p className="text-2xl font-bold text-green-400 mt-1">
              {employees.filter(emp => emp.status === 'active').length}
            </p>
          </div>
          <div className="bg-[#141a2e]/80 border border-blue-950 rounded-xl p-6">
            <h3 className="text-blue-300 text-sm font-medium">Inactive</h3>
            <p className="text-2xl font-bold text-red-400 mt-1">
              {employees.filter(emp => emp.status === 'inactive').length}
            </p>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-[#141a2e]/80 border border-blue-950 rounded-xl p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-4 h-4" />
              <Input
                placeholder="Search employees by name, email, department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-[#0e1c38]/50 border-blue-800/30 text-blue-100 placeholder:text-blue-400/70"
              />
            </div>
            <Button
              variant="outline"
              className="bg-[#141a2e]/60 border-blue-800/30 text-blue-200 hover:bg-[#141a2e]/80"
              onClick={() => setIsFilterDrawerOpen(true)}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
              {(filterState.departments.length > 0 || filterState.statuses.length > 0) && (
                <span className="ml-2 bg-blue-600/60 text-xs rounded-full px-2 py-0.5 text-white">
                  {filterState.departments.length + filterState.statuses.length}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Employee Table */}
        <EmployeeTable
          employees={filteredEmployees}
          onDeleteEmployee={handleDeleteEmployee}
          onEditEmployee={handleEditEmployee}
          onViewEmployee={handleViewEmployee}
        />

        {/* Add Employee Dialog */}
        <AddEmployeeDialog
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          onAddEmployee={handleAddEmployee}
        />

        {/* Edit Employee Dialog */}
        <EditEmployeeDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          employee={selectedEmployee}
          onUpdateEmployee={handleUpdateEmployee}
        />

        {/* Employee Detail Dialog */}
        <EmployeeDetailDialog
          open={isDetailDialogOpen}
          onOpenChange={setIsDetailDialogOpen}
          employee={detailEmployee}
        />

        {/* Employee Filter Drawer */}
        <EmployeeFilterDrawer
          open={isFilterDrawerOpen}
          onOpenChange={setIsFilterDrawerOpen}
          allDepartments={allDepartments}
          filterState={filterState}
          setFilterState={setFilterState}
          onClear={() => setFilterState({ departments: [], statuses: [] })}
        />
      </div>
    </div>
  );
};

export default Employees;
