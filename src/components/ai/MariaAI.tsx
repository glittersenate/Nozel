
import React, { useState } from 'react';
import { FloatingChatButton } from './FloatingChatButton';
import { ChatInterface } from './ChatInterface';

export const MariaAI: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [wasMaximized, setWasMaximized] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };

  const handleMaximizedClose = () => {
    setWasMaximized(true);
    setIsChatOpen(false);
  };

  return (
    <>
      <FloatingChatButton onToggleChat={toggleChat} isChatOpen={isChatOpen} />
      <ChatInterface 
        isOpen={isChatOpen} 
        onClose={closeChat}
        onMaximizedClose={handleMaximizedClose}
        startMinimized={wasMaximized}
      />
    </>
  );
};
