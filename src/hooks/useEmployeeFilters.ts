
import { useState, useMemo } from 'react';
import { Employee } from '@/types/employee';

interface FilterOptions {
  departments: string[];
  statuses: ('active' | 'inactive')[];
  searchTerm: string;
  salaryRange: [number, number];
}

export const useEmployeeFilters = (employees: Employee[]) => {
  const [filters, setFilters] = useState<FilterOptions>({
    departments: [],
    statuses: [],
    searchTerm: '',
    salaryRange: [0, 200000]
  });

  const filteredEmployees = useMemo(() => {
    return employees.filter(employee => {
      // Department filter
      if (filters.departments.length > 0 && !filters.departments.includes(employee.department)) {
        return false;
      }

      // Status filter
      if (filters.statuses.length > 0 && !filters.statuses.includes(employee.status)) {
        return false;
      }

      // Search term filter
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        const matchesSearch = 
          employee.name.toLowerCase().includes(searchLower) ||
          employee.email.toLowerCase().includes(searchLower) ||
          employee.position.toLowerCase().includes(searchLower) ||
          employee.department.toLowerCase().includes(searchLower);
        
        if (!matchesSearch) return false;
      }

      // Salary range filter
      if (employee.salary < filters.salaryRange[0] || employee.salary > filters.salaryRange[1]) {
        return false;
      }

      return true;
    });
  }, [employees, filters]);

  const updateFilter = (key: keyof FilterOptions, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      departments: [],
      statuses: [],
      searchTerm: '',
      salaryRange: [0, 200000]
    });
  };

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.departments.length > 0) count++;
    if (filters.statuses.length > 0) count++;
    if (filters.searchTerm) count++;
    if (filters.salaryRange[0] > 0 || filters.salaryRange[1] < 200000) count++;
    return count;
  }, [filters]);

  return {
    filters,
    filteredEmployees,
    updateFilter,
    clearFilters,
    activeFilterCount
  };
};
