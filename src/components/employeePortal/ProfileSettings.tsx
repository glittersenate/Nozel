
import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { User, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

const DEFAULT_AVATAR =
  "https://ui-avatars.com/api/?background=4f46e5&color=fff&name=U";

// Key for localStorage simulation
const STORAGE_KEY = "employeePortal_profile_v1";

type ProfilePersistData = {
  name: string;
  email: string;
  department: string;
  avatar: string;
};

const ProfileSettings: React.FC = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    department: user?.department || "",
  });
  const [editing, setEditing] = useState(false);
  const [avatar, setAvatar] = useState<string>(
    user?.avatar || DEFAULT_AVATAR
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // On mount: attempt to hydrate from localStorage first
  useEffect(() => {
    try {
      const local = window.localStorage.getItem(STORAGE_KEY);
      if (local) {
        const parsed = JSON.parse(local) as ProfilePersistData;
        setForm({
          name: parsed.name,
          email: parsed.email,
          department: parsed.department,
        });
        setAvatar(parsed.avatar || DEFAULT_AVATAR);
      }
    } catch {
      // fallback to original user/context state
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEditToggle = () => setEditing((v) => !v);

  const handleAvatarClick = () => {
    if (editing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEditing(false);
    const updatedAvatar = preview || avatar;
    setAvatar(updatedAvatar);
    setPreview(null);

    // Save profile + avatar to localStorage
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          ...form,
          avatar: updatedAvatar,
        })
      );
    } catch {
      // Fail silently
    }
    // In real app: also update user (API etc)
  };

  return (
    <Card className="glass-dark border-0 rounded-2xl max-w-xl mx-auto">
      <CardContent className="p-7">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl">
            <User className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Profile Settings</h3>
            <p className="text-blue-300 text-sm">View and update your details</p>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Profile picture */}
          <div className="flex items-center gap-4">
            <div
              className={`relative w-20 h-20 rounded-full ring-4 ring-blue-700/30 overflow-hidden cursor-pointer
                group transition duration-200 ${editing ? "hover:ring-blue-400/90" : "opacity-80"}`
              }
              onClick={handleAvatarClick}
              title={editing ? "Click to change profile picture" : ""}
              style={{ background: "#262c3b" }}
            >
              <img
                src={preview || avatar}
                alt="profile"
                className="object-cover w-full h-full"
                draggable={false}
              />
              {editing && (
                <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <Camera className="w-6 h-6 text-white mb-1" />
                  <span className="text-xs text-white font-medium">Change</span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
                disabled={!editing}
              />
            </div>
            <div>
              <div className="font-bold text-base text-white">{form.name}</div>
              <div className="text-blue-200/90 text-xs">{form.email}</div>
            </div>
          </div>

          {/* Fields */}
          <div>
            <label className="block text-xs font-bold text-blue-200 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full rounded border px-3 py-2 bg-blue-900/80 text-white"
              value={form.name}
              onChange={handleChange}
              disabled={!editing}
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-blue-200 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full rounded border px-3 py-2 bg-blue-900/80 text-white"
              value={form.email}
              onChange={handleChange}
              disabled={!editing}
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-blue-200 mb-1">
              Department
            </label>
            <input
              type="text"
              name="department"
              className="w-full rounded border px-3 py-2 bg-blue-900/80 text-white"
              value={form.department}
              onChange={handleChange}
              disabled={!editing}
              required
            />
          </div>
          <div className="flex justify-end">
            {editing ? (
              <>
                <Button
                  type="submit"
                  className="mr-2 bg-purple-700 text-white"
                >
                  Save
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setEditing(false);
                    setPreview(null);
                  }}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                type="button"
                className="bg-purple-600 text-white"
                onClick={handleEditToggle}
              >
                Edit
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileSettings;
