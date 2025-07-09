
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Mic, MicOff, Maximize2, Minimize2, Upload, FileText, Zap, Sparkles, User } from 'lucide-react';
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
      text: "Hello! I'm Maria, your AI assistant. I can help you with HR tasks, employee management, payroll processing, and much more. How can I assist you today?",
      sender: 'maria',
      timestamp: new Date(),
      actions: [
        { label: 'Add Employee', action: 'add_employee', variant: 'outline' },
        { label: 'Run Payroll', action: 'run_payroll', variant: 'outline' },
        { label: 'View Analytics', action: 'view_reports', variant: 'outline' },
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
      let response = "I understand you're looking for help with HR tasks. Could you be more specific about what you'd like me to help you with?";
      
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

  // Render minimized version with premium styling
  return (
    <div className="fixed inset-0 z-40 flex items-end justify-end p-4 pointer-events-none">
      <div className="bg-slate-950/95 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl w-96 h-[520px] pointer-events-auto animate-scale-in overflow-hidden">
        {/* Premium Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-700/50 bg-gradient-to-r from-slate-900/50 to-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-950"></div>
            </div>
            <div>
              <h3 className="text-white font-semibold text-base">Maria</h3>
              <p className="text-slate-400 text-xs flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Online • AI Assistant
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFullscreen}
              className="text-slate-400 hover:text-white hover:bg-slate-700/50 w-8 h-8 p-0"
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-slate-400 hover:text-white hover:bg-red-500/20 w-8 h-8 p-0"
            >
              ×
            </Button>
          </div>
        </div>

        {/* Messages with premium styling */}
        <ScrollArea className="flex-1 h-[360px] p-5">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="space-y-3">
                <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl rounded-br-md'
                      : 'bg-slate-800/80 text-slate-100 border border-slate-700/50 rounded-2xl rounded-bl-md'
                  } p-4 shadow-lg`}>
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <p className="text-xs opacity-70 mt-2">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
                        onClick={() => handleActionClick(action.action)}
                        className="text-xs h-8 bg-slate-800/50 border-slate-600/50 text-slate-300 hover:bg-slate-700/50 hover:border-blue-500/50 hover:text-blue-300 transition-all duration-200"
                      >
                        <Zap className="w-3 h-3 mr-1" />
                        {action.label}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-800/80 border border-slate-700/50 p-4 rounded-2xl rounded-bl-md shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200" />
                    </div>
                    <span className="text-slate-400 text-sm">Maria is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* File Upload Area */}
        {uploadedFiles.length > 0 && (
          <div className="px-5 py-3 border-t border-slate-700/50 bg-slate-900/50">
            <div className="flex flex-wrap gap-2">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center gap-2 bg-slate-800/60 rounded-lg px-3 py-2 border border-slate-700/50">
                  <FileText className="w-3 h-3 text-blue-400" />
                  <span className="text-xs text-slate-300 truncate max-w-20">{file.name}</span>
                  <button
                    onClick={() => setUploadedFiles(prev => prev.filter((_, i) => i !== index))}
                    className="text-slate-400 hover:text-red-400 transition-colors"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Premium Input */}
        <div className="p-5 border-t border-slate-700/50 bg-slate-900/50">
          <div className="flex items-center gap-3 bg-slate-800/60 rounded-2xl p-3 border border-slate-700/50 focus-within:border-blue-500/50 transition-colors">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Message Maria..."
              className="bg-transparent border-0 text-white placeholder:text-slate-400 focus:ring-0 focus-visible:ring-0 text-sm"
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
              variant="ghost"
              className="text-slate-400 hover:text-white hover:bg-slate-700/50 w-8 h-8 p-0"
            >
              <Upload className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              onClick={toggleVoiceInput}
              variant="ghost"
              className={`w-8 h-8 p-0 ${isListening ? 'text-red-400 hover:text-red-300' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'}`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </Button>
            <Button 
              size="sm" 
              onClick={handleSendMessage} 
              disabled={!inputValue.trim() && uploadedFiles.length === 0}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white w-8 h-8 p-0 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
