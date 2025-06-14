
import React from 'react';
import { Shield, Users, Crown, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useAuth, UserRole } from '@/contexts/AuthContext';

const roleConfig = {
  admin: { icon: Crown, label: 'Admin', color: 'bg-red-400/20 text-red-300 border-red-400/30' },
  hr: { icon: Users, label: 'HR Manager', color: 'bg-blue-400/20 text-blue-300 border-blue-400/30' },
  manager: { icon: Shield, label: 'Manager', color: 'bg-green-400/20 text-green-300 border-green-400/30' },
  employee: { icon: User, label: 'Employee', color: 'bg-gray-400/20 text-gray-300 border-gray-400/30' },
};

const RoleSelector: React.FC = () => {
  const { user, switchRole } = useAuth();

  if (!user) return null;

  const CurrentRoleIcon = roleConfig[user.role].icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-2 bg-[#141a2e]/60 hover:bg-[#141a2e]/80">
          <div className="flex items-center gap-2">
            <CurrentRoleIcon className="w-4 h-4" />
            <Badge variant="outline" className={roleConfig[user.role].color}>
              {roleConfig[user.role].label}
            </Badge>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="bg-[#141a2e] border-blue-800/30 text-blue-100 w-48"
      >
        {Object.entries(roleConfig).map(([role, config]) => {
          const Icon = config.icon;
          return (
            <DropdownMenuItem 
              key={role}
              className="hover:bg-blue-600/10 cursor-pointer"
              onClick={() => switchRole(role as UserRole)}
            >
              <Icon className="w-4 h-4 mr-2" />
              <span>{config.label}</span>
              {user.role === role && (
                <Badge variant="outline" className="ml-auto text-xs bg-blue-600/20">
                  Current
                </Badge>
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default RoleSelector;
