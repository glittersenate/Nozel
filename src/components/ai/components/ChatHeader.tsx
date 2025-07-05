
import React from 'react';
import { Button } from '@/components/ui/button';
import { Maximize2, Minimize2 } from 'lucide-react';

interface ChatHeaderProps {
  onToggleFullscreen: () => void;
  onClose: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ onToggleFullscreen, onClose }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-purple-200/30 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-sm">M</span>
        </div>
        <div>
          <h3 className="font-semibold text-purple-900 dark:text-purple-100">Maria</h3>
          <p className="text-xs text-purple-600 dark:text-purple-300">HR Assistant ✨</p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleFullscreen}
          className="h-8 w-8 p-0 hover:bg-purple-100 dark:hover:bg-purple-800 text-purple-600 dark:text-purple-300"
        >
          <Maximize2 className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="h-8 w-8 p-0 hover:bg-purple-100 dark:hover:bg-purple-800 text-purple-600 dark:text-purple-300"
        >
          <Minimize2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
