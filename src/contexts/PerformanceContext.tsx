
import React, { createContext, useContext, useState } from "react";
import { PerformanceReview } from "@/types/performance";
import { v4 as uuidv4 } from "uuid";

type PerformanceContextType = {
  reviews: PerformanceReview[];
  addReview: (review: Partial<PerformanceReview> & {type: string; overallRating: number; scheduledDate: string; employeeName?: string;}) => void;
  editReview: (id: string, updates: Partial<PerformanceReview> & {employeeName?: string}) => void;
};
const PerformanceContext = createContext<PerformanceContextType | undefined>(undefined);

const initialReviews: PerformanceReview[] = [
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

export const PerformanceProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [reviews, setReviews] = useState<PerformanceReview[]>(initialReviews);

  const addReview = (review: Partial<PerformanceReview> & {type: string; overallRating: number; scheduledDate: string; employeeName?: string;}) => {
    setReviews(prev => [
      {
        ...review,
        id: uuidv4(),
        employeeId: "current-user",
        reviewerId: "manager1",
        period: review.type === "annual" ? `${new Date(review.scheduledDate).getFullYear()} Annual` : `${review.type === "quarterly" ? "Q"+(Math.floor(new Date(review.scheduledDate).getMonth() / 3)+1) : "Project"} ${new Date(review.scheduledDate).getFullYear()}`,
        status: "draft",
        competencies: [],
        goals: [],
        feedback: review.feedback || "",
        overallRating: review.overallRating,
        scheduledDate: review.scheduledDate,
        completedAt: undefined,
        developmentPlan: review.developmentPlan,
        employeeFeedback: review.employeeFeedback || "",
      } as PerformanceReview,
      ...prev
    ]);
  };

  const editReview = (id: string, updates: Partial<PerformanceReview> & {employeeName?: string}) => {
    setReviews(prev =>
      prev.map(r =>
        r.id === id
          ? {
              ...r,
              ...updates,
              overallRating: updates.overallRating ?? r.overallRating,
              feedback: updates.feedback ?? r.feedback,
              employeeFeedback: updates.employeeFeedback ?? r.employeeFeedback,
              developmentPlan: updates.developmentPlan ?? r.developmentPlan,
            }
          : r
      )
    );
  };

  return (
    <PerformanceContext.Provider value={{ reviews, addReview, editReview }}>
      {children}
    </PerformanceContext.Provider>
  );
};

export const usePerformanceContext = () => {
  const ctx = useContext(PerformanceContext);
  if (!ctx) throw new Error("usePerformanceContext must be used within PerformanceProvider");
  return ctx;
};
