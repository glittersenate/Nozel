
import { create } from "zustand";
import { LeaveRequest, LeaveBalance } from "@/types/leave";

type LeaveStore = {
  // State
  leaveRequests: LeaveRequest[];
  leaveBalance: LeaveBalance | null;
  
  // Actions
  loadLeaveData: (employeeId: string) => void;
  approveLeave: (id: string) => void;
  rejectLeave: (id: string) => void;
  bulkApprove: (ids: string[]) => void;
  addManualLeave: (request: Omit<LeaveRequest, 'id' | 'requestedAt' | 'status'>) => void;
  getLeaveBalance: () => LeaveBalance;
};

// Mock data
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

export const useLeaveStore = create<LeaveStore>((set, get) => ({
  // Initial state
  leaveRequests: [],
  leaveBalance: null,

  // Actions
  loadLeaveData: (employeeId: string) => {
    set({
      leaveRequests: mockRequests,
      leaveBalance: mockBalance,
    });
  },

  approveLeave: (id: string) => {
    set(state => ({
      leaveRequests: state.leaveRequests.map(request =>
        request.id === id ? { ...request, status: 'approved' as const } : request
      ),
    }));
  },

  rejectLeave: (id: string) => {
    set(state => ({
      leaveRequests: state.leaveRequests.map(request =>
        request.id === id ? { ...request, status: 'rejected' as const } : request
      ),
    }));
  },

  bulkApprove: (ids: string[]) => {
    set(state => ({
      leaveRequests: state.leaveRequests.map(request =>
        ids.includes(request.id) ? { ...request, status: 'approved' as const } : request
      ),
    }));
  },

  addManualLeave: (request: Omit<LeaveRequest, 'id' | 'requestedAt' | 'status'>) => {
    const newRequest: LeaveRequest = {
      ...request,
      id: Date.now().toString(),
      requestedAt: new Date().toISOString(),
      status: 'approved',
    };
    set(state => ({
      leaveRequests: [newRequest, ...state.leaveRequests],
    }));
  },

  getLeaveBalance: (): LeaveBalance => {
    const state = get();
    return state.leaveBalance || {
      employeeId: 'current-user',
      vacation: { accrued: 0, used: 0, remaining: 0 },
      sick: { accrued: 0, used: 0, remaining: 0 },
      personal: { accrued: 0, used: 0, remaining: 0 },
      year: 2024,
    };
  },
}));
