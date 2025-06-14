
import React, { useState } from 'react';
import { Play, Zap, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AnimatedPayrollButtonProps {
  totalPayroll: number;
  activeEmployees: number;
  onRunPayroll: () => void;
  canRunPayroll: boolean;
}

const AnimatedPayrollButton: React.FC<AnimatedPayrollButtonProps> = ({
  totalPayroll,
  activeEmployees,
  onRunPayroll,
  canRunPayroll
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleClick = () => {
    if (!canRunPayroll || isProcessing) return;
    
    setIsProcessing(true);
    
    // Simulate processing time
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
      onRunPayroll();
      
      // Reset complete state after 3 seconds
      setTimeout(() => setIsComplete(false), 3000);
    }, 2000);
  };

  if (!canRunPayroll) {
    return (
      <div className="text-center py-4">
        <div className="bg-[#141a2e]/60 border border-blue-800/30 rounded-xl p-6 inline-block">
          <p className="text-blue-300 text-sm">Contact your administrator to run payroll</p>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center py-6">
      <Button
        size="lg"
        onClick={handleClick}
        disabled={isProcessing}
        className={`
          relative overflow-hidden px-12 py-6 text-lg font-bold rounded-2xl
          transition-all duration-500 transform hover:scale-105 active:scale-95
          ${isComplete 
            ? 'bg-gradient-to-r from-green-600 to-green-400 hover:from-green-700 hover:to-green-500' 
            : isProcessing
            ? 'bg-gradient-to-r from-blue-700 to-blue-500'
            : 'bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500'
          }
          shadow-2xl hover:shadow-blue-500/25
          before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:to-transparent 
          before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700
        `}
      >
        <div className="flex items-center gap-3 relative z-10">
          {isComplete ? (
            <>
              <CheckCircle className="w-6 h-6 animate-pulse" />
              <span>Payroll Complete!</span>
            </>
          ) : isProcessing ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>Processing Payroll...</span>
            </>
          ) : (
            <>
              <div className="relative">
                <Zap className="w-6 h-6" />
                <div className="absolute inset-0 animate-ping">
                  <Zap className="w-6 h-6 opacity-75" />
                </div>
              </div>
              <div className="text-center">
                <div>Run Payroll</div>
                <div className="text-sm opacity-90 font-normal">
                  ${totalPayroll.toLocaleString()} • {activeEmployees} employees
                </div>
              </div>
            </>
          )}
        </div>
        
        {/* Animated background effect */}
        <div className={`
          absolute inset-0 opacity-30 
          ${isProcessing ? 'animate-pulse' : ''}
          bg-gradient-to-r from-transparent via-white/10 to-transparent
        `} />
      </Button>
      
      {isProcessing && (
        <div className="mt-4 text-blue-300 text-sm animate-fade-in">
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
          <p className="mt-2">Calculating salaries, taxes, and deductions...</p>
        </div>
      )}
    </div>
  );
};

export default AnimatedPayrollButton;
