
import React from 'react';
import { LeaveBalance } from '@/types/leave';

type LeaveBalanceCardsProps = {
  balance: LeaveBalance;
};

export const LeaveBalanceCards: React.FC<LeaveBalanceCardsProps> = ({ balance }) => {
  return (
    <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div className="glass-dark rounded-lg p-3 flex flex-col items-center">
        <span className="uppercase text-xs text-blue-200 font-bold">Vacation Left</span>
        <span className="text-green-400 text-lg font-bold">{balance.vacation.remaining} days</span>
      </div>
      <div className="glass-dark rounded-lg p-3 flex flex-col items-center">
        <span className="uppercase text-xs text-blue-200 font-bold">Sick Left</span>
        <span className="text-green-400 text-lg font-bold">{balance.sick.remaining} days</span>
      </div>
      <div className="glass-dark rounded-lg p-3 flex flex-col items-center">
        <span className="uppercase text-xs text-blue-200 font-bold">Personal Left</span>
        <span className="text-green-400 text-lg font-bold">{balance.personal.remaining} days</span>
      </div>
    </div>
  );
};
