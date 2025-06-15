import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { PayrollProvider } from "./contexts/PayrollContext";
import Index from "./pages/Index";
import Employees from "./pages/Employees";
import TimeTracking from "./pages/TimeTracking";
import Payroll from "./pages/Payroll";
import Leave from "./pages/Leave";
import Performance from "./pages/Performance";
import Reports from "./pages/Reports";
import Analytics from "./pages/Analytics";
import Compliance from "./pages/Compliance";
import EmployeePortal from "./pages/EmployeePortal";
import NotFound from "./pages/NotFound";
import ExecutiveCommandCenter from "./components/executive/ExecutiveCommandCenter";
import Integrations from "./pages/Integrations";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <PayrollProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/time-tracking" element={<TimeTracking />} />
                <Route path="/payroll" element={<Payroll />} />
                <Route path="/leave" element={<Leave />} />
                <Route path="/performance" element={<Performance />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/compliance" element={<Compliance />} />
                <Route path="/employee-portal" element={<EmployeePortal />} />
                <Route path="/executive" element={<ExecutiveCommandCenter />} />
                <Route path="/integrations" element={<Integrations />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </PayrollProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
