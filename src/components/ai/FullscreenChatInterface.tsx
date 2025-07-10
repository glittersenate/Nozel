import React, { useRef, useEffect } from 'react';
import { Send, Upload, Mic, Minimize2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ChatMessage } from './components/ChatMessage';
import { TypingIndicator } from './components/TypingIndicator';

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

interface FullscreenChatInterfaceProps {
  messages: Message[];
  inputValue: string;
  setInputValue: (value: string) => void;
  isTyping: boolean;
  isListening: boolean;
  uploadedFiles: File[];
  setUploadedFiles: (files: File[]) => void;
  onSendMessage: () => void;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleVoice: () => void;
  onActionClick: (action: string) => void;
  onClose: () => void;
  onMinimize: () => void;
}

const quickActions = [
  { label: 'Add Employee', action: 'add_employee' },
  { label: 'Run Payroll', action: 'run_payroll' },
  { label: 'View Reports', action: 'view_reports' }
];

export const FullscreenChatInterface: React.FC<FullscreenChatInterfaceProps> = ({
  messages,
  inputValue,
  setInputValue,
  isTyping,
  isListening,
  uploadedFiles,
  setUploadedFiles,
  onSendMessage,
  onFileUpload,
  onToggleVoice,
  onActionClick,
  onClose,
  onMinimize
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900 flex flex-col">
      {/* Header */}
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

      {/* Messages Area */}
      <ScrollArea className="flex-1 px-6 py-4">
        <div className="max-w-4xl mx-auto space-y-6">
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

      {/* Input Area */}
      <div className="border-t border-slate-700/50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 bg-slate-800/60 rounded-2xl px-6 py-4 border border-slate-700/50">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask Maria anything about HR, payroll, employees..."
              className="bg-transparent border-0 text-white placeholder:text-slate-400 focus:ring-0 text-base flex-1"
              onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
            />
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={onFileUpload}
              className="hidden"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.png,.jpg,.jpeg"
            />
            <Button
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              variant="ghost"
              className="text-slate-400 hover:text-white hover:bg-slate-700/50"
            >
              <Upload className="w-5 h-5" />
            </Button>
            <Button
              size="sm"
              onClick={onToggleVoice}
              variant="ghost"
              className="text-slate-400 hover:text-white hover:bg-slate-700/50"
            >
              <Mic className="w-5 h-5" />
            </Button>
            <Button 
              size="sm" 
              onClick={onSendMessage} 
              disabled={!inputValue.trim() && uploadedFiles.length === 0}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
          
          {/* Quick Actions */}
          <div className="mt-4">
            <p className="text-slate-400 mb-3 text-sm">Quick actions:</p>
            <div className="flex flex-wrap gap-3">
              {quickActions.map((action) => (
                <Button
                  key={action.action}
                  variant="outline"
                  size="sm"
                  onClick={() => onActionClick(action.action)}
                  className="bg-slate-800/40 border-slate-600/50 text-slate-300 hover:bg-slate-700/50 hover:text-white"
                >
                  ⚡ {action.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
