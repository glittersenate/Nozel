
import React from "react";
import { Settings, Sun, Bell } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Visually appealing placeholder for right section
const PLACEHOLDER =
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=650&q=80";

const SettingsPage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-br from-blue-950/70 via-slate-950 to-purple-900">
      <div
        className={`
          w-full
          bg-slate-900/90
          border border-blue-800/20 
          shadow-xl 
          rounded-3xl 
          p-5
          animate-fade-in
          flex flex-col gap-8
          md:flex-row 
          md:gap-0
          md:p-0
          md:max-w-5xl
          md:items-stretch
        `}
      >
        {/* Left - Settings sections */}
        <div
          className="
            flex-1
            flex flex-col
            gap-8
            md:p-10
            md:pr-6
            md:gap-10
          "
        >
          {/* Header section */}
          <div className="flex items-center gap-4 mb-3 md:mb-6">
            <span className="inline-flex items-center justify-center bg-gradient-to-br from-blue-400/70 to-purple-500/80 p-5 md:p-8 rounded-full shadow-lg">
              <Settings size={40} className="text-white drop-shadow-glow md:w-12 md:h-12" />
            </span>
            <div>
              <h1 className="font-extrabold text-2xl sm:text-3xl md:text-4xl bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent tracking-tight md:leading-tight">
                Settings
              </h1>
              <p className="text-blue-200/90 text-sm md:text-base font-medium md:mt-1">
                Personalize NozelPay to fit your workflow
              </p>
            </div>
          </div>
          {/* Appearance Section */}
          <section>
            <h2 className="font-semibold text-base md:text-lg text-blue-100 mb-2 flex items-center gap-2">
              <Sun className="w-4 h-4 md:w-5 md:h-5 inline-block text-yellow-300" />
              <span>Appearance</span>
            </h2>
            <div className="flex items-center justify-between p-4 rounded-lg border border-blue-800/20 bg-blue-950/40 mb-2 md:p-5 md:text-lg">
              <span className="text-blue-100">Theme</span>
              <ThemeToggle />
            </div>
            <p className="text-xs md:text-sm text-blue-300/60 pl-2">Switch between light and dark mode.</p>
          </section>
          {/* Notifications Section */}
          <section>
            <h2 className="font-semibold text-base md:text-lg text-blue-100 mb-2 flex items-center gap-2">
              <Bell className="w-4 h-4 md:w-5 md:h-5 text-blue-300" />
              <span>Notifications</span>
            </h2>
            <div className="space-y-3 pl-1">
              <div className="flex items-center justify-between rounded-md p-3 md:p-4 border border-blue-800/20 bg-slate-800/50">
                <span className="text-blue-100">Email notifications</span>
                <Switch disabled checked={false} />
              </div>
              <div className="flex items-center justify-between rounded-md p-3 md:p-4 border border-blue-800/20 bg-slate-800/50">
                <span className="text-blue-100">Push notifications</span>
                <Switch disabled checked={false} />
              </div>
              <p className="text-xs md:text-sm text-blue-300/60 pl-1">(Coming soon)</p>
            </div>
          </section>
          {/* Profile Section */}
          <section>
            <h2 className="font-semibold text-base md:text-lg text-blue-100 mb-2 pl-1">Profile</h2>
            <form className="space-y-4 md:space-y-6">
              <div>
                <Label htmlFor="name" className="text-blue-200">Name</Label>
                <Input id="name" disabled value="Jane Doe" className="bg-blue-950/40 border-blue-800/20 text-blue-100 mt-1" />
              </div>
              <div>
                <Label htmlFor="email" className="text-blue-200">Email</Label>
                <Input id="email" disabled value="jane.doe@email.com" className="bg-blue-950/40 border-blue-800/20 text-blue-100 mt-1" />
              </div>
              <div>
                <Label htmlFor="role" className="text-blue-200">Role</Label>
                <Input id="role" disabled value="Payroll Manager" className="bg-blue-950/40 border-blue-800/20 text-blue-100 mt-1" />
              </div>
            </form>
            <p className="text-xs md:text-sm text-blue-300/60 pl-1 mt-2">(Profile editing coming soon)</p>
          </section>
        </div>
        {/* Right - Illustration */}
        <div className="
          hidden md:flex items-center justify-center min-w-[320px] max-w-[420px] mr-5
        ">
          <img
            src={PLACEHOLDER}
            alt="Settings illustration"
            className="rounded-2xl w-full max-h-[520px] object-cover shadow-lg border border-blue-800/10"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
