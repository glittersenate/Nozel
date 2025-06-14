
import React, { useState } from "react";
import { usePayrollContext } from "@/contexts/PayrollContext";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const frequencies = [
  { value: "monthly", label: "Monthly" },
  { value: "bi-weekly", label: "Bi-Weekly" },
  { value: "weekly", label: "Weekly" },
];

export const PayrollScheduler: React.FC = () => {
  const { payrollState, schedulePayroll } = usePayrollContext();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | null>(payrollState.scheduling.nextRunDate ?? null);
  const [frequency, setFrequency] = useState<"monthly" | "bi-weekly" | "weekly">(payrollState.scheduling.frequency);

  const onSchedule = () => {
    if (date) schedulePayroll(date, frequency);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 border-blue-700/50">
          <CalendarIcon className="w-4 h-4" />
          Schedule Payroll
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-[#141a2e] border-blue-800/30" align="end">
        <div className="flex flex-col gap-4">
          <div>
            <div className="text-blue-300 text-xs mb-1">Select start date</div>
            <Calendar
              mode="single"
              selected={date ?? undefined}
              onSelect={setDate}
              initialFocus
              className="p-3 pointer-events-auto"
            />
          </div>
          <div>
            <div className="text-blue-300 text-xs mb-1">Frequency</div>
            <select
              className="w-full rounded bg-blue-900/30 border border-blue-700/50 text-white p-2"
              value={frequency}
              onChange={e =>
                setFrequency(e.target.value as "monthly" | "bi-weekly" | "weekly")
              }
            >
              {frequencies.map(f => (
                <option value={f.value} key={f.value}>
                  {f.label}
                </option>
              ))}
            </select>
          </div>
          <Button disabled={!date || !frequency} onClick={onSchedule} className="bg-green-600 hover:bg-green-700">
            Schedule
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
