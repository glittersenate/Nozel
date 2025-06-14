
import React from 'react';
import { Home, Users, Clock, DollarSign, Calendar, Star, FileText, BarChart3, Settings } from 'lucide-react';
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
  { title: 'Time Tracking', url: '/time-tracking', icon: Clock },
  { title: 'Payroll', url: '/payroll', icon: DollarSign },
  { title: 'Leave', url: '/leave', icon: Calendar },
  { title: 'Performance', url: '/performance', icon: Star },
  { title: 'Reports', url: '/reports', icon: FileText },
  { title: 'Analytics', url: '/analytics', icon: BarChart3 },
  { title: 'Settings', url: '/settings', icon: Settings },
];

export function AppSidebar() {
  const currentPath = window.location.pathname;

  return (
    <Sidebar className="bg-slate-900 border-slate-700">
      <SidebarHeader className="border-b border-slate-700 p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Users className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">HRFlow</h2>
            <p className="text-xs text-blue-300">HR Management</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-blue-300/70 text-xs uppercase tracking-wider">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => {
                const isActive = currentPath === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive}
                      className={`
                        ${isActive 
                          ? 'bg-blue-600/20 text-blue-300 border-l-2 border-blue-400' 
                          : 'text-blue-200/70 hover:text-blue-200 hover:bg-blue-600/10'
                        }
                      `}
                    >
                      <a href={item.url} className="flex items-center gap-3">
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-slate-700 p-4">
        <div className="text-xs text-blue-300/50">
          © 2024 HRFlow System
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
