
import { useState, useRef, useCallback } from 'react';

interface Position {
  x: number;
  y: number;
}

interface Velocity {
  x: number;
  y: number;
}

export const useDragHandler = () => {
  const [position, setPosition] = useState<Position>({ 
    x: window.innerWidth - 80, 
    y: window.innerHeight - 120 
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState<Velocity>({ x: 0, y: 0 });
  const [lastMousePos, setLastMousePos] = useState<Position>({ x: 0, y: 0 });
  const [lastTime, setLastTime] = useState(0);
  
  const isDraggingRef = useRef(false);
  const rafPositionRef = useRef<Position>({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  const updatePosition = useCallback((newPosition: Position) => {
    const boundedX = Math.max(10, Math.min(window.innerWidth - 70, newPosition.x));
    const boundedY = Math.max(10, Math.min(window.innerHeight - 70, newPosition.y));
    
    rafPositionRef.current = { x: boundedX, y: boundedY };
    setPosition({ x: boundedX, y: boundedY });
    
    return { x: boundedX, y: boundedY };
  }, []);

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
  }, []);

  const handleDragMove = useCallback((clientX: number, clientY: number) => {
    if (!isDraggingRef.current) return;
    
    const now = performance.now();
    const dt = now - lastTime;
    
    if (dt > 0) {
      const newVelocity = {
        x: (clientX - lastMousePos.x) / dt * 16.67,
        y: (clientY - lastMousePos.y) / dt * 16.67
      };
      setVelocity(newVelocity);
    }
    
    setLastMousePos({ x: clientX, y: clientY });
    setLastTime(now);
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    animationRef.current = requestAnimationFrame(() => {
      const newX = clientX - dragStart.x;
      const newY = clientY - dragStart.y;
      updatePosition({ x: newX, y: newY });
    });
  }, [dragStart, lastMousePos, lastTime, updatePosition]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    isDraggingRef.current = false;
    
    // Apply momentum and snapping
    const snapThreshold = 120;
    const currentPos = rafPositionRef.current;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    let finalX = currentPos.x;
    let finalY = currentPos.y;
    
    const momentumFactor = 0.3;
    if (Math.abs(velocity.x) > 0.5) {
      finalX += velocity.x * momentumFactor;
    }
    if (Math.abs(velocity.y) > 0.5) {
      finalY += velocity.y * momentumFactor;
    }
    
    if (finalX < snapThreshold) finalX = 15;
    else if (finalX > windowWidth - snapThreshold) finalX = windowWidth - 75;
    
    if (finalY < snapThreshold) finalY = 15;
    else if (finalY > windowHeight - snapThreshold) finalY = windowHeight - 75;
    
    // Smooth animated transition
    const startPos = currentPos;
    const endPos = { x: finalX, y: finalY };
    const startTime = performance.now();
    const duration = 400;
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
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

  return {
    position,
    isDragging,
    velocity,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    rafPositionRef,
    animationRef
  };
};
