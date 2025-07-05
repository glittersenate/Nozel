
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { EnhancedChatInterface } from './EnhancedChatInterface';
import { MariaService } from '@/services/mariaService';
import { ChatMessage } from './components/ChatMessage';
import { TypingIndicator } from './components/TypingIndicator';
import { ChatHeader } from './components/ChatHeader';
import { ChatInput } from './components/ChatInput';
import { QuickSuggestions } from './components/QuickSuggestions';

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
      text: "Hi! I'm Maria, your HR assistant. ✨ I can help you manage employees, process payroll, handle leave requests, and generate reports. What would you like to do today?",
      sender: 'maria',
      timestamp: new Date(),
      actions: [
        { label: '👥 Add Employee', action: 'add_employee' },
        { label: '📊 View Reports', action: 'view_reports' },
        { label: '❓ Help', action: 'help', variant: 'outline' },
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
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
      messageText += `\n\n📎 Attached files: ${uploadedFiles.map(f => f.name).join(', ')}`;
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
      let response = "I understand you're looking for help with HR tasks. Could you be more specific about what you'd like to accomplish? 🤔";
      
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
        { label: '💰 View Payroll', action: 'view_payroll' },
        { label: '▶️ Run Payroll', action: 'run_payroll' }
      ];
    }
    
    if (lowerInput.includes('employee') || lowerInput.includes('staff')) {
      return [
        { label: '➕ Add Employee', action: 'add_employee' },
        { label: '👥 View Employees', action: 'view_employees' }
      ];
    }

    if (lowerInput.includes('leave') || lowerInput.includes('vacation')) {
      return [
        { label: '📅 Leave Requests', action: 'leave_requests' },
        { label: '📋 Leave Calendar', action: 'leave_calendar' }
      ];
    }
    
    return [
      { label: '💡 Quick Help', action: 'help', variant: 'outline' }
    ];
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const handleActionClick = (action: string) => {
    const actionMessages: Record<string, string> = {
      add_employee: "I'll help you add a new employee! 👥 Please provide their name, email, department, and salary.",
      run_payroll: "Let me guide you through running payroll for this period. 💰",
      view_reports: "Here are the available reports you can generate! 📊",
      view_payroll: "Opening payroll dashboard... 💼",
      view_employees: "Showing employee directory... 👥",
      leave_requests: "Displaying pending leave requests... 📅",
      leave_calendar: "Opening leave calendar... 📋",
      help: "I can help you with: 🌟 Managing employees, 💰 Processing payroll, 📅 Handling leave requests, 📊 Generating reports, and much more! What specific task do you need help with?"
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
        isListening={false}
        uploadedFiles={uploadedFiles}
        setUploadedFiles={setUploadedFiles}
        onSendMessage={handleSendMessage}
        onFileUpload={handleFileUpload}
        onToggleVoice={() => {}}
        onActionClick={handleActionClick}
        onClose={() => setIsFullscreen(false)}
        onMinimize={() => setIsFullscreen(false)}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-end p-4 pointer-events-none">
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/80 dark:to-pink-950/80 border border-purple-200/50 dark:border-purple-700/50 rounded-xl shadow-2xl w-96 h-[500px] pointer-events-auto flex flex-col backdrop-blur-sm">
        <ChatHeader 
          onToggleFullscreen={toggleFullscreen}
          onClose={onClose}
        />

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
            
            {showSuggestions && messages.length <= 1 && (
              <QuickSuggestions
                suggestions={quickSuggestions}
                onSuggestionClick={handleSuggestionClick}
                showSuggestions={showSuggestions}
              />
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <ChatInput
          inputValue={inputValue}
          setInputValue={setInputValue}
          uploadedFiles={uploadedFiles}
          setUploadedFiles={setUploadedFiles}
          onSendMessage={handleSendMessage}
          onFileUpload={handleFileUpload}
          fileInputRef={fileInputRef}
        />
      </div>
    </div>
  );
};
