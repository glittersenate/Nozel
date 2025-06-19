
import React from "react";
import { Routes, Route } from "react-router-dom";
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
import Benefits from "./pages/Benefits";
import Experimental from "./pages/Experimental";
import { Layout } from "./components/Layout";

const AppRoutes = () => (
  <Routes>
    <Route element={<Layout />}>
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
      <Route path="/benefits" element={<Benefits />} />
      <Route path="/experimental" element={<Experimental />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
