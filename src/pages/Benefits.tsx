
import React from "react";

const companyBenefits = [
  {
    title: "Health Insurance",
    description: "Comprehensive medical, dental, and vision coverage for you and your family.",
    icon: "🩺"
  },
  {
    title: "Retirement Plan",
    description: "Employer-matched 401(k) plan to help you save for the future.",
    icon: "💸"
  },
  {
    title: "Paid Time Off",
    description: "Generous vacation, holiday, and sick leave policies.",
    icon: "🌴"
  },
  {
    title: "Professional Development",
    description: "Training budgets and course reimbursements to support your growth.",
    icon: "📚"
  }
];

const Benefits = () => (
  <div className="max-w-4xl mx-auto py-10 px-4">
    <h1 className="text-3xl font-bold text-white mb-4">Employee Benefits</h1>
    <p className="mb-8 text-blue-200/90 max-w-2xl">Explore your total rewards and learn more about the benefits available to NozelPay employees.</p>
    <div className="grid gap-6 md:grid-cols-2">
      {companyBenefits.map((benefit) => (
        <div key={benefit.title} className="bg-[#141a2e]/60 border border-blue-800/30 rounded-xl p-6 flex gap-5 items-start">
          <div className="text-4xl">{benefit.icon}</div>
          <div>
            <h3 className="text-xl font-semibold text-blue-100 mb-1">{benefit.title}</h3>
            <p className="text-blue-300">{benefit.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Benefits;
