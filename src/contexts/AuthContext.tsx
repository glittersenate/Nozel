
import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'admin' | 'hr' | 'manager' | 'employee';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department: string;
}

export interface Permission {
  canViewAllEmployees: boolean;
  canEditEmployees: boolean;
  canDeleteEmployees: boolean;
  canViewSalaries: boolean;
  canRunPayroll: boolean;
  canViewAnalytics: boolean;
  canManageUsers: boolean;
  canExportData: boolean;
}

interface AuthContextType {
  user: User | null;
  permissions: Permission;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const defaultPermissions: Record<UserRole, Permission> = {
  admin: {
    canViewAllEmployees: true,
    canEditEmployees: true,
    canDeleteEmployees: true,
    canViewSalaries: true,
    canRunPayroll: true,
    canViewAnalytics: true,
    canManageUsers: true,
    canExportData: true,
  },
  hr: {
    canViewAllEmployees: true,
    canEditEmployees: true,
    canDeleteEmployees: false,
    canViewSalaries: true,
    canRunPayroll: true,
    canViewAnalytics: true,
    canManageUsers: false,
    canExportData: true,
  },
  manager: {
    canViewAllEmployees: true,
    canEditEmployees: false,
    canDeleteEmployees: false,
    canViewSalaries: false,
    canRunPayroll: false,
    canViewAnalytics: true,
    canManageUsers: false,
    canExportData: false,
  },
  employee: {
    canViewAllEmployees: false,
    canEditEmployees: false,
    canDeleteEmployees: false,
    canViewSalaries: false,
    canRunPayroll: false,
    canViewAnalytics: false,
    canManageUsers: false,
    canExportData: false,
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>({
    id: '1',
    name: 'Alex Johnson',
    email: 'alex.johnson@nozelcorp.com',
    role: 'admin',
    department: 'Management',
  });

  const [permissions, setPermissions] = useState<Permission>(defaultPermissions.admin);

  useEffect(() => {
    if (user) {
      setPermissions(defaultPermissions[user.role]);
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate login
    await new Promise(resolve => setTimeout(resolve, 1000));
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const switchRole = (role: UserRole) => {
    if (user) {
      setUser({ ...user, role });
    }
  };

  return (
    <AuthContext.Provider value={{ user, permissions, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
