
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PayrollScheduling {
  enabled: boolean;
  paused: boolean;
  frequency: 'monthly' | 'bi-weekly' | 'weekly';
  nextRunDate: Date | null;
  lastRunDate: Date | null;
}

interface PayrollState {
  isProcessing: boolean;
  lastRunDate: Date | null;
  currentPeriod: {
    start: string;
    end: string;
  };
  totalPayroll: number;
  activeEmployees: number;
  scheduling: PayrollScheduling;
}

interface PayrollContextType {
  payrollState: PayrollState;
  startPayrollProcess: () => Promise<void>;
  canRunPayroll: boolean;
  schedulePayroll: (date: Date, frequency: PayrollScheduling['frequency']) => void;
  pauseScheduling: () => void;
  resumeScheduling: () => void;
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
    activeEmployees: 0,
    scheduling: {
      enabled: false,
      paused: false,
      frequency: 'monthly',
      nextRunDate: null,
      lastRunDate: null,
    }
  });

  const startPayrollProcess = async () => {
    setPayrollState(prev => ({ ...prev, isProcessing: true }));
    await new Promise(resolve => setTimeout(resolve, 2000));
    setPayrollState(prev => ({
      ...prev,
      isProcessing: false,
      lastRunDate: new Date(),
      scheduling: {
        ...prev.scheduling,
        lastRunDate: new Date(),
        nextRunDate: prev.scheduling.enabled
          ? getNextRunDate(prev.scheduling.frequency, new Date())
          : null,
      }
    }));
  };

  // Helper to calculate the next run date based on frequency:
  function getNextRunDate(frequency: PayrollScheduling['frequency'], from: Date) {
    const date = new Date(from);
    if (frequency === 'monthly') date.setMonth(date.getMonth() + 1);
    if (frequency === 'bi-weekly') date.setDate(date.getDate() + 14);
    if (frequency === 'weekly') date.setDate(date.getDate() + 7);
    return date;
  }

  const canRunPayroll = !payrollState.isProcessing &&
    (!payrollState.lastRunDate ||
      (new Date().getTime() - payrollState.lastRunDate.getTime()) > 24 * 60 * 60 * 1000);

  // Schedule automatic payroll
  const schedulePayroll = (date: Date, frequency: PayrollScheduling['frequency']) => {
    setPayrollState(prev => ({
      ...prev,
      scheduling: {
        ...prev.scheduling,
        enabled: true,
        paused: false,
        nextRunDate: date,
        lastRunDate: prev.scheduling.lastRunDate,
        frequency,
      }
    }));
  };

  const pauseScheduling = () =>
    setPayrollState(prev => ({
      ...prev,
      scheduling: { ...prev.scheduling, paused: true }
    }));
  const resumeScheduling = () =>
    setPayrollState(prev => ({
      ...prev,
      scheduling: { ...prev.scheduling, paused: false }
    }));

  // Simulate auto-processing via polling in a real app. Here, just mock the behaviors.

  return (
    <PayrollContext.Provider value={{
      payrollState,
      startPayrollProcess,
      canRunPayroll,
      schedulePayroll,
      pauseScheduling,
      resumeScheduling
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
