
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
    <div className="space-y-3">
      <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
        <div className={`max-w-[85%] ${
          message.sender === 'user'
            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl rounded-br-md shadow-lg'
            : 'bg-slate-800/80 text-slate-100 border border-slate-700/50 rounded-2xl rounded-bl-md shadow-lg backdrop-blur-sm'
        } p-4 transition-all duration-200 hover:shadow-xl`}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
          <p className="text-xs opacity-70 mt-2 text-right">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>
      
      {message.actions && message.actions.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-start animate-fade-in">
          {message.actions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => onActionClick(action.action)}
              className="text-xs h-8 bg-slate-800/50 border-slate-600/50 text-slate-300 hover:bg-slate-700/50 hover:border-blue-500/50 hover:text-blue-300 hover:scale-105 transition-all duration-200 backdrop-blur-sm shadow-lg"
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
