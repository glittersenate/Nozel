
import React, { useState } from 'react';
import { FloatingChatButton } from './FloatingChatButton';
import { ChatInterface } from './ChatInterface';

export const MariaAI: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [shouldStartMinimized, setShouldStartMinimized] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };

  const handleMaximizedClose = () => {
    // When closed from maximized, next time should open minimized
    setShouldStartMinimized(true);
    setIsChatOpen(false);
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <FloatingChatButton onToggleChat={toggleChat} isChatOpen={isChatOpen} />
      <ChatInterface 
        isOpen={isChatOpen} 
        onClose={closeChat}
        onMaximizedClose={handleMaximizedClose}
        startMinimized={shouldStartMinimized}
      />
    </div>
  );
};
