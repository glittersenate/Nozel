import React, { useState } from "react";
import { Users, DollarSign, Clock, Sparkles, Command } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import UserProfile from "@/components/UserProfile";
import NotificationCenter from "@/components/NotificationCenter";
import QuickActions from "@/components/QuickActions";
import StatsCards from "@/components/dashboard/StatsCards";
import DepartmentChart from "@/components/dashboard/DepartmentChart";
import SalaryChart from "@/components/dashboard/SalaryChart";
import RecentActivity from "@/components/dashboard/RecentActivity";
import RealTimeMetrics from "@/components/dashboard/RealTimeMetrics";
import LiveActivityFeed from "@/components/dashboard/LiveActivityFeed";
import RoleSelector from "@/components/RoleSelector";
import ThemeToggle from "@/components/ThemeToggle";
import NotificationSystem from "@/components/NotificationSystem";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { useRealTimeData } from "@/hooks/useRealTimeData";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";

// Mock employee data for dashboard
const mockEmployees = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@company.com',
    position: 'Software Engineer',
    department: 'Engineering',
    salary: 85000,
    startDate: '2023-01-15',
    status: 'active' as const
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    position: 'HR Manager',
    department: 'Human Resources',
    salary: 75000,
    startDate: '2022-06-10',
    status: 'active' as const
  },
  {
    id: '3',
    name: 'Mike Davis',
    email: 'mike.davis@company.com',
    position: 'Marketing Specialist',
    department: 'Marketing',
    salary: 60000,
    startDate: '2023-03-20',
    status: 'active' as const
  },
  {
    id: '4',
    name: 'Emily Chen',
    email: 'emily.chen@company.com',
    position: 'Product Manager',
    department: 'Product',
    salary: 95000,
    startDate: '2022-09-05',
    status: 'inactive' as const
  },
  {
    id: '5',
    name: 'Alex Rodriguez',
    email: 'alex.rodriguez@company.com',
    position: 'Data Analyst',
    department: 'Engineering',
    salary: 70000,
    startDate: '2023-11-01',
    status: 'active' as const
  },
  {
    id: '6',
    name: 'Lisa Wang',
    email: 'lisa.wang@company.com',
    position: 'Designer',
    department: 'Product',
    salary: 68000,
    startDate: '2023-12-15',
    status: 'active' as const
  }
];

