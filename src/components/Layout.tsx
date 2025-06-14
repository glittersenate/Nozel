
import React from 'react';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import RoleSelector from './RoleSelector';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, Settings, LogOut, ChevronDown } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user, logout } = useAuth();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-950 via-blue-950/50 to-slate-950">
        <AppSidebar />
        <SidebarInset className="flex-1">
          {/* Responsive top bar - brand block always visible, consistent padding */}
          <div className="flex h-16 items-center justify-between px-2 md:px-6 glass-dark border-b border-blue-500/20 backdrop-blur-xl">
            <div className="flex items-center gap-3 xs:gap-4">
              {/* Hamburger - always visible */}
              <SidebarTrigger 
                className="text-white bg-transparent hover:bg-blue-500/20 hover:text-blue-300 rounded-xl p-2 transition-all duration-200 w-10 h-10 flex items-center justify-center"
                style={{ fontSize: 24 }}
              />
              
              <div className="h-6 w-px bg-blue-500/30" />

              {/* Branding block: Logo, Title, Subtitle -- visible at all sizes */}
              <div className="flex items-center gap-3 animate-slide-in-right">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-glow animate-pulse-glow">
                    <span className="text-white font-bold text-sm font-heading">N</span>
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl opacity-30 blur animate-pulse" />
                </div>
                <div className="hidden xs:block">
                  <h1 className="text-xl font-bold font-heading bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent leading-none">
                    NozelPay
                  </h1>
                  <p className="text-xs text-blue-300/80 font-medium -mt-1 leading-tight">
                    HR Management System
                  </p>
                </div>
                {/* On mobile, show just the big N logo -- subtitle hidden */}
                <div className="block xs:hidden">
                  {/* Optionally, you can add a short app name on tiny screens if desired */}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 md:gap-6">
              <RoleSelector />

              {user && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="flex items-center gap-4 glass-dark hover:bg-blue-500/10 rounded-2xl p-3 transition-all duration-300 group h-auto"
                    >
                      <Avatar className="h-8 w-8 ring-2 ring-blue-500/30 group-hover:ring-blue-400/50 transition-all duration-300">
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm font-semibold">
                          {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-sm text-left max-w-xs truncate">
                        <p className="text-white font-semibold font-heading truncate">
                          {user.name}
                        </p>
                        <p className="text-blue-300/80 text-xs truncate">
                          {user.email}
                        </p>
                      </div>
                      <ChevronDown className="w-4 h-4 text-blue-300/70 group-hover:text-blue-200 transition-colors" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    align="end" 
                    className="w-56 bg-[#141a2e]/95 border-blue-800/30 text-blue-100 backdrop-blur-xl"
                  >
                    <DropdownMenuItem className="hover:bg-blue-600/10 cursor-pointer">
                      <User className="w-4 h-4 mr-2" />
                      <span>Profile Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-blue-600/10 cursor-pointer">
                      <Settings className="w-4 h-4 mr-2" />
                      <span>Preferences</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-blue-800/30" />
                    <DropdownMenuItem 
                      className="hover:bg-red-600/10 cursor-pointer text-red-300"
                      onClick={logout}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
          
          <main className="flex-1 relative pt-20 md:pt-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
