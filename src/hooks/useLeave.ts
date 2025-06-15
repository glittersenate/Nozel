
import { useState, useEffect } from 'react';
import { LeaveRequest, LeaveBalance } from '@/types/leave';

export const useLeave = () => {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [leaveBalance, setLeaveBalance] = useState<LeaveBalance | null>(null);

  useEffect(() => {
    // Mock data - in a real app, this would fetch from API
    const mockRequests: LeaveRequest[] = [
      {
        id: '1',
        employeeId: 'current-user',
        type: 'vacation',
        startDate: '2024-03-15',
        endDate: '2024-03-19',
        days: 5,
        status: 'approved',
        requestedAt: '2024-03-01T10:00:00Z',
        reviewedBy: 'manager1',
        reviewedAt: '2024-03-02T10:00:00Z',
      },
      {
        id: '2',
        employeeId: 'current-user',
        type: 'sick',
        startDate: '2024-02-20',
        endDate: '2024-02-20',
        days: 1,
        status: 'approved',
        requestedAt: '2024-02-20T08:00:00Z',
        reviewedBy: 'manager1',
        reviewedAt: '2024-02-20T09:00:00Z',
      },
      {
        id: '3',
        employeeId: 'current-user',
        type: 'personal',
        startDate: '2024-03-25',
        endDate: '2024-03-25',
        days: 1,
        status: 'pending',
        requestedAt: '2024-03-10T10:00:00Z',
      },
    ];

    const mockBalance: LeaveBalance = {
      employeeId: 'current-user',
      vacation: {
        accrued: 20,
        used: 5,
        remaining: 15,
      },
      sick: {
        accrued: 10,
        used: 1,
        remaining: 9,
      },
      personal: {
        accrued: 5,
        used: 0,
        remaining: 5,
      },
      year: 2024,
    };

    setLeaveRequests(mockRequests);
    setLeaveBalance(mockBalance);
  }, []);

  const getLeaveBalance = () => {
    return leaveBalance || {
      employeeId: 'current-user',
      vacation: { accrued: 0, used: 0, remaining: 0 },
      sick: { accrued: 0, used: 0, remaining: 0 },
      personal: { accrued: 0, used: 0, remaining: 0 },
      year: 2024,
    };
  };

  // Placeholder for approve/reject functionality.
  // In a real app, these would update the request status in DB.
  // For now, they simply update UI state.
  const approveLeave = (id: string) => {
    setLeaveRequests((prev) =>
      prev.map((r) => r.id === id ? { ...r, status: 'approved' } : r)
    );
  };
  const rejectLeave = (id: string) => {
    setLeaveRequests((prev) =>
      prev.map((r) => r.id === id ? { ...r, status: 'rejected' } : r)
    );
  };
  const bulkApprove = (ids: string[]) => {
    setLeaveRequests((prev) =>
      prev.map((r) => ids.includes(r.id) ? { ...r, status: 'approved' } : r)
    );
  };
  // Optional: Add Manual Entry method
  const addManualLeave = (request: Omit<LeaveRequest, 'id' | 'requestedAt' | 'status'>) => {
    const newRequest: LeaveRequest = {
      ...request,
      id: Date.now().toString(),
      requestedAt: new Date().toISOString(),
      status: 'approved',
    };
    setLeaveRequests(prev => [newRequest, ...prev]);
  };

  return {
    leaveRequests,
    getLeaveBalance,
    approveLeave,
    rejectLeave,
    bulkApprove,
    addManualLeave,
  };
};
