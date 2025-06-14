
export interface TimeEntry {
  id: string;
  employeeId: string;
  date: string;
  clockIn: string;
  clockOut?: string;
  breakStart?: string;
  breakEnd?: string;
  project?: string;
  task?: string;
  notes?: string;
  status: 'clocked-in' | 'on-break' | 'clocked-out';
  totalHours?: number;
  overtimeHours?: number;
  isManualEntry?: boolean;
  approvedBy?: string;
  approvedAt?: string;
}

export interface TimeSummary {
  totalHours: number;
  regularHours: number;
  overtimeHours: number;
  breakHours: number;
  daysWorked: number;
  averageHoursPerDay: number;
}

export interface TimeTrackingState {
  currentEntry?: TimeEntry;
  isTracking: boolean;
  isOnBreak: boolean;
  todayEntries: TimeEntry[];
  weeklyEntries: TimeEntry[];
}
