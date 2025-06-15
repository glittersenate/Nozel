
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function MetricsCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-[#141a2e]/80 border border-blue-800/30 rounded-lg p-4">
          <div className="flex items-center justify-between mb-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-6 w-6 rounded-full" />
          </div>
          <Skeleton className="h-8 w-16 my-1" />
          <Skeleton className="h-3 w-20" />
        </div>
      ))}
    </div>
  );
}

export function GoalsProgressSkeleton() {
  return (
    <div className="bg-[#141a2e]/80 border border-blue-800/30 rounded-lg p-6">
      <Skeleton className="h-6 w-40 mb-4" />
      {[...Array(2)].map((_, i) => (
        <div key={i} className="mb-5">
          <Skeleton className="h-4 w-32 mb-2" />
          <Skeleton className="h-4 w-2/3 mb-2" />
          <Skeleton className="h-2 w-full rounded" />
          <Skeleton className="h-3 w-24 mt-1" />
        </div>
      ))}
    </div>
  );
}

export function ReviewsTableSkeleton() {
  return (
    <div className="bg-[#141a2e]/80 border border-blue-800/30 rounded-lg p-6">
      <Skeleton className="h-6 w-32 mb-4" />
      <div>
        {[...Array(3)].map((_, row) => (
          <div key={row} className="flex gap-8 mb-3">
            {[...Array(5)].map((_, col) => (
              <Skeleton key={col} className="h-5 w-24" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
