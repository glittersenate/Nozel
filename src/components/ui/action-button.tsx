
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ActionButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  color?: 'blue' | 'green' | 'purple' | 'red' | 'yellow';
  disabled?: boolean;
  className?: string;
}

const colorClasses = {
  blue: 'bg-blue-600 hover:bg-blue-700 text-white',
  green: 'bg-green-600 hover:bg-green-700 text-white',
  purple: 'bg-purple-600 hover:bg-purple-700 text-white',
  red: 'bg-red-600 hover:bg-red-700 text-white',
  yellow: 'bg-yellow-600 hover:bg-yellow-700 text-white'
};

export const ActionButton: React.FC<ActionButtonProps> = ({
  icon: Icon,
  label,
  onClick,
  variant = 'default',
  size = 'sm',
  color = 'blue',
  disabled = false,
  className = ''
}) => {
  const colorClass = variant === 'default' ? colorClasses[color] : '';

  return (
    <Button
      onClick={onClick}
      variant={variant}
      size={size}
      disabled={disabled}
      className={`flex items-center gap-2 ${colorClass} ${className}`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </Button>
  );
};
