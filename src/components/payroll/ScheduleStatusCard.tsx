
import React from "react";
import { usePayrollContext } from "@/contexts/PayrollContext";
import { PauseCircle, PlayCircle, CalendarCheck2, CalendarX2 } from "lucide-react";
import { Button } from "../ui/button";
import { format } from "date-fns";

export const ScheduleStatusCard: React.FC = () => {
  const { payrollState, pauseScheduling, resumeScheduling } = usePayrollContext();
  const s = payrollState.scheduling;

  const status =
    !s.enabled
      ? "Not Scheduled"
      : s.paused
        ? "Paused"
        : "Active";

  const statusColor =
    !s.enabled
      ? "text-blue-300"
      : s.paused
        ? "text-yellow-400"
        : "text-green-400";

  const showAction = s.enabled;

  return (
    <div className="bg-blue-900/60 border border-blue-800/30 rounded-lg p-4 flex flex-col md:flex-row gap-2 md:items-center md:justify-between shadow mb-3">
      <div className="flex items-center gap-4">
        <CalendarCheck2 className="w-6 h-6 text-blue-400" />
        <div>
          <div className={`font-semibold text-lg ${statusColor}`}>
            {status}
          </div>
          <div className="text-xs text-blue-200">
            {s.enabled && s.nextRunDate
              ? <>
                <span>Next run: </span>
                <b>{format(s.nextRunDate, "PPPPp")}</b>
              </>
              : "No schedule set."}
          </div>
        </div>
      </div>
      {showAction && (
        <div className="flex items-center gap-2 mt-3 md:mt-0">
          <Button
            onClick={s.paused ? resumeScheduling : pauseScheduling}
            variant={s.paused ? "secondary" : "destructive"}
            className="flex items-center gap-2"
          >
            {s.paused ? <PlayCircle className="w-4 h-4" /> : <PauseCircle className="w-4 h-4" />}
            {s.paused ? "Resume" : "Pause"}
          </Button>
        </div>
      )}
    </div>
  );
};
