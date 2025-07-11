
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChatInterface } from './ChatInterface';
import { useDragHandler } from './hooks/useDragHandler';
import { useFloatingButtonEvents } from './hooks/useFloatingButtonEvents';

export const MariaAI: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [shouldStartMinimized, setShouldStartMinimized] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dragHandler = useDragHandler();

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };

  const handleMaximizedClose = () => {
    setShouldStartMinimized(true);
    setIsChatOpen(false);
  };

  const eventHandlers = useFloatingButtonEvents({
    isDragging: dragHandler.isDragging,
    velocity: dragHandler.velocity,
    hasMoved: dragHandler.hasMoved,
    onToggleChat: toggleChat,
    handleDragStart: dragHandler.handleDragStart,
    handleDragMove: dragHandler.handleDragMove,
    handleDragEnd: dragHandler.handleDragEnd,
    animationRef: dragHandler.animationRef
  });

  // Initialize position
  useEffect(() => {
    if (buttonRef.current) {
      const initialX = window.innerWidth - 80;
      const initialY = window.innerHeight - 120;
      dragHandler.rafPositionRef.current = { x: initialX, y: initialY };
    }
  }, []);

  return (
    <>
      <Button
        ref={buttonRef}
        className={`
          fixed w-14 h-14 rounded-full shadow-lg
          bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700
          border-2 border-white/20 backdrop-blur-sm
          ${dragHandler.isDragging ? 'scale-110 shadow-2xl cursor-grabbing' : 'hover:scale-105 cursor-grab'}
          ${isChatOpen ? 'rotate-180' : ''}
        `}
        style={{
          transform: `translate3d(${dragHandler.position.x}px, ${dragHandler.position.y}px, 0)`,
          zIndex: 1000,
          touchAction: 'none',
          transition: dragHandler.isDragging ? 'none' : 'transform 0.2s ease-out, scale 0.2s ease-out'
        }}
        onMouseDown={eventHandlers.handleMouseDown}
        onTouchStart={eventHandlers.handleTouchStart}
        onClick={eventHandlers.handleClick}
      >
        {isChatOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </Button>
      
      <ChatInterface 
        isOpen={isChatOpen} 
        onClose={closeChat}
        onMaximizedClose={handleMaximizedClose}
        startMinimized={shouldStartMinimized}
      />
    </>
  );
};
