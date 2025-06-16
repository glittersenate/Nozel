
import React from 'react';
import { Button } from '@/components/ui/button';

type LeaveSortingControlsProps = {
  sortBy: 'startDate' | 'endDate' | 'status';
  sortDir: 'asc' | 'desc';
  onSortByChange: (sortBy: 'startDate' | 'endDate' | 'status') => void;
  onSortDirChange: (sortDir: 'asc' | 'desc') => void;
};

export const LeaveSortingControls: React.FC<LeaveSortingControlsProps> = ({
  sortBy,
  sortDir,
  onSortByChange,
  onSortDirChange,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-3">
      <span className="text-blue-300">Sort by:</span>
      <Button
        variant={sortBy === 'startDate' ? "default" : "outline"}
        size="sm"
        className="text-xs"
        onClick={() => onSortByChange('startDate')}
      >
        Start Date
      </Button>
      <Button
        variant={sortBy === 'status' ? "default" : "outline"}
        size="sm"
        className="text-xs"
        onClick={() => onSortByChange('status')}
      >
        Status
      </Button>
      <Button
        variant={sortBy === 'endDate' ? "default" : "outline"}
        size="sm"
        className="text-xs"
        onClick={() => onSortByChange('endDate')}
      >
        End Date
      </Button>
      <Button
        variant={sortDir === 'asc' ? "default" : "outline"}
        size="sm"
        className="ml-4 text-xs"
        onClick={() => onSortDirChange(sortDir === 'asc' ? 'desc' : 'asc')}
      >
        {sortDir === 'asc' ? 'Ascending' : 'Descending'}
      </Button>
    </div>
  );
};
