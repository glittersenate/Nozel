import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { PayrollProvider } from "./contexts/PayrollContext";
import { LoadingProvider } from "./contexts/LoadingContext";
import GlobalLoader from "./components/ui/GlobalLoader";
import { AppErrorBoundary } from "./components/ui/AppErrorBoundary";
import AppRoutes from "./AppRoutes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <PayrollProvider>
        <LoadingProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <GlobalLoader />
            <AppErrorBoundary>
              <BrowserRouter>
                <AppRoutes />
              </BrowserRouter>
            </AppErrorBoundary>
          </TooltipProvider>
        </LoadingProvider>
      </PayrollProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
