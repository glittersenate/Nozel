
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
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-blue-950/70 via-slate-950 to-purple-900">
      {/* Mobile Layout */}
      <div className="flex items-center justify-center lg:hidden p-4">
        <div className="w-full bg-slate-900/90 border border-blue-800/20 shadow-xl rounded-3xl p-5 animate-fade-in flex flex-col gap-8">
          {/* Header section */}
          <div className="flex items-center gap-4 mb-3">
            <span className="inline-flex items-center justify-center bg-gradient-to-br from-blue-400/70 to-purple-500/80 p-5 rounded-full shadow-lg">
              <Settings size={40} className="text-white drop-shadow-glow" />
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
          
          {/* Mobile sections */}
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
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block p-8">
        <div className="max-w-7xl mx-auto">
          {/* Desktop Header */}
          <div className="flex items-center gap-6 mb-12">
            <span className="inline-flex items-center justify-center bg-gradient-to-br from-blue-400/70 to-purple-500/80 p-8 rounded-2xl shadow-2xl">
              <Settings size={64} className="text-white drop-shadow-glow" />
            </span>
            <div>
              <h1 className="font-extrabold text-5xl bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent tracking-tight mb-2">
                Settings
              </h1>
              <p className="text-blue-200/90 text-xl font-medium">
                Personalize NozelPay to fit your workflow
              </p>
            </div>
          </div>

          {/* Desktop Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Left Column - Settings */}
            <div className="xl:col-span-2 space-y-8">
              {/* Appearance Card */}
              <div className="bg-slate-900/90 border border-blue-800/20 rounded-2xl p-8 shadow-xl">
                <h2 className="font-bold text-2xl text-blue-100 mb-6 flex items-center gap-3">
                  <Sun className="w-7 h-7 text-yellow-300" />
                  <span>Appearance</span>
                </h2>
                <div className="bg-blue-950/40 border border-blue-800/20 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-blue-100 text-lg font-medium">Theme</span>
                      <p className="text-blue-300/60 text-sm mt-1">Switch between light and dark mode</p>
                    </div>
                    <ThemeToggle />
                  </div>
                </div>
              </div>

              {/* Notifications Card */}
              <div className="bg-slate-900/90 border border-blue-800/20 rounded-2xl p-8 shadow-xl">
                <h2 className="font-bold text-2xl text-blue-100 mb-6 flex items-center gap-3">
                  <Bell className="w-7 h-7 text-blue-300" />
                  <span>Notifications</span>
                </h2>
                <div className="space-y-4">
                  <div className="bg-slate-800/50 border border-blue-800/20 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-blue-100 text-lg font-medium">Email notifications</span>
                        <p className="text-blue-300/60 text-sm mt-1">Receive updates via email</p>
                      </div>
                      <Switch disabled checked={false} />
                    </div>
                  </div>
                  <div className="bg-slate-800/50 border border-blue-800/20 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-blue-100 text-lg font-medium">Push notifications</span>
                        <p className="text-blue-300/60 text-sm mt-1">Get instant browser notifications</p>
                      </div>
                      <Switch disabled checked={false} />
                    </div>
                  </div>
                  <p className="text-blue-300/60 text-sm pl-2">(Coming soon)</p>
                </div>
              </div>

              {/* Profile Card */}
              <div className="bg-slate-900/90 border border-blue-800/20 rounded-2xl p-8 shadow-xl">
                <h2 className="font-bold text-2xl text-blue-100 mb-6">Profile</h2>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-blue-200 text-base font-medium">Name</Label>
                    <Input 
                      id="name" 
                      disabled 
                      value="Jane Doe" 
                      className="bg-blue-950/40 border-blue-800/20 text-blue-100 mt-2 h-12 text-base" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-blue-200 text-base font-medium">Email</Label>
                    <Input 
                      id="email" 
                      disabled 
                      value="jane.doe@email.com" 
                      className="bg-blue-950/40 border-blue-800/20 text-blue-100 mt-2 h-12 text-base" 
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="role" className="text-blue-200 text-base font-medium">Role</Label>
                    <Input 
                      id="role" 
                      disabled 
                      value="Payroll Manager" 
                      className="bg-blue-950/40 border-blue-800/20 text-blue-100 mt-2 h-12 text-base" 
                    />
                  </div>
                </form>
                <p className="text-blue-300/60 text-sm mt-4">(Profile editing coming soon)</p>
              </div>
            </div>

            {/* Right Column - Illustration */}
            <div className="xl:col-span-1">
              <div className="bg-slate-900/90 border border-blue-800/20 rounded-2xl p-8 shadow-xl h-full">
                <img
                  src={PLACEHOLDER}
                  alt="Settings illustration"
                  className="rounded-xl w-full h-full object-cover shadow-lg border border-blue-800/10"
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