const DashboardContent = () => {
  const { toast } = useToast();
  const { user, permissions } = useAuth();
  const { metrics, isLive, toggleLiveMode } = useRealTimeData(mockEmployees);
  const [showShortcuts, setShowShortcuts] = useState(false);

  // Keyboard shortcuts
  useKeyboardShortcuts([
    {
      key: 'k',
      ctrl: true,
      action: () => toast({ title: "Search", description: "Search functionality activated!" }),
      description: 'Open search'
    },
    {
      key: 'n',
      ctrl: true,
      action: () => toast({ title: "New Employee", description: "Add employee dialog opened!" }),
      description: 'Add new employee'
    },
    {
      key: '/',
      action: () => setShowShortcuts(!showShortcuts),
      description: 'Show keyboard shortcuts'
    },
    {
      key: 'l',
      ctrl: true,
      action: toggleLiveMode,
      description: 'Toggle live mode'
    }
  ]);

  const handleRunPayroll = () => {
    if (!permissions.canRunPayroll) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to run payroll.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Payroll Run Started",
      description: "Your payroll is now being processed. You'll be notified when it's complete.",
      variant: "default",
    });
  };

  const totalPayroll = mockEmployees
    .filter(emp => emp.status === 'active')
    .reduce((sum, emp) => sum + emp.salary, 0);

  const activeEmployees = mockEmployees.filter(emp => emp.status === 'active').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0e1c38] to-[#12284a] dark:from-[#0e1c38] dark:to-[#12284a] light:from-gray-50 light:to-gray-100 text-white dark:text-white light:text-gray-900 flex">
      {/* Enhanced Sidebar */}
      <aside className="w-64 bg-[#141a2e]/80 dark:bg-[#141a2e]/80 light:bg-white light:border-r shadow-md min-h-screen fixed left-0 flex flex-col z-10 hidden sm:flex">
        <div className="p-4 border-b border-blue-800/30 dark:border-blue-800/30 light:border-gray-200">
          <div className="flex items-center gap-3">
            <img
              src="/lovable-uploads/2c2dcc83-282d-4d62-9030-5dd87146ff17.png"
              alt="NozelPay Logo"
              className="h-8 w-auto"
            />
            <span className="font-bold text-xl tracking-wide">NozelPay</span>
          </div>
        </div>
        <div className="flex-1 px-4">
          <Navigation />
        </div>
        <div className="p-4 border-t border-blue-800/30 dark:border-blue-800/30 light:border-gray-200">
          <RoleSelector />
        </div>
        <UserProfile />
      </aside>

      {/* Mobile Header */}
      <div className="sm:hidden w-full bg-[#141a2e]/80 dark:bg-[#141a2e]/80 light:bg-white shadow-md p-4 fixed top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/lovable-uploads/2c2dcc83-282d-4d62-9030-5dd87146ff17.png"
              alt="NozelPay Logo"
              className="h-8 w-auto"
            />
            <span className="font-bold text-lg tracking-wide">NozelPay</span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <NotificationSystem />
            <RoleSelector />
          </div>
        </div>
      </div>

      {/* Main dashboard content */}
      <main className="flex-1 sm:ml-64 p-6 pt-20 sm:pt-6">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold mb-2">
                  Welcome back, {user?.name}! 
                  <span className="ml-3 text-sm font-normal text-blue-300">
                    Press <kbd className="px-1 py-0.5 bg-blue-600/20 rounded text-xs">?</kbd> for shortcuts
                  </span>
                </h1>
                <div className="text-blue-300 dark:text-blue-300 light:text-gray-600 mb-6 font-semibold">
                  Supercharge your payroll.<br />
                  Everything you need. <span className="bg-blue-600/30 px-2 rounded text-blue-100">10-second payroll, powered by AI</span>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-3">
                <ThemeToggle />
                <NotificationSystem />
              </div>
            </div>

            {/* Keyboard Shortcuts Help */}
            {showShortcuts && (
              <div className="mb-6 p-4 bg-[#141a2e]/80 dark:bg-[#141a2e]/80 light:bg-gray-100 border border-blue-800/30 dark:border-blue-800/30 light:border-gray-300 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Command className="w-4 h-4" />
                    Keyboard Shortcuts
                  </h3>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => setShowShortcuts(false)}
                    className="text-blue-300 hover:text-blue-100"
                  >
                    ×
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div><kbd className="bg-blue-600/20 px-1 rounded">Ctrl+K</kbd> Open search</div>
                  <div><kbd className="bg-blue-600/20 px-1 rounded">Ctrl+N</kbd> Add employee</div>
                  <div><kbd className="bg-blue-600/20 px-1 rounded">Ctrl+L</kbd> Toggle live mode</div>
                  <div><kbd className="bg-blue-600/20 px-1 rounded">?</kbd> Show/hide shortcuts</div>
                </div>
              </div>
            )}

            {/* Run Payroll CTA */}
            {permissions.canRunPayroll && (
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold px-8 py-4 rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-500 transition-all animate-fade-in"
                onClick={handleRunPayroll}
              >
                Run Payroll - ${totalPayroll.toLocaleString()} for {activeEmployees} employees
              </Button>
            )}
          </div>

          {/* Real-time Analytics */}
          {permissions.canViewAnalytics && (
            <div className="mb-8">
              <RealTimeMetrics 
                metrics={metrics} 
                isLive={isLive} 
                onToggleLive={toggleLiveMode} 
              />
            </div>
          )}

          {/* Stats Cards */}
          <StatsCards employees={mockEmployees} />

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {permissions.canViewAnalytics ? (
              <>
                <DepartmentChart employees={mockEmployees} />
                <SalaryChart employees={mockEmployees} />
              </>
            ) : (
              <div className="lg:col-span-2 bg-[#141a2e]/80 dark:bg-[#141a2e]/80 light:bg-gray-100 border border-blue-950 dark:border-blue-950 light:border-gray-300 rounded-xl p-8 text-center">
                <p className="text-blue-300 dark:text-blue-300 light:text-gray-600">You don't have permission to view detailed analytics.</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Actions */}
              <QuickActions />

              {/* AI Insights */}
              <div className="rounded-2xl bg-[#1a2550]/70 dark:bg-[#1a2550]/70 light:bg-white border border-blue-950 dark:border-blue-950 light:border-gray-200 shadow-md p-6 animate-fade-in">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="text-yellow-300" />
                  <h2 className="text-xl font-extrabold">AI Insights</h2>
                </div>
                <div className="text-blue-100 dark:text-blue-100 light:text-gray-700 text-sm opacity-90 leading-relaxed">
                  {permissions.canViewAnalytics ? (
                    `"Payroll run successfully completed. No anomalies detected. Employees were paid in record time! 
                    Consider reviewing the overtime hours for Q1 - there's been a 15% increase compared to last quarter. 
                    Engineering department shows highest average salary at $77.5k. Live mode is ${isLive ? 'active' : 'inactive'}."`
                  ) : (
                    `"Welcome to NozelPay! As a ${user?.role}, you have access to core features. 
                    Contact your administrator for additional permissions. Try using keyboard shortcuts for faster navigation!"`
                  )}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {permissions.canViewAnalytics ? (
                <LiveActivityFeed activities={metrics.activityFeed} isLive={isLive} />
              ) : (
                <RecentActivity employees={mockEmployees} />
              )}
              <NotificationCenter />
            </div>
          </div>

          {/* Enhanced Footer */}
          <div className="mt-12 text-center text-xs opacity-60 border-t border-blue-800/20 dark:border-blue-800/20 light:border-gray-200 pt-6">
            Prototype v6 · Enterprise Features · Advanced UI/UX · Keyboard Shortcuts · Theme Support
          </div>
        </div>
      </main>
    </div>
  );
};

const Index = () => {
  return (
    <AuthProvider>
      <DashboardContent />
    </AuthProvider>
  );
};

export default Index;
