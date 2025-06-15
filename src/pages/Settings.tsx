
import React, { useState } from "react";
import { Layout } from "@/components/Layout";
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
    // Validation and saving logic should go here
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
    <Layout>
      <div className="container mx-auto max-w-4xl py-10 px-3 sm:px-10 flex flex-col sm:flex-row gap-8 animate-fade-in">
        {/* Custom Sidebar */}
        <aside
          className="w-full sm:w-48 shrink-0 flex-none mb-4 sm:mb-0 sidebar-flat"
          aria-label="Settings Navigation"
        >
          <nav className="flex flex-row sm:flex-col gap-3 sm:gap-2 pt-2">
            {SIDEBAR_SECTIONS.map((section) => (
              <button
                key={section.id}
                className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-colors
                  ${sidebarSection === section.id
                    ? "bg-blue-900/40 text-blue-100"
                    : "hover:bg-blue-900/20 text-blue-300"
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
        <section className="flex-1 min-w-0 space-y-8">
          {/* --- GENERAL --- */}
          {sidebarSection === "general" && (
            <div
              id="general"
              className="card-flat flex flex-col gap-6"
              tabIndex={-1}
              aria-labelledby="general-heading"
            >
              <h2 className="text-foreground text-xl font-bold mb-2" id="general-heading" tabIndex={0}>
                Profile Information
              </h2>
              {!editing ? (
                <>
                  <div className="flex flex-col gap-2">
                    <div>
                      <Label className="text-blue-300 text-xs">Name</Label>
                      <div className="font-medium text-white">{profile.name}</div>
                    </div>
                    <div>
                      <Label className="text-blue-300 text-xs">Email</Label>
                      <div className="font-medium text-white">{profile.email}</div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-max mt-2"
                    onClick={() => setEditing(true)}
                    aria-label="Edit profile"
                  >
                    Edit Profile
                  </Button>
                </>
              ) : (
                <form className="flex flex-col gap-4" onSubmit={handleSaveProfile}>
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={profile.name}
                      onChange={handleProfileChange}
                      className="mt-1"
                      maxLength={32}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={profile.email}
                      autoComplete="email"
                      onChange={handleProfileChange}
                      className="mt-1"
                      required
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button
                      type="submit"
                      disabled={isSaving}
                      variant="default"
                      className="min-w-[100px]"
                    >
                      {isSaving ? <span>Saving...</span> : "Save Changes"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="min-w-[100px]"
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

              <div className="border-t border-blue-900/30 my-2" />

              <h2 className="text-foreground text-lg font-bold">Notification Preferences</h2>
              <form className="flex flex-col gap-3 max-w-xs">
                <div className="flex items-center justify-between gap-4">
                  <Label
                    htmlFor="emailNotify"
                    className="text-muted-foreground"
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
                <div className="flex items-center justify-between gap-4">
                  <Label
                    htmlFor="pushNotify"
                    className="text-muted-foreground"
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
          )}

          {/* --- SECURITY --- */}
          {sidebarSection === "security" && (
            <div
              id="security"
              className="card-flat flex flex-col gap-6"
              tabIndex={-1}
              aria-labelledby="security-heading"
            >
              <h2 className="text-foreground text-xl font-bold mb-2" id="security-heading" tabIndex={0}>
                Account Security
              </h2>

              <form className="flex flex-col gap-4 max-w-md" onSubmit={handlePasswordSubmit}>
                <div>
                  <Label htmlFor="current" className="mb-1">Current Password</Label>
                  <Input
                    id="current"
                    name="current"
                    type="password"
                    value={passwordInputs.current}
                    autoComplete="current-password"
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="new" className="mb-1">New Password</Label>
                  <Input
                    id="new"
                    name="new"
                    type="password"
                    value={passwordInputs.new}
                    autoComplete="new-password"
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="confirm" className="mb-1">Confirm New Password</Label>
                  <Input
                    id="confirm"
                    name="confirm"
                    type="password"
                    value={passwordInputs.confirm}
                    autoComplete="new-password"
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  variant="default"
                  className="mt-2 min-w-[110px]"
                  disabled={isSaving}
                >
                  {isSaving ? <span>Saving...</span> : "Change Password"}
                </Button>
              </form>
              
              {/* Session management (logout all devices) */}
              <div className="mt-7 pt-4 border-t border-blue-900/30">
                <h3 className="text-blue-100 font-medium mb-2">Session Management</h3>
                <Button
                  variant="outline"
                  className="w-max"
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

              {/* 2FA toggle (placeholder) */}
              <div className="mt-4">
                <h3 className="text-blue-100 font-medium mb-2">Two-Factor Authentication</h3>
                <div className="flex items-center gap-4">
                  <Switch disabled checked={false} id="2fa-switch" />
                  <span className="text-blue-300">Coming soon</span>
                </div>
              </div>

              {/* Delete account (placeholder) */}
              <div className="mt-8">
                <h3 className="text-red-400 font-medium mb-3">Danger Zone</h3>
                <Button
                  variant="destructive"
                  className="bg-red-600 hover:bg-red-700"
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
    </Layout>
  );
}
