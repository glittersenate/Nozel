
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Mic, MicOff, Maximize2, Upload, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FullscreenChatInterface } from './FullscreenChatInterface';
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
  onMaximizedClose?: () => void;
  startMinimized?: boolean;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  isOpen, 
  onClose,
  onMaximizedClose,
  startMinimized = false
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm Maria, your AI HR assistant. I can help you with employee management, payroll, leave requests, and more. What would you like to do today?",
      sender: 'maria',
      timestamp: new Date(),
      actions: [
        { label: 'Add Employee', action: 'add_employee', variant: 'outline' },
        { label: 'Run Payroll', action: 'run_payroll', variant: 'outline' },
        { label: 'View Reports', action: 'view_reports', variant: 'outline' },
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(!startMinimized);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Handle clicking outside to close minimized chat
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!isFullscreen && isOpen && chatContainerRef.current && 
          !chatContainerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen && !isFullscreen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, isFullscreen, onClose]);

  // Handle sending message
  const handleSendMessage = async () => {
    if (!inputValue.trim() && uploadedFiles.length === 0) return;

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

    // Process command with Maria service
    try {
      const command = MariaService.parseCommand(inputValue);
      let response = "I understand you're looking for help with HR tasks. Could you be more specific?";
      
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
      }, 1000 + Math.random() * 1000);
    } catch (error) {
      console.error('Error processing message:', error);
      setIsTyping(false);
    }
  };

  // Generate contextual action buttons
  const generateContextualActions = (input: string): Array<{label: string; action: string; variant?: 'default' | 'outline' | 'secondary'}> => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('payroll')) {
      return [
        { label: 'View Payroll', action: 'view_payroll' },
        { label: 'Add Employee', action: 'add_employee', variant: 'outline' }
      ];
    }
    
    if (lowerInput.includes('performance')) {
      return [
        { label: 'Performance Dashboard', action: 'performance_dashboard' },
        { label: 'Schedule Review', action: 'schedule_review', variant: 'outline' }
      ];
    }
    
    return [
      { label: 'Quick Actions', action: 'quick_actions', variant: 'outline' },
      { label: 'Help', action: 'help', variant: 'secondary' }
    ];
  };

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  // Handle action button clicks
  const handleActionClick = (action: string) => {
    const actionMessages: Record<string, string> = {
      add_employee: "I'll help you add a new employee. Please provide their details.",
      run_payroll: "Let me guide you through running payroll for this period.",
      view_reports: "Here are the available reports you can generate.",
      view_payroll: "Redirecting to payroll dashboard...",
      performance_dashboard: "Opening performance analytics...",
      schedule_review: "Let's schedule a performance review.",
      quick_actions: "Here are some quick actions you can perform:",
      help: "I'm here to help! What would you like assistance with?"
    };

    if (actionMessages[action]) {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: actionMessages[action],
        sender: 'user',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);
    }
  };

  // Toggle voice input
  const toggleVoiceInput = () => {
    setIsListening(!isListening);
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Handle fullscreen close
  const handleFullscreenClose = () => {
    if (onMaximizedClose) {
      onMaximizedClose();
    } else {
      onClose();
    }
  };

  // Close with escape key
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

  // Render fullscreen version with full stretch
  if (isFullscreen) {
    return (
      <FullscreenChatInterface
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
        onClose={handleFullscreenClose}
        onMinimize={() => setIsFullscreen(false)}
      />
    );
  }

  // Render minimized version with click-outside-to-close
  return (
    <div className="fixed inset-0 z-40 flex items-end justify-end p-4 pointer-events-none">
      <div 
        ref={chatContainerRef}
        className="bg-slate-900/95 backdrop-blur-xl border border-blue-500/20 rounded-2xl shadow-2xl w-96 h-[500px] pointer-events-auto animate-scale-in"
      >
        {/* Header */}
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
              onClick={toggleFullscreen}
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

        {/* Messages */}
        <ScrollArea className="flex-1 h-[360px] p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <ChatMessage 
                key={message.id} 
                message={message} 
                onActionClick={handleActionClick} 
              />
            ))}
            
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* File Upload Area */}
        {uploadedFiles.length > 0 && (
          <div className="px-4 py-2 border-t border-blue-500/20">
            <div className="flex flex-wrap gap-2">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center gap-2 bg-slate-800 rounded-lg px-2 py-1">
                  <FileText className="w-3 h-3 text-blue-400" />
                  <span className="text-xs text-blue-200 truncate max-w-20">{file.name}</span>
                  <button
                    onClick={() => setUploadedFiles(prev => prev.filter((_, i) => i !== index))}
                    className="text-blue-400 hover:text-red-400"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-blue-500/20">
          <div className="flex items-center gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask Maria anything..."
              className="bg-slate-800 border-blue-500/30 text-white placeholder:text-blue-300/50"
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
              className="border-blue-500/30 hover:bg-blue-600/20"
            >
              <Upload className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              onClick={toggleVoiceInput}
              variant={isListening ? "default" : "outline"}
              className={`${isListening ? 'bg-red-600 hover:bg-red-700' : 'border-blue-500/30 hover:bg-blue-600/20'}`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </Button>
            <Button size="sm" onClick={handleSendMessage} disabled={!inputValue.trim() && uploadedFiles.length === 0}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
