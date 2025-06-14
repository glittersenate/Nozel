
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { ShieldCheck, XCircle } from "lucide-react";

const mockChecks = [
  { date: "2025-06-14 09:30", state: "California", status: "fail", details: "Minimum wage audit failed" },
  { date: "2025-06-14 09:00", state: "New York", status: "pass", details: "Overtime rules up to date" },
  { date: "2025-06-13 17:32", state: "Texas", status: "fail", details: "Payroll tax update missing" },
  { date: "2025-06-13 16:06", state: "Illinois", status: "pass", details: "All checks passed" },
];

export const RecentComplianceChecks = () => (
  <Card className="glass-dark rounded-2xl border-0">
    <CardHeader>
      <CardTitle className="text-white">Recent Compliance Checks</CardTitle>
    </CardHeader>
    <CardContent className="p-4 pt-0">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date/Time</TableHead>
            <TableHead>State</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockChecks.map((check, idx) => (
            <TableRow key={idx}>
              <TableCell className="text-blue-200">{check.date}</TableCell>
              <TableCell className="text-blue-100">{check.state}</TableCell>
              <TableCell>
                {check.status === "pass" ? (
                  <span className="inline-flex items-center bg-green-600/20 text-green-300 px-2 py-0.5 rounded-full text-xs font-medium">
                    <ShieldCheck className="w-4 h-4 mr-1" /> Pass
                  </span>
                ) : (
                  <span className="inline-flex items-center bg-red-600/20 text-red-300 px-2 py-0.5 rounded-full text-xs font-medium">
                    <XCircle className="w-4 h-4 mr-1" /> Fail
                  </span>
                )}
              </TableCell>
              <TableCell className="text-blue-200">{check.details}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

export default RecentComplianceChecks;
