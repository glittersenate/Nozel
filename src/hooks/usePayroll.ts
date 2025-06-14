
import { useState, useEffect } from 'react';
import { PayrollEntry, PayrollSummary } from '@/types/payroll';

export const usePayroll = () => {
  const [payrollEntries, setPayrollEntries] = useState<PayrollEntry[]>([]);

  useEffect(() => {
    // Mock data - in a real app, this would fetch from API
    const mockEntries: PayrollEntry[] = [
      {
        id: '1',
        employeeId: 'emp1',
        payPeriodStart: '2024-03-01',
        payPeriodEnd: '2024-03-15',
        regularHours: 80,
        overtimeHours: 5,
        hourlyRate: 25,
        overtimeRate: 37.5,
        grossPay: 2187.5,
        deductions: [
          { id: 'd1', type: 'tax', name: 'Federal Tax', amount: 350, isPercentage: false, isPreTax: false },
          { id: 'd2', type: 'tax', name: 'State Tax', amount: 125, isPercentage: false, isPreTax: false },
          { id: 'd3', type: 'insurance', name: 'Health Insurance', amount: 200, isPercentage: false, isPreTax: true },
        ],
        netPay: 1512.5,
        status: 'paid',
        generatedAt: '2024-03-15T10:00:00Z',
        paidAt: '2024-03-16T10:00:00Z',
      },
      {
        id: '2',
        employeeId: 'emp1',
        payPeriodStart: '2024-02-15',
        payPeriodEnd: '2024-02-29',
        regularHours: 80,
        overtimeHours: 2,
        hourlyRate: 25,
        overtimeRate: 37.5,
        grossPay: 2075,
        deductions: [
          { id: 'd4', type: 'tax', name: 'Federal Tax', amount: 332, isPercentage: false, isPreTax: false },
          { id: 'd5', type: 'tax', name: 'State Tax', amount: 118, isPercentage: false, isPreTax: false },
          { id: 'd6', type: 'insurance', name: 'Health Insurance', amount: 200, isPercentage: false, isPreTax: true },
        ],
        netPay: 1425,
        status: 'paid',
        generatedAt: '2024-02-29T10:00:00Z',
        paidAt: '2024-03-01T10:00:00Z',
      },
    ];
    setPayrollEntries(mockEntries);
  }, []);

  const getCurrentPeriodSummary = (): PayrollSummary => {
    // Mock calculation - in a real app, this would calculate from actual data
    return {
      totalGrossPay: 485000,
      totalDeductions: 97000,
      totalNetPay: 388000,
      employeeCount: 24,
      payPeriod: 'March 1-15, 2024',
    };
  };

  const runPayroll = (payPeriodStart: string, payPeriodEnd: string) => {
    // Mock function - in a real app, this would trigger payroll processing
    console.log('Running payroll for period:', payPeriodStart, 'to', payPeriodEnd);
  };

  return {
    payrollEntries,
    getCurrentPeriodSummary,
    runPayroll,
  };
};
