
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// import { MariaAI } from './MariaAI';
// import { CommandPalette } from './CommandPalette';
// import { useCommandPalette } from '@/hooks/useCommandPalette';
// import { ContextAwareMariaService } from '@/services/contextAwareMariaService';
import { useEmployees } from '@/hooks/useEmployees';

export const SmartMaria: React.FC = () => {
  const location = useLocation();
  const { employees } = useEmployees();
  // const { isOpen, close } = useCommandPalette();

  // Update Maria's context whenever the route or data changes
  useEffect(() => {
    // const pageData: any = {};
    
    // // Add route-specific data
    // switch (location.pathname) {
    //   case '/':
    //     pageData.employees = employees;
    //     pageData.totalEmployees = employees.length;
    //     pageData.activeEmployees = employees.filter(e => e.status === 'active').length;
    //     break;
    //   case '/employees':
    //     pageData.employees = employees;
    //     pageData.departments = [...new Set(employees.map(e => e.department))];
    //     break;
    //   case '/payroll':
    //     pageData.totalPayroll = employees.reduce((sum, emp) => sum + emp.salary, 0);
    //     pageData.employeeCount = employees.length;
    //     break;
    // }

    // ContextAwareMariaService.setContext({
    //   route: location.pathname,
    //   pageData,
    //   userActions: [], // This could be populated from user interaction tracking
    //   currentFocus: null
    // });
  }, [location.pathname, employees]);

  return (
    <>
      {/* <MariaAI />
      <CommandPalette isOpen={isOpen} onClose={close} /> */}
    </>
  );
};
