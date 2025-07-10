
import React, { useState, useRef, useEffect } from 'react';
import { MariaService } from '@/services/mariaService';
import { ChatHeader } from './ChatHeader';
import { ChatMessages } from './ChatMessages';
import { FileUploadArea } from './FileUploadArea';
import { ChatInput } from './ChatInput';

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

interface MinimizedChatInterfaceProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  onClose: () => void;
  onMaximize: () => void;
}

export const MinimizedChatInterface: React.FC<MinimizedChatInterfaceProps> = ({
  messages,
  setMessages,
  onClose,
  onMaximize
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Handle clicking outside to close minimized chat
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatContainerRef.current && 
          !chatContainerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

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

  const handleRemoveFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-end p-4 pointer-events-none">
      <div 
        ref={chatContainerRef}
        className="bg-slate-900/95 backdrop-blur-xl border border-blue-500/20 rounded-2xl shadow-2xl w-96 h-[500px] pointer-events-auto animate-scale-in"
      >
        <ChatHeader onMaximize={onMaximize} onClose={onClose} />
        
        <ChatMessages 
          messages={messages}
          isTyping={isTyping}
          onActionClick={handleActionClick}
        />

        <FileUploadArea 
          uploadedFiles={uploadedFiles}
          onRemoveFile={handleRemoveFile}
        />

        <ChatInput
          inputValue={inputValue}
          onInputChange={setInputValue}
          onSendMessage={handleSendMessage}
          onFileUpload={handleFileUpload}
          onToggleVoice={toggleVoiceInput}
          isListening={isListening}
          uploadedFiles={uploadedFiles}
        />
      </div>
    </div>
  );
};
