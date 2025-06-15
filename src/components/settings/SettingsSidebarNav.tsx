
import React from "react";
import { Link } from "react-router-dom";

const SIDEBAR_SECTIONS = [
  { id: "appearance", label: "Appearance" },
  { id: "notifications", label: "Notifications" },
  { id: "profile", label: "Profile" },
  { id: "integrations", label: "Integrations" },
];

const SettingsSidebarNav: React.FC = () => {
  return (
    <nav
      className="sticky top-24 pl-2 flex flex-row sm:flex-col gap-2 animate-fade-in z-30 bg-[#172040]/90 sm:bg-transparent rounded-2xl"
      aria-label="Settings sections"
    >
      <h3 className="text-blue-200/90 text-lg font-bold mb-3 tracking-tight sr-only">
        Settings
      </h3>
      {SIDEBAR_SECTIONS.map((section) =>
        section.id === "integrations" ? (
          <Link
            to="/integrations"
            key={section.id}
            tabIndex={0}
            aria-label={`Go to Integrations`}
            className="px-3 py-2 rounded-lg hover:bg-blue-900/40 bg-transparent text-blue-100 font-medium transition-all duration-200 focus:bg-blue-800/40 focus-visible:ring-2 ring-blue-400 focus:outline-none 
                active:bg-blue-950/50 min-w-[44px] min-h-[44px] flex items-center"
          >
            {section.label}
          </Link>
        ) : (
          <a
            href={`#${section.id}`}
            key={section.id}
            tabIndex={0}
            aria-label={`Jump to ${section.label}`}
            className="px-3 py-2 rounded-lg hover:bg-blue-900/40 bg-transparent text-blue-100 font-medium transition-all duration-200 focus:bg-blue-800/40 focus-visible:ring-2 ring-blue-400 focus:outline-none 
                active:bg-blue-950/50 min-w-[44px] min-h-[44px] flex items-center"
          >
            {section.label}
          </a>
        )
      )}
    </nav>
  );
};

export default SettingsSidebarNav;
