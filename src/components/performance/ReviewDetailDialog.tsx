
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { PerformanceReview } from "@/types/performance";

type Props = {
  review: PerformanceReview | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
};

export const ReviewDetailDialog: React.FC<Props> = ({ review, open, onOpenChange }) => {
  if (!review) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-[#141a2e] border-blue-800/30 text-white">
        <DialogHeader>
          <DialogTitle>Performance Review Details</DialogTitle>
          <DialogDescription>
            Detailed information for the review period <b>{review.period}</b>.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2 text-sm mt-2">
          <div><span className="font-semibold">Employee Name:</span> {review.employeeFeedback || "N/A"}</div>
          <div><span className="font-semibold">Type:</span> {review.type}</div>
          <div><span className="font-semibold">Overall Rating:</span> {review.overallRating}/5</div>
          <div><span className="font-semibold">Key Strengths:</span> {review.feedback}</div>
          <div><span className="font-semibold">Areas for Improvement:</span> {review.employeeFeedback || "N/A"}</div>
          <div><span className="font-semibold">Goals/Objectives:</span> {review.developmentPlan || "N/A"}</div>
          <div><span className="font-semibold">Status:</span> <Badge>{review.status}</Badge></div>
          <div><span className="font-semibold">Due Date:</span> {review.scheduledDate}</div>
          <div><span className="font-semibold">Completed At:</span> {review.completedAt || "N/A"}</div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
