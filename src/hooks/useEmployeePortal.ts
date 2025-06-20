
import { useLocation } from 'react-router-dom';

export const useEmployeePortal = () => {
  const location = useLocation();
  return location.pathname === '/employee-portal';
};
