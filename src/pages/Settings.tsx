import React, { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import SettingsSidebarNav from "@/components/settings/SettingsSidebarNav";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import ThemeToggle from "@/components/ThemeToggle";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

// LocalStorage keys
const EMAIL_NOTIFY_KEY = "user_pref_email_notify";
const PUSH_NOTIFY_KEY = "user_pref_push_notify";

export default function Settings() {
  // Notification toggle state (default values)
  const [emailNotify, setEmailNotify] = useState(true);
  const [pushNotify, setPushNotify] = useState(false);

  // Loading simulation for demo (unchanged)
  const [loading, setLoading] = useState(false);

  // On mount, load settings from localStorage
  useEffect(() => {
    const email = localStorage.getItem(EMAIL_NOTIFY_KEY);
    const push = localStorage.getItem(PUSH_NOTIFY_KEY);
    if (email !== null) setEmailNotify(email === "true");
    if (push !== null) setPushNotify(push === "true");
  }, []);

  // Persist to localStorage whenever the toggles change
  useEffect(() => {
    localStorage.setItem(EMAIL_NOTIFY_KEY, String(emailNotify));
  }, [emailNotify]);
  useEffect(() => {
    localStorage.setItem(PUSH_NOTIFY_KEY, String(pushNotify));
  }, [pushNotify]);

  // Reset preferences handler
  const handleResetPreferences = () => {
    localStorage.removeItem(EMAIL_NOTIFY_KEY);
    localStorage.removeItem(PUSH_NOTIFY_KEY);
    setEmailNotify(true);
    setPushNotify(false);
    toast({
      title: "Preferences reset",
      description: "All notification preferences have been reset to default.",
    });
  };

  return (
    <Layout>
      <div className="container mx-auto max-w-5xl py-10 px-3 sm:px-10 flex flex-col sm:flex-row gap-8 animate-fade-in">
        <aside className="w-full sm:w-64 shrink-0 flex-none">
          <SettingsSidebarNav />
        </aside>
        <section className="flex-1 min-w-0 space-y-8">
          {/* APPEARANCE */}
          <div id="appearance" className="bg-[#172040]/90 rounded-2xl p-7 shadow-lg flex flex-col gap-6">
            <h2 className="text-blue-100 text-xl font-bold mb-2">Appearance</h2>
            <div className="flex items-center gap-4">
              <Label htmlFor="theme" className="text-blue-200 font-medium">Theme</Label>
              <ThemeToggle />
              <span className="ml-4 text-blue-400/70 text-xs">{`Switch light / dark`}</span>
            </div>
          </div>

          {/* NOTIFICATIONS */}
          <div id="notifications" className="bg-[#172040]/90 rounded-2xl p-7 shadow-lg flex flex-col gap-6">
            <h2 className="text-blue-100 text-xl font-bold mb-2">Notification Preferences</h2>
            <form className="flex flex-col gap-3 max-w-xs">
              <div className="flex items-center justify-between gap-4">
                <Label
                  htmlFor="emailNotify"
                  className="text-blue-200"
                  aria-label="Toggle email notifications"
                >
                  Email Notifications
                </Label>
                <Switch
                  checked={emailNotify}
                  onCheckedChange={setEmailNotify}
                  id="emailNotify"
                  aria-checked={emailNotify}
                  aria-label={emailNotify ? "Disable Email Notifications" : "Enable Email Notifications"}
                  tabIndex={0}
                />
              </div>
              <div className="flex items-center justify-between gap-4">
                <Label
                  htmlFor="pushNotify"
                  className="text-blue-200"
                  aria-label="Toggle push notifications"
                >
                  Push Notifications
                </Label>
                <Switch
                  checked={pushNotify}
                  onCheckedChange={setPushNotify}
                  id="pushNotify"
                  aria-checked={pushNotify}
                  aria-label={pushNotify ? "Disable Push Notifications" : "Enable Push Notifications"}
                  tabIndex={0}
                />
              </div>
              <Button
                variant="outline"
                type="button"
                onClick={handleResetPreferences}
                className="mt-3"
                aria-label="Reset notification preferences"
              >
                Reset Preferences
              </Button>
            </form>
          </div>

          {/* PROFILE */}
          <div id="profile" className="bg-[#172040]/90 rounded-2xl p-7 shadow-lg flex flex-col gap-6">
            <h2 className="text-blue-100 text-xl font-bold mb-2">Profile</h2>
            <p className="text-blue-300/80 text-sm mb-2">Manage your personal information and account details here. (More editing features coming soon!)</p>
            <Button asChild variant="outline">
              <Link to="/employee-portal">Go to Employee Portal</Link>
            </Button>
          </div>

          {/* INTEGRATIONS */}
          <div id="integrations" className="bg-[#172040]/90 rounded-2xl p-7 shadow-lg flex flex-col gap-3">
            <h2 className="text-blue-100 text-xl font-bold mb-2">Integrations</h2>
            <div className="flex flex-col gap-2 text-blue-300/80">
              <span>
                Connect your HR data with third-party tools and automate workflows.
              </span>
              <Button asChild variant="secondary" className="max-w-xs">
                <Link to="/integrations">View Available Integrations</Link>
              </Button>
            </div>
          </div>

          {/* LOADING SKELETON DEMO */}
          {loading && (
            <div>
              <Skeleton className="h-8 w-[250px] mb-2" />
              <Skeleton className="h-5 w-full mb-1" />
              <Skeleton className="h-5 w-1/2" />
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
}
