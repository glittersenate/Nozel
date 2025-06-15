
import React, { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

/**
 * Minimal component to trigger a confetti explosion.
 * Appears and disappears with no manual cleanup required.
 */
const ConfettiExplosion: React.FC<{ trigger: boolean }> = ({ trigger }) => {
  const didRun = useRef(false);

  useEffect(() => {
    if (trigger && !didRun.current) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        zIndex: 9999,
      });
      didRun.current = true;
    }
    // Reset for next trigger (if this is remounted, e.g. dialog is opened again)
    return () => { didRun.current = false };
  }, [trigger]);

  return null;
};
export default ConfettiExplosion;
