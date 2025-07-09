
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
        fixed z-50 w-16 h-16 rounded-full shadow-2xl transition-all duration-300
        bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 
        hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700
        border-2 border-white/10 backdrop-blur-sm
        ${dragHandler.isDragging ? 'scale-110 shadow-3xl cursor-grabbing' : 'hover:scale-105 cursor-grab'}
        ${isChatOpen ? 'rotate-180' : ''}
        group
      `}
      style={{
        left: 0,
        top: 0,
        touchAction: 'none',
        willChange: dragHandler.isDragging ? 'transform' : 'auto',
        transition: dragHandler.isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), scale 0.2s ease-out',
        boxShadow: dragHandler.isDragging 
          ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(99, 102, 241, 0.4)' 
          : '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.1), 0 0 20px rgba(99, 102, 241, 0.2)'
      }}
      onMouseDown={eventHandlers.handleMouseDown}
      onTouchStart={eventHandlers.handleTouchStart}
      onClick={eventHandlers.handleClick}
    >
      <div className="relative flex items-center justify-center">
        {/* Breathing effect rings */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-20 animate-ping" />
        <div className="absolute inset-1 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-30 animate-pulse" />
        
        {/* Main icon */}
        <div className="relative z-10 transition-transform duration-200 group-hover:scale-110">
          {isChatOpen ? (
            <X className="w-7 h-7 text-white drop-shadow-lg" />
          ) : (
            <div className="flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-white drop-shadow-lg" />
            </div>
          )}
        </div>
        
        {/* Online indicator */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg animate-pulse" />
        
        {/* Ambient glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-75 blur-xl scale-150 group-hover:scale-175 transition-transform duration-300" />
      </div>
    </Button>
  );
};
