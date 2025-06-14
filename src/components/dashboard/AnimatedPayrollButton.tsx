
import React, { useState } from 'react';
import { Play, DollarSign, Users, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

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

  const handleRunPayroll = async () => {
    if (!canRunPayroll || isProcessing) return;
    
    setIsProcessing(true);
    
    // Simulate payroll processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
      onRunPayroll();
      
      // Reset after 3 seconds
      setTimeout(() => setIsComplete(false), 3000);
    }, 2000);
  };

  return (
    <Card className="bg-gradient-to-br from-green-600/20 to-blue-600/20 border-green-500/30 shadow-lg max-w-md mx-auto">
      <CardContent className="p-6 text-center">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-white mb-2">Monthly Payroll</h3>
          <div className="flex items-center justify-center gap-4 text-blue-200">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{activeEmployees} employees</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              <span>${totalPayroll.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <Button
          onClick={handleRunPayroll}
          disabled={!canRunPayroll || isProcessing}
          size="lg"
          className={`
            w-full transition-all duration-300 transform
            ${isComplete
              ? 'bg-green-600 hover:bg-green-700 scale-105'
              : isProcessing
              ? 'bg-yellow-600 hover:bg-yellow-700 scale-95'
              : 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 hover:scale-105'
            }
          `}
        >
          <div className="flex items-center gap-3">
            {isComplete ? (
              <>
                <CheckCircle className="w-5 h-5" />
                Payroll Complete!
              </>
            ) : isProcessing ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing Payroll...
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                Run Payroll
              </>
            )}
          </div>
        </Button>

        {!canRunPayroll && !isProcessing && !isComplete && (
          <p className="text-xs text-yellow-300 mt-2">
            Payroll already processed this month
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default AnimatedPayrollButton;
