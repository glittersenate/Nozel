
import React from "react";
import { Settings } from "lucide-react";

// Select a visually striking placeholder image from context:
const PLACEHOLDER =
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=650&q=80";

const SettingsPage = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-br from-blue-950/70 via-slate-950 to-purple-900">
      <div className="max-w-lg w-full p-7 rounded-3xl shadow-xl border border-blue-800/20 bg-slate-900/80 flex flex-col items-center animate-fade-in">
        <div className="flex flex-col items-center gap-1 mb-4">
          <span className="inline-flex items-center justify-center bg-gradient-to-br from-blue-400/70 to-purple-500/80 p-4 rounded-full shadow-lg mb-2">
            <Settings size={36} className="text-white drop-shadow-glow" />
          </span>
          <h1 className="font-extrabold text-2xl sm:text-3xl text-center bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent tracking-tight">
            Settings
          </h1>
          <p className="text-blue-200/90 font-medium mt-1 text-center">
            Customize your NozelPay experience <br className="hidden sm:block"/>
            (Coming soon!)
          </p>
        </div>
        <img
          src={PLACEHOLDER}
          alt="Settings Preview"
          className="rounded-xl w-full max-h-56 object-cover shadow-md border border-blue-800/10 mb-5"
          draggable={false}
        />
        <div className="text-center text-blue-300/80 space-y-2">
          <p>
            Stay tuned - soon you’ll be able to update your preferences, profile, appearance, and more!
          </p>
          <p className="text-xs text-blue-400/60 italic">
            If you have suggestions, let us know!
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
