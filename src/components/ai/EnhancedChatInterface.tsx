
import React, { useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Minimize2, Upload, FileText, Zap, User, Calendar, DollarSign, BarChart3, Users, Clock, AlertCircle, CheckCircle } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 bg-slate-900/95 backdrop-blur-xl flex flex-col">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between p-6 border-b border-blue-500/20 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">M</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Maria AI Assistant</h1>
            <p className="text-blue-300/80">Advanced HR Intelligence & Automation</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 rounded-full">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="text-green-300 text-sm">Online</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onMinimize}
            className="text-blue-300 hover:text-white hover:bg-blue-600/20"
          >
            <Minimize2 className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-blue-300 hover:text-white hover:bg-red-600/20"
          >
            ×
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar with Quick Actions */}
        <div className="w-80 border-r border-blue-500/20 bg-slate-800/50 p-6 overflow-y-auto">
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="bg-slate-800/60 border-blue-500/20">
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
                      className={`h-20 flex flex-col items-center gap-2 bg-gradient-to-br ${action.color} border-0 text-white hover:scale-105 transition-all duration-200`}
                    >
                      <action.icon className="w-6 h-6" />
                      <span className="text-xs font-medium">{action.label}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Smart Suggestions */}
            <Card className="bg-slate-800/60 border-blue-500/20">
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
                      className="w-full text-left justify-start text-blue-200 hover:bg-blue-600/20 h-auto p-3 whitespace-normal"
                    >
                      <span className="text-sm">{suggestion}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* File Upload Zone */}
            <Card className="bg-slate-800/60 border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <Upload className="w-5 h-5 text-green-400" />
                  Document Upload
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="border-2 border-dashed border-blue-500/30 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400/50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <p className="text-blue-200 text-sm">
                    Drop files here or click to upload
                  </p>
                  <p className="text-blue-300/60 text-xs mt-1">
                    PDF, Excel, Word, Images
                  </p>
                </div>
                
                {uploadedFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center gap-3 bg-slate-700/50 rounded-lg p-3">
                        <FileText className="w-4 h-4 text-blue-400" />
                        <span className="text-blue-200 text-sm flex-1 truncate">{file.name}</span>
                        <button
                          onClick={() => setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))}
                          className="text-blue-400 hover:text-red-400 text-sm"
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
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                        : 'bg-slate-800/80 text-blue-100 border border-blue-500/20'
                    } p-4 rounded-2xl shadow-lg`}>
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
                  
                  {/* Enhanced Action buttons */}
                  {message.actions && message.actions.length > 0 && (
                    <div className="flex flex-wrap gap-3 justify-start max-w-[70%]">
                      {message.actions.map((action, index) => (
                        <Button
                          key={index}
                          variant={action.variant || 'outline'}
                          size="sm"
                          onClick={() => onActionClick(action.action)}
                          className="bg-slate-800/50 border-blue-500/30 text-blue-200 hover:bg-blue-600/20 hover:scale-105 transition-all duration-200"
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
                <div className="flex justify-start">
                  <div className="bg-slate-800/80 border border-blue-500/20 p-4 rounded-2xl shadow-lg">
                    <div className="flex items-center gap-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100" />
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200" />
                      </div>
                      <span className="text-blue-300 text-sm">Maria is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Enhanced Input Area */}
          <div className="border-t border-blue-500/20 p-6 bg-slate-800/30">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-4 bg-slate-800/60 rounded-2xl p-4 border border-blue-500/20">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask Maria anything about HR, payroll, employees..."
                  className="bg-transparent border-0 text-white placeholder:text-blue-300/50 text-lg focus:ring-0"
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
                  variant="outline"
                  className="border-blue-500/30 hover:bg-blue-600/20"
                >
                  <Upload className="w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  onClick={onToggleVoice}
                  variant={isListening ? "default" : "outline"}
                  className={`${isListening ? 'bg-red-600 hover:bg-red-700' : 'border-blue-500/30 hover:bg-blue-600/20'}`}
                >
                  {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </Button>
                <Button 
                  size="lg" 
                  onClick={onSendMessage} 
                  disabled={!inputValue.trim() && uploadedFiles.length === 0}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
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
