import React from 'react';
import { MoreHorizontal, Edit, Trash2, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Employee } from '@/pages/Employees';

interface EmployeeTableProps {
  employees: Employee[];
  onDeleteEmployee: (id: string) => void;
  onEditEmployee: (employee: Employee) => void;
  onViewEmployee: (employee: Employee) => void;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({
  employees,
  onDeleteEmployee,
  onEditEmployee,
  onViewEmployee
}) => {
  const formatSalary = (salary: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(salary);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-[#141a2e]/80 border border-blue-950 rounded-xl overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-blue-800/30 hover:bg-[#1a2550]/50">
            <TableHead className="text-blue-300 font-semibold">Employee</TableHead>
            <TableHead className="text-blue-300 font-semibold">Department</TableHead>
            <TableHead className="text-blue-300 font-semibold">Position</TableHead>
            <TableHead className="text-blue-300 font-semibold">Salary</TableHead>
            <TableHead className="text-blue-300 font-semibold">Start Date</TableHead>
            <TableHead className="text-blue-300 font-semibold">Status</TableHead>
            <TableHead className="text-blue-300 font-semibold text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow 
              key={employee.id} 
              className="border-blue-800/30 hover:bg-[#1a2550]/30 transition-colors cursor-pointer"
              onClick={(e) => {
                // Only trigger row click (for details) if not clicking an action button
                // Allow editing/deleting without double action
                if ((e.target as HTMLElement).closest('[data-row-action]')) return;
                onViewEmployee(employee);
              }}
            >
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium text-blue-100">{employee.name}</span>
                  <span className="text-sm text-blue-300/70">{employee.email}</span>
                </div>
              </TableCell>
              <TableCell className="text-blue-200">{employee.department}</TableCell>
              <TableCell className="text-blue-200">{employee.position}</TableCell>
              <TableCell className="text-blue-200 font-medium">
                {formatSalary(employee.salary)}
              </TableCell>
              <TableCell className="text-blue-200">{formatDate(employee.startDate)}</TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    employee.status === 'active'
                      ? 'bg-green-400/20 text-green-300 border border-green-400/30'
                      : 'bg-red-400/20 text-red-300 border border-red-400/30'
                  }`}
                >
                  {employee.status}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <div data-row-action>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        className="h-8 w-8 p-0 text-blue-300 hover:bg-blue-600/10"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                      align="end" 
                      className="bg-[#141a2e] border-blue-800/30 text-blue-100"
                    >
                      <DropdownMenuItem 
                        className="hover:bg-blue-600/10 cursor-pointer"
                        onClick={() => onEditEmployee(employee)}
                        data-row-action
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-blue-600/10 cursor-pointer" data-row-action>
                        <Mail className="w-4 h-4 mr-2" />
                        Send Email
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-blue-600/10 cursor-pointer" data-row-action>
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="hover:bg-red-600/10 text-red-300 cursor-pointer"
                        onClick={() => onDeleteEmployee(employee.id)}
                        data-row-action
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {employees.length === 0 && (
        <div className="text-center py-12 text-blue-300/70">
          <p>No employees found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default EmployeeTable;
