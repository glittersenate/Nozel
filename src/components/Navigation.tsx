
import React from 'react';
import { Home, Users, DollarSign, Settings, FileText, BarChart3 } from 'lucide-react';

const navigationItems = [
  { icon: Home, label: 'Dashboard', href: '/', active: true },
  { icon: Users, label: 'Employees', href: '/employees' },
  { icon: DollarSign, label: 'Payroll', href: '/payroll' },
  { icon: FileText, label: 'Reports', href: '/reports' },
  { icon: BarChart3, label: 'Analytics', href: '/analytics' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

const Navigation = () => {
  return (
    <nav className="mt-8">
      <ul className="space-y-2">
        {navigationItems.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                item.active
                  ? 'bg-blue-600/20 text-blue-300 border-l-2 border-blue-400'
                  : 'text-blue-200/70 hover:text-blue-200 hover:bg-blue-600/10'
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
