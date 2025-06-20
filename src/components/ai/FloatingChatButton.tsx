
import React, { useState, useRef, useEffect, useCallback } from 'react';
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
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const [lastTime, setLastTime] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const animationRef = useRef<number>();
  const isDraggingRef = useRef(false);

  // Ultra-smooth RAF-based position updates
  const updatePosition = useCallback((newPosition: { x: number; y: number }) => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    animationRef.current = requestAnimationFrame(() => {
      const boundedX = Math.max(10, Math.min(window.innerWidth - 70, newPosition.x));
      const boundedY = Math.max(10, Math.min(window.innerHeight - 70, newPosition.y));
      
      setPosition({ x: boundedX, y: boundedY });
    });
  }, []);

  // Smooth drag handling with momentum
  const handleDragStart = useCallback((clientX: number, clientY: number) => {
    setIsDragging(true);
    isDraggingRef.current = true;
    const now = Date.now();
    setLastTime(now);
    setLastPosition({ x: clientX, y: clientY });
    setDragStart({
      x: clientX - position.x,
      y: clientY - position.y
    });
    setVelocity({ x: 0, y: 0 });
  }, [position]);

  const handleDragMove = useCallback((clientX: number, clientY: number) => {
    if (!isDraggingRef.current) return;

    const now = Date.now();
    const dt = now - lastTime;
    
    if (dt > 0) {
      const newVelocity = {
        x: (clientX - lastPosition.x) / dt,
        y: (clientY - lastPosition.y) / dt
      };
      setVelocity(newVelocity);
    }

    setLastPosition({ x: clientX, y: clientY });
    setLastTime(now);

    const newX = clientX - dragStart.x;
    const newY = clientY - dragStart.y;
    
    updatePosition({ x: newX, y: newY });
  }, [dragStart, lastPosition, lastTime, updatePosition]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    isDraggingRef.current = false;
    
    // Magnetic edge snapping with momentum
    const snapThreshold = 100;
    const { x, y } = position;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    let finalX = x;
    let finalY = y;
    
    // Apply momentum
    if (Math.abs(velocity.x) > 0.1) {
      finalX += velocity.x * 100;
    }
    if (Math.abs(velocity.y) > 0.1) {
      finalY += velocity.y * 100;
    }
    
    // Snap to edges
    if (finalX < snapThreshold) {
      finalX = 10;
    } else if (finalX > windowWidth - snapThreshold) {
      finalX = windowWidth - 70;
    }
    
    if (finalY < snapThreshold) {
      finalY = 10;
    } else if (finalY > windowHeight - snapThreshold) {
      finalY = windowHeight - 70;
    }
    
    // Smooth animation to final position
    const startPos = position;
    const endPos = { x: finalX, y: finalY };
    const startTime = Date.now();
    const duration = 300;
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      const currentX = startPos.x + (endPos.x - startPos.x) * easeOut;
      const currentY = startPos.y + (endPos.y - startPos.y) * easeOut;
      
      setPosition({ x: currentX, y: currentY });
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [position, velocity]);

  // Mouse events
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleDragStart(e.clientX, e.clientY);
  }, [handleDragStart]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    handleDragMove(e.clientX, e.clientY);
  }, [handleDragMove]);

  const handleMouseUp = useCallback(() => {
    handleDragEnd();
  }, [handleDragEnd]);

  // Touch events
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const touch = e.touches[0];
    handleDragStart(touch.clientX, touch.clientY);
  }, [handleDragStart]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleDragMove(touch.clientX, touch.clientY);
  }, [handleDragMove]);

  const handleTouchEnd = useCallback(() => {
    handleDragEnd();
  }, [handleDragEnd]);

  // Event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove, { passive: false });
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  // Handle click (only if not dragging)
  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isDragging) {
      onToggleChat();
    }
  }, [isDragging, onToggleChat]);

  return (
    <Button
      ref={buttonRef}
      className={`
        fixed z-50 w-14 h-14 rounded-full shadow-lg transition-all duration-200
        bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700
        border-2 border-white/20 backdrop-blur-sm
        ${isDragging ? 'scale-110 shadow-2xl cursor-grabbing' : 'hover:scale-105 cursor-grab'}
        ${isChatOpen ? 'rotate-180' : ''}
      `}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        touchAction: 'none',
        willChange: 'transform',
        transform: isDragging ? 'scale(1.1)' : 'scale(1)'
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
