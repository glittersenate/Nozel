
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { PayrollProvider } from "@/contexts/PayrollContext";
import Index from "./pages/Index";
import Employees from "./pages/Employees";
import TimeTracking from "./pages/TimeTracking";
import Payroll from "./pages/Payroll";
import Leave from "./pages/Leave";
import Performance from "./pages/Performance";

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
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </PayrollProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
