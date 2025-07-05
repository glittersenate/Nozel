
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Mic, MicOff, Maximize2, Minimize2, Upload, FileText, Zap, Settings, BookOpen, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { EnhancedChatInterface } from './EnhancedChatInterface';
import { MariaService } from '@/services/mariaService';
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

interface ChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
}

const quickSuggestions = [
  "Add new employee",
  "Run payroll report",
  "Check leave requests", 
  "Show team performance"
];

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Maria, your HR assistant. I can help you manage employees, process payroll, handle leave requests, and generate reports. What would you like to do today?",
      sender: 'maria',
      timestamp: new Date(),
      actions: [
        { label: 'Add Employee', action: 'add_employee' },
        { label: 'View Reports', action: 'view_reports' },
        { label: 'Help', action: 'help', variant: 'outline' },
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() && uploadedFiles.length === 0) return;

    setShowSuggestions(false);
    let messageText = inputValue;
    if (uploadedFiles.length > 0) {
      messageText += `\n\nAttached files: ${uploadedFiles.map(f => f.name).join(', ')}`;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setUploadedFiles([]);
    setIsTyping(true);

    try {
      const command = MariaService.parseCommand(inputValue);
      let response = "I understand you're looking for help with HR tasks. Could you be more specific about what you'd like to accomplish?";
      
      if (command) {
        response = await MariaService.executeCommand(command);
      }

      setTimeout(() => {
        const mariaResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: response,
          sender: 'maria',
          timestamp: new Date(),
          actions: generateContextualActions(inputValue)
        };
        setMessages(prev => [...prev, mariaResponse]);
        setIsTyping(false);
      }, 800 + Math.random() * 600);
    } catch (error) {
      console.error('Error processing message:', error);
      setIsTyping(false);
    }
  };

  const generateContextualActions = (input: string): Array<{label: string; action: string; variant?: 'default' | 'outline' | 'secondary'}> => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('payroll') || lowerInput.includes('salary')) {
      return [
        { label: 'View Payroll', action: 'view_payroll' },
        { label: 'Run Payroll', action: 'run_payroll' }
      ];
    }
    
    if (lowerInput.includes('employee') || lowerInput.includes('staff')) {
      return [
        { label: 'Add Employee', action: 'add_employee' },
        { label: 'View Employees', action: 'view_employees' }
      ];
    }

    if (lowerInput.includes('leave') || lowerInput.includes('vacation')) {
      return [
        { label: 'Leave Requests', action: 'leave_requests' },
        { label: 'Leave Calendar', action: 'leave_calendar' }
      ];
    }
    
    return [
      { label: 'Quick Help', action: 'help', variant: 'outline' }
    ];
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const handleActionClick = (action: string) => {
    const actionMessages: Record<string, string> = {
      add_employee: "I'll help you add a new employee. Please provide their name, email, department, and salary.",
      run_payroll: "Let me guide you through running payroll for this period.",
      view_reports: "Here are the available reports you can generate.",
      view_payroll: "Opening payroll dashboard...",
      view_employees: "Showing employee directory...",
      leave_requests: "Displaying pending leave requests...",
      leave_calendar: "Opening leave calendar...",
      help: "I can help you with: Managing employees, Processing payroll, Handling leave requests, Generating reports, and much more. What specific task do you need help with?"
    };

    if (actionMessages[action]) {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: actionMessages[action],
        sender: 'maria',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setShowSuggestions(false);
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, isFullscreen, onClose]);

  if (!isOpen) return null;

  if (isFullscreen) {
    return (
      <EnhancedChatInterface
        messages={messages}
        inputValue={inputValue}
        setInputValue={setInputValue}
        isTyping={isTyping}
        isListening={isListening}
        uploadedFiles={uploadedFiles}
        setUploadedFiles={setUploadedFiles}
        onSendMessage={handleSendMessage}
        onFileUpload={handleFileUpload}
        onToggleVoice={toggleVoiceInput}
        onActionClick={handleActionClick}
        onClose={() => setIsFullscreen(false)}
        onMinimize={() => setIsFullscreen(false)}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-end p-4 pointer-events-none">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl w-96 h-[500px] pointer-events-auto flex flex-col">
        {/* Simplified Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">M</span>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">Maria</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">HR Assistant</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFullscreen}
              className="h-8 w-8 p-0 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Minimize2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Messages Area */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <ChatMessage 
                key={message.id} 
                message={message} 
                onActionClick={handleActionClick} 
              />
            ))}
            
            {isTyping && <TypingIndicator />}
            
            {/* Quick Suggestions */}
            {showSuggestions && messages.length <= 1 && (
              <div className="space-y-2">
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Quick suggestions:</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickSuggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="h-8 text-xs justify-start hover:bg-blue-50 dark:hover:bg-blue-950"
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* File Upload Area */}
        {uploadedFiles.length > 0 && (
          <div className="px-4 py-2 border-t border-slate-200 dark:border-slate-700">
            <div className="flex flex-wrap gap-2">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-md px-2 py-1">
                  <FileText className="w-3 h-3 text-slate-500" />
                  <span className="text-xs text-slate-600 dark:text-slate-300 truncate max-w-20">{file.name}</span>
                  <button
                    onClick={() => setUploadedFiles(prev => prev.filter((_, i) => i !== index))}
                    className="text-slate-400 hover:text-red-500 text-sm"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Simplified Input */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask Maria for help..."
              className="flex-1"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.png,.jpg,.jpeg"
            />
            <Button
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="h-9 w-9 p-0"
            >
              <Upload className="w-4 h-4" />
            </Button>
            <Button 
              size="sm" 
              onClick={handleSendMessage} 
              disabled={!inputValue.trim() && uploadedFiles.length === 0}
              className="h-9 w-9 p-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
