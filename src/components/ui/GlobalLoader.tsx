
import React from "react";
import { Loader2 } from "lucide-react";
import { useLoading } from "@/contexts/LoadingContext";

const GlobalLoader: React.FC = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/40 pointer-events-auto">
      <div className="bg-blue-950/90 rounded-xl p-6 flex flex-col items-center shadow-2xl animate-fade-in">
        <Loader2 className="w-9 h-9 text-blue-400 animate-spin mb-3" />
        <span className="text-blue-100 font-semibold text-lg">Loading...</span>
      </div>
    </div>
  );
};

export default GlobalLoader;
