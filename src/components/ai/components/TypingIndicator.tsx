
import React from 'react';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start animate-fade-in">
      <div className="bg-slate-800/80 border border-slate-700/50 p-4 rounded-2xl rounded-bl-md shadow-lg backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full animate-bounce delay-100" />
            <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full animate-bounce delay-200" />
          </div>
          <span className="text-slate-400 text-sm">Maria is thinking...</span>
        </div>
      </div>
    </div>
  );
};
