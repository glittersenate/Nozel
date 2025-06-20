
import { useCallback, useEffect } from 'react';

interface UseFloatingButtonEventsProps {
  isDragging: boolean;
  velocity: { x: number; y: number };
  onToggleChat: () => void;
  handleDragStart: (x: number, y: number) => void;
  handleDragMove: (x: number, y: number) => void;
  handleDragEnd: () => void;
  animationRef: React.MutableRefObject<number | undefined>;
}

export const useFloatingButtonEvents = ({
  isDragging,
  velocity,
  onToggleChat,
  handleDragStart,
  handleDragMove,
  handleDragEnd,
  animationRef
}: UseFloatingButtonEventsProps) => {
  
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

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isDragging && Math.abs(velocity.x) < 0.1 && Math.abs(velocity.y) < 0.1) {
      onToggleChat();
    }
  }, [isDragging, velocity, onToggleChat]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove, { passive: false });
      document.addEventListener('mouseup', handleMouseUp, { passive: false });
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd, { passive: false });
      
      document.body.style.userSelect = 'none';
      document.body.style.webkitUserSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      
      document.body.style.userSelect = '';
      document.body.style.webkitUserSelect = '';
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd, animationRef]);

  return {
    handleMouseDown,
    handleTouchStart,
    handleClick
  };
};
