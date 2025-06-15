
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
import { Layout } from "./components/Layout";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Layout><Index /></Layout>} />
    <Route path="/employees" element={<Layout><Employees /></Layout>} />
    <Route path="/time-tracking" element={<Layout><TimeTracking /></Layout>} />
    <Route path="/payroll" element={<Layout><Payroll /></Layout>} />
    <Route path="/leave" element={<Layout><Leave /></Layout>} />
    <Route path="/performance" element={<Layout><Performance /></Layout>} />
    <Route path="/reports" element={<Layout><Reports /></Layout>} />
    <Route path="/analytics" element={<Layout><Analytics /></Layout>} />
    <Route path="/compliance" element={<Layout><Compliance /></Layout>} />
    <Route path="/employee-portal" element={<Layout><EmployeePortal /></Layout>} />
    <Route path="/executive" element={<Layout><ExecutiveCommandCenter /></Layout>} />
    <Route path="/integrations" element={<Layout><Integrations /></Layout>} />
    <Route path="/settings" element={<Layout><Settings /></Layout>} />
    <Route path="/benefits" element={<Layout><Benefits /></Layout>} />
    <Route path="*" element={<Layout><NotFound /></Layout>} />
  </Routes>
);

export default AppRoutes;

