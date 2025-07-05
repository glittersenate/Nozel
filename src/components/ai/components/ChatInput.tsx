
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Upload, FileText } from 'lucide-react';

interface ChatInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  uploadedFiles: File[];
  setUploadedFiles: (files: File[]) => void;
  onSendMessage: () => void;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  inputValue,
  setInputValue,
  uploadedFiles,
  setUploadedFiles,
  onSendMessage,
  onFileUpload,
  fileInputRef
}) => {
  return (
    <div className="border-t border-purple-200/30 bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-950/30 dark:to-pink-950/30">
      {/* File Upload Area */}
      {uploadedFiles.length > 0 && (
        <div className="px-4 py-2 border-b border-purple-200/20">
          <div className="flex flex-wrap gap-2">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="flex items-center gap-2 bg-purple-100 dark:bg-purple-800 rounded-md px-2 py-1">
                <FileText className="w-3 h-3 text-purple-600 dark:text-purple-300" />
                <span className="text-xs text-purple-700 dark:text-purple-200 truncate max-w-20">{file.name}</span>
                <button
                  onClick={() => setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))}
                  className="text-purple-400 hover:text-red-500 text-sm"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4">
        <div className="flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 rounded-lg border border-purple-200/50 p-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask Maria for help... ✨"
            className="flex-1 border-0 bg-transparent focus:ring-0 shadow-none text-purple-900 dark:text-purple-100 placeholder:text-purple-500"
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
            className="h-9 w-9 p-0 hover:bg-purple-100 dark:hover:bg-purple-800 text-purple-600 dark:text-purple-300"
          >
            <Upload className="w-4 h-4" />
          </Button>
          <Button 
            size="sm" 
            onClick={onSendMessage} 
            disabled={!inputValue.trim() && uploadedFiles.length === 0}
            className="h-9 w-9 p-0 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
