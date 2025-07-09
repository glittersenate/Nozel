
import React, { useRef, useEffect } from 'react';
import { MessageCircle, X, Sparkles } from 'lucide-react';
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
        fixed z-50 w-16 h-16 rounded-full shadow-lg transition-all duration-200
        bg-blue-600 hover:bg-blue-700
        border border-white/20
        ${dragHandler.isDragging ? 'scale-110 cursor-grabbing' : 'hover:scale-105 cursor-grab'}
        ${isChatOpen ? 'rotate-180' : ''}
      `}
      style={{
        left: 0,
        top: 0,
        touchAction: 'none',
        willChange: dragHandler.isDragging ? 'transform' : 'auto',
        transition: dragHandler.isDragging ? 'none' : 'transform 0.2s ease-out, scale 0.2s ease-out'
      }}
      onMouseDown={eventHandlers.handleMouseDown}
      onTouchStart={eventHandlers.handleTouchStart}
      onClick={eventHandlers.handleClick}
    >
      <div className="relative flex items-center justify-center">
        {isChatOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Sparkles className="w-6 h-6 text-white" />
        )}
        
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
      </div>
    </Button>
  );
};
