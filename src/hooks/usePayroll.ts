
import { useHRStore } from '@/store/hrStore';

export const usePayroll = () => {
  const payrollEntries = useHRStore((s) => s.payrollEntries);
  const getCurrentPeriodSummary = useHRStore((s) => s.getCurrentPeriodSummary);
  const runPayroll = useHRStore((s) => s.runPayroll);

  return {
    payrollEntries,
    getCurrentPeriodSummary,
    runPayroll,
  };
};
