
import React from "react";
import { useLeave } from "@/hooks/useLeave";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { TimeOffRequestForm } from "./TimeOffRequestForm";
import { LeaveBalanceCards } from "./LeaveBalanceCards";

const RequestTimeOff: React.FC = () => {
  const { leaveRequests, getLeaveBalance, addManualLeave } = useLeave();
  const balance = getLeaveBalance();

  const handleSubmitRequest = (request: any) => {
    addManualLeave({
      employeeId: balance.employeeId,
      type: request.type as any,
      startDate: request.startDate,
      endDate: request.endDate,
      days: Number(request.days),
    });
  };

  return (
    <div className="space-y-6">
      <Card className="glass-dark border-0 rounded-2xl">
        <CardContent className="p-5 sm:p-6">
          <h3 className="text-xl font-semibold text-white flex items-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-green-400" />
            Request Time Off
          </h3>
          <TimeOffRequestForm onSubmit={handleSubmitRequest} />
          <LeaveBalanceCards balance={balance} />
        </CardContent>
      </Card>

      {/* Recent requests */}
      <Card className="glass-dark border-0 rounded-2xl">
        <CardContent className="p-5 sm:p-6">
          <h3 className="text-base font-semibold text-white mb-2">Recent Requests</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date(s)</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Days</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaveRequests.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-blue-200">
                    No requests yet.
                  </TableCell>
                </TableRow>
              ) : (
                leaveRequests.slice(0, 5).map(req => (
                  <TableRow key={req.id}>
                    <TableCell>
                      <span className="text-white">{req.startDate}{req.endDate !== req.startDate && ` – ${req.endDate}`}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-blue-200 capitalize">{req.type}</span>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold 
                        ${req.status === "approved"
                          ? "bg-green-900/40 text-green-400"
                          : req.status === "pending"
                          ? "bg-yellow-700/40 text-yellow-300"
                          : "bg-red-900/40 text-red-200"
                        }`
                      }>
                        {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-blue-100">{req.days}</span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default RequestTimeOff;
