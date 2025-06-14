
export interface LeaveRequest {
  id: string;
  employeeId: string;
  type: 'vacation' | 'sick' | 'personal' | 'bereavement' | 'maternity' | 'paternity';
  startDate: string;
  endDate: string;
  days: number;
  reason?: string;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  requestedAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
  comments?: string;
}

export interface LeaveBalance {
  employeeId: string;
  vacation: {
    accrued: number;
    used: number;
    remaining: number;
  };
  sick: {
    accrued: number;
    used: number;
    remaining: number;
  };
  personal: {
    accrued: number;
    used: number;
    remaining: number;
  };
  year: number;
}

export interface LeavePolicy {
  id: string;
  name: string;
  type: 'vacation' | 'sick' | 'personal';
  annualAllowance: number;
  accrualRate: number; // days per month
  maxCarryover: number;
  requiresApproval: boolean;
}
