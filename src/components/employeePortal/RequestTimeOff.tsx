
import React, { useState } from "react";
import { useLeave } from "@/hooks/useLeave";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const leaveTypeOptions = [
  { value: "vacation", label: "Vacation" },
  { value: "sick", label: "Sick" },
  { value: "personal", label: "Personal" },
];

const RequestTimeOff: React.FC = () => {
  const { leaveRequests, getLeaveBalance, submitLeaveRequest } = useLeave();
  const balance = getLeaveBalance();
  const [form, setForm] = useState({ type: "vacation", startDate: "", endDate: "", days: 1 });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    submitLeaveRequest({
      employeeId: balance.employeeId,
      type: form.type as any,
      startDate: form.startDate,
      endDate: form.endDate,
      days: form.days,
    });
    setTimeout(() => {
      setSubmitting(false);
      setForm({ ...form, startDate: "", endDate: "", days: 1 });
    }, 700);
  };

  return (
    <div className="space-y-6">
      <Card className="glass-dark border-0 rounded-2xl">
        <CardContent className="p-5 sm:p-6">
          <h3 className="text-xl font-semibold text-white flex items-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-green-400" />
            Request Time Off
          </h3>
          <form className="grid sm:grid-cols-4 gap-3 mb-1" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-bold text-blue-200 mb-1">Type</label>
              <select
                name="type"
                className="w-full rounded border px-2 py-2 bg-blue-900/90 text-white"
                value={form.type}
                onChange={handleChange}
                required
              >
                {leaveTypeOptions.map(opt => (
                  <option value={opt.value} key={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-blue-200 mb-1">Start Date</label>
              <input
                type="date"
                name="startDate"
                className="w-full rounded border px-2 py-2 bg-blue-900/90 text-white"
                value={form.startDate}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-blue-200 mb-1">End Date</label>
              <input
                type="date"
                name="endDate"
                className="w-full rounded border px-2 py-2 bg-blue-900/90 text-white"
                value={form.endDate}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-blue-200 mb-1">Days</label>
              <input
                type="number"
                name="days"
                min={1}
                max={31}
                className="w-full rounded border px-2 py-2 bg-blue-900/90 text-white"
                value={form.days}
                onChange={handleChange}
                required
              />
            </div>
            <div className="sm:col-span-4 text-right pt-2">
              <Button
                type="submit"
                className="bg-gradient-to-tr from-green-600 to-blue-500 text-white font-bold px-4 py-2 rounded"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit Request"}
              </Button>
            </div>
          </form>
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="glass-dark rounded-lg p-3 flex flex-col items-center">
              <span className="uppercase text-xs text-blue-200 font-bold">Vacation Left</span>
              <span className="text-green-400 text-lg font-bold">{balance.vacation.remaining} days</span>
            </div>
            <div className="glass-dark rounded-lg p-3 flex flex-col items-center">
              <span className="uppercase text-xs text-blue-200 font-bold">Sick Left</span>
              <span className="text-green-400 text-lg font-bold">{balance.sick.remaining} days</span>
            </div>
            <div className="glass-dark rounded-lg p-3 flex flex-col items-center">
              <span className="uppercase text-xs text-blue-200 font-bold">Personal Left</span>
              <span className="text-green-400 text-lg font-bold">{balance.personal.remaining} days</span>
            </div>
          </div>
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
