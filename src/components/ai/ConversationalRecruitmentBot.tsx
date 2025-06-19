import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Bot, 
  User, 
  Send, 
  Paperclip, 
  Mic, 
  MoreVertical,
  ThumbsUp,
  ThumbsDown,
  Copy,
  RefreshCw,
  Sparkles,
  FileText,
  Calendar,
  Users,
  TrendingUp
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  attachments?: any[];
  metadata?: {
    intent?: string;
    confidence?: number;
    entities?: any[];
  };
}

interface QuickAction {
  label: string;
  icon: React.ComponentType<any>;
  action: string;
  color: string;
}

export const ConversationalRecruitmentBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hi! I'm your AI recruitment assistant. I can help you with candidate screening, interview scheduling, job posting optimization, and recruitment analytics. What would you like to work on today?",
      timestamp: new Date(),
      suggestions: [
        "Screen candidates for Software Engineer role",
        "Schedule interviews for this week",
        "Analyze recruitment metrics",
        "Create job posting"
      ]
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickActions: QuickAction[] = [
    { label: 'Screen Candidates', icon: Users, action: 'screen_candidates', color: 'blue' },
    { label: 'Schedule Interview', icon: Calendar, action: 'schedule_interview', color: 'green' },
    { label: 'Job Analytics', icon: TrendingUp, action: 'job_analytics', color: 'purple' },
    { label: 'Create Job Post', icon: FileText, action: 'create_job_post', color: 'orange' }
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(content);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (userInput: string): Message => {
    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.includes('screen') || lowerInput.includes('candidate')) {
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: "I'll help you screen candidates! I can analyze resumes, conduct initial assessments, and rank candidates based on your criteria. Which position are you hiring for?",
        timestamp: new Date(),
        suggestions: [
          "Software Engineer",
          "Product Manager", 
          "Data Scientist",
          "UX Designer"
        ],
        metadata: {
          intent: 'candidate_screening',
          confidence: 0.95
        }
      };
    } else if (lowerInput.includes('schedule') || lowerInput.includes('interview')) {
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: "I can help schedule interviews! I'll check interviewer availability, send calendar invites, and prepare interview packets. How many interviews do you need to schedule?",
        timestamp: new Date(),
        suggestions: [
          "Schedule 1 interview",
          "Schedule multiple interviews",
          "Check interviewer availability",
          "Reschedule existing interview"
        ],
        metadata: {
          intent: 'interview_scheduling',
          confidence: 0.92
        }
      };
    } else if (lowerInput.includes('analytics') || lowerInput.includes('metrics')) {
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: "Here's your recruitment analytics overview: 📊\n\n• Time to hire: 18 days (↓ 3 days)\n• Candidate pipeline: 47 active\n• Interview-to-offer ratio: 3:1\n• Top source: LinkedIn (35%)\n\nWould you like me to dive deeper into any specific metric?",
        timestamp: new Date(),
        suggestions: [
          "Source effectiveness",
          "Hiring funnel analysis",
          "Time-to-hire breakdown",
          "Cost per hire"
        ],
        metadata: {
          intent: 'analytics_request',
          confidence: 0.88
        }
      };
    } else {
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: "I understand you're looking for help with recruitment. I can assist with candidate screening, interview scheduling, job posting optimization, and recruitment analytics. What specific task would you like to start with?",
        timestamp: new Date(),
        suggestions: [
          "Screen new candidates",
          "Schedule interviews",
          "View recruitment metrics",
          "Optimize job postings"
        ],
        metadata: {
          intent: 'general_inquiry',
          confidence: 0.75
        }
      };
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const handleQuickAction = (action: string) => {
    const actionMessages = {
      screen_candidates: "I'd like to screen candidates for an open position",
      schedule_interview: "Help me schedule interviews for this week",
      job_analytics: "Show me recruitment analytics and metrics",
      create_job_post: "I need to create a new job posting"
    };
    
    handleSendMessage(actionMessages[action as keyof typeof actionMessages]);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // Voice recognition would be implemented here
  };

  return (
    <div className="max-w-4xl mx-auto h-[600px] flex flex-col">
      {/* Header */}
      <Card className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 border-slate-700/50 rounded-b-none">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-white flex items-center gap-2">
                  AI Recruitment Assistant
                  <Badge className="bg-green-500/20 text-green-300 text-xs">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse" />
                    Online
                  </Badge>
                </CardTitle>
                <p className="text-sm text-slate-400">Powered by advanced AI • Responds in seconds</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Quick Actions */}
      <div className="bg-slate-800/30 border-x border-slate-700/50 p-4">
        <div className="flex gap-2 overflow-x-auto">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => handleQuickAction(action.action)}
              className={`
                flex-shrink-0 border-${action.color}-500/30 text-${action.color}-300 
                hover:bg-${action.color}-500/10 whitespace-nowrap
              `}
            >
              <action.icon className="w-4 h-4 mr-2" />
              {action.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <Card className="flex-1 bg-slate-800/50 border-slate-700/50 rounded-none overflow-hidden">
        <CardContent className="h-full p-0 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.type === 'bot' && (
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                
                <div className={`max-w-[70%] ${message.type === 'user' ? 'order-1' : ''}`}>
                  <div
                    className={`
                      p-3 rounded-2xl
                      ${message.type === 'user'
                        ? 'bg-blue-600 text-white ml-auto'
                        : 'bg-slate-700/50 text-white'
                      }
                    `}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    
                    {message.metadata && (
                      <div className="mt-2 text-xs opacity-70">
                        Intent: {message.metadata.intent} • Confidence: {Math.round((message.metadata.confidence || 0) * 100)}%
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                    <span>{message.timestamp.toLocaleTimeString()}</span>
                    {message.type === 'bot' && (
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-slate-600">
                          <ThumbsUp className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-slate-600">
                          <ThumbsDown className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-slate-600">
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
                  </div>

                  {message.suggestions && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {message.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="text-xs border-blue-500/30 text-blue-300 hover:bg-blue-500/10"
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>

                {message.type === 'user' && (
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-slate-700/50 p-3 rounded-2xl">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-slate-700/50 p-4">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                  placeholder="Ask me about recruitment, candidates, or scheduling..."
                  className="bg-slate-700/50 border-slate-600 text-white pr-20"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-white">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleListening}
                    className={`h-8 w-8 p-0 ${isListening ? 'text-red-400' : 'text-slate-400 hover:text-white'}`}
                  >
                    <Mic className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <Button
                onClick={() => handleSendMessage(inputValue)}
                disabled={!inputValue.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex items-center justify-between mt-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3 h-3" />
                <span>AI-powered responses • Always learning</span>
              </div>
              <div className="flex items-center gap-1">
                <RefreshCw className="w-3 h-3" />
                <span>Last updated: just now</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};