import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Employee } from "@/types/employee";

interface FilterState {
  departments: string[];
  statuses: Array<'active' | 'inactive'>;
}

interface EmployeeFilterDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  allDepartments: string[];
  filterState: FilterState;
  setFilterState: (state: FilterState) => void;
  onClear: () => void;
}

const statusOptions: Array<{ label: string; value: 'active' | 'inactive' }> = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" }
];

const EmployeeFilterDrawer: React.FC<EmployeeFilterDrawerProps> = ({
  open,
  onOpenChange,
  allDepartments,
  filterState,
  setFilterState,
  onClear
}) => {
  const [localState, setLocalState] = useState<FilterState>(filterState);

  useEffect(() => {
    setLocalState(filterState);
  }, [filterState, open]);

  const handleDeptChange = (dept: string, checked: boolean) => {
    setLocalState((prev) => ({
      ...prev,
      departments: checked
        ? [...prev.departments, dept]
        : prev.departments.filter((d) => d !== dept)
    }));
  };

  const handleStatusChange = (status: 'active' | 'inactive', checked: boolean) => {
    setLocalState((prev) => ({
      ...prev,
      statuses: checked
        ? [...prev.statuses, status]
        : prev.statuses.filter((s) => s !== status)
    }));
  };

  function handleApplyFilters() {
    setFilterState(localState);
    onOpenChange(false);
  }

  function handleClear() {
    setLocalState({ departments: [], statuses: [] });
    setFilterState({ departments: [], statuses: [] });
    onClear(); // resets filter in parent
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#141a2e] border-blue-800/30 text-blue-100 max-w-xs right-0 fixed top-0 h-full rounded-none shadow-2xl p-6 z-50 transition-all">
        <DialogHeader>
          <DialogTitle className="text-blue-100 mb-4">Filter Employees</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <div>
            <div className="text-blue-300 text-xs font-semibold mb-2">Department</div>
            <div className="flex flex-col gap-2">
              {allDepartments.map((dept) => (
                <label key={dept} className="inline-flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={localState.departments.includes(dept)}
                    onCheckedChange={(v) =>
                      handleDeptChange(dept, v === true)
                    }
                  />
                  <span className="text-blue-200">{dept}</span>
                </label>
              ))}
              {allDepartments.length === 0 && (
                <span className="text-blue-400/70 text-sm">No departments found.</span>
              )}
            </div>
          </div>
          <div>
            <div className="text-blue-300 text-xs font-semibold mb-2">Status</div>
            <div className="flex gap-4">
              {statusOptions.map(opt => (
                <label key={opt.value} className="inline-flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={localState.statuses.includes(opt.value)}
                    onCheckedChange={v =>
                      handleStatusChange(opt.value, v === true)
                    }
                  />
                  <span className="text-blue-200">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter className="mt-6">
          <Button variant="default" onClick={handleApplyFilters} className="w-full">
            Apply
          </Button>
          {(localState.departments.length > 0 || localState.statuses.length > 0) && (
            <Button variant="outline" onClick={handleClear} className="w-full mt-2 bg-[#0e1c38]/30 border-blue-800/40">
              Clear Filters
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeFilterDrawer;
