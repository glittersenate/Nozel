
import { PerformanceReview, PerformanceGoal } from "@/types/performance";
import { PayrollEntry, PayrollDeduction } from "@/types/payroll";

// Performance
export const mockPerformanceReviews: PerformanceReview[] = [
  {
    id: '1',
    employeeId: 'current-user',
    reviewerId: 'manager1',
    period: 'Q1 2024',
    type: 'quarterly',
    status: 'completed',
    overallRating: 4.2,
    goals: [],
    competencies: [],
    feedback: 'Excellent performance this quarter',
    scheduledDate: '2024-03-30',
    completedAt: '2024-03-30T15:00:00Z',
  },
  {
    id: '2',
    employeeId: 'current-user',
    reviewerId: 'manager1',
    period: '2023 Annual',
    type: 'annual',
    status: 'approved',
    overallRating: 4.5,
    goals: [],
    competencies: [],
    feedback: 'Outstanding year-end performance',
    scheduledDate: '2023-12-15',
    completedAt: '2023-12-15T15:00:00Z',
  },
];

export const mockPerformanceGoals: PerformanceGoal[] = [
  {
    id: '1',
    title: 'Complete React Certification',
    description: 'Obtain React professional certification to enhance frontend skills',
    targetDate: '2024-06-30',
    progress: 75,
    status: 'in-progress',
    rating: 4,
  },
  {
    id: '2',
    title: 'Lead Team Project',
    description: 'Successfully lead the Q2 product feature development',
    targetDate: '2024-06-15',
    progress: 60,
    status: 'in-progress',
  },
  {
    id: '3',
    title: 'Improve Code Quality',
    description: 'Reduce bug reports by 30% through better testing practices',
    targetDate: '2024-12-31',
    progress: 100,
    status: 'completed',
    rating: 5,
  },
];

// Payroll
export const mockPayrollEntries: PayrollEntry[] = [
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
