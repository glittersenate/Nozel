
export interface PerformanceReview {
  id: string;
  employeeId: string;
  reviewerId: string;
  period: string;
  type: 'annual' | 'quarterly' | 'probation' | 'project';
  status: 'draft' | 'in-progress' | 'completed' | 'approved';
  overallRating: number; // 1-5 scale
  goals: PerformanceGoal[];
  competencies: CompetencyRating[];
  feedback: string;
  employeeFeedback?: string;
  developmentPlan?: string;
  scheduledDate: string;
  completedAt?: string;
}

export interface PerformanceGoal {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  progress: number; // 0-100
  status: 'not-started' | 'in-progress' | 'completed' | 'overdue';
  rating?: number; // 1-5 scale
  comments?: string;
}

export interface CompetencyRating {
  id: string;
  competency: string;
  rating: number; // 1-5 scale
  comments?: string;
}

export interface PerformanceMetrics {
  averageRating: number;
  reviewsCompleted: number;
  reviewsPending: number;
  goalsAchieved: number;
  totalGoals: number;
}
