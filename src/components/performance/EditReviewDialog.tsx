
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { CreateReviewForm } from "./CreateReviewForm";
import { PerformanceReview } from "@/types/performance";

type Props = {
  review: PerformanceReview | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
};

export const EditReviewDialog: React.FC<Props> = ({ review, open, onOpenChange }) => {
  if (!review) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-[#141a2e] border-blue-800/30 text-white">
        <DialogHeader>
          <DialogTitle>Edit Performance Review</DialogTitle>
          <DialogDescription>
            Update the information for the review: <b>{review.period}</b>
          </DialogDescription>
        </DialogHeader>
        <CreateReviewForm
          isEdit
          reviewId={review.id}
          defaultValues={{
            employeeName: review.employeeFeedback || "",
            reviewType: review.type,
            overallRating: review.overallRating,
            strengths: review.feedback,
            areasForImprovement: review.employeeFeedback,
            goals: review.developmentPlan,
            dueDate: review.scheduledDate ? new Date(review.scheduledDate) : new Date(),
          }}
          onSuccess={onOpenChange.bind(null, false)}
        />
      </DialogContent>
    </Dialog>
  );
};
