
import React, { useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Minimize2, Upload, FileText, Zap, User, Calendar, DollarSign, BarChart3, Users, Clock, AlertCircle, CheckCircle, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
  { icon: User, label: 'Add Employee', action: 'add_employee', color: 'from-blue-500 to-blue-600' },
  { icon: DollarSign, label: 'Run Payroll', action: 'run_payroll', color: 'from-green-500 to-green-600' },
  { icon: Calendar, label: 'Schedule Leave', action: 'schedule_leave', color: 'from-purple-500 to-purple-600' },
  { icon: BarChart3, label: 'View Reports', action: 'view_reports', color: 'from-orange-500 to-orange-600' },
  { icon: Users, label: 'Team Overview', action: 'team_overview', color: 'from-teal-500 to-teal-600' },
  { icon: Clock, label: 'Time Tracking', action: 'time_tracking', color: 'from-indigo-500 to-indigo-600' },
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
    <div className="fixed inset-0 z-50 bg-slate-900 flex flex-col">
      {/* Header - SAME STYLE AS MINIMIZED */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700 bg-slate-800">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border border-slate-900"></div>
          </div>
          <div>
            <h1 className="text-white font-medium">Maria AI Assistant</h1>
            <p className="text-slate-400 text-sm">Advanced HR Intelligence</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMinimize}
            className="text-slate-400 hover:text-white"
          >
            <Minimize2 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar with Quick Actions */}
        <div className="w-72 border-r border-slate-700 bg-slate-800 p-4 overflow-y-auto">
          <div className="space-y-4">
            {/* Quick Actions */}
            <Card className="bg-slate-700 border-slate-600">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-sm flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-400" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action) => (
                    <Button
                      key={action.action}
                      variant="outline"
                      onClick={() => onActionClick(action.action)}
                      className={`h-16 flex flex-col items-center gap-1 bg-gradient-to-br ${action.color} border-0 text-white hover:scale-105 transition-all text-xs`}
                    >
                      <action.icon className="w-4 h-4" />
                      <span className="text-center leading-tight">{action.label}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="max-w-3xl mx-auto space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="space-y-3">
                  <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-2xl rounded-br-md'
                        : 'bg-slate-800 text-slate-100 border border-slate-700 rounded-2xl rounded-bl-md'
                    } p-4 shadow-lg`}>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                      <p className="text-xs opacity-70 mt-2 text-right">
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                  
                  {message.actions && message.actions.length > 0 && (
                    <div className="flex flex-wrap gap-2 justify-start max-w-[70%]">
                      {message.actions.map((action, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => onActionClick(action.action)}
                          className="bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-blue-500 hover:text-blue-300 text-xs"
                        >
                          <Zap className="w-3 h-3 mr-1" />
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-800 border border-slate-700 p-4 rounded-2xl rounded-bl-md shadow-lg">
                    <div className="flex items-center gap-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100" />
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200" />
                      </div>
                      <span className="text-slate-400 text-sm">Maria is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input Area - SAME STYLE AS MINIMIZED */}
          <div className="border-t border-slate-700 p-4 bg-slate-800">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-2 bg-slate-700 rounded-xl p-3">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Message Maria..."
                  className="bg-transparent border-0 text-white placeholder:text-slate-400 focus:ring-0 focus-visible:ring-0 flex-1"
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
                  className="text-slate-400 hover:text-white w-8 h-8 p-0"
                >
                  <Upload className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  onClick={onToggleVoice}
                  variant="ghost"
                  className={`w-8 h-8 p-0 ${isListening ? 'text-red-400' : 'text-slate-400 hover:text-white'}`}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </Button>
                <Button 
                  size="sm" 
                  onClick={onSendMessage} 
                  disabled={!inputValue.trim() && uploadedFiles.length === 0}
                  className="bg-blue-600 hover:bg-blue-700 text-white w-8 h-8 p-0 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
