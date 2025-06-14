
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProfileSettings: React.FC = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    department: user?.department || "",
  });
  const [editing, setEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEditToggle = () => setEditing((v) => !v);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEditing(false);
    // In a real app: update user (API call etc)
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
          <div>
            <label className="block text-xs font-bold text-blue-200 mb-1">Full Name</label>
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
            <label className="block text-xs font-bold text-blue-200 mb-1">Email</label>
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
            <label className="block text-xs font-bold text-blue-200 mb-1">Department</label>
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
                <Button type="submit" className="mr-2 bg-purple-700 text-white">Save</Button>
                <Button type="button" variant="ghost" onClick={handleEditToggle}>Cancel</Button>
              </>
            ) : (
              <Button type="button" className="bg-purple-600 text-white" onClick={handleEditToggle}>Edit</Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileSettings;
