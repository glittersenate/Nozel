
import React, { useRef } from 'react';
import { Send, Upload, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface FullscreenChatInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  isListening: boolean;
  uploadedFiles: File[];
  onSendMessage: () => void;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleVoice: () => void;
  onActionClick: (action: string) => void;
}

const quickActions = [
  { label: 'Add Employee', action: 'add_employee' },
  { label: 'Run Payroll', action: 'run_payroll' },
  { label: 'View Reports', action: 'view_reports' }
];

export const FullscreenChatInput: React.FC<FullscreenChatInputProps> = ({
  inputValue,
  setInputValue,
  isListening,
  uploadedFiles,
  onSendMessage,
  onFileUpload,
  onToggleVoice,
  onActionClick
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="border-t border-slate-700/50 p-6">
      <div className="w-full">
        <div className="flex items-center gap-4 bg-slate-800/60 rounded-2xl px-6 py-4 border border-slate-700/50">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask Maria anything about HR, payroll, employees..."
            className="bg-transparent border-0 text-white placeholder:text-slate-400 focus:ring-0 text-base flex-1"
            onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
          />
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={onFileUpload}
            className="hidden"
            accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.png,.jpg,.jpeg"
          />
          <Button
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            variant="ghost"
            className="text-slate-400 hover:text-white hover:bg-slate-700/50"
          >
            <Upload className="w-5 h-5" />
          </Button>
          <Button
            size="sm"
            onClick={onToggleVoice}
            variant="ghost"
            className="text-slate-400 hover:text-white hover:bg-slate-700/50"
          >
            <Mic className="w-5 h-5" />
          </Button>
          <Button 
            size="sm" 
            onClick={onSendMessage} 
            disabled={!inputValue.trim() && uploadedFiles.length === 0}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
        
        {/* Quick Actions */}
        <div className="mt-4">
          <p className="text-slate-400 mb-3 text-sm">Quick actions:</p>
          <div className="flex flex-wrap gap-3">
            {quickActions.map((action) => (
              <Button
                key={action.action}
                variant="outline"
                size="sm"
                onClick={() => onActionClick(action.action)}
                className="bg-slate-800/40 border-slate-600/50 text-slate-300 hover:bg-slate-700/50 hover:text-white"
              >
                ⚡ {action.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
