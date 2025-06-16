
import { create } from "zustand";
import { TimeEntry, TimeSummary, TimeTrackingState } from "@/types/timeTracking";

type TimeTrackingStore = {
  // State
  currentEntry?: TimeEntry;
  isTracking: boolean;
  isOnBreak: boolean;
  todayEntries: TimeEntry[];
  weeklyEntries: TimeEntry[];
  
  // Actions
  clockIn: (employeeId: string, project?: string, task?: string) => void;
  clockOut: () => void;
  startBreak: () => void;
  endBreak: () => void;
  loadTimeEntries: (employeeId: string) => void;
  getTodaySummary: () => TimeSummary;
  getWeeklySummary: () => TimeSummary;
};

const calculateHours = (start: string, end: string): number => {
  const [startHour, startMin] = start.split(':').map(Number);
  const [endHour, endMin] = end.split(':').map(Number);
  
  const startMinutes = startHour * 60 + startMin;
  const endMinutes = endHour * 60 + endMin;
  
  return (endMinutes - startMinutes) / 60;
};

export const useTimeTrackingStore = create<TimeTrackingStore>((set, get) => ({
  // Initial state
  currentEntry: undefined,
  isTracking: false,
  isOnBreak: false,
  todayEntries: [],
  weeklyEntries: [],

  // Actions
  loadTimeEntries: (employeeId: string) => {
    const today = new Date().toISOString().split('T')[0];
    const mockEntries: TimeEntry[] = [
      {
        id: '1',
        employeeId,
        date: today,
        clockIn: '09:00',
        clockOut: '17:30',
        breakStart: '12:00',
        breakEnd: '13:00',
        project: 'Project Alpha',
        task: 'Development',
        status: 'clocked-out',
        totalHours: 7.5,
        overtimeHours: 0,
      }
    ];

    set({
      todayEntries: mockEntries.filter(entry => entry.date === today),
      weeklyEntries: mockEntries,
    });
  },

  clockIn: (employeeId: string, project?: string, task?: string) => {
    const now = new Date();
    const newEntry: TimeEntry = {
      id: Date.now().toString(),
      employeeId,
      date: now.toISOString().split('T')[0],
      clockIn: now.toTimeString().split(' ')[0].substring(0, 5),
      project,
      task,
      status: 'clocked-in',
    };

    set(state => ({
      currentEntry: newEntry,
      isTracking: true,
      todayEntries: [...state.todayEntries, newEntry],
    }));
  },

  clockOut: () => {
    const state = get();
    if (!state.currentEntry) return;

    const now = new Date();
    const updatedEntry = {
      ...state.currentEntry,
      clockOut: now.toTimeString().split(' ')[0].substring(0, 5),
      status: 'clocked-out' as const,
      totalHours: calculateHours(state.currentEntry.clockIn, now.toTimeString().split(' ')[0].substring(0, 5)),
    };

    set(state => ({
      currentEntry: undefined,
      isTracking: false,
      isOnBreak: false,
      todayEntries: state.todayEntries.map(entry => 
        entry.id === updatedEntry.id ? updatedEntry : entry
      ),
    }));
  },

  startBreak: () => {
    const state = get();
    if (!state.currentEntry) return;

    const now = new Date();
    const updatedEntry = {
      ...state.currentEntry,
      breakStart: now.toTimeString().split(' ')[0].substring(0, 5),
      status: 'on-break' as const,
    };

    set({
      currentEntry: updatedEntry,
      isOnBreak: true,
    });
  },

  endBreak: () => {
    const state = get();
    if (!state.currentEntry) return;

    const now = new Date();
    const updatedEntry = {
      ...state.currentEntry,
      breakEnd: now.toTimeString().split(' ')[0].substring(0, 5),
      status: 'clocked-in' as const,
    };

    set({
      currentEntry: updatedEntry,
      isOnBreak: false,
    });
  },

  getTodaySummary: (): TimeSummary => {
    const state = get();
    const totalHours = state.todayEntries.reduce((sum, entry) => sum + (entry.totalHours || 0), 0);
    return {
      totalHours,
      regularHours: Math.min(totalHours, 8),
      overtimeHours: Math.max(totalHours - 8, 0),
      breakHours: 1,
      daysWorked: state.todayEntries.length > 0 ? 1 : 0,
      averageHoursPerDay: totalHours,
    };
  },

  getWeeklySummary: (): TimeSummary => {
    const state = get();
    const totalHours = state.weeklyEntries.reduce((sum, entry) => sum + (entry.totalHours || 0), 0);
    const daysWorked = new Set(state.weeklyEntries.map(entry => entry.date)).size;
    
    return {
      totalHours,
      regularHours: Math.min(totalHours, 40),
      overtimeHours: Math.max(totalHours - 40, 0),
      breakHours: daysWorked,
      daysWorked,
      averageHoursPerDay: daysWorked > 0 ? totalHours / daysWorked : 0,
    };
  },
}));
