
import React, { useState } from 'react';
import { Mic, MicOff, Send, Zap, DollarSign, Users, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface PayrollCommand {
  id: string;
  command: string;
  action: string;
  status: 'processing' | 'completed' | 'failed';
  result?: string;
  timestamp: Date;
}

interface QuickAction {
  label: string;
  command: string;
  icon: React.ElementType;
  color: string;
}

export const ConversationalPayrollBot: React.FC = () => {
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [commands, setCommands] = useState<PayrollCommand[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const quickActions: QuickAction[] = [
    {
      label: 'Process Monthly Payroll',
      command: 'Process payroll for all active employees this month',
      icon: DollarSign,
      color: 'from-green-500 to-green-600'
    },
    {
      label: 'Calculate Overtime',
      command: 'Calculate overtime for employees who worked more than 40 hours this week',
      icon: Calendar,
      color: 'from-blue-500 to-blue-600'
    },
    {
      label: 'Generate Pay Stubs',
      command: 'Generate pay stubs for all employees for current pay period',
      icon: Users,
      color: 'from-purple-500 to-purple-600'
    },
    {
      label: 'Tax Calculations',
      command: 'Update tax calculations based on latest regulations',
      icon: Zap,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const processCommand = async (commandText: string) => {
    const newCommand: PayrollCommand = {
      id: Date.now().toString(),
      command: commandText,
      action: parseCommandAction(commandText),
      status: 'processing',
      timestamp: new Date()
    };

    setCommands(prev => [newCommand, ...prev]);
    setIsProcessing(true);
    setInput('');

    // Simulate AI processing
    setTimeout(() => {
      const result = generateCommandResult(newCommand.action);
      setCommands(prev => 
        prev.map(cmd => 
          cmd.id === newCommand.id 
            ? { ...cmd, status: 'completed', result }
            : cmd
        )
      );
      setIsProcessing(false);
    }, 2000 + Math.random() * 2000);
  };

  const parseCommandAction = (command: string): string => {
    const lowerCommand = command.toLowerCase();
    if (lowerCommand.includes('payroll') && lowerCommand.includes('process')) return 'process_payroll';
    if (lowerCommand.includes('overtime')) return 'calculate_overtime';
    if (lowerCommand.includes('pay stub')) return 'generate_paystubs';
    if (lowerCommand.includes('tax')) return 'update_taxes';
    if (lowerCommand.includes('bonus')) return 'process_bonus';
    return 'general_query';
  };

  const generateCommandResult = (action: string): string => {
    const results = {
      process_payroll: '✅ Payroll processed successfully for 24 employees. Total amount: $485,000. Pay stubs generated and sent.',
      calculate_overtime: '📊 Overtime calculated: 8 employees worked overtime (avg 12.5 hours). Total overtime pay: $15,240.',
      generate_paystubs: '📄 Pay stubs generated for all 24 employees and sent to their email addresses.',
      update_taxes: '🧮 Tax calculations updated based on Q1 2025 regulations. 3 employees affected.',
      process_bonus: '🎉 Performance bonuses processed for 12 employees. Total bonus amount: $48,000.',
      general_query: '💡 I can help with payroll processing, tax calculations, overtime management, and more. What would you like to do?'
    };
    return results[action as keyof typeof results] || results.general_query;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      processCommand(input.trim());
    }
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    // In a real implementation, you'd integrate with Web Speech API here
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-500/10';
      case 'failed': return 'text-red-400 bg-red-500/10';
      default: return 'text-yellow-400 bg-yellow-500/10';
    }
  };

  return (
    <div className="space-y-6">
      {/* Voice Command Interface */}
      <Card className="bg-slate-800/60 border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Mic className="w-5 h-5 text-blue-400" />
            Voice-First Payroll Assistant
            {isListening && <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse" />}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Say or type your payroll command... (e.g., 'Process payroll for engineering team')"
              className="bg-slate-700/50 border-blue-500/30 text-white placeholder:text-blue-300/50"
            />
            <Button
              type="button"
              onClick={toggleVoiceInput}
              variant={isListening ? "default" : "outline"}
              className={`${isListening ? 'bg-red-600 hover:bg-red-700' : 'border-blue-500/30'}`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </Button>
            <Button type="submit" disabled={!input.trim() || isProcessing}>
              <Send className="w-4 h-4" />
            </Button>
          </form>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => processCommand(action.command)}
                className={`h-auto p-4 flex items-center gap-3 bg-gradient-to-r ${action.color} border-0 text-white hover:scale-105 transition-all duration-200`}
                disabled={isProcessing}
              >
                <action.icon className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-medium">{action.label}</div>
                  <div className="text-xs opacity-80">{action.command}</div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Command History */}
      <Card className="bg-slate-800/60 border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-400" />
            Recent Commands
            {isProcessing && (
              <Badge variant="outline" className="animate-pulse">
                Processing...
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {commands.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-blue-300/60 mb-2">No commands yet</div>
                <div className="text-sm text-blue-400/70">
                  Try saying: "Process payroll for this month" or use the quick actions above
                </div>
              </div>
            ) : (
              commands.map((command) => (
                <div key={command.id} className="bg-slate-700/50 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="text-blue-200 text-sm font-medium mb-1">
                        {command.command}
                      </div>
                      <div className="text-xs text-blue-300/60">
                        {command.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                    <Badge className={getStatusColor(command.status)}>
                      {command.status}
                    </Badge>
                  </div>
                  {command.result && (
                    <div className="bg-slate-600/30 rounded p-3 mt-3">
                      <div className="text-blue-100 text-sm">{command.result}</div>
                    </div>
                  )}
                  {command.status === 'processing' && (
                    <div className="flex items-center gap-2 mt-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100" />
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200" />
                      </div>
                      <span className="text-blue-300 text-sm">AI is processing your request...</span>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
