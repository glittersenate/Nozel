
import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'maria';
  timestamp: Date;
  isTyping?: boolean;
}

interface ChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Maria, your AI HR assistant. I can help you with employee management, payroll, leave requests, and more. Try saying something like 'Add Joey to payroll at 20K monthly' or 'Show me performance reviews'.",
      sender: 'maria',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle sending message
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate Maria's response
    setTimeout(() => {
      const mariaResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateMariaResponse(inputValue),
        sender: 'maria',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, mariaResponse]);
      setIsTyping(false);
    }, 1500);
  };

  // Generate Maria's response based on user input
  const generateMariaResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes('add') && lowerInput.includes('payroll')) {
      return "I'd be happy to help you add someone to payroll! However, I need to confirm this action with you first. Please provide the employee's full details including their employee ID, department, and start date. Should I proceed with adding them to the system?";
    }

    if (lowerInput.includes('performance') || lowerInput.includes('review')) {
      return "I can help you with performance reviews! Would you like me to show recent reviews, schedule a new review, or help you analyze performance metrics for a specific employee or department?";
    }

    if (lowerInput.includes('leave') || lowerInput.includes('time off')) {
      return "I can assist with leave management. Would you like to approve pending requests, check leave balances, or schedule time off for an employee? Please let me know which employee and the details.";
    }

    if (lowerInput.includes('employee') || lowerInput.includes('staff')) {
      return "I can help with employee management tasks like adding new employees, updating information, or retrieving employee details. What specific action would you like me to perform?";
    }

    return "I understand you're looking for help with HR tasks. I can assist with payroll, employee management, performance reviews, leave requests, and more. Could you be more specific about what you'd like me to help you with?";
  };

  // Handle voice input
  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    // Voice recognition would be implemented here
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-end p-4 pointer-events-none">
      <div className="bg-slate-900/95 backdrop-blur-xl border border-blue-500/20 rounded-2xl shadow-2xl w-96 h-[500px] pointer-events-auto animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-blue-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <div>
              <h3 className="text-white font-semibold">Maria</h3>
              <p className="text-blue-300/70 text-xs">AI HR Assistant</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-blue-300 hover:text-white hover:bg-blue-600/20"
          >
            ×
          </Button>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 h-[360px] p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-800 text-blue-100 border border-blue-500/20'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-800 border border-blue-500/20 p-3 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-4 border-t border-blue-500/20">
          <div className="flex items-center gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask Maria anything..."
              className="bg-slate-800 border-blue-500/30 text-white placeholder:text-blue-300/50"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button
              size="sm"
              onClick={toggleVoiceInput}
              variant={isListening ? "default" : "outline"}
              className={`${isListening ? 'bg-red-600 hover:bg-red-700' : 'border-blue-500/30 hover:bg-blue-600/20'}`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </Button>
            <Button size="sm" onClick={handleSendMessage} disabled={!inputValue.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
