import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Mic, MicOff, Maximize2, Minimize2, Upload, FileText, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
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

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Maria, your AI HR assistant. I can help you with employee management, payroll, leave requests, and more. Try saying something like 'Add Joey to payroll at 20K monthly' or 'Show me performance reviews'.",
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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatInterfaceRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

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

  // Click outside to close functionality for minimized chat
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatInterfaceRef.current && !chatInterfaceRef.current.contains(event.target as Node)) {
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

  // Render fullscreen version
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

  // Render minimized version with enhanced styling
  return (
    <div className="fixed inset-0 z-40 flex items-end justify-end p-6 pointer-events-none">
      <div 
        ref={chatInterfaceRef}
        className="bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl w-[420px] h-[600px] pointer-events-auto animate-scale-in overflow-hidden"
      >
        {/* Enhanced Header */}
        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-slate-800/90 to-slate-700/90 border-b border-slate-600/30">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              </div>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Maria</h3>
              <p className="text-slate-400 text-sm font-medium">AI HR Assistant</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFullscreen}
              className="text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200"
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-slate-400 hover:text-white hover:bg-red-600/20 rounded-lg transition-all duration-200"
            >
              ✕
            </Button>
          </div>
        </div>

        {/* Messages with enhanced styling */}
        <ScrollArea className="flex-1 h-[420px] p-6 bg-gradient-to-b from-slate-900/30 to-slate-800/50">
          <div className="space-y-6">
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

        {/* Enhanced File Upload Area */}
        {uploadedFiles.length > 0 && (
          <div className="px-6 py-3 border-t border-slate-700/30 bg-slate-800/30">
            <div className="flex flex-wrap gap-2">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center gap-2 bg-slate-700/60 rounded-lg px-3 py-2 border border-slate-600/50">
                  <FileText className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-slate-200 truncate max-w-24 font-medium">{file.name}</span>
                  <button
                    onClick={() => setUploadedFiles(prev => prev.filter((_, i) => i !== index))}
                    className="text-slate-400 hover:text-red-400 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Enhanced Input Area */}
        <div className="p-6 border-t border-slate-700/30 bg-slate-800/40">
          <div className="flex items-center gap-3">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask Maria anything..."
              className="bg-slate-700/60 border-slate-600/50 text-white placeholder:text-slate-400 rounded-xl font-medium focus:border-blue-500/50 transition-all duration-200"
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
              className="bg-slate-700/80 hover:bg-slate-600/80 border border-slate-600/50 rounded-xl transition-all duration-200"
            >
              <Upload className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              onClick={toggleVoiceInput}
              className={`${isListening ? 'bg-red-600 hover:bg-red-700' : 'bg-slate-700/80 hover:bg-slate-600/80 border border-slate-600/50'} rounded-xl transition-all duration-200`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </Button>
            <Button 
              size="sm" 
              onClick={handleSendMessage} 
              disabled={!inputValue.trim() && uploadedFiles.length === 0}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl transition-all duration-200 shadow-lg"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
