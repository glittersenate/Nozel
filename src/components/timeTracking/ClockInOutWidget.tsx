
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Clock, Play, Square, Coffee, CoffeeIcon } from 'lucide-react';
import { useTimeTracking } from '@/hooks/useTimeTracking';

export const ClockInOutWidget = () => {
  const {
    isTracking,
    isOnBreak,
    currentTime,
    currentEntry,
    clockIn,
    clockOut,
    startBreak,
    endBreak,
  } = useTimeTracking();

  const [project, setProject] = useState('');
  const [task, setTask] = useState('');

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getStatusBadge = () => {
    if (!isTracking) return <Badge variant="secondary">Not Clocked In</Badge>;
    if (isOnBreak) return <Badge className="bg-orange-500">On Break</Badge>;
    return <Badge className="bg-green-500">Working</Badge>;
  };

  const handleClockIn = () => {
    clockIn(project || undefined, task || undefined);
    setProject('');
    setTask('');
  };

  return (
    <Card className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-800/30">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-white">
          <Clock className="w-5 h-5" />
          Time Clock
        </CardTitle>
        <div className="text-3xl font-mono text-blue-300">
          {formatTime(currentTime)}
        </div>
        {getStatusBadge()}
      </CardHeader>
      <CardContent className="space-y-4">
        {!isTracking ? (
          <div className="space-y-3">
            <Input
              placeholder="Project (optional)"
              value={project}
              onChange={(e) => setProject(e.target.value)}
              className="bg-blue-900/20 border-blue-700/50 text-white placeholder:text-blue-300/50"
            />
            <Input
              placeholder="Task (optional)"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="bg-blue-900/20 border-blue-700/50 text-white placeholder:text-blue-300/50"
            />
            <Button 
              onClick={handleClockIn}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              <Play className="w-4 h-4 mr-2" />
              Clock In
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {currentEntry && (
              <div className="text-sm text-blue-300 space-y-1">
                <p>Started: {currentEntry.clockIn}</p>
                {currentEntry.project && <p>Project: {currentEntry.project}</p>}
                {currentEntry.task && <p>Task: {currentEntry.task}</p>}
              </div>
            )}
            
            <div className="flex gap-2">
              {!isOnBreak ? (
                <>
                  <Button 
                    onClick={startBreak}
                    variant="outline"
                    className="flex-1 border-orange-500/50 text-orange-300 hover:bg-orange-500/20"
                  >
                    <Coffee className="w-4 h-4 mr-2" />
                    Start Break
                  </Button>
                  <Button 
                    onClick={clockOut}
                    className="flex-1 bg-red-600 hover:bg-red-700"
                  >
                    <Square className="w-4 h-4 mr-2" />
                    Clock Out
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    onClick={endBreak}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    End Break
                  </Button>
                  <Button 
                    onClick={clockOut}
                    variant="outline"
                    className="flex-1 border-red-500/50 text-red-300 hover:bg-red-500/20"
                  >
                    <Square className="w-4 h-4 mr-2" />
                    Clock Out
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
