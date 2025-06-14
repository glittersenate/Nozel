
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Index from "./pages/Index";
import Employees from "./pages/Employees";
import TimeTracking from "./pages/TimeTracking";
import Payroll from "./pages/Payroll";
import Leave from "./pages/Leave";
import Performance from "./pages/Performance";
import Reports from "./pages/Reports";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
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
              <Route path="/settings" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
