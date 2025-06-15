
import React from "react";
import { Gift, DollarSign, HeartPulse } from "lucide-react";

// Define the benefits for the cards
const benefits = [
  {
    title: "401(k) Plan",
    description: "Company-sponsored retirement plan. Add plan details and eligibility info.",
    icon: (
      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full ring-2 ring-green-400 bg-blue-950/40">
        <DollarSign className="text-green-400 w-6 h-6" />
      </span>
    ),
    borderColor: "ring-green-400",
  },
  {
    title: "Health Insurance",
    description: "Add and manage company-provided health plans here.",
    icon: (
      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full ring-2 ring-cyan-400 bg-blue-950/40">
        <HeartPulse className="text-cyan-400 w-6 h-6" />
      </span>
    ),
    borderColor: "ring-cyan-400",
  },
];

const Benefits: React.FC = () => (
  <div className="relative max-w-5xl mx-auto py-10 px-4">
    {/* Header with icon and title */}
    <div className="flex items-center gap-3 mb-3 mt-3 sm:mt-0">
      <Gift className="text-blue-300 w-9 h-9" />
      <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
        Manage Employee Benefits
      </h1>
    </div>
    <p className="text-blue-200/90 mb-9 max-w-2xl text-lg">
      Here, HR managers can create, update, or remove benefit programs for the company, such as 401(k) retirement plans, health insurance, dental, life coverage, and more.
    </p>
    {/* Benefits cards */}
    <div className="grid sm:grid-cols-2 gap-6 mb-10">
      {benefits.map((benefit) => (
        <div
          key={benefit.title}
          className="bg-[#10192e]/70 border border-blue-700/50 rounded-2xl p-6 shadow flex flex-col gap-4 items-start transition-all hover:border-blue-400"
        >
          <div className="mb-1">{benefit.icon}</div>
          <h2 className="font-black text-2xl flex items-center gap-2 mb-1 text-white font-heading">
            {benefit.title}
          </h2>
          <p className="text-blue-300 mb-3">{benefit.description}</p>
          <span className="font-semibold text-blue-400 underline underline-offset-2 cursor-not-allowed opacity-90 text-sm">
            Edit (coming soon)
          </span>
        </div>
      ))}
    </div>
    {/* "More coming soon..." row */}
    <div className="flex items-center gap-2 mt-2">
      <span className="text-amber-400 text-lg">✨</span>
      <p className="text-blue-300 text-base">
        More benefit types and management features coming soon...
      </p>
    </div>
  </div>
);

export default Benefits;
