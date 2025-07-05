
import React from 'react';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'maria';
  timestamp: Date;
  isTyping?: boolean;
  actions?: Array<{
    label: string;
    action: string;
    variant?: 'default' | 'outline' | 'secondary';
  }>;
}

interface ChatMessageProps {
  message: Message;
  onActionClick: (action: string) => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, onActionClick }) => {
  return (
    <div className="space-y-2">
      <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
        <div className={`max-w-[80%] p-3 rounded-2xl ${
          message.sender === 'user'
            ? 'bg-blue-600 text-white'
            : 'bg-slate-800 text-blue-100 border border-blue-500/20'
        }`}>
          <p className="text-sm">{message.text}</p>
          <p className="text-xs opacity-70 mt-1">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>
      
      {message.actions && message.actions.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-start">
          {message.actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant || 'outline'}
              size="sm"
              onClick={() => onActionClick(action.action)}
              className="text-xs h-7 bg-slate-800/50 border-blue-500/30 text-blue-200 hover:bg-blue-600/20"
            >
              <Zap className="w-3 h-3 mr-1" />
              {action.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};
