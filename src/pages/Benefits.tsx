
import React from "react";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Shield, Briefcase, BadgeDollarSign, BadgeInfo } from "lucide-react";

export default function Benefits() {
  const { user } = useAuth();

  if (!user || user.role !== "hr") {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-[70vh]">
          <Shield className="w-12 h-12 text-blue-400 mb-4" />
          <h2 className="text-2xl font-bold text-blue-50 mb-2">Restricted Access</h2>
          <div className="text-blue-200 mb-1">
            The Benefits management page is accessible to HR managers only.
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mx-auto max-w-3xl py-8 px-2 sm:px-6">
        <h1 className="text-3xl font-extrabold text-white mb-2 flex items-center gap-3">
          <Briefcase className="w-8 h-8 text-blue-400" />
          Manage Employee Benefits
        </h1>
        <p className="text-blue-200 mb-6 max-w-xl">
          Here, HR managers can create, update, or remove benefit programs for the company, such as 401(k) retirement plans, health insurance, dental, life coverage, and more.
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          {/* Example benefit card */}
          <div className="bg-[#141a2e]/80 border border-blue-800/30 rounded-xl p-6 flex flex-col gap-3 shadow-glow">
            <div className="flex items-center gap-2">
              <BadgeDollarSign className="w-6 h-6 text-green-300" />
              <span className="font-bold text-lg text-white">401(k) Plan</span>
            </div>
            <div className="text-blue-300 text-sm">
              Company-sponsored retirement plan. Add plan details and eligibility info.
            </div>
            <button className="mt-2 text-blue-300 hover:text-blue-100 underline font-semibold text-xs text-left" disabled>
              Edit (coming soon)
            </button>
          </div>
          <div className="bg-[#141a2e]/80 border border-blue-800/30 rounded-xl p-6 flex flex-col gap-3 shadow-glow">
            <div className="flex items-center gap-2">
              <BadgeInfo className="w-6 h-6 text-cyan-300" />
              <span className="font-bold text-lg text-white">Health Insurance</span>
            </div>
            <div className="text-blue-300 text-sm">
              Add and manage company-provided health plans here.
            </div>
            <button className="mt-2 text-blue-300 hover:text-blue-100 underline font-semibold text-xs text-left" disabled>
              Edit (coming soon)
            </button>
          </div>
        </div>

        <div className="mt-10 text-blue-400 text-sm">
          <span>✨ More benefit types and management features coming soon...</span>
        </div>
      </div>
    </Layout>
  );
}
