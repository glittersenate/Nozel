
import React, { useRef, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { TypingIndicator } from './TypingIndicator';

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

interface FullscreenChatMessagesProps {
  messages: Message[];
  isTyping: boolean;
  onActionClick: (action: string) => void;
}

export const FullscreenChatMessages: React.FC<FullscreenChatMessagesProps> = ({
  messages,
  isTyping,
  onActionClick
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <ScrollArea className="flex-1 px-6 py-4">
      <div className="w-full space-y-6">
        {messages.map((message) => (
          <div key={message.id} className="space-y-4">
            <div className={`flex items-start gap-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {message.sender === 'maria' && (
                <Avatar className="h-10 w-10 mt-1 flex-shrink-0">
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold">M</AvatarFallback>
                </Avatar>
              )}
              <div className={`max-w-2xl rounded-2xl px-6 py-4 ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800/60 text-slate-100 border border-slate-700/50'
              }`}>
                <p className="text-base leading-relaxed">{message.text}</p>
                <p className="text-sm opacity-70 mt-2">
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
            
            {message.actions && message.actions.length > 0 && (
              <div className="flex flex-wrap gap-3 ml-14">
                {message.actions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => onActionClick(action.action)}
                    className="bg-slate-800/40 border-slate-600/50 text-slate-300 hover:bg-slate-700/50 hover:text-white"
                  >
                    ⚡ {action.label}
                  </Button>
                ))}
              </div>
            )}
          </div>
        ))}
        
        {isTyping && (
          <div className="flex items-start gap-4">
            <Avatar className="h-10 w-10 mt-1 flex-shrink-0">
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold">M</AvatarFallback>
            </Avatar>
            <TypingIndicator />
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
};
