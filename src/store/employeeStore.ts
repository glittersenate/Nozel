
import { create } from "zustand";
import { Employee, SortConfig } from '@/types/employee';
import { mockEmployees } from '@/data/mockEmployees';

type EmployeeStore = {
  // State
  employees: Employee[];
  sortConfig: SortConfig;
  
  // Actions
  addEmployee: (newEmployee: Omit<Employee, 'id'>) => void;
  updateEmployee: (updatedEmployee: Employee) => void;
  deleteEmployee: (id: string) => void;
  bulkDeleteEmployees: (ids: string[]) => void;
  bulkUpdateStatus: (ids: string[], status: 'active' | 'inactive') => void;
  sortEmployees: (key: keyof Employee) => void;
  getSortedEmployees: () => Employee[];
};

export const useEmployeeStore = create<EmployeeStore>((set, get) => ({
  // Initial state
  employees: mockEmployees,
  sortConfig: {
    key: 'name',
    direction: 'asc'
  },

  // Actions
  addEmployee: (newEmployee: Omit<Employee, 'id'>) => {
    const employee: Employee = {
      ...newEmployee,
      id: Date.now().toString()
    };
    set(state => ({ 
      employees: [...state.employees, employee] 
    }));
  },

  updateEmployee: (updatedEmployee: Employee) => {
    set(state => ({
      employees: state.employees.map(emp => 
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      )
    }));
  },

  deleteEmployee: (id: string) => {
    set(state => ({
      employees: state.employees.filter(emp => emp.id !== id)
    }));
  },

  bulkDeleteEmployees: (ids: string[]) => {
    set(state => ({
      employees: state.employees.filter(emp => !ids.includes(emp.id))
    }));
  },

  bulkUpdateStatus: (ids: string[], status: 'active' | 'inactive') => {
    set(state => ({
      employees: state.employees.map(emp => 
        ids.includes(emp.id) ? { ...emp, status } : emp
      )
    }));
  },

  sortEmployees: (key: keyof Employee) => {
    const state = get();
    const direction = state.sortConfig.key === key && state.sortConfig.direction === 'asc' ? 'desc' : 'asc';
    set({ sortConfig: { key, direction } });
  },

  getSortedEmployees: (): Employee[] => {
    const { employees, sortConfig } = get();
    return [...employees].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  },
}));
