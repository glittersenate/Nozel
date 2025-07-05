
import React, { useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Minimize2, Upload, FileText, User, Calendar, DollarSign, BarChart3, Users, Clock, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'maria';
  timestamp: Date;
  isTyping?: boolean;
  actions?: Array<{
    label: string;
    action: string;
    variant?: 'default' | 'outline' | 'secondary';
  }>;
}

interface EnhancedChatInterfaceProps {
  messages: Message[];
  inputValue: string;
  setInputValue: (value: string) => void;
  isTyping: boolean;
  isListening: boolean;
  uploadedFiles: File[];
  setUploadedFiles: (files: File[]) => void;
  onSendMessage: () => void;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleVoice: () => void;
  onActionClick: (action: string) => void;
  onClose: () => void;
  onMinimize: () => void;
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

export const EnhancedChatInterface: React.FC<EnhancedChatInterfaceProps> = ({
  messages,
  inputValue,
  setInputValue,
  isTyping,
  isListening,
  uploadedFiles,
  setUploadedFiles,
  onSendMessage,
  onFileUpload,
  onToggleVoice,
  onActionClick,
  onClose,
  onMinimize
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="fixed inset-0 z-50 bg-white dark:bg-slate-900 flex">
      {/* Sidebar */}
      <div className="w-80 border-r border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">M</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-slate-900 dark:text-white">Maria</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">HR Assistant</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onMinimize}
              className="hover:bg-slate-200 dark:hover:bg-slate-700"
            >
              <Minimize2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {quickActions.map((action) => (
                <Button
                  key={action.action}
                  variant="ghost"
                  onClick={() => onActionClick(action.action)}
                  className="w-full justify-start h-auto p-3 hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  <action.icon className="w-5 h-5 mr-3 text-slate-600 dark:text-slate-400" />
                  <div className="text-left">
                    <div className="font-medium text-slate-900 dark:text-white">{action.label}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">{action.description}</div>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Recent Commands */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Recent Commands</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {recentActions.map((command, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  onClick={() => setInputValue(command)}
                  className="w-full text-left justify-start h-auto p-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  <Clock className="w-4 h-4 mr-2 text-slate-400" />
                  <span className="text-slate-700 dark:text-slate-300">{command}</span>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* File Upload */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Upload Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-4 text-center cursor-pointer hover:border-slate-400 dark:hover:border-slate-500 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-6 h-6 text-slate-400 mx-auto mb-2" />
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Drop files or click to upload
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                  PDF, Excel, Word, Images
                </p>
              </div>
              
              {uploadedFiles.length > 0 && (
                <div className="mt-3 space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center gap-3 bg-slate-100 dark:bg-slate-700 rounded-lg p-2">
                      <FileText className="w-4 h-4 text-slate-500" />
                      <span className="text-sm text-slate-700 dark:text-slate-300 flex-1 truncate">{file.name}</span>
                      <button
                        onClick={() => setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))}
                        className="text-slate-400 hover:text-red-500 text-sm"
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

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Messages */}
        <ScrollArea className="flex-1 p-6">
          <div className="max-w-4xl mx-auto space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="space-y-3">
                <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <p className="text-xs opacity-70 mt-2">
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit',
                        hour12: true 
                      })}
                    </p>
                  </div>
                </div>
                
                {/* Action buttons */}
                {message.actions && message.actions.length > 0 && (
                  <div className="flex flex-wrap gap-2 justify-start max-w-[80%]">
                    {message.actions.map((action, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => onActionClick(action.action)}
                        className="text-xs hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        {action.label}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200" />
                    </div>
                    <span className="text-slate-600 dark:text-slate-400 text-sm">Maria is typing...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-900">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask Maria about employees, payroll, reports..."
                className="bg-transparent border-0 text-base focus:ring-0 shadow-none"
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
                className="hover:bg-slate-200 dark:hover:bg-slate-700"
              >
                <Upload className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                onClick={onToggleVoice}
                variant={isListening ? "default" : "ghost"}
                className={isListening ? 'bg-red-600 hover:bg-red-700 text-white' : 'hover:bg-slate-200 dark:hover:bg-slate-700'}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </Button>
              <Button 
                size="sm" 
                onClick={onSendMessage} 
                disabled={!inputValue.trim() && uploadedFiles.length === 0}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
