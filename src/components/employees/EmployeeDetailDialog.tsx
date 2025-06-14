
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Employee } from "@/pages/Employees";

interface EmployeeDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee: Employee | null;
}

const EmployeeDetailDialog: React.FC<EmployeeDetailDialogProps> = ({
  open,
  onOpenChange,
  employee,
}) => {
  if (!employee) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#141a2e] border-blue-800/40 text-blue-100 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-blue-100 flex items-center gap-2">
            <span>Employee Details</span>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div>
            <div className="text-blue-300 text-xs uppercase font-medium">Full Name</div>
            <div className="font-semibold text-lg">{employee.name}</div>
          </div>
          <div>
            <div className="text-blue-300 text-xs uppercase font-medium">Email</div>
            <div>{employee.email}</div>
          </div>
          <div>
            <div className="text-blue-300 text-xs uppercase font-medium">Position</div>
            <div>{employee.position}</div>
          </div>
          <div>
            <div className="text-blue-300 text-xs uppercase font-medium">Department</div>
            <div>{employee.department}</div>
          </div>
          <div>
            <div className="text-blue-300 text-xs uppercase font-medium">Annual Salary</div>
            <div>
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
              }).format(employee.salary)}
            </div>
          </div>
          <div>
            <div className="text-blue-300 text-xs uppercase font-medium">Start Date</div>
            <div>
              {new Date(employee.startDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </div>
          </div>
          <div>
            <div className="text-blue-300 text-xs uppercase font-medium">Status</div>
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
              ${employee.status === 'active'
                ? 'bg-green-400/20 text-green-300 border border-green-400/30'
                : 'bg-red-400/20 text-red-300 border border-red-400/30'
              }`}>
              {employee.status}
            </span>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            className="bg-[#0e1c38]/40 border-blue-800/30 text-blue-200 hover:bg-[#0e1c38]/70 w-full mt-2"
            onClick={() => onOpenChange(false)}
            type="button"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeDetailDialog;
