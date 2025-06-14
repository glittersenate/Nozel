
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

// SVG icon based on user's reference image
const BackIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect x="5" y="7" width="5" height="14" rx="1.5" stroke="white" strokeWidth="2"/>
    <rect x="12" y="7" width="11" height="14" rx="1.5" stroke="white" strokeWidth="2"/>
  </svg>
);

export const BackToDashboardButton: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();

  // Hide on root/dashboard route or desktop view
  if (!isMobile || location.pathname === "/") return null;

  return (
    <button
      onClick={() => navigate("/")}
      className="
        fixed top-4 left-4 z-50
        flex items-center justify-center
        bg-blue-900/80 hover:bg-blue-700/90
        border border-blue-400/30
        rounded-2xl shadow-xl
        p-2 transition-all
        focus:outline-none focus:ring-2 focus:ring-blue-400
        md:hidden
      "
      aria-label="Back to Dashboard"
      style={{ backdropFilter: "blur(2px)" }}
    >
      <BackIcon />
    </button>
  );
};
