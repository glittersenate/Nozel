
import React from "react";
import { Users, DollarSign, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

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
    <div className="min-h-screen bg-gradient-to-br from-[#0e1c38] to-[#12284a] text-white flex flex-col">
      {/* Sidebar with uploaded logo */}
      <aside className="w-full sm:w-64 bg-[#141a2e]/80 shadow-md mb-4 sm:mb-0 sm:min-h-screen sm:fixed sm:left-0 flex items-center sm:items-start px-4 py-3 z-10">
        <img
          src="/lovable-uploads/2c2dcc83-282d-4d62-9030-5dd87146ff17.png"
          alt="NozelPay Logo"
          className="h-10 w-auto sm:mb-4"
        />
        <span className="ml-3 font-bold text-xl tracking-wide hidden sm:inline">NozelPay</span>
      </aside>

      {/* Main dashboard content */}
      <main className="flex-1 flex flex-col sm:ml-64 p-6 max-w-3xl mx-auto w-full">
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-2">Welcome to NozelPay</h1>
        <div className="text-blue-300 mb-8 font-semibold">
          Supercharge your payroll.<br />
          Everything you need. <span className="bg-blue-600/30 px-2 rounded text-blue-100">10-second payroll, powered by AI</span>
        </div>
        {/* Run Payroll CTA */}
        <div className="mb-6 flex">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold px-6 py-3 rounded-lg shadow hover:from-blue-700 hover:to-blue-500 transition-all animate-fade-in"
            onClick={handleRunPayroll}
          >
            Run Payroll
          </Button>
        </div>
        {/* Metrics grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-xl bg-[#141a2e]/80 border border-blue-950 shadow-sm p-5 flex flex-col gap-2 items-start hover:scale-105 hover:shadow-lg transition-transform"
            >
              <div className="flex items-center gap-2 font-bold text-lg">
                {m.icon}
                <span>{m.value}</span>
              </div>
              <div className="text-xs text-blue-200/70">{m.label}</div>
            </div>
          ))}
        </div>
        {/* AI Insights */}
        <div className="rounded-2xl bg-[#1a2550]/70 border border-blue-950 shadow-md p-5 flex flex-col gap-3 mb-4 animate-fade-in">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="text-yellow-300" />
            <h2 className="text-lg font-extrabold">AI Insights</h2>
          </div>
          <div className="text-blue-100 text-sm opacity-80">“Payroll run successfully completed. No anomalies detected. Employees were paid in record time!”</div>
        </div>
        {/* Footer/comments */}
        <div className="mt-12 text-center text-xs opacity-60">Prototype v1 · Dark theme · Mobile-first layout</div>
      </main>
    </div>
  );
};

export default Index;
