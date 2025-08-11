import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const SIDEBAR_SECTIONS = [
  { id: "general", label: "General" },
  { id: "security", label: "Security" },
];

// Simulate a user for demo purposes
const fakeUser = {
  name: "Jane Doe",
  email: "jane.doe@email.com",
};

export default function Settings() {
  // --- State
  const [sidebarSection, setSidebarSection] = useState("general");
  const [profile, setProfile] = useState({ ...fakeUser });
  const [editing, setEditing] = useState(false);
  const [passwordInputs, setPasswordInputs] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [emailNotify, setEmailNotify] = useState(true);
  const [pushNotify, setPushNotify] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // --- Handlers
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setEditing(false);
      toast({
        title: "Profile updated",
        description: "Your personal information was updated.",
      });
    }, 700);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordInputs({ ...passwordInputs, [e.target.name]: e.target.value });
  };
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordInputs.current || !passwordInputs.new || !passwordInputs.confirm) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }
    if (passwordInputs.new !== passwordInputs.confirm) {
      toast({ title: "Passwords do not match", variant: "destructive" });
      return;
    }
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setPasswordInputs({ current: "", new: "", confirm: "" });
      toast({
        title: "Password changed",
        description: "Your password has been updated successfully.",
      });
    }, 900);
  };

  // --- Sidebar Nav
  const handleSidebarNav = (id: string) => {
    setSidebarSection(id);
    document.getElementById(id)?.focus();
  };

  return (
    <div className="w-full py-10 px-4 lg:pl-16 lg:pr-0 flex flex-col sm:flex-row gap-8 animate-fade-in">
      {/* Sidebar */}
      <aside
        className="w-full sm:w-52 shrink-0 flex-none mb-4 sm:mb-0 sidebar-flat rounded-xl"
        aria-label="Settings Navigation"
      >
        <nav className="flex flex-row sm:flex-col gap-2 pt-2">
          {SIDEBAR_SECTIONS.map((section) => (
            <button
              key={section.id}
              className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-colors
                ${sidebarSection === section.id
                  ? "bg-blue-900/75 text-blue-50 shadow-glow"
                  : "hover:bg-blue-900/40 text-blue-300"
                }
                focus-visible:ring-2 ring-blue-400 focus-visible:outline-none`}
              onClick={() => handleSidebarNav(section.id)}
              tabIndex={0}
              aria-label={`Show ${section.label} settings`}
            >
              {section.label}
            </button>
          ))}
        </nav>
      </aside>
      <section className="flex-1 min-w-0 space-y-10">
        {/* --- GENERAL --- */}
        {sidebarSection === "general" && (
          <div
            id="general"
            className="
              card-flat
              flex flex-col gap-8
              py-8 px-4 sm:px-10 rounded-2xl
              bg-[rgba(18,24,41,0.98)]
              shadow-glow
              border border-blue-900/50
              animate-fade-in-up
              "
            tabIndex={-1}
            aria-labelledby="general-heading"
          >
            <div>
              <h2 
                className="text-2xl font-bold text-white mb-4 tracking-tight"
                id="general-heading"
                tabIndex={0}
              >
                Profile Information
              </h2>
              {!editing ? (
                <>
                  <div className="flex flex-col gap-2 mb-6">
                    <div>
                      <Label className="text-blue-300 text-xs">Name</Label>
                      <div className="font-medium text-white text-base">{profile.name}</div>
                    </div>
                    <div>
                      <Label className="text-blue-300 text-xs">Email</Label>
                      <div className="font-medium text-white text-base">{profile.email}</div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-max mt-2 rounded-lg border-blue-900/60 hover:border-blue-500"
                    onClick={() => setEditing(true)}
                    aria-label="Edit profile"
                  >
                    Edit Profile
                  </Button>
                </>
              ) : (
                <form className="flex flex-col gap-5" onSubmit={handleSaveProfile}>
                  <div>
                    <Label htmlFor="name" className="text-blue-200 font-semibold">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={profile.name}
                      onChange={handleProfileChange}
                      className="mt-2 px-4 py-2 bg-[#151c2d] border-blue-900/70 rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500 text-blue-100"
                      maxLength={32}
                      required
                      autoFocus
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-blue-200 font-semibold">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={profile.email}
                      autoComplete="email"
                      onChange={handleProfileChange}
                      className="mt-2 px-4 py-2 bg-[#151c2d] border-blue-900/70 rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500 text-blue-100"
                      required
                    />
                  </div>
                  <div className="flex gap-4 mt-2">
                    <Button
                      type="submit"
                      disabled={isSaving}
                      variant="default"
                      className="min-w-[120px] rounded-lg"
                    >
                      {isSaving ? <span>Saving...</span> : "Save Changes"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="min-w-[100px] rounded-lg"
                      disabled={isSaving}
                      onClick={() => {
                        setProfile({ ...fakeUser });
                        setEditing(false);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              )}
            </div>

            <div className="my-2 border-t border-blue-900/40" />

            <div>
              <h2 className="text-lg font-semibold text-white mb-4">Notification Preferences</h2>
              <form className="flex flex-col gap-4 max-w-sm">
                <div className="flex items-center justify-between gap-6">
                  <Label
                    htmlFor="emailNotify"
                    className="text-blue-300 font-medium"
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
                    className="focus-visible:ring-2 ring-blue-400 focus-visible:outline-none"
                  />
                </div>
                <div className="flex items-center justify-between gap-6">
                  <Label
                    htmlFor="pushNotify"
                    className="text-blue-300 font-medium"
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
                    className="focus-visible:ring-2 ring-blue-400 focus-visible:outline-none"
                  />
                </div>
              </form>
            </div>
          </div>
        )}

        {/* --- SECURITY --- */}
        {sidebarSection === "security" && (
          <div
            id="security"
            className="
              card-flat flex flex-col gap-10
              py-8 px-4 sm:px-10 rounded-2xl
              bg-[rgba(18,24,41,0.98)]
              shadow-glow border border-blue-900/50 animate-fade-in-up
              "
            tabIndex={-1}
            aria-labelledby="security-heading"
          >
            <h2 className="text-2xl font-bold text-white mb-6 tracking-tight" id="security-heading" tabIndex={0}>
              Account Security
            </h2>

            {/* Password change section */}
            <form className="flex flex-col gap-6 max-w-md mx-auto" onSubmit={handlePasswordSubmit}>
              <div>
                <Label htmlFor="current" className="mb-2 text-blue-200 font-semibold">Current Password</Label>
                <Input
                  id="current"
                  name="current"
                  type="password"
                  value={passwordInputs.current}
                  autoComplete="current-password"
                  onChange={handlePasswordChange}
                  className="mt-2 px-4 py-2 bg-[#151c2d] border-blue-900/80 rounded-lg text-blue-50"
                  required
                />
              </div>
              <div>
                <Label htmlFor="new" className="mb-2 text-blue-200 font-semibold">New Password</Label>
                <Input
                  id="new"
                  name="new"
                  type="password"
                  value={passwordInputs.new}
                  autoComplete="new-password"
                  onChange={handlePasswordChange}
                  className="mt-2 px-4 py-2 bg-[#151c2d] border-blue-900/80 rounded-lg text-blue-50"
                  required
                />
              </div>
              <div>
                <Label htmlFor="confirm" className="mb-2 text-blue-200 font-semibold">Confirm New Password</Label>
                <Input
                  id="confirm"
                  name="confirm"
                  type="password"
                  value={passwordInputs.confirm}
                  autoComplete="new-password"
                  onChange={handlePasswordChange}
                  className="mt-2 px-4 py-2 bg-[#151c2d] border-blue-900/80 rounded-lg text-blue-50"
                  required
                />
              </div>
              <Button
                type="submit"
                variant="default"
                className="mt-3 min-w-[140px] rounded-lg font-bold py-2 text-base"
                disabled={isSaving}
              >
                {isSaving ? <span>Saving...</span> : "Change Password"}
              </Button>
            </form>
            
            <div className="border-t border-blue-900/40 my-2" />

            {/* Session management (logout all devices) */}
            <div className="pt-2">
              <h3 className="text-lg text-blue-100 font-semibold mb-3">Session Management</h3>
              <Button
                variant="outline"
                className="w-max font-medium bg-[#151c2d] border-blue-900/60 hover:border-blue-500 text-blue-100 rounded-lg"
                onClick={() =>
                  toast({
                    title: "Logged out everywhere",
                    description: "You will need to sign in again on all devices.",
                  })
                }
              >
                Log Out of All Devices
              </Button>
            </div>

            <div className="border-t border-blue-900/40 my-2" />

            {/* 2FA toggle (placeholder) */}
            <div className="pt-2 flex items-center gap-4">
              <Switch disabled checked={false} id="2fa-switch" />
              <span className="text-blue-300 text-base font-medium">Two-Factor Authentication <span className="pl-1 text-blue-400">Coming soon</span></span>
            </div>

            <div className="border-t border-blue-900/40 my-4" />

            {/* Delete account (placeholder) */}
            <div>
              <h3 className="text-lg text-red-500 font-semibold mb-2">Danger Zone</h3>
              <Button
                variant="destructive"
                className="bg-red-600 hover:bg-red-700 rounded-lg shadow-sm font-semibold"
                disabled
              >
                Delete Account (Coming Soon)
              </Button>
            </div>
          </div>
        )}

        {/* LOADING SKELETON DEMO */}
        {isSaving && (
          <div>
            <Skeleton className="h-8 w-[250px] mb-2" />
            <Skeleton className="h-5 w-full mb-1" />
            <Skeleton className="h-5 w-1/2" />
          </div>
        )}
      </section>
    </div>
  );
}
