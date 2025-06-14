
import { useState, useEffect } from 'react';
import { TimeEntry, TimeSummary, TimeTrackingState } from '@/types/timeTracking';

export const useTimeTracking = (employeeId: string = 'current-user') => {
  const [state, setState] = useState<TimeTrackingState>({
    isTracking: false,
    isOnBreak: false,
    todayEntries: [],
    weeklyEntries: [],
  });

  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Load existing entries for today and this week
  useEffect(() => {
    loadTimeEntries();
  }, [employeeId]);

  const loadTimeEntries = () => {
    // In a real app, this would fetch from API/database
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

    setState(prev => ({
      ...prev,
      todayEntries: mockEntries.filter(entry => entry.date === today),
      weeklyEntries: mockEntries, // In real app, filter by week
    }));
  };

  const clockIn = (project?: string, task?: string) => {
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

    setState(prev => ({
      ...prev,
      currentEntry: newEntry,
      isTracking: true,
      todayEntries: [...prev.todayEntries, newEntry],
    }));
  };

  const clockOut = () => {
    if (!state.currentEntry) return;

    const now = new Date();
    const updatedEntry = {
      ...state.currentEntry,
      clockOut: now.toTimeString().split(' ')[0].substring(0, 5),
      status: 'clocked-out' as const,
      totalHours: calculateHours(state.currentEntry.clockIn, now.toTimeString().split(' ')[0].substring(0, 5)),
    };

    setState(prev => ({
      ...prev,
      currentEntry: undefined,
      isTracking: false,
      isOnBreak: false,
      todayEntries: prev.todayEntries.map(entry => 
        entry.id === updatedEntry.id ? updatedEntry : entry
      ),
    }));
  };

  const startBreak = () => {
    if (!state.currentEntry) return;

    const now = new Date();
    const updatedEntry = {
      ...state.currentEntry,
      breakStart: now.toTimeString().split(' ')[0].substring(0, 5),
      status: 'on-break' as const,
    };

    setState(prev => ({
      ...prev,
      currentEntry: updatedEntry,
      isOnBreak: true,
    }));
  };

  const endBreak = () => {
    if (!state.currentEntry) return;

    const now = new Date();
    const updatedEntry = {
      ...state.currentEntry,
      breakEnd: now.toTimeString().split(' ')[0].substring(0, 5),
      status: 'clocked-in' as const,
    };

    setState(prev => ({
      ...prev,
      currentEntry: updatedEntry,
      isOnBreak: false,
    }));
  };

  const calculateHours = (start: string, end: string): number => {
    const [startHour, startMin] = start.split(':').map(Number);
    const [endHour, endMin] = end.split(':').map(Number);
    
    const startMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;
    
    return (endMinutes - startMinutes) / 60;
  };

  const getTodaySummary = (): TimeSummary => {
    const totalHours = state.todayEntries.reduce((sum, entry) => sum + (entry.totalHours || 0), 0);
    return {
      totalHours,
      regularHours: Math.min(totalHours, 8),
      overtimeHours: Math.max(totalHours - 8, 0),
      breakHours: 1, // Simplified
      daysWorked: state.todayEntries.length > 0 ? 1 : 0,
      averageHoursPerDay: totalHours,
    };
  };

  const getWeeklySummary = (): TimeSummary => {
    const totalHours = state.weeklyEntries.reduce((sum, entry) => sum + (entry.totalHours || 0), 0);
    const daysWorked = new Set(state.weeklyEntries.map(entry => entry.date)).size;
    
    return {
      totalHours,
      regularHours: Math.min(totalHours, 40),
      overtimeHours: Math.max(totalHours - 40, 0),
      breakHours: daysWorked, // Simplified
      daysWorked,
      averageHoursPerDay: daysWorked > 0 ? totalHours / daysWorked : 0,
    };
  };

  return {
    ...state,
    currentTime,
    clockIn,
    clockOut,
    startBreak,
    endBreak,
    getTodaySummary,
    getWeeklySummary,
  };
};
