
import React from 'react';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start">
      <div className="bg-slate-800 border border-blue-500/20 p-3 rounded-2xl">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100" />
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200" />
        </div>
      </div>
    </div>
  );
};
