
import React from 'react';
import { Plus, Download, Upload, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const quickActions = [
  { icon: Plus, label: 'Add Employee', variant: 'outline' as const },
  { icon: Download, label: 'Export Data', variant: 'outline' as const },
  { icon: Upload, label: 'Import Data', variant: 'outline' as const },
  { icon: Calendar, label: 'Schedule', variant: 'outline' as const },
];

const QuickActions = () => {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {quickActions.map((action) => (
          <Button
            key={action.label}
            variant={action.variant}
            size="sm"
            className="flex flex-col items-center gap-2 h-auto py-3 bg-[#141a2e]/60 border-blue-800/30 text-blue-200 hover:bg-[#141a2e]/80 hover:text-blue-100"
          >
            <action.icon className="w-4 h-4" />
            <span className="text-xs">{action.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
