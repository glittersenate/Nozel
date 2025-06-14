
import React from 'react';
import { Home, Users, DollarSign, Settings, FileText, BarChart3, Clock, Calendar, Star } from 'lucide-react';

const navigationItems = [
  { icon: Home, label: 'Dashboard', href: '/', active: false },
  { icon: Users, label: 'Employees', href: '/employees', active: false },
  { icon: Clock, label: 'Time Tracking', href: '/time-tracking', active: false },
  { icon: DollarSign, label: 'Payroll', href: '/payroll', active: false },
  { icon: Calendar, label: 'Leave', href: '/leave', active: false },
  { icon: Star, label: 'Performance', href: '/performance', active: false },
  { icon: FileText, label: 'Reports', href: '/reports', active: false },
  { icon: BarChart3, label: 'Analytics', href: '/analytics', active: false },
  { icon: Settings, label: 'Settings', href: '/settings', active: false },
];

const Navigation = () => {
  const currentPath = window.location.pathname;

  return (
    <nav className="mt-8">
      <ul className="space-y-2">
        {navigationItems.map((item) => {
          const isActive = currentPath === item.href;
          return (
            <li key={item.label}>
              <a
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-600/20 text-blue-300 border-l-2 border-blue-400'
                    : 'text-blue-200/70 hover:text-blue-200 hover:bg-blue-600/10'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navigation;
