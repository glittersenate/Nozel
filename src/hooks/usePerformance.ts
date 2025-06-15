
import { useHRStore } from '@/store/hrStore';

export const usePerformance = () => {
  // Direct passthrough
  const performanceReviews = useHRStore((s) => s.performanceReviews);
  const getPerformanceMetrics = useHRStore((s) => s.getPerformanceMetrics);
  const getCurrentGoals = useHRStore((s) => s.getCurrentGoals);

  return {
    performanceReviews,
    getPerformanceMetrics,
    getCurrentGoals,
  };
};
