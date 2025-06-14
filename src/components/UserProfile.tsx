
import React from 'react';
import { User, ChevronDown } from 'lucide-react';

const UserProfile = () => {
  return (
    <div className="mt-auto p-4 border-t border-blue-800/30">
      <div className="flex items-center gap-3 cursor-pointer hover:bg-blue-600/10 rounded-lg p-2 transition-colors">
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
        <div className="hidden sm:block flex-1">
          <p className="text-sm font-medium text-blue-100">Sarah Johnson</p>
          <p className="text-xs text-blue-300/70">HR Manager</p>
        </div>
        <ChevronDown className="w-4 h-4 text-blue-300/70 hidden sm:block" />
      </div>
    </div>
  );
};

export default UserProfile;
