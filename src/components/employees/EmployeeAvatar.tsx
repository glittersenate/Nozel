
import React from 'react';
import { User } from 'lucide-react';

interface EmployeeAvatarProps {
  name: string;
  email?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const EmployeeAvatar: React.FC<EmployeeAvatarProps> = ({ 
  name, 
  email, 
  size = 'md',
  className = '' 
}) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  // Generate a consistent color based on the name
  const getColorClass = (name: string) => {
    const colors = [
      'bg-blue-500/80',
      'bg-green-500/80',
      'bg-purple-500/80',
      'bg-pink-500/80',
      'bg-indigo-500/80',
      'bg-teal-500/80',
      'bg-orange-500/80',
      'bg-red-500/80'
    ];
    const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
    return colors[index];
  };

  return (
    <div 
      className={`${sizeClasses[size]} ${getColorClass(name)} rounded-full flex items-center justify-center font-medium text-white shadow-md ${className}`}
      title={email ? `${name} (${email})` : name}
    >
      {name ? (
        getInitials(name)
      ) : (
        <User className={iconSizes[size]} />
      )}
    </div>
  );
};

export default EmployeeAvatar;
