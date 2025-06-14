
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PayrollState {
  isProcessing: boolean;
  lastRunDate: Date | null;
  currentPeriod: {
    start: string;
    end: string;
  };
  totalPayroll: number;
  activeEmployees: number;
}

interface PayrollContextType {
  payrollState: PayrollState;
  startPayrollProcess: () => Promise<void>;
  canRunPayroll: boolean;
}

const PayrollContext = createContext<PayrollContextType | undefined>(undefined);

export const PayrollProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [payrollState, setPayrollState] = useState<PayrollState>({
    isProcessing: false,
    lastRunDate: null,
    currentPeriod: {
      start: '2024-03-01',
      end: '2024-03-15'
    },
    totalPayroll: 0,
    activeEmployees: 0
  });

  const startPayrollProcess = async () => {
    setPayrollState(prev => ({ ...prev, isProcessing: true }));
    
    // Simulate payroll processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setPayrollState(prev => ({
      ...prev,
      isProcessing: false,
      lastRunDate: new Date()
    }));
  };

  const canRunPayroll = !payrollState.isProcessing && (
    !payrollState.lastRunDate || 
    (new Date().getTime() - payrollState.lastRunDate.getTime()) > 24 * 60 * 60 * 1000
  );

  return (
    <PayrollContext.Provider value={{
      payrollState,
      startPayrollProcess,
      canRunPayroll
    }}>
      {children}
    </PayrollContext.Provider>
  );
};

export const usePayrollContext = () => {
  const context = useContext(PayrollContext);
  if (context === undefined) {
    throw new Error('usePayrollContext must be used within a PayrollProvider');
  }
  return context;
};
