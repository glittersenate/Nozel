
import React from 'react';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import RoleSelector from './RoleSelector';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user } = useAuth();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-slate-700 bg-slate-900/50 px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="text-white hover:bg-slate-700" />
              <div className="h-4 w-px bg-slate-700" />
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">N</span>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-white">NozelPay</h1>
                  <p className="text-xs text-blue-300 -mt-1">HR Management System</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <RoleSelector />
              
              {user && (
                <div className="flex items-center gap-3 bg-[#141a2e]/60 hover:bg-[#141a2e]/80 rounded-lg p-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-blue-600 text-white text-sm">
                      {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-sm">
                    <p className="text-white font-medium">{user.name}</p>
                    <p className="text-blue-300 text-xs">{user.email}</p>
                  </div>
                </div>
              )}
            </div>
          </header>
          <main className="flex-1">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
