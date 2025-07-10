
import React from 'react';
import { Minimize2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FullscreenChatHeaderProps {
  onMinimize: () => void;
  onClose: () => void;
}

export const FullscreenChatHeader: React.FC<FullscreenChatHeaderProps> = ({
  onMinimize,
  onClose
}) => {
  return (
    <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <span className="text-white font-semibold text-lg">M</span>
        </div>
        <div>
          <h1 className="text-white font-semibold text-xl">Maria AI</h1>
          <div className="flex items-center gap-2 text-slate-400">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm">Online</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onMinimize}
          className="text-slate-400 hover:text-white hover:bg-slate-700/50"
        >
          <Minimize2 className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-slate-400 hover:text-white hover:bg-slate-700/50"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
