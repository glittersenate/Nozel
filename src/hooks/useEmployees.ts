
import { useEmployeeStore } from '@/store/employeeStore';

export const useEmployees = () => {
  const {
    sortConfig,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    bulkDeleteEmployees,
    bulkUpdateStatus,
    sortEmployees,
    getSortedEmployees,
  } = useEmployeeStore();

  const employees = getSortedEmployees();

  return {
    employees,
    sortConfig,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    bulkDeleteEmployees,
    bulkUpdateStatus,
    sortEmployees
  };
};
