
import React, { useState, useEffect } from 'react';
import { FullscreenChatInterface } from './FullscreenChatInterface';
import { MinimizedChatInterface } from './components/MinimizedChatInterface';

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
  startMinimized = true
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
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Handle fullscreen close
  const handleFullscreenClose = () => {
    if (onMaximizedClose) {
      onMaximizedClose();
    } else {
      onClose();
    }
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
      <FullscreenChatInterface
        messages={messages}
        inputValue=""
        setInputValue={() => {}}
        isTyping={false}
        isListening={false}
        uploadedFiles={[]}
        setUploadedFiles={() => {}}
        onSendMessage={() => {}}
        onFileUpload={() => {}}
        onToggleVoice={() => {}}
        onActionClick={() => {}}
        onClose={handleFullscreenClose}
        onMinimize={() => setIsFullscreen(false)}
      />
    );
  }

  // Render minimized version
  return (
    <MinimizedChatInterface
      messages={messages}
      setMessages={setMessages}
      onClose={onClose}
      onMaximize={toggleFullscreen}
    />
  );
};
