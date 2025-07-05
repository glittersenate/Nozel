
import React, { useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatMessage } from './components/ChatMessage';
import { TypingIndicator } from './components/TypingIndicator';
import { EnhancedSidebar } from './components/EnhancedSidebar';

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

interface EnhancedChatInterfaceProps {
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

export const EnhancedChatInterface: React.FC<EnhancedChatInterfaceProps> = ({
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
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 flex">
      <EnhancedSidebar
        onActionClick={onActionClick}
        uploadedFiles={uploadedFiles}
        setUploadedFiles={setUploadedFiles}
        setInputValue={setInputValue}
        onMinimize={onMinimize}
        fileInputRef={fileInputRef}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        {/* Chat Messages */}
        <ScrollArea className="flex-1 p-6">
          <div className="max-w-4xl mx-auto space-y-4">
            {messages.map((message) => (
              <ChatMessage 
                key={message.id} 
                message={message} 
                onActionClick={onActionClick} 
              />
            ))}
            
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t border-purple-200/50 dark:border-purple-700/50 p-4 bg-gradient-to-r from-purple-50/80 to-pink-50/80 dark:from-purple-950/50 dark:to-pink-950/50 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 bg-white/90 dark:bg-slate-800/90 rounded-lg p-3 border border-purple-200/50 dark:border-purple-700/50 shadow-lg">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask Maria about employees, payroll, reports... ✨"
                className="bg-transparent border-0 text-base focus:ring-0 shadow-none text-purple-900 dark:text-purple-100 placeholder:text-purple-500"
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
                className="hover:bg-purple-100 dark:hover:bg-purple-800 text-purple-600 dark:text-purple-300"
              >
                <Upload className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                onClick={onToggleVoice}
                variant={isListening ? "default" : "ghost"}
                className={isListening ? 'bg-red-500 hover:bg-red-600 text-white' : 'hover:bg-purple-100 dark:hover:bg-purple-800 text-purple-600 dark:text-purple-300'}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </Button>
              <Button 
                size="sm" 
                onClick={onSendMessage} 
                disabled={!inputValue.trim() && uploadedFiles.length === 0}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
