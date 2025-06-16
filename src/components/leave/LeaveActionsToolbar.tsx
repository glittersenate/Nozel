
import React from 'react';
import { Button } from '@/components/ui/button';

type LeaveActionsToolbarProps = {
  onExport: () => void;
  onBulkApprove: () => void;
  onAddManual: () => void;
  onViewPolicies: () => void;
};

export const LeaveActionsToolbar: React.FC<LeaveActionsToolbarProps> = ({
  onExport,
  onBulkApprove,
  onAddManual,
  onViewPolicies,
}) => {
  return (
    <div className="flex gap-2 flex-wrap">
      <Button onClick={onExport} className="bg-blue-600 hover:bg-blue-700 text-white" size="sm">
        Export Leave Report
      </Button>
      <Button onClick={onBulkApprove} className="bg-green-600 hover:bg-green-700 text-white" size="sm">
        Bulk Approve Requests
      </Button>
      <Button onClick={onAddManual} variant="outline" className="border-purple-400 text-purple-300" size="sm">
        Add Manual Leave Entry
      </Button>
      <Button onClick={onViewPolicies} variant="secondary" className="bg-gray-800 text-blue-200" size="sm">
        View Leave Policies
      </Button>
    </div>
  );
};
