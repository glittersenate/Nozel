
export interface PayrollEntry {
  id: string;
  employeeId: string;
  payPeriodStart: string;
  payPeriodEnd: string;
  regularHours: number;
  overtimeHours: number;
  hourlyRate: number;
  overtimeRate: number;
  grossPay: number;
  deductions: PayrollDeduction[];
  netPay: number;
  status: 'draft' | 'pending' | 'approved' | 'paid';
  generatedAt: string;
  approvedBy?: string;
  approvedAt?: string;
  paidAt?: string;
}

export interface PayrollDeduction {
  id: string;
  type: 'tax' | 'insurance' | 'retirement' | 'other';
  name: string;
  amount: number;
  isPercentage: boolean;
  isPreTax: boolean;
}

export interface PayrollSummary {
  totalGrossPay: number;
  totalDeductions: number;
  totalNetPay: number;
  employeeCount: number;
  payPeriod: string;
}

export interface PayStub {
  id: string;
  employeeId: string;
  payrollEntryId: string;
  payPeriod: string;
  grossPay: number;
  deductions: PayrollDeduction[];
  netPay: number;
  issuedAt: string;
}
