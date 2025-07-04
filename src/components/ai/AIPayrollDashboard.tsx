
import React, { useState } from 'react';
import { Brain, Zap, TrendingUp, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PredictivePayrollEngine } from './PredictivePayrollEngine';
import { FlightRiskAnalyzer } from './FlightRiskAnalyzer';
import { ConversationalPayrollBot } from './ConversationalPayrollBot';

export const AIPayrollDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('predictive');

  return (
    <div className="space-y-6">
      {/* AI Dashboard Header */}
      <Card className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-2xl text-white flex items-center gap-3">
            <Brain className="w-8 h-8 text-purple-400" />
            AI-Native Payroll Intelligence
            <div className="ml-auto flex gap-2">
              <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-300 text-sm">AI Active</span>
              </div>
            </div>
          </CardTitle>
          <p className="text-purple-300/80">
            Advanced AI-powered analytics, predictions, and automation for enterprise payroll management
          </p>
        </CardHeader>
      </Card>

      {/* AI Features Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-slate-800/60 border border-blue-500/20">
          <TabsTrigger 
            value="predictive" 
            className="data-[state=active]:bg-purple-600/20 data-[state=active]:text-purple-300"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Predictive Engine
          </TabsTrigger>
          <TabsTrigger 
            value="risk-analysis"
            className="data-[state=active]:bg-red-600/20 data-[state=active]:text-red-300"
          >
            <AlertCircle className="w-4 h-4 mr-2" />
            Flight Risk AI
          </TabsTrigger>
          <TabsTrigger 
            value="voice-commands"
            className="data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-300"
          >
            <Zap className="w-4 h-4 mr-2" />
            Voice Assistant
          </TabsTrigger>
        </TabsList>

        <TabsContent value="predictive" className="space-y-6">
          <PredictivePayrollEngine />
        </TabsContent>

        <TabsContent value="risk-analysis" className="space-y-6">
          <FlightRiskAnalyzer />
        </TabsContent>

        <TabsContent value="voice-commands" className="space-y-6">
          <ConversationalPayrollBot />
        </TabsContent>
      </Tabs>

      {/* Quick Stats Banner */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-green-600/20 to-green-500/20 border-green-500/30">
          <CardContent className="p-4">
            <div className="text-green-300 text-sm font-medium">AI Predictions</div>
            <div className="text-2xl font-bold text-white">94%</div>
            <div className="text-green-400 text-xs">Accuracy Rate</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-red-600/20 to-red-500/20 border-red-500/30">
          <CardContent className="p-4">
            <div className="text-red-300 text-sm font-medium">Flight Risks</div>
            <div className="text-2xl font-bold text-white">2</div>
            <div className="text-red-400 text-xs">High Priority</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-blue-600/20 to-blue-500/20 border-blue-500/30">
          <CardContent className="p-4">
            <div className="text-blue-300 text-sm font-medium">Commands Today</div>
            <div className="text-2xl font-bold text-white">18</div>
            <div className="text-blue-400 text-xs">Voice + Text</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-purple-600/20 to-purple-500/20 border-purple-500/30">
          <CardContent className="p-4">
            <div className="text-purple-300 text-sm font-medium">Cost Savings</div>
            <div className="text-2xl font-bold text-white">$57K</div>
            <div className="text-purple-400 text-xs">This Quarter</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
