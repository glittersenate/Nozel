
import React from 'react';
import { Maximize2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatHeaderProps {
  onMaximize: () => void;
  onClose: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ onMaximize, onClose }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-blue-500/20">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">M</span>
        </div>
        <div>
          <h3 className="text-white font-semibold">Maria</h3>
          <p className="text-blue-300/70 text-xs">AI HR Assistant</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onMaximize}
          className="text-blue-300 hover:text-white hover:bg-blue-600/20"
        >
          <Maximize2 className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-blue-300 hover:text-white hover:bg-blue-600/20"
        >
          ×
        </Button>
      </div>
    </div>
  );
};
