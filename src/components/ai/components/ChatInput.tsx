
import React, { useRef } from 'react';
import { Send, Mic, MicOff, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ChatInputProps {
  inputValue: string;
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleVoice: () => void;
  isListening: boolean;
  uploadedFiles: File[];
}

export const ChatInput: React.FC<ChatInputProps> = ({
  inputValue,
  onInputChange,
  onSendMessage,
  onFileUpload,
  onToggleVoice,
  isListening,
  uploadedFiles
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSendMessage();
    }
  };

  return (
    <div className="p-4 border-t border-blue-500/20">
      <div className="flex items-center gap-2">
        <Input
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="Ask Maria anything..."
          className="bg-slate-800 border-blue-500/30 text-white placeholder:text-blue-300/50"
          onKeyPress={handleKeyPress}
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
          variant="outline"
          className="border-blue-500/30 hover:bg-blue-600/20"
        >
          <Upload className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          onClick={onToggleVoice}
          variant={isListening ? "default" : "outline"}
          className={`${isListening ? 'bg-red-600 hover:bg-red-700' : 'border-blue-500/30 hover:bg-blue-600/20'}`}
        >
          {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </Button>
        <Button 
          size="sm" 
          onClick={onSendMessage} 
          disabled={!inputValue.trim() && uploadedFiles.length === 0}
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
