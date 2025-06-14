
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
import { useToast } from '@/hooks/use-toast';

const roleConfig = {
  admin: { icon: Crown, label: 'Admin', color: 'bg-red-400/20 text-red-300 border-red-400/30' },
  hr: { icon: Users, label: 'HR Manager', color: 'bg-blue-400/20 text-blue-300 border-blue-400/30' },
  manager: { icon: Shield, label: 'Manager', color: 'bg-green-400/20 text-green-300 border-green-400/30' },
  employee: { icon: User, label: 'Employee', color: 'bg-gray-400/20 text-gray-300 border-gray-400/30' },
};

const RoleSelector: React.FC = () => {
  const { user, switchRole } = useAuth();
  const { toast } = useToast();

  if (!user) return null;

  const CurrentRoleIcon = roleConfig[user.role].icon;

  const handleRoleSwitch = (role: UserRole) => {
    switchRole(role);
    toast({
      title: "Role Changed",
      description: `You are now viewing as ${roleConfig[role].label}`,
      duration: 3000,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-3 bg-[#141a2e]/60 hover:bg-[#141a2e]/80 border border-blue-500/20 rounded-xl transition-all duration-300">
          <div className="flex items-center gap-3">
            <CurrentRoleIcon className="w-5 h-5" />
            <Badge variant="outline" className={`${roleConfig[user.role].color} font-medium px-3 py-1`}>
              {roleConfig[user.role].label}
            </Badge>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-56 bg-[#141a2e]/95 border-blue-800/30 text-blue-100 backdrop-blur-xl shadow-2xl"
      >
        {Object.entries(roleConfig).map(([role, config]) => {
          const Icon = config.icon;
          return (
            <DropdownMenuItem 
              key={role}
              className="hover:bg-blue-600/10 cursor-pointer p-3 transition-colors"
              onClick={() => handleRoleSwitch(role as UserRole)}
            >
              <Icon className="w-4 h-4 mr-3" />
              <span className="flex-1">{config.label}</span>
              {user.role === role && (
                <Badge variant="outline" className="ml-auto text-xs bg-blue-600/20 border-blue-400/30">
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
