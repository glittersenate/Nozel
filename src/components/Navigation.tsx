
import React from 'react';
import { Home, Users, DollarSign, Settings, FileText, BarChart3, Clock, Calendar, Star } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navigationItems = [
  { icon: Home, label: 'Dashboard', href: '/' },
  { icon: Users, label: 'Employees', href: '/employees' },
  { icon: Clock, label: 'Time Tracking', href: '/time-tracking' },
  { icon: DollarSign, label: 'Payroll', href: '/payroll' },
  { icon: Calendar, label: 'Leave', href: '/leave' },
  { icon: Star, label: 'Performance', href: '/performance' },
  { icon: FileText, label: 'Reports', href: '/reports' },
  { icon: BarChart3, label: 'Analytics', href: '/analytics' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="mt-8">
      <ul className="space-y-2">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <li key={item.label}>
              <Link
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-600/20 text-blue-300 border-l-2 border-blue-400'
                    : 'text-blue-200/70 hover:text-blue-200 hover:bg-blue-600/10'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navigation;
