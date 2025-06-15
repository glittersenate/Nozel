import { create } from "zustand";
import { mockPerformanceReviews, mockPerformanceGoals, mockPayrollEntries } from "./mockData";
import { PerformanceReview, PerformanceGoal, PerformanceMetrics } from "@/types/performance";
import { PayrollEntry, PayrollSummary } from "@/types/payroll";

type HRStore = {
  // Performance
  performanceReviews: PerformanceReview[];
  currentGoals: PerformanceGoal[];
  getPerformanceMetrics: () => PerformanceMetrics;
  getCurrentGoals: () => PerformanceGoal[];

  // Payroll
  payrollEntries: PayrollEntry[];
  getCurrentPeriodSummary: () => PayrollSummary;
  runPayroll: (payPeriodStart: string, payPeriodEnd: string) => void;
};

// Utility implementations for calculations
function getPerfMetrics(): PerformanceMetrics {
  return {
    averageRating: 4.3,
    reviewsCompleted: 8,
    reviewsPending: 3,
    goalsAchieved: 12,
    totalGoals: 18,
  };
}

function getPayrollSummary(): PayrollSummary {
  return {
    totalGrossPay: 485000,
    totalDeductions: 97000,
    totalNetPay: 388000,
    employeeCount: 24,
    payPeriod: 'March 1-15, 2024',
  };
}

export const useHRStore = create<HRStore>((set, get) => ({
  // Performance
  performanceReviews: mockPerformanceReviews,
  currentGoals: mockPerformanceGoals,
  getPerformanceMetrics: getPerfMetrics,
  getCurrentGoals: () => get().currentGoals,

  // Payroll
  payrollEntries: mockPayrollEntries,
  getCurrentPeriodSummary: getPayrollSummary,
  runPayroll: (payPeriodStart: string, payPeriodEnd: string) => {
    // Optionally mutate state: for now, just log (keep API compatible)
    console.log('Running payroll for period:', payPeriodStart, 'to', payPeriodEnd);
  },
}));
