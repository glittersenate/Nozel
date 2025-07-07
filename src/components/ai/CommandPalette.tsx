
import React, { useState, useEffect, useRef } from 'react';
import { Search, Zap, ArrowRight, Command } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ContextAwareMariaService } from '@/services/contextAwareMariaService';
import { useNavigate } from 'react-router-dom';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Command {
  id: string;
  title: string;
  description: string;
  category: string;
  action: () => void;
  keywords: string[];
  icon: React.ReactNode;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const commands: Command[] = [
    {
      id: 'add-employee',
      title: 'Add New Employee',
      description: 'Create a new employee record',
      category: 'Employees',
      action: () => navigate('/employees'),
      keywords: ['add', 'new', 'employee', 'hire', 'onboard'],
      icon: <Zap className="w-4 h-4" />
    },
    {
      id: 'run-payroll',
      title: 'Run Payroll',
      description: 'Process payroll for current period',
      category: 'Payroll',
      action: () => navigate('/payroll'),
      keywords: ['payroll', 'run', 'process', 'pay', 'salary'],
      icon: <Zap className="w-4 h-4" />
    },
    {
      id: 'view-analytics',
      title: 'View Analytics',
      description: 'Open workforce analytics dashboard',
      category: 'Analytics',
      action: () => navigate('/analytics'),
      keywords: ['analytics', 'dashboard', 'metrics', 'reports'],
      icon: <Zap className="w-4 h-4" />
    },
    {
      id: 'performance-reviews',
      title: 'Performance Reviews',
      description: 'Manage employee performance reviews',
      category: 'Performance',
      action: () => navigate('/performance'),
      keywords: ['performance', 'review', 'evaluation', 'feedback'],
      icon: <Zap className="w-4 h-4" />
    }
  ];

  const filteredCommands = commands.filter(command =>
    command.title.toLowerCase().includes(query.toLowerCase()) ||
    command.description.toLowerCase().includes(query.toLowerCase()) ||
    command.keywords.some(keyword => keyword.toLowerCase().includes(query.toLowerCase()))
  );

  const handleAIQuery = async () => {
    if (!query.trim()) return;
    
    setIsProcessing(true);
    try {
      const response = await ContextAwareMariaService.processContextualCommand(query);
      setAiResponse(response);
    } catch (error) {
      setAiResponse("I'm having trouble processing that request. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, filteredCommands.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
        onClose();
      } else {
        handleAIQuery();
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setQuery('');
      setSelectedIndex(0);
      setAiResponse(null);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (!isOpen) {
          // Open command palette
        }
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 bg-slate-900 border-blue-500/20 max-w-2xl">
        <div className="border-b border-blue-500/20 p-4">
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-blue-400" />
            <Input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Maria anything or search commands..."
              className="border-0 bg-transparent text-white placeholder:text-blue-300/50 focus:ring-0"
            />
            <Badge variant="outline" className="border-blue-500/30 text-blue-300">
              <Command className="w-3 h-3 mr-1" />
              K
            </Badge>
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {aiResponse && (
            <div className="p-4 border-b border-blue-500/20 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">M</span>
                </div>
                <div>
                  <p className="text-blue-100 text-sm">{aiResponse}</p>
                </div>
              </div>
            </div>
          )}

          {filteredCommands.length > 0 ? (
            <div className="p-2">
              {filteredCommands.map((command, index) => (
                <div
                  key={command.id}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                    index === selectedIndex
                      ? 'bg-blue-600/20 border border-blue-500/30'
                      : 'hover:bg-blue-600/10'
                  }`}
                  onClick={() => {
                    command.action();
                    onClose();
                  }}
                >
                  {command.icon}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium">{command.title}</span>
                      <Badge variant="secondary" className="text-xs">
                        {command.category}
                      </Badge>
                    </div>
                    <p className="text-blue-300/70 text-sm">{command.description}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-blue-400" />
                </div>
              ))}
            </div>
          ) : query && !isProcessing ? (
            <div className="p-6 text-center">
              <p className="text-blue-300/70 mb-4">No commands found for "{query}"</p>
              <Button
                onClick={handleAIQuery}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                disabled={isProcessing}
              >
                <Zap className="w-4 h-4 mr-2" />
                Ask Maria
              </Button>
            </div>
          ) : (
            <div className="p-6 text-center">
              <p className="text-blue-300/70">Start typing to search commands or ask Maria anything...</p>
            </div>
          )}
        </div>

        {isProcessing && (
          <div className="p-4 border-t border-blue-500/20">
            <div className="flex items-center gap-2 text-blue-300">
              <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
              <span className="text-sm">Maria is thinking...</span>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
