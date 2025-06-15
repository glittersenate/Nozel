
import React from "react";
import { Gift, DollarSign, HeartPulse, Info } from "lucide-react";

const benefits = [
  {
    title: "401(k) Plan",
    description: "Company-sponsored retirement plan. Add plan details and eligibility info.",
    icon: DollarSign,
    link: "#",
  },
  {
    title: "Health Insurance",
    description: "Add and manage company-provided health plans here.",
    icon: HeartPulse,
    link: "#",
  },
];

const Benefits: React.FC = () => (
  <div className="max-w-5xl mx-auto py-10 px-4">
    <div className="flex items-center gap-3 mb-3">
      <Gift className="text-blue-300 w-8 h-8" />
      <h1 className="text-3xl font-extrabold text-white font-heading tracking-tight">
        Manage Employee Benefits
      </h1>
    </div>
    <p className="text-blue-200/90 mb-10 max-w-2xl">
      Here, HR managers can create, update, or remove benefit programs for the company, such as 401(k) retirement plans, health insurance, dental, life coverage, and more.
    </p>
    <div className="grid sm:grid-cols-2 gap-6 mb-10">
      {benefits.map(benefit => (
        <div key={benefit.title} className="bg-[#151c2e]/80 border border-blue-800/30 rounded-2xl p-6 shadow-md flex flex-col gap-3 transition-all hover:border-blue-500/70">
          <benefit.icon className="w-9 h-9 text-blue-300 mb-3" />
          <h2 className="font-bold text-2xl text-blue-100 flex items-center gap-2 mb-1">{benefit.title}</h2>
          <p className="text-blue-300 mb-4">{benefit.description}</p>
          <span className="text-blue-400 font-medium text-sm underline underline-offset-2 cursor-not-allowed opacity-75">
            Edit (coming soon)
          </span>
        </div>
      ))}
    </div>
    <div className="flex items-center gap-2 mt-8">
      <span className="text-yellow-400 text-lg">✨</span>
      <p className="text-blue-300 text-sm">
        More benefit types and management features coming soon...
      </p>
    </div>
  </div>
);

export default Benefits;
