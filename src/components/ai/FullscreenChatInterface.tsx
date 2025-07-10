
import React from 'react';
import { FullscreenChatHeader } from './components/FullscreenChatHeader';
import { FullscreenChatMessages } from './components/FullscreenChatMessages';
import { FullscreenChatInput } from './components/FullscreenChatInput';

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
  return (
    <div className="fixed inset-0 z-50 bg-slate-900 flex flex-col">
      <FullscreenChatHeader onMinimize={onMinimize} onClose={onClose} />
      
      <FullscreenChatMessages
        messages={messages}
        isTyping={isTyping}
        onActionClick={onActionClick}
      />
      
      <FullscreenChatInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        isListening={isListening}
        uploadedFiles={uploadedFiles}
        onSendMessage={onSendMessage}
        onFileUpload={onFileUpload}
        onToggleVoice={onToggleVoice}
        onActionClick={onActionClick}
      />
    </div>
  );
};
