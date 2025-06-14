
import { useState, useEffect } from 'react';
import { Employee, SortConfig } from '@/types/employee';

// Mock data for demonstration
const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@company.com',
    position: 'Senior Developer',
    department: 'Engineering',
    salary: 95000,
    startDate: '2022-01-15',
    status: 'active',
    avatar: '',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, San Francisco, CA'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@company.com',
    position: 'Product Manager',
    department: 'Product',
    salary: 105000,
    startDate: '2021-08-20',
    status: 'active',
    avatar: '',
    phone: '+1 (555) 234-5678',
    address: '456 Oak Ave, San Francisco, CA'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@company.com',
    position: 'HR Specialist',
    department: 'Human Resources',
    salary: 65000,
    startDate: '2023-03-10',
    status: 'active',
    avatar: '',
    phone: '+1 (555) 345-6789',
    address: '789 Pine St, San Francisco, CA'
  }
];

export const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'name',
    direction: 'asc'
  });

  const addEmployee = (newEmployee: Omit<Employee, 'id'>) => {
    const employee: Employee = {
      ...newEmployee,
      id: Date.now().toString()
    };
    setEmployees(prev => [...prev, employee]);
  };

  const updateEmployee = (updatedEmployee: Employee) => {
    setEmployees(prev => 
      prev.map(emp => emp.id === updatedEmployee.id ? updatedEmployee : emp)
    );
  };

  const deleteEmployee = (id: string) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id));
  };

  const bulkDeleteEmployees = (ids: string[]) => {
    setEmployees(prev => prev.filter(emp => !ids.includes(emp.id)));
  };

  const bulkUpdateStatus = (ids: string[], status: 'active' | 'inactive') => {
    setEmployees(prev => 
      prev.map(emp => ids.includes(emp.id) ? { ...emp, status } : emp)
    );
  };

  const sortEmployees = (key: keyof Employee) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
  };

  const sortedEmployees = [...employees].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  return {
    employees: sortedEmployees,
    sortConfig,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    bulkDeleteEmployees,
    bulkUpdateStatus,
    sortEmployees
  };
};
