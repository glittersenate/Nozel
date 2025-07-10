
import React, { useRef, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDragHandler } from './hooks/useDragHandler';
import { useFloatingButtonEvents } from './hooks/useFloatingButtonEvents';

interface FloatingChatButtonProps {
  onToggleChat: () => void;
  isChatOpen: boolean;
}

export const FloatingChatButton: React.FC<FloatingChatButtonProps> = ({
  onToggleChat,
  isChatOpen
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dragHandler = useDragHandler();
  
  const eventHandlers = useFloatingButtonEvents({
    isDragging: dragHandler.isDragging,
    velocity: dragHandler.velocity,
    hasMoved: dragHandler.hasMoved,
    onToggleChat,
    handleDragStart: dragHandler.handleDragStart,
    handleDragMove: dragHandler.handleDragMove,
    handleDragEnd: dragHandler.handleDragEnd,
    animationRef: dragHandler.animationRef
  });

  // Initialize position with proper transform
  useEffect(() => {
    if (buttonRef.current) {
      const initialX = window.innerWidth - 80;
      const initialY = window.innerHeight - 120;
      buttonRef.current.style.transform = `translate3d(${initialX}px, ${initialY}px, 0)`;
      dragHandler.rafPositionRef.current = { x: initialX, y: initialY };
    }
  }, []);

  // Update transform when position changes
  useEffect(() => {
    if (buttonRef.current) {
      const { x, y } = dragHandler.position;
      buttonRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }
  }, [dragHandler.position]);

  return (
    <Button
      ref={buttonRef}
      className={`
        fixed z-50 w-14 h-14 rounded-full shadow-lg transition-all duration-200
        bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700
        border-2 border-white/20 backdrop-blur-sm
        ${dragHandler.isDragging ? 'scale-110 shadow-2xl cursor-grabbing opacity-90' : 'hover:scale-105 cursor-grab'}
        ${isChatOpen ? 'rotate-180' : ''}
      `}
      style={{
        left: 0,
        top: 0,
        touchAction: 'none',
        willChange: dragHandler.isDragging ? 'transform' : 'auto',
        transition: dragHandler.isDragging ? 'none' : 'transform 0.2s ease-out, scale 0.2s ease-out',
        pointerEvents: 'auto',
        zIndex: dragHandler.isDragging ? 9999 : 50
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
  );
};
