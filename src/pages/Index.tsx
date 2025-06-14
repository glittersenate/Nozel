
import React from "react";
import { Users, DollarSign, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import UserProfile from "@/components/UserProfile";
import NotificationCenter from "@/components/NotificationCenter";
import QuickActions from "@/components/QuickActions";

const metrics = [
  {
    label: "Payroll Processed",
    value: "$125,000",
    icon: <DollarSign className="text-blue-400" />,
  },
  {
    label: "Employees Paid",
    value: "38",
    icon: <Users className="text-blue-400" />,
  },
  {
    label: "Avg. Time",
    value: "8.8s",
    icon: <Clock className="text-blue-400" />,
  },
];

const Index = () => {
  const { toast } = useToast();

  const handleRunPayroll = () => {
    toast({
      title: "Payroll Run Started",
      description: "Your payroll is now being processed. You'll be notified when it's complete.",
      variant: "default",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0e1c38] to-[#12284a] text-white flex">
      {/* Enhanced Sidebar */}
      <aside className="w-64 bg-[#141a2e]/80 shadow-md min-h-screen fixed left-0 flex flex-col z-10 hidden sm:flex">
        <div className="p-4 border-b border-blue-800/30">
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
        <UserProfile />
      </aside>

      {/* Mobile Header */}
      <div className="sm:hidden w-full bg-[#141a2e]/80 shadow-md p-4 fixed top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/lovable-uploads/2c2dcc83-282d-4d62-9030-5dd87146ff17.png"
              alt="NozelPay Logo"
              className="h-8 w-auto"
            />
            <span className="font-bold text-lg tracking-wide">NozelPay</span>
          </div>
        </div>
      </div>

      {/* Main dashboard content */}
      <main className="flex-1 sm:ml-64 p-6 pt-20 sm:pt-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-extrabold mb-2">Welcome to NozelPay</h1>
          <div className="text-blue-300 mb-8 font-semibold">
            Supercharge your payroll.<br />
            Everything you need. <span className="bg-blue-600/30 px-2 rounded text-blue-100">10-second payroll, powered by AI</span>
          </div>

          {/* Run Payroll CTA */}
          <div className="mb-8 flex">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold px-8 py-4 rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-500 transition-all animate-fade-in"
              onClick={handleRunPayroll}
            >
              Run Payroll
            </Button>
          </div>

          {/* Metrics grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-xl bg-[#141a2e]/80 border border-blue-950 shadow-sm p-6 flex flex-col gap-3 items-start hover:scale-105 hover:shadow-lg transition-transform cursor-pointer"
              >
                <div className="flex items-center gap-3 font-bold text-xl">
                  {m.icon}
                  <span>{m.value}</span>
                </div>
                <div className="text-sm text-blue-200/70">{m.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Actions */}
              <QuickActions />

              {/* AI Insights */}
              <div className="rounded-2xl bg-[#1a2550]/70 border border-blue-950 shadow-md p-6 animate-fade-in">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="text-yellow-300" />
                  <h2 className="text-xl font-extrabold">AI Insights</h2>
                </div>
                <div className="text-blue-100 text-sm opacity-90 leading-relaxed">
                  "Payroll run successfully completed. No anomalies detected. Employees were paid in record time! 
                  Consider reviewing the overtime hours for Q1 - there's been a 15% increase compared to last quarter."
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <NotificationCenter />
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 text-center text-xs opacity-60 border-t border-blue-800/20 pt-6">
            Prototype v1 · Dark theme · Mobile-first layout
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
