
import React, { useState } from 'react';
import { FloatingChatButton } from './FloatingChatButton';
import { ChatInterface } from './ChatInterface';

export const MariaAI: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };

  return (
    <>
      <FloatingChatButton onToggleChat={toggleChat} isChatOpen={isChatOpen} />
      <ChatInterface isOpen={isChatOpen} onClose={closeChat} />
    </>
  );
};
