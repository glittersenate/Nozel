
import { useState, useEffect } from 'react';
import { PerformanceReview, PerformanceGoal, PerformanceMetrics } from '@/types/performance';

export const usePerformance = () => {
  const [performanceReviews, setPerformanceReviews] = useState<PerformanceReview[]>([]);
  const [currentGoals, setCurrentGoals] = useState<PerformanceGoal[]>([]);

  useEffect(() => {
    // Mock data - in a real app, this would fetch from API
    const mockReviews: PerformanceReview[] = [
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

    const mockGoals: PerformanceGoal[] = [
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

    setPerformanceReviews(mockReviews);
    setCurrentGoals(mockGoals);
  }, []);

  const getPerformanceMetrics = (): PerformanceMetrics => {
    return {
      averageRating: 4.3,
      reviewsCompleted: 8,
      reviewsPending: 3,
      goalsAchieved: 12,
      totalGoals: 18,
    };
  };

  const getCurrentGoals = () => {
    return currentGoals;
  };

  return {
    performanceReviews,
    getPerformanceMetrics,
    getCurrentGoals,
  };
};
