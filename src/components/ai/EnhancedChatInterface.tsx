
import React, { useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Minimize2, Upload, FileText, Zap, User, Calendar, DollarSign, BarChart3, Users, Clock, AlertCircle, CheckCircle, Sparkles } from 'lucide-react';
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

const smartSuggestions = [
  "Show me employees with upcoming reviews",
  "Calculate overtime for this month",
  "Find employees with low performance scores",
  "Generate payroll report for Q4",
  "Check pending leave requests",
  "Show department budget analysis"
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
    <div className="fixed inset-0 z-50 bg-slate-950/98 backdrop-blur-xl flex flex-col">
      {/* Premium Header */}
      <div className="flex items-center justify-between p-6 border-b border-slate-700/50 bg-gradient-to-r from-slate-900/80 to-slate-800/80 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-950 animate-pulse"></div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Maria AI Assistant</h1>
            <p className="text-slate-400">Advanced HR Intelligence & Automation</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 rounded-full border border-green-500/30">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="text-green-300 text-sm">Online</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onMinimize}
            className="text-slate-400 hover:text-white hover:bg-slate-700/50"
          >
            <Minimize2 className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-slate-400 hover:text-white hover:bg-red-500/20"
          >
            ×
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar with Quick Actions */}
        <div className="w-80 border-r border-slate-700/50 bg-slate-900/50 p-6 overflow-y-auto backdrop-blur-sm">
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="bg-slate-800/60 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-400" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {quickActions.map((action) => (
                    <Button
                      key={action.action}
                      variant="outline"
                      onClick={() => onActionClick(action.action)}
                      className={`h-20 flex flex-col items-center gap-2 bg-gradient-to-br ${action.color} border-0 text-white hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl`}
                    >
                      <action.icon className="w-6 h-6" />
                      <span className="text-xs font-medium text-center leading-tight">{action.label}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Smart Suggestions */}
            <Card className="bg-slate-800/60 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-purple-400" />
                  Smart Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {smartSuggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      onClick={() => setInputValue(suggestion)}
                      className="w-full text-left justify-start text-slate-300 hover:bg-slate-700/50 hover:text-white h-auto p-3 whitespace-normal transition-all duration-200"
                    >
                      <span className="text-sm">{suggestion}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* File Upload Zone */}
            <Card className="bg-slate-800/60 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <Upload className="w-5 h-5 text-green-400" />
                  Document Upload
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="border-2 border-dashed border-slate-600/50 rounded-xl p-6 text-center cursor-pointer hover:border-blue-500/50 hover:bg-slate-700/20 transition-all duration-200"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-slate-300 text-sm">
                    Drop files here or click to upload
                  </p>
                  <p className="text-slate-500 text-xs mt-1">
                    PDF, Excel, Word, Images
                  </p>
                </div>
                
                {uploadedFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center gap-3 bg-slate-700/50 rounded-lg p-3 border border-slate-600/50">
                        <FileText className="w-4 h-4 text-blue-400" />
                        <span className="text-slate-200 text-sm flex-1 truncate">{file.name}</span>
                        <button
                          onClick={() => setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))}
                          className="text-slate-400 hover:text-red-400 text-sm transition-colors"
                        >
                          Remove
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
          {/* Messages */}
          <ScrollArea className="flex-1 p-6">
            <div className="max-w-4xl mx-auto space-y-6">
              {messages.map((message) => (
                <div key={message.id} className="space-y-4">
                  <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl rounded-br-md'
                        : 'bg-slate-800/80 text-slate-100 border border-slate-700/50 rounded-2xl rounded-bl-md backdrop-blur-sm'
                    } p-4 shadow-lg hover:shadow-xl transition-all duration-200`}>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                      <p className="text-xs opacity-70 mt-2 text-right">
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit',
                          hour12: true 
                        })}
                      </p>
                    </div>
                  </div>
                  
                  {/* Enhanced Action buttons */}
                  {message.actions && message.actions.length > 0 && (
                    <div className="flex flex-wrap gap-3 justify-start max-w-[70%] animate-fade-in">
                      {message.actions.map((action, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => onActionClick(action.action)}
                          className="bg-slate-800/50 border-slate-600/50 text-slate-300 hover:bg-slate-700/50 hover:border-blue-500/50 hover:text-blue-300 hover:scale-105 transition-all duration-200 backdrop-blur-sm shadow-lg"
                        >
                          <Zap className="w-3 h-3 mr-2" />
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start animate-fade-in">
                  <div className="bg-slate-800/80 border border-slate-700/50 p-4 rounded-2xl rounded-bl-md shadow-lg backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full animate-bounce delay-100" />
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full animate-bounce delay-200" />
                      </div>
                      <span className="text-slate-400 text-sm">Maria is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Enhanced Input Area */}
          <div className="border-t border-slate-700/50 p-6 bg-slate-900/50 backdrop-blur-sm">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-4 bg-slate-800/60 rounded-2xl p-4 border border-slate-700/50 focus-within:border-blue-500/50 transition-colors backdrop-blur-sm shadow-lg">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Message Maria..."
                  className="bg-transparent border-0 text-white placeholder:text-slate-400 focus:ring-0 focus-visible:ring-0 text-lg"
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
                  size="lg"
                  onClick={() => fileInputRef.current?.click()}
                  variant="ghost"
                  className="text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all duration-200"
                >
                  <Upload className="w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  onClick={onToggleVoice}
                  variant="ghost"
                  className={`transition-all duration-200 ${isListening ? 'text-red-400 hover:text-red-300 bg-red-500/10' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'}`}
                >
                  {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </Button>
                <Button 
                  size="lg" 
                  onClick={onSendMessage} 
                  disabled={!inputValue.trim() && uploadedFiles.length === 0}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white disabled:opacity-50 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
