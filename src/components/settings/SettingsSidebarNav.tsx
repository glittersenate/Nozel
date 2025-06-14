
import React from "react";

const SIDEBAR_SECTIONS = [
  { id: "appearance", label: "Appearance" },
  { id: "notifications", label: "Notifications" },
  { id: "profile", label: "Profile" },
];

const SettingsSidebarNav: React.FC = () => {
  return (
    <div className="sticky top-28 pl-2 flex flex-col gap-2 animate-fade-in">
      <h3 className="text-blue-200/90 text-lg font-bold mb-3 tracking-tight">Settings</h3>
      <nav className="flex flex-col gap-2">
        {SIDEBAR_SECTIONS.map((section) => (
          <a
            href={`#${section.id}`}
            key={section.id}
            className="px-3 py-2 rounded-lg hover:bg-blue-900/40 bg-transparent text-blue-100 font-medium transition-all duration-200 focus:bg-blue-800/40 focus:outline-none focus-visible:ring-2 ring-blue-300"
          >
            {section.label}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default SettingsSidebarNav;
