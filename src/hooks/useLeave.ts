
import { useEffect } from 'react';
import { useLeaveStore } from '@/store/leaveStore';

export const useLeave = () => {
  const {
    leaveRequests,
    loadLeaveData,
    approveLeave,
    rejectLeave,
    bulkApprove,
    addManualLeave,
    getLeaveBalance,
  } = useLeaveStore();

  useEffect(() => {
    loadLeaveData('current-user');
  }, [loadLeaveData]);

  return {
    leaveRequests,
    getLeaveBalance,
    approveLeave,
    rejectLeave,
    bulkApprove,
    addManualLeave,
  };
};
