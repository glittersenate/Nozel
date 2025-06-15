import React from 'react';
import { Home, Users, Clock, DollarSign, Calendar, Star, FileText, BarChart3, Settings, Shield, UserCheck, Briefcase } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useAuth } from "@/contexts/AuthContext";

const navigationItems = [
  { title: 'Dashboard', url: '/', icon: Home },
  { title: 'Employees', url: '/employees', icon: Users },
  { title: 'Time Tracking', url: '/time-tracking', icon: Clock },
  { title: 'Payroll', url: '/payroll', icon: DollarSign },
  { title: 'Leave', url: '/leave', icon: Calendar },
  { title: 'Performance', url: '/performance', icon: Star },
  { title: 'Reports', url: '/reports', icon: FileText },
  { title: 'Analytics', url: '/analytics', icon: BarChart3 },
  { title: 'Benefits', url: '/benefits', icon: Briefcase },
  { title: 'Executive', url: '/executive', icon: Shield },
  { title: 'AI Compliance', url: '/compliance', icon: Shield },
  { title: 'Integrations', url: '/integrations', icon: Settings },
  { title: 'Settings', url: '/settings', icon: Settings },
];

export function AppSidebar() {
  const location = useLocation();
  const { user } = useAuth();

  // Add a Benefits nav item ONLY for HRs
  const filteredItems = navigationItems.filter((item) => {
    // Only show Benefits to HRs
    if (item.title === "Benefits") {
      return user && user.role === "hr";
    }
    // Show all other items
    return true;
  });

  return (
    <Sidebar className="glass-dark border-r border-blue-500/20 backdrop-blur-xl">
      <SidebarHeader className="border-b border-blue-500/20 p-6">
        <div className="flex items-center gap-4 animate-fade-in-scale">
          <div className="relative">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-glow overflow-hidden">
              <img 
                src="/lovable-uploads/d4d1898a-7491-497e-b26f-54279c41e408.png" 
                alt="NozelPay Logo" 
                className="w-10 h-10 object-contain"
              />
            </div>
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-20 blur" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-heading bg-gradient-to-r from-black to-neutral-700 bg-clip-text text-transparent dark:bg-gradient-to-r dark:from-white dark:to-blue-200">
              NozelPay
            </h2>
            <p className="text-xs text-black/70 dark:text-blue-300/70 font-medium">
              HR Solutions
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 py-6">
        <SidebarGroup>
          <SidebarGroupLabel className="text-black/80 dark:text-blue-300/60 text-xs uppercase tracking-wider font-semibold mb-4 px-3 font-heading">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {filteredItems.map((item, index) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title} className={`animate-fade-in-up animate-stagger-${Math.min(index + 1, 6)}`}>
                    <SidebarMenuButton
                      asChild
                      className={`
                        group relative rounded-xl transition-all duration-300 font-medium cursor-pointer
                        ${
                          isActive 
                            ? 'bg-gradient-to-r from-slate-200 to-white text-black border-l-4 border-blue-400 shadow-glow dark:bg-gradient-to-r dark:from-blue-500/20 dark:to-purple-500/20 dark:text-white'
                            : 'text-black hover:text-black hover:bg-neutral-100 hover:shadow-lg dark:text-blue-200/70 dark:hover:text-white dark:hover:bg-blue-500/10'
                        }
                      `}
                    >
                      <Link to={item.url}>
                        <div className="flex items-center gap-4 px-4 py-3 w-full">
                          <div className={`
                            p-2 rounded-lg transition-all duration-300
                            ${
                              isActive 
                                ? 'bg-white text-black dark:bg-blue-500/20 dark:text-blue-300' 
                                : 'text-black/50 group-hover:bg-neutral-100 group-hover:text-black dark:text-blue-400/70 dark:group-hover:bg-blue-500/10 dark:group-hover:text-blue-300'
                            }
                          `}>
                            {/* Icon colored black in light, white in dark */}
                            <item.icon className="w-5 h-5" />
                          </div>
                          <span className="font-heading">{item.title}</span>
                          {isActive && (
                            <div className="absolute right-2 w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                          )}
                        </div>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-blue-500/20 p-6">
        <div className="text-xs text-black/30 dark:text-blue-300/40 font-mono text-center">
          © 2024 NozelPay System
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
