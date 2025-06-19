
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FloatingChatButtonProps {
  onToggleChat: () => void;
  isChatOpen: boolean;
}

export const FloatingChatButton: React.FC<FloatingChatButtonProps> = ({
  onToggleChat,
  isChatOpen
}) => {
  const [position, setPosition] = useState({ x: window.innerWidth - 80, y: window.innerHeight - 120 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Handle drag start
  const handleDragStart = (clientX: number, clientY: number) => {
    setIsDragging(true);
    setDragStart({
      x: clientX - position.x,
      y: clientY - position.y
    });
  };

  // Handle drag move
  const handleDragMove = (clientX: number, clientY: number) => {
    if (!isDragging) return;

    const newX = Math.max(0, Math.min(window.innerWidth - 60, clientX - dragStart.x));
    const newY = Math.max(0, Math.min(window.innerHeight - 60, clientY - dragStart.y));

    setPosition({ x: newX, y: newY });
  };

  // Handle drag end
  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: MouseEvent) => {
    handleDragMove(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleDragStart(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleDragMove(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  // Add event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, dragStart]);

  // Handle click (only if not dragging)
  const handleClick = () => {
    if (!isDragging) {
      onToggleChat();
    }
  };

  return (
    <Button
      ref={buttonRef}
      className={`
        fixed z-50 w-14 h-14 rounded-full shadow-lg transition-all duration-300
        bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700
        border-2 border-white/20 backdrop-blur-sm
        ${isDragging ? 'scale-110 shadow-2xl' : 'hover:scale-105'}
        ${isChatOpen ? 'rotate-180' : ''}
      `}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? 'grabbing' : 'grab',
        touchAction: 'none'
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onClick={handleClick}
    >
      <div className="relative">
        {isChatOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-30 animate-pulse" />
      </div>
    </Button>
  );
};
