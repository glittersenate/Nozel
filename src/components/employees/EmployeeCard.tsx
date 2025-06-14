
import React from 'react';
import { Employee } from '@/types/employee';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Mail, Phone, MapPin, Calendar } from 'lucide-react';

interface EmployeeCardProps {
  employee: Employee;
  onClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const EmployeeCard: React.FC<EmployeeCardProps> = ({
  employee,
  onClick,
  onEdit,
  onDelete
}) => {
  return (
    <Card className="bg-[#141a2e]/80 border-blue-800/30 hover:border-blue-600/50 transition-all duration-300 hover:scale-105 cursor-pointer">
      <CardContent className="p-6" onClick={onClick}>
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-blue-600 text-white">
              {employee.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-white truncate">
                {employee.name}
              </h3>
              <Badge 
                variant={employee.status === 'active' ? 'default' : 'secondary'}
                className={employee.status === 'active' ? 'bg-green-600' : 'bg-gray-600'}
              >
                {employee.status}
              </Badge>
            </div>
            
            <p className="text-blue-300 font-medium mb-1">{employee.position}</p>
            <p className="text-blue-300/70 text-sm mb-3">{employee.department}</p>
            
            <div className="space-y-1 text-xs text-blue-300/70">
              <div className="flex items-center gap-2">
                <Mail className="w-3 h-3" />
                <span className="truncate">{employee.email}</span>
              </div>
              {employee.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-3 h-3" />
                  <span>{employee.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="w-3 h-3" />
                <span>Started {new Date(employee.startDate).toLocaleDateString()}</span>
              </div>
            </div>
            
            <div className="mt-3 pt-3 border-t border-blue-800/30">
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-300/70">Salary</span>
                <span className="text-sm font-semibold text-white">
                  ${employee.salary.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
