
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
        fixed z-50 w-16 h-16 rounded-full shadow-2xl transition-all duration-300 group
        bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 
        hover:from-blue-500 hover:via-purple-500 hover:to-indigo-600
        border-2 border-white/30 backdrop-blur-md
        ${dragHandler.isDragging ? 'scale-110 shadow-3xl cursor-grabbing rotate-12' : 'hover:scale-110 cursor-grab hover:rotate-6'}
        ${isChatOpen ? 'rotate-180 bg-gradient-to-br from-red-500 to-pink-600' : ''}
        hover:shadow-blue-500/25 active:scale-95
      `}
      style={{
        left: 0,
        top: 0,
        touchAction: 'none',
        willChange: dragHandler.isDragging ? 'transform' : 'auto',
        transition: dragHandler.isDragging ? 'none' : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.3))'
      }}
      onMouseDown={eventHandlers.handleMouseDown}
      onTouchStart={eventHandlers.handleTouchStart}
      onClick={eventHandlers.handleClick}
    >
      <div className="relative flex items-center justify-center">
        {isChatOpen ? (
          <X className="w-7 h-7 text-white transition-transform duration-300 group-hover:scale-110" />
        ) : (
          <MessageCircle className="w-7 h-7 text-white transition-transform duration-300 group-hover:scale-110" />
        )}
        
        {/* Enhanced glow effects */}
        <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 rounded-full opacity-40 animate-pulse group-hover:opacity-60 transition-opacity" />
        <div className="absolute -inset-1 bg-gradient-to-r from-white to-blue-200 rounded-full opacity-20 group-hover:opacity-30 transition-all duration-300" />
        
        {/* Sparkle effect on hover */}
        <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-300 opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse" />
        
        {/* Activity indicator */}
        {!isChatOpen && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-bounce" />
        )}
      </div>
    </Button>
  );
};
