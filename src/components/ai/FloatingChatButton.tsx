
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
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [lastTime, setLastTime] = useState(0);
  
  const buttonRef = useRef<HTMLButtonElement>(null);
  const animationRef = useRef<number>();
  const isDraggingRef = useRef(false);
  const rafPositionRef = useRef({ x: 0, y: 0 });

  // Ultra-smooth position updates using RAF and transforms
  const updatePosition = useCallback((newPosition: { x: number; y: number }) => {
    const boundedX = Math.max(10, Math.min(window.innerWidth - 70, newPosition.x));
    const boundedY = Math.max(10, Math.min(window.innerHeight - 70, newPosition.y));
    
    rafPositionRef.current = { x: boundedX, y: boundedY };
    
    if (buttonRef.current) {
      // Use transform for 60fps smooth movement
      buttonRef.current.style.transform = `translate3d(${boundedX}px, ${boundedY}px, 0)`;
    }
    
    setPosition({ x: boundedX, y: boundedY });
  }, []);

  // Smooth drag start with momentum tracking
  const handleDragStart = useCallback((clientX: number, clientY: number) => {
    setIsDragging(true);
    isDraggingRef.current = true;
    
    const currentPos = rafPositionRef.current;
    const now = performance.now();
    
    setDragStart({
      x: clientX - currentPos.x,
      y: clientY - currentPos.y
    });
    
    setLastMousePos({ x: clientX, y: clientY });
    setLastTime(now);
    setVelocity({ x: 0, y: 0 });
    
    if (buttonRef.current) {
      buttonRef.current.style.willChange = 'transform';
      buttonRef.current.style.transition = 'none';
    }
  }, []);

  // Ultra-smooth drag movement with velocity tracking
  const handleDragMove = useCallback((clientX: number, clientY: number) => {
    if (!isDraggingRef.current) return;
    
    const now = performance.now();
    const dt = now - lastTime;
    
    // Calculate velocity for momentum
    if (dt > 0) {
      const newVelocity = {
        x: (clientX - lastMousePos.x) / dt * 16.67, // Normalize to 60fps
        y: (clientY - lastMousePos.y) / dt * 16.67
      };
      setVelocity(newVelocity);
    }
    
    setLastMousePos({ x: clientX, y: clientY });
    setLastTime(now);
    
    // Immediate position update with RAF
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    animationRef.current = requestAnimationFrame(() => {
      const newX = clientX - dragStart.x;
      const newY = clientY - dragStart.y;
      updatePosition({ x: newX, y: newY });
    });
  }, [dragStart, lastMousePos, lastTime, updatePosition]);

  // Smooth drag end with momentum and magnetic snapping
  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    isDraggingRef.current = false;
    
    if (buttonRef.current) {
      buttonRef.current.style.willChange = 'auto';
      buttonRef.current.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }
    
    // Enhanced magnetic snapping with momentum
    const snapThreshold = 120;
    const currentPos = rafPositionRef.current;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    let finalX = currentPos.x;
    let finalY = currentPos.y;
    
    // Apply momentum with decay
    const momentumFactor = 0.3;
    if (Math.abs(velocity.x) > 0.5) {
      finalX += velocity.x * momentumFactor;
    }
    if (Math.abs(velocity.y) > 0.5) {
      finalY += velocity.y * momentumFactor;
    }
    
    // Smart edge snapping
    if (finalX < snapThreshold) {
      finalX = 15;
    } else if (finalX > windowWidth - snapThreshold) {
      finalX = windowWidth - 75;
    }
    
    if (finalY < snapThreshold) {
      finalY = 15;
    } else if (finalY > windowHeight - snapThreshold) {
      finalY = windowHeight - 75;
    }
    
    // Smooth animated transition to final position
    const startPos = currentPos;
    const endPos = { x: finalX, y: finalY };
    const startTime = performance.now();
    const duration = 400;
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Cubic bezier easing for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      const currentX = startPos.x + (endPos.x - startPos.x) * easeOut;
      const currentY = startPos.y + (endPos.y - startPos.y) * easeOut;
      
      updatePosition({ x: currentX, y: currentY });
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [velocity, updatePosition]);

  // Mouse event handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleDragStart(e.clientX, e.clientY);
  }, [handleDragStart]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    e.preventDefault();
    handleDragMove(e.clientX, e.clientY);
  }, [handleDragMove]);

  const handleMouseUp = useCallback((e: MouseEvent) => {
    e.preventDefault();
    handleDragEnd();
  }, [handleDragEnd]);

  // Touch event handlers for mobile
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

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    e.preventDefault();
    handleDragEnd();
  }, [handleDragEnd]);

  // Enhanced event listeners with passive optimization
  useEffect(() => {
    if (isDragging) {
      // Use passive: false for preventDefault support
      document.addEventListener('mousemove', handleMouseMove, { passive: false });
      document.addEventListener('mouseup', handleMouseUp, { passive: false });
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd, { passive: false });
      
      // Prevent text selection during drag
      document.body.style.userSelect = 'none';
      document.body.style.webkitUserSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      
      // Restore text selection
      document.body.style.userSelect = '';
      document.body.style.webkitUserSelect = '';
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  // Handle click (only if not dragging)
  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isDragging && Math.abs(velocity.x) < 0.1 && Math.abs(velocity.y) < 0.1) {
      onToggleChat();
    }
  }, [isDragging, velocity, onToggleChat]);

  // Initialize position with proper transform
  useEffect(() => {
    if (buttonRef.current) {
      const initialX = window.innerWidth - 80;
      const initialY = window.innerHeight - 120;
      buttonRef.current.style.transform = `translate3d(${initialX}px, ${initialY}px, 0)`;
      rafPositionRef.current = { x: initialX, y: initialY };
    }
  }, []);

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
        left: 0,
        top: 0,
        touchAction: 'none',
        willChange: isDragging ? 'transform' : 'auto',
        transition: isDragging ? 'none' : 'transform 0.2s ease-out, scale 0.2s ease-out'
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
