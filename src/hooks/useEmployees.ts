
import { useState, useEffect } from 'react';
import { Employee, SortConfig } from '@/types/employee';
import { mockEmployees } from '@/data/mockEmployees';

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
