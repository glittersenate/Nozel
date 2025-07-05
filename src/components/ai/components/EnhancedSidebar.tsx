
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Clock, User, DollarSign, Calendar, BarChart3, Users, Minimize2 } from 'lucide-react';

interface EnhancedSidebarProps {
  onActionClick: (action: string) => void;
  uploadedFiles: File[];
  setUploadedFiles: (files: File[]) => void;
  setInputValue: (value: string) => void;
  onMinimize: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

const quickActions = [
  { icon: User, label: 'Add Employee', action: 'add_employee', description: 'Create new employee profile' },
  { icon: DollarSign, label: 'Payroll', action: 'run_payroll', description: 'Process or view payroll' },
  { icon: Calendar, label: 'Leave Requests', action: 'leave_requests', description: 'Manage time off requests' },
  { icon: BarChart3, label: 'Reports', action: 'view_reports', description: 'Generate HR reports' },
  { icon: Users, label: 'Team Overview', action: 'team_overview', description: 'View team status' },
  { icon: Clock, label: 'Time Tracking', action: 'time_tracking', description: 'Monitor work hours' },
];

const recentActions = [
  "Show employees in Engineering department",
  "Calculate total payroll for Q4 2024", 
  "List pending performance reviews",
  "Export employee data to Excel",
  "Check compliance status for all departments"
];

export const EnhancedSidebar: React.FC<EnhancedSidebarProps> = ({
  onActionClick,
  uploadedFiles,
  setUploadedFiles,
  setInputValue,
  onMinimize,
  fileInputRef
}) => {
  return (
    <div className="w-80 border-r border-purple-200/50 dark:border-purple-700/50 bg-gradient-to-b from-purple-50/80 to-pink-50/80 dark:from-purple-950/50 dark:to-pink-950/50 flex flex-col backdrop-blur-sm">
      {/* Header */}
      <div className="p-6 border-b border-purple-200/50 dark:border-purple-700/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold">M</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-purple-900 dark:text-purple-100">Maria</h1>
              <p className="text-sm text-purple-600 dark:text-purple-300">HR Assistant ✨</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onMinimize}
            className="hover:bg-purple-100 dark:hover:bg-purple-800 text-purple-600 dark:text-purple-300"
          >
            <Minimize2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Quick Actions */}
        <Card className="bg-white/80 dark:bg-slate-800/80 border-purple-200/50 dark:border-purple-700/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-purple-900 dark:text-purple-100">✨ Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {quickActions.map((action) => (
              <Button
                key={action.action}
                variant="ghost"
                onClick={() => onActionClick(action.action)}
                className="w-full justify-start h-auto p-3 hover:bg-purple-100 dark:hover:bg-purple-800/50 text-purple-800 dark:text-purple-200"
              >
                <action.icon className="w-5 h-5 mr-3 text-purple-600 dark:text-purple-400" />
                <div className="text-left">
                  <div className="font-medium">{action.label}</div>
                  <div className="text-xs text-purple-600 dark:text-purple-400">{action.description}</div>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Recent Commands */}
        <Card className="bg-white/80 dark:bg-slate-800/80 border-purple-200/50 dark:border-purple-700/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-purple-900 dark:text-purple-100">🕒 Recent Commands</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {recentActions.map((command, index) => (
              <Button
                key={index}
                variant="ghost"
                onClick={() => setInputValue(command)}
                className="w-full text-left justify-start h-auto p-2 text-sm hover:bg-purple-100 dark:hover:bg-purple-800/50 text-purple-700 dark:text-purple-300"
              >
                <Clock className="w-4 h-4 mr-2 text-purple-500 dark:text-purple-400" />
                <span>{command}</span>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* File Upload */}
        <Card className="bg-white/80 dark:bg-slate-800/80 border-purple-200/50 dark:border-purple-700/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-purple-900 dark:text-purple-100">📎 Upload Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="border-2 border-dashed border-purple-300/50 dark:border-purple-600/50 rounded-lg p-4 text-center cursor-pointer hover:border-purple-400 dark:hover:border-purple-500 transition-colors bg-purple-50/50 dark:bg-purple-900/20"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-6 h-6 text-purple-500 dark:text-purple-400 mx-auto mb-2" />
              <p className="text-sm text-purple-700 dark:text-purple-300">
                Drop files or click to upload
              </p>
              <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                PDF, Excel, Word, Images
              </p>
            </div>
            
            {uploadedFiles.length > 0 && (
              <div className="mt-3 space-y-2">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center gap-3 bg-purple-100 dark:bg-purple-800/50 rounded-lg p-2">
                    <Upload className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <span className="text-sm text-purple-800 dark:text-purple-200 flex-1 truncate">{file.name}</span>
                    <button
                      onClick={() => setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))}
                      className="text-purple-500 hover:text-red-500 text-sm"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
