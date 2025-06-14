
import React from "react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0e1c38] to-[#12284a] text-white flex flex-col">
      {/* Sidebar Placeholder */}
      <aside className="w-full sm:w-64 bg-[#141a2e]/80 shadow-md mb-4 sm:mb-0 sm:min-h-screen sm:fixed sm:left-0 flex items-center sm:items-start px-4 py-3 z-10">
        {/* Replace '/your-logo.svg' with the uploaded logo filename */}
        <img
          src="/your-logo.svg"
          alt="NozelPay Logo"
          className="h-10 w-auto sm:mb-4"
        />
        <span className="ml-3 font-bold text-xl tracking-wide hidden sm:inline">NozelPay</span>
      </aside>

      {/* Main dashboard content */}
      <main className="flex-1 flex flex-col sm:ml-64 p-6 max-w-2xl mx-auto w-full">
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-2">Welcome to NozelPay</h1>
        <div className="text-blue-300 mb-8 font-semibold">Supercharge your payroll.<br />Everything you need. <span className="bg-blue-600/30 px-2 rounded text-blue-100">10-second payroll, powered by AI</span></div>
        <div className="rounded-2xl bg-[#141a2e]/70 border border-blue-950 shadow-md p-5 flex flex-col gap-3 mb-4">
          {/* Dashboard grid scaffolding */}
          <div className="animate-pulse rounded-lg h-24 w-full bg-[#1a2550]/60 mb-2" />
          <div className="animate-pulse rounded-lg h-24 w-full bg-[#1a2550]/60" />
        </div>
        {/* Ready for metric cards, AI insights, payroll actions... */}
        <div className="mt-12 text-center text-xs opacity-60">Prototype v1 · Dark theme · Mobile-first layout</div>
      </main>
    </div>
  );
};

export default Index;

