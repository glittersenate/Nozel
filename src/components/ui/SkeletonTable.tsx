
import React from "react";
import { Skeleton } from "./skeleton";

// Renders a skeleton loader for a table of 5 rows, 4 columns
const SkeletonTable: React.FC = () => (
  <div className="p-2">
    <div className="flex">
      {[...Array(4)].map((_, i) => (
        <Skeleton key={i} className="h-6 w-32 mb-3 mr-5 bg-blue-900/60" />
      ))}
    </div>
    {[...Array(5)].map((_, row) => (
      <div className="flex mb-2" key={row}>
        {[...Array(4)].map((_, col) => (
          <Skeleton key={col} className="h-8 w-32 mr-5 bg-blue-800/50" />
        ))}
      </div>
    ))}
  </div>
);

export default SkeletonTable;
