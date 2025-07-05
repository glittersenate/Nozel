
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Square, Zap } from 'lucide-react';

interface DemoModeToggleProps {
  onToggle: (isActive: boolean) => void;
}

export const DemoModeToggle: React.FC<DemoModeToggleProps> = ({ onToggle }) => {
  const [isActive, setIsActive] = useState(false);
  const [demoTimer, setDemoTimer] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => {
        setDemoTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const handleToggle = () => {
    const newState = !isActive;
    setIsActive(newState);
    setDemoTimer(0);
    onToggle(newState);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center gap-3">
      <Button
        onClick={handleToggle}
        variant={isActive ? "destructive" : "default"}
        size="sm"
        className={`
          transition-all duration-300 flex items-center gap-2
          ${isActive 
            ? 'bg-red-600 hover:bg-red-700 animate-pulse' 
            : 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700'
          }
        `}
      >
        {isActive ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        {isActive ? 'Stop Demo' : 'Start Demo'}
      </Button>
      
      {isActive && (
        <div className="flex items-center gap-2">
          <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
            <Zap className="w-3 h-3 mr-1" />
            LIVE DEMO
          </Badge>
          <span className="text-sm text-blue-300 font-mono">
            {formatTime(demoTimer)}
          </span>
        </div>
      )}
    </div>
  );
};
