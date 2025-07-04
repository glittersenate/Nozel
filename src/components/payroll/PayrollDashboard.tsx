
import React from 'react';
import { PayrollSummaryCards } from './PayrollSummaryCards';
import { PayrollTable } from './PayrollTable';
import { PayrollChart } from './PayrollChart';
import { PayrollScheduler } from './PayrollScheduler';
import { ScheduleStatusCard } from './ScheduleStatusCard';
import { AIPayrollDashboard } from '../ai/AIPayrollDashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, BarChart3 } from 'lucide-react';

export const PayrollDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">Payroll Management</h2>
            <p className="text-blue-300">AI-powered payroll processing and employee compensation</p>
          </div>
          <PayrollScheduler />
        </div>
        <ScheduleStatusCard />
      </div>
      
      {/* AI/Traditional Toggle */}
      <Tabs defaultValue="ai-powered" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 bg-slate-800/60 border border-blue-500/20">
          <TabsTrigger 
            value="ai-powered"
            className="data-[state=active]:bg-purple-600/20 data-[state=active]:text-purple-300"
          >
            <Brain className="w-4 h-4 mr-2" />
            AI-Powered Dashboard
          </TabsTrigger>
          <TabsTrigger 
            value="traditional"
            className="data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-300"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Traditional View
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ai-powered">
          <AIPayrollDashboard />
        </TabsContent>

        <TabsContent value="traditional" className="space-y-6">
          <PayrollSummaryCards />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PayrollChart />
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
              <div className="bg-[#141a2e]/60 border border-blue-800/30 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-blue-300">March 2024 Payroll</span>
                  <span className="text-green-400 text-sm">Completed</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-300">February 2024 Payroll</span>
                  <span className="text-green-400 text-sm">Paid</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-300">January 2024 Payroll</span>
                  <span className="text-green-400 text-sm">Paid</span>
                </div>
              </div>
            </div>
          </div>
          <PayrollTable />
        </TabsContent>
      </Tabs>
    </div>
  );
};
