
import React, { useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Minimize2, Upload, FileText, Zap, User, Calendar, DollarSign, BarChart3, Users, Clock, AlertCircle, CheckCircle, Brain, TrendingUp, Shield } from 'lucide-react';
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
  { icon: User, label: 'Add Employee', action: 'add_employee', color: 'from-emerald-500 to-teal-600' },
  { icon: DollarSign, label: 'Run Payroll', action: 'run_payroll', color: 'from-green-500 to-emerald-600' },
  { icon: Calendar, label: 'Schedule Leave', action: 'schedule_leave', color: 'from-purple-500 to-violet-600' },
  { icon: BarChart3, label: 'Analytics', action: 'view_reports', color: 'from-orange-500 to-amber-600' },
  { icon: Users, label: 'Team Overview', action: 'team_overview', color: 'from-cyan-500 to-blue-600' },
  { icon: Clock, label: 'Time Tracking', action: 'time_tracking', color: 'from-indigo-500 to-purple-600' },
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
  const interfaceRef = useRef<HTMLDivElement>(null);

  // Click outside to close functionality
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (interfaceRef.current && !interfaceRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-4">
      <div 
        ref={interfaceRef}
        className="w-full max-w-7xl h-[90vh] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl shadow-2xl border border-slate-700/50 overflow-hidden animate-scale-in"
      >
        {/* Refined Professional Header */}
        <div className="flex items-center justify-between p-8 bg-gradient-to-r from-slate-800/90 to-slate-700/90 border-b border-slate-600/30 backdrop-blur-sm">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-xl">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Maria AI Assistant
              </h1>
              <p className="text-slate-400 text-lg font-medium">Advanced HR Intelligence & Automation Platform</p>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 rounded-full border border-green-500/30">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-green-300 text-sm font-medium">Online & Ready</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/20 rounded-full border border-blue-500/30">
                  <Shield className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-300 text-sm font-medium">Enterprise Secure</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="lg"
              onClick={onMinimize}
              className="text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-xl transition-all duration-200"
            >
              <Minimize2 className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="lg"
              onClick={onClose}
              className="text-slate-400 hover:text-white hover:bg-red-600/20 rounded-xl transition-all duration-200"
            >
              ✕
            </Button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Enhanced Professional Sidebar */}
          <div className="w-96 bg-slate-900/50 border-r border-slate-700/50 p-6 overflow-y-auto">
            <div className="space-y-8">
              {/* Quick Actions with Enhanced Design */}
              <Card className="bg-slate-800/60 border-slate-700/50 shadow-xl">
                <CardHeader className="pb-4">
                  <CardTitle className="text-white text-xl flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {quickActions.map((action) => (
                      <Button
                        key={action.action}
                        variant="outline"
                        onClick={() => onActionClick(action.action)}
                        className={`h-24 flex flex-col items-center gap-3 bg-gradient-to-br ${action.color} border-0 text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
                      >
                        <action.icon className="w-6 h-6" />
                        <span className="text-sm font-semibold">{action.label}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* AI Insights Panel */}
              <Card className="bg-slate-800/60 border-slate-700/50 shadow-xl">
                <CardHeader className="pb-4">
                  <CardTitle className="text-white text-xl flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-white" />
                    </div>
                    AI Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {smartSuggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        onClick={() => setInputValue(suggestion)}
                        className="w-full text-left justify-start text-slate-300 hover:bg-slate-700/50 h-auto p-4 whitespace-normal rounded-xl border border-slate-600/30 hover:border-slate-500/50 transition-all duration-200"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm leading-relaxed">{suggestion}</span>
                        </div>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced File Upload */}
              <Card className="bg-slate-800/60 border-slate-700/50 shadow-xl">
                <CardHeader className="pb-4">
                  <CardTitle className="text-white text-xl flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                      <Upload className="w-4 h-4 text-white" />
                    </div>
                    Document Upload
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className="border-2 border-dashed border-slate-600/50 rounded-xl p-8 text-center cursor-pointer hover:border-slate-500/70 transition-all duration-300 bg-slate-700/20 hover:bg-slate-700/40"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                    <p className="text-slate-300 font-medium">
                      Drop files here or click to upload
                    </p>
                    <p className="text-slate-500 text-sm mt-2">
                      PDF, Excel, Word, Images supported
                    </p>
                  </div>
                  
                  {uploadedFiles.length > 0 && (
                    <div className="mt-6 space-y-3">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center gap-4 bg-slate-700/40 rounded-xl p-4 border border-slate-600/30">
                          <FileText className="w-5 h-5 text-blue-400 flex-shrink-0" />
                          <span className="text-slate-300 flex-1 truncate font-medium">{file.name}</span>
                          <button
                            onClick={() => setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))}
                            className="text-slate-400 hover:text-red-400 transition-colors p-1"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Enhanced Main Chat Area */}
          <div className="flex-1 flex flex-col bg-gradient-to-b from-slate-900/30 to-slate-800/30">
            {/* Messages with Professional Styling */}
            <ScrollArea className="flex-1 p-8">
              <div className="max-w-5xl mx-auto space-y-8">
                {messages.map((message) => (
                  <div key={message.id} className="space-y-6">
                    <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[75%] ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-xl'
                          : 'bg-slate-800/80 text-slate-100 border border-slate-700/50 shadow-xl'
                      } p-6 rounded-2xl backdrop-blur-sm`}>
                        <p className="text-base leading-relaxed font-medium">{message.text}</p>
                        <p className="text-xs opacity-70 mt-3 font-medium">
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit',
                            hour12: true 
                          })}
                        </p>
                      </div>
                    </div>
                    
                    {message.actions && message.actions.length > 0 && (
                      <div className="flex flex-wrap gap-4 justify-start max-w-[75%]">
                        {message.actions.map((action, index) => (
                          <Button
                            key={index}
                            variant={action.variant || 'outline'}
                            size="sm"
                            onClick={() => onActionClick(action.action)}
                            className="bg-slate-800/60 border-slate-600/50 text-slate-200 hover:bg-slate-700/60 hover:scale-105 transition-all duration-200 shadow-lg"
                          >
                            <Zap className="w-4 h-4 mr-2" />
                            {action.label}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-slate-800/80 border border-slate-700/50 p-6 rounded-2xl shadow-xl backdrop-blur-sm">
                      <div className="flex items-center gap-4">
                        <div className="flex space-x-2">
                          <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" />
                          <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-100" />
                          <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-200" />
                        </div>
                        <span className="text-slate-300 font-medium">Maria is analyzing...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Premium Input Area */}
            <div className="border-t border-slate-700/50 p-8 bg-slate-900/60 backdrop-blur-sm">
              <div className="max-w-5xl mx-auto">
                <div className="flex items-center gap-6 bg-slate-800/60 rounded-2xl p-6 border border-slate-700/50 shadow-xl backdrop-blur-sm">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask Maria anything about HR, payroll, analytics..."
                    className="bg-transparent border-0 text-white placeholder:text-slate-400 text-lg focus:ring-0 font-medium"
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
                    className="bg-slate-700/80 hover:bg-slate-600/80 border border-slate-600/50 rounded-xl transition-all duration-200 shadow-lg"
                  >
                    <Upload className="w-5 h-5" />
                  </Button>
                  <Button
                    size="lg"
                    onClick={onToggleVoice}
                    className={`${isListening ? 'bg-red-600 hover:bg-red-700' : 'bg-slate-700/80 hover:bg-slate-600/80 border border-slate-600/50'} rounded-xl transition-all duration-200 shadow-lg`}
                  >
                    {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </Button>
                  <Button 
                    size="lg" 
                    onClick={onSendMessage} 
                    disabled={!inputValue.trim() && uploadedFiles.length === 0}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 px-8"
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
