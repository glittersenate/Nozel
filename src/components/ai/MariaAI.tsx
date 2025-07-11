
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChatInterface } from './ChatInterface';

export const MariaAI: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [shouldStartMinimized, setShouldStartMinimized] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);
  
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Initialize position
  useEffect(() => {
    const initialX = window.innerWidth - 80;
    const initialY = window.innerHeight - 120;
    setPosition({ x: initialX, y: initialY });
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    setHasMoved(false);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    
    // Boundary constraints
    const boundedX = Math.max(10, Math.min(window.innerWidth - 70, newX));
    const boundedY = Math.max(10, Math.min(window.innerHeight - 70, newY));
    
    setPosition({ x: boundedX, y: boundedY });
    setHasMoved(true);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    // Snap to edges
    const centerX = window.innerWidth / 2;
    const finalX = position.x < centerX ? 15 : window.innerWidth - 75;
    setPosition(prev => ({ ...prev, x: finalX }));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const touch = e.touches[0];
    setIsDragging(true);
    setHasMoved(false);
    setDragStart({
      x: touch.clientX - position.x,
      y: touch.clientY - position.y
    });
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const touch = e.touches[0];
    const newX = touch.clientX - dragStart.x;
    const newY = touch.clientY - dragStart.y;
    
    const boundedX = Math.max(10, Math.min(window.innerWidth - 70, newX));
    const boundedY = Math.max(10, Math.min(window.innerHeight - 70, newY));
    
    setPosition({ x: boundedX, y: boundedY });
    setHasMoved(true);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const centerX = window.innerWidth / 2;
    const finalX = position.x < centerX ? 15 : window.innerWidth - 75;
    setPosition(prev => ({ ...prev, x: finalX }));
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasMoved) {
      setIsChatOpen(!isChatOpen);
    }
  };

  // Event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.body.style.userSelect = '';
    };
  }, [isDragging, dragStart, position]);

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

  return (
    <>
      <Button
        ref={buttonRef}
        className={`
          fixed w-14 h-14 rounded-full shadow-lg
          bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700
          border-2 border-white/20 backdrop-blur-sm
          ${isDragging ? 'scale-110 shadow-2xl cursor-grabbing' : 'hover:scale-105 cursor-grab'}
          ${isChatOpen ? 'rotate-180' : ''}
        `}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          zIndex: 1000,
          touchAction: 'none',
          transition: isDragging ? 'none' : 'transform 0.3s ease-out, scale 0.2s ease-out'
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onClick={handleClick}
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
