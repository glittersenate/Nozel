import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Employee } from '@/pages/Employees';

interface EditEmployeeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee: Employee | null;
  onUpdateEmployee: (updatedEmployee: Employee) => void;
}

const departments = [
  'Engineering',
  'Human Resources',
  'Marketing',
  'Product',
  'Sales',
  'Finance',
  'Operations'
];

const EditEmployeeDialog: React.FC<EditEmployeeDialogProps> = ({
  open,
  onOpenChange,
  employee,
  onUpdateEmployee,
}) => {
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    position: string;
    department: string;
    salary: string;
    startDate: string;
    status: 'active' | 'inactive';
  }>({
    name: '',
    email: '',
    position: '',
    department: '',
    salary: '',
    startDate: '',
    status: 'active',
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name,
        email: employee.email,
        position: employee.position,
        department: employee.department,
        salary: employee.salary.toString(),
        startDate: employee.startDate,
        status: employee.status,
      });
    }
  }, [employee, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!employee) return;
    if (!formData.name || !formData.email || !formData.position || !formData.department || !formData.salary || !formData.startDate) {
      return;
    }

    onUpdateEmployee({
      ...employee,
      name: formData.name,
      email: formData.email,
      position: formData.position,
      department: formData.department,
      salary: parseInt(formData.salary),
      startDate: formData.startDate,
      status: formData.status,
    });

    // Don't reset handled from above
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#141a2e] border-blue-800/30 text-blue-100 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-blue-100">
            Edit Employee
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-blue-300">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="bg-[#0e1c38]/50 border-blue-800/30 text-blue-100"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-blue-300">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="bg-[#0e1c38]/50 border-blue-800/30 text-blue-100"
              required
              disabled
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="position" className="text-blue-300">Position</Label>
            <Input
              id="position"
              value={formData.position}
              onChange={(e) => handleInputChange('position', e.target.value)}
              className="bg-[#0e1c38]/50 border-blue-800/30 text-blue-100"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="department" className="text-blue-300">Department</Label>
            <Select value={formData.department} onValueChange={(value) => handleInputChange('department', value)}>
              <SelectTrigger className="bg-[#0e1c38]/50 border-blue-800/30 text-blue-100">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent className="bg-[#141a2e] border-blue-800/30">
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept} className="text-blue-100 hover:bg-blue-600/10">
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="salary" className="text-blue-300">Annual Salary</Label>
            <Input
              id="salary"
              type="number"
              value={formData.salary}
              onChange={(e) => handleInputChange('salary', e.target.value)}
              className="bg-[#0e1c38]/50 border-blue-800/30 text-blue-100"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="startDate" className="text-blue-300">Start Date</Label>
            <Input
              id="startDate"
              type="date"
              value={formData.startDate}
              onChange={(e) => handleInputChange('startDate', e.target.value)}
              className="bg-[#0e1c38]/50 border-blue-800/30 text-blue-100"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status" className="text-blue-300">Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
              <SelectTrigger className="bg-[#0e1c38]/50 border-blue-800/30 text-blue-100">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-[#141a2e] border-blue-800/30">
                <SelectItem value="active" className="text-green-300 hover:bg-blue-600/10">
                  Active
                </SelectItem>
                <SelectItem value="inactive" className="text-red-300 hover:bg-blue-600/10">
                  Inactive
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 bg-[#0e1c38]/50 border-blue-800/30 text-blue-200 hover:bg-[#0e1c38]/80"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditEmployeeDialog;
