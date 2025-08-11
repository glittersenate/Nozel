
import React from 'react';
import { Home, Users, Clock, DollarSign, Calendar, Star, FileText, BarChart3, Settings, Shield, Gift, FlaskConical } from 'lucide-react';
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

const navigationItems = [
  { title: 'Dashboard', url: '/', icon: Home },
  { title: 'Employees', url: '/employees', icon: Users },
  // { title: 'Time Tracking', url: '/time-tracking', icon: Clock }, // Hidden temporarily
  { title: 'Payroll', url: '/payroll', icon: DollarSign },
  { title: 'Leave', url: '/leave', icon: Calendar },
  // { title: 'Benefits', url: '/benefits', icon: Gift }, // Hidden temporarily
  // { title: 'Performance', url: '/performance', icon: Star }, // Hidden temporarily
  { title: 'Reports', url: '/reports', icon: FileText },
  // { title: 'Analytics', url: '/analytics', icon: BarChart3 }, // Hidden temporarily
  // { title: 'Executive', url: '/executive', icon: Shield }, // Hidden temporarily
  { title: 'AI Compliance', url: '/compliance', icon: Shield },
  // { title: 'Integrations', url: '/integrations', icon: Settings }, // Hidden temporarily
  { title: 'Settings', url: '/settings', icon: Settings },
  // { title: 'Experimental', url: '/experimental', icon: FlaskConical }, // Hidden temporarily
];

// Note: The following pages are temporarily hidden from navigation but still accessible via direct URL:
// - Time Tracking (/time-tracking)
// - Benefits (/benefits)
// - Performance (/performance) 
// - Analytics (/analytics)
// - Executive Command Center (/executive)
// - Integrations (/integrations)
// - Experimental (/experimental)

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="sidebar-flat border-r border-blue-500/20">
      <SidebarHeader className="border-b border-blue-500/20 p-6">
        <div className="flex items-center gap-4 animate-fade-in-scale">
          <div className="relative">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center overflow-hidden">
              <img 
                src="/lovable-uploads/d4d1898a-7491-497e-b26f-54279c41e408.png" 
                alt="NozelPay Logo" 
                className="w-10 h-10 object-contain"
              />
            </div>
            {/* No outer glow or heavy bg */}
          </div>
          <div>
            <h2 className="text-xl font-bold font-heading bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              NozelPay
            </h2>
            <p className="text-xs text-blue-300/70 font-medium">
              HR Solutions
            </p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-4 py-6">
        <SidebarGroup>
          <SidebarGroupLabel className="text-blue-300/60 text-xs uppercase tracking-wider font-semibold mb-4 px-3 font-heading">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {navigationItems.map((item, index) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title} className={`animate-fade-in-up animate-stagger-${Math.min(index + 1, 6)}`}>
                    <SidebarMenuButton
                      asChild
                      className={`
                        group relative rounded-xl transition-all duration-200 font-medium cursor-pointer
                        ${
                          isActive
                            ? 'bg-blue-600/20 text-blue-300 border-l-2 border-blue-400'
                            : 'text-blue-200/70 hover:text-blue-200 hover:bg-blue-600/10'
                        }
                      `}
                    >
                      <Link to={item.url}>
                        <div className="flex items-center gap-4 px-4 py-3 w-full">
                          <div className={`
                            p-2 rounded-lg transition-all duration-200
                            ${
                              isActive
                                ? 'bg-blue-700/20 text-blue-200'
                                : 'text-blue-400/70 group-hover:bg-blue-600/10 group-hover:text-blue-200'
                            }
                          `}>
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
        <div className="text-xs text-blue-300/40 font-mono text-center">
          © 2024 NozelPay System
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
