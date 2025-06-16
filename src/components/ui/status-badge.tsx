
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface StatusBadgeProps {
  status: 'active' | 'inactive' | 'pending' | 'approved' | 'rejected' | 'completed' | 'in-progress';
  className?: string;
}

const statusConfig = {
  active: {
    label: 'Active',
    className: 'bg-green-600 text-white hover:bg-green-700'
  },
  inactive: {
    label: 'Inactive',
    className: 'bg-gray-600 text-white hover:bg-gray-700'
  },
  pending: {
    label: 'Pending',
    className: 'bg-yellow-600 text-white hover:bg-yellow-700'
  },
  approved: {
    label: 'Approved',
    className: 'bg-green-600 text-white hover:bg-green-700'
  },
  rejected: {
    label: 'Rejected',
    className: 'bg-red-600 text-white hover:bg-red-700'
  },
  completed: {
    label: 'Completed',
    className: 'bg-blue-600 text-white hover:bg-blue-700'
  },
  'in-progress': {
    label: 'In Progress',
    className: 'bg-purple-600 text-white hover:bg-purple-700'
  }
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const config = statusConfig[status];
  
  return (
    <Badge className={`${config.className} ${className}`}>
      {config.label}
    </Badge>
  );
};
