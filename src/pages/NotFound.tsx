
import React from "react";
import { Settings, Sun, Bell } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SettingsSidebarNav from "@/components/settings/SettingsSidebarNav";
import { Layout } from "@/components/Layout";

const SettingsPage: React.FC = () => {
  return (
    <Layout>
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

        {/* Desktop Layout redesigned: */}
        <div className="hidden lg:block px-0 py-12">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-12 gap-9">
              {/* Sticky Sidebar Navigation */}
              <div className="col-span-3 xl:col-span-2 flex flex-col">
                <SettingsSidebarNav />
              </div>

              {/* Settings Cards Main Content */}
              <div className="col-span-9 xl:col-span-8 flex flex-col gap-8">
                {/* Heading */}
                <div className="flex items-center gap-5 mb-2 animate-fade-in">
                  <span className="inline-flex items-center justify-center bg-gradient-to-br from-blue-400/70 to-purple-500/80 p-7 rounded-2xl shadow-2xl">
                    <Settings size={48} className="text-white drop-shadow-glow" />
                  </span>
                  <div>
                    <h1 className="font-extrabold text-4xl bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent tracking-tight mb-1">Settings</h1>
                    <p className="text-blue-200/90 text-lg font-medium">Personalize NozelPay to fit your workflow</p>
                  </div>
                </div>

                {/* Appearance */}
                <section id="appearance" className="w-full">
                  <div className="bg-slate-900/95 border border-blue-800/20 rounded-2xl p-8 shadow-glow animate-fade-in mb-4">
                    <h2 className="font-bold text-xl text-blue-100 mb-4 flex items-center gap-2">
                      <Sun className="w-6 h-6 text-yellow-300" />
                      Appearance
                    </h2>
                    <div className="flex flex-row items-center justify-between gap-6">
                      <div>
                        <span className="text-blue-100 text-base font-medium">Theme</span>
                        <p className="text-blue-300/70 text-sm mt-1">Switch between light and dark mode</p>
                      </div>
                      <ThemeToggle />
                    </div>
                  </div>
                </section>

                {/* Notifications */}
                <section id="notifications" className="w-full">
                  <div className="bg-slate-900/95 border border-blue-800/20 rounded-2xl p-8 shadow-glow animate-fade-in mb-4">
                    <h2 className="font-bold text-xl text-blue-100 mb-4 flex items-center gap-2">
                      <Bell className="w-6 h-6 text-blue-300" />
                      Notifications
                    </h2>
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1 bg-slate-800/50 border border-blue-800/20 rounded-xl p-6 flex items-center justify-between">
                        <div>
                          <span className="text-blue-100 text-base font-medium">Email notifications</span>
                          <p className="text-blue-300/70 text-sm mt-1">Receive updates via email</p>
                        </div>
                        <Switch disabled checked={false} />
                      </div>
                      <div className="flex-1 bg-slate-800/50 border border-blue-800/20 rounded-xl p-6 flex items-center justify-between">
                        <div>
                          <span className="text-blue-100 text-base font-medium">Push notifications</span>
                          <p className="text-blue-300/70 text-sm mt-1">Get instant browser notifications</p>
                        </div>
                        <Switch disabled checked={false} />
                      </div>
                    </div>
                    <p className="text-blue-300/60 text-sm mt-3">(Coming soon)</p>
                  </div>
                </section>

                {/* Profile */}
                <section id="profile" className="w-full">
                  <div className="bg-slate-900/95 border border-blue-800/20 rounded-2xl p-8 shadow-glow animate-fade-in">
                    <h2 className="font-bold text-xl text-blue-100 mb-4">Profile</h2>
                    <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                      <div className="sm:col-span-2">
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
                </section>
              </div>
              {/* Third col: accent or whitespace (not used now, reserved for future) */}
              <div className="col-span-2 xl:col-span-2" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;
