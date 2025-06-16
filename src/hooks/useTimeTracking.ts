
import { useState, useEffect } from 'react';
import { useTimeTrackingStore } from '@/store/timeTrackingStore';

export const useTimeTracking = (employeeId: string = 'current-user') => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const {
    currentEntry,
    isTracking,
    isOnBreak,
    todayEntries,
    weeklyEntries,
    clockIn: storeClockIn,
    clockOut,
    startBreak,
    endBreak,
    loadTimeEntries,
    getTodaySummary,
    getWeeklySummary,
  } = useTimeTrackingStore();

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Load existing entries for today and this week
  useEffect(() => {
    loadTimeEntries(employeeId);
  }, [employeeId, loadTimeEntries]);

  const clockIn = (project?: string, task?: string) => {
    storeClockIn(employeeId, project, task);
  };

  return {
    currentEntry,
    isTracking,
    isOnBreak,
    todayEntries,
    weeklyEntries,
    currentTime,
    clockIn,
    clockOut,
    startBreak,
    endBreak,
    getTodaySummary,
    getWeeklySummary,
  };
};
