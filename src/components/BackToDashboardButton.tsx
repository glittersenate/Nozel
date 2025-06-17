
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu } from "lucide-react";

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
      <Menu className="w-7 h-7 text-white" />
    </button>
  );
};
