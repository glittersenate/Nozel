
import React from 'react';
import { Button } from '@/components/ui/button';

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
    <div className="space-y-3">
      <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
        <div className={`max-w-[85%] p-3 rounded-lg ${
          message.sender === 'user'
            ? 'bg-blue-600 text-white'
            : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700'
        }`}>
          <p className="text-sm leading-relaxed">{message.text}</p>
          <p className="text-xs opacity-70 mt-2">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
          </p>
        </div>
      </div>
      
      {message.actions && message.actions.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-start">
          {message.actions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => onActionClick(action.action)}
              className="text-xs h-8 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {action.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};
