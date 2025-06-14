
import React from "react";
import { Settings, Moon, Sun, Bell } from "lucide-react";
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
      <div className="max-w-3xl w-full p-7 rounded-3xl shadow-xl border border-blue-800/20 bg-slate-900/90 flex flex-col md:flex-row gap-8 animate-fade-in">
        {/* Left: Settings form */}
        <div className="flex-1 flex flex-col gap-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-flex items-center justify-center bg-gradient-to-br from-blue-400/70 to-purple-500/80 p-4 rounded-full shadow-lg">
              <Settings size={32} className="text-white drop-shadow-glow" />
            </span>
            <div>
              <h1 className="font-extrabold text-2xl sm:text-3xl bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent tracking-tight">
                Settings
              </h1>
              <p className="text-blue-200/90 text-sm font-medium">
                Personalize NozelPay to fit your workflow
              </p>
            </div>
          </div>
          {/* Theme Section */}
          <section>
            <h2 className="font-semibold text-base text-blue-100 mb-2 flex items-center gap-2">
              <Sun className="w-4 h-4 inline-block text-yellow-300" />
              <span>Appearance</span>
            </h2>
            <div className="flex items-center justify-between p-4 rounded-lg border border-blue-800/20 bg-blue-950/40 mb-2">
              <span className="text-blue-100">Theme</span>
              <ThemeToggle />
            </div>
            <p className="text-xs text-blue-300/60 pl-2">Switch between light and dark mode.</p>
          </section>
          {/* Notifications Section */}
          <section>
            <h2 className="font-semibold text-base text-blue-100 mb-2 flex items-center gap-2">
              <Bell className="w-4 h-4 text-blue-300" />
              <span>Notifications</span>
            </h2>
            <div className="space-y-3 pl-1">
              <div className="flex items-center justify-between rounded-md p-3 border border-blue-800/20 bg-slate-800/50">
                <span className="text-blue-100">Email notifications</span>
                <Switch disabled checked={false} />
              </div>
              <div className="flex items-center justify-between rounded-md p-3 border border-blue-800/20 bg-slate-800/50">
                <span className="text-blue-100">Push notifications</span>
                <Switch disabled checked={false} />
              </div>
              <p className="text-xs text-blue-300/60 pl-1">(Coming soon)</p>
            </div>
          </section>
          {/* Profile Section */}
          <section>
            <h2 className="font-semibold text-base text-blue-100 mb-2 pl-1">Profile</h2>
            <form className="space-y-4">
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
            <p className="text-xs text-blue-300/60 pl-1 mt-2">(Profile editing coming soon)</p>
          </section>
        </div>
        {/* Right: Illustration image, hide on small screens */}
        <div className="hidden md:flex flex-col items-center justify-center flex-1 min-w-[220px]">
          <img
            src={PLACEHOLDER}
            alt="Settings illustration"
            className="rounded-2xl w-full max-h-80 object-cover shadow-lg border border-blue-800/10"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
