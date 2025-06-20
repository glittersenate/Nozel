
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export const useEmployeePortal = () => {
  const location = useLocation();
  const { user } = useAuth();
  
  // Hide sidebar if on employee portal route OR if user is an employee
  return location.pathname === '/employee-portal' || user?.role === 'employee';
};
