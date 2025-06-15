
import React from "react";
import { usePayroll } from "@/hooks/usePayroll";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { FileText } from "lucide-react";

const PayslipHistory: React.FC = () => {
  const { payrollEntries } = usePayroll();

  if (!payrollEntries.length) {
    return (
      <Card className="mb-3 border-0 glass-dark">
        <CardContent className="py-7 flex flex-col items-center">
          <FileText className="w-12 h-12 text-blue-300 mb-2" />
          <p className="text-blue-100 text-lg font-semibold">No payslips available yet.</p>
          <p className="text-blue-200 text-sm mt-1">Payslips will appear here once payroll is processed.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-dark border-0 rounded-2xl shadow mb-4">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-950/70 cursor-default">
              {/* Table headers - no hover effect */}
              <TableHead className="text-blue-200 font-semibold select-none">Pay Period</TableHead>
              <TableHead className="text-blue-200 font-semibold select-none">Status</TableHead>
              <TableHead className="text-blue-200 font-semibold select-none text-right">Net Pay</TableHead>
              <TableHead className="text-blue-200 font-semibold select-none text-right">Download</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payrollEntries.slice(0, 6).map(entry => (
              <TableRow key={entry.id}>
                <TableCell>
                  <span className="font-medium text-white">
                    {entry.payPeriodStart} — {entry.payPeriodEnd}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold 
                    ${entry.status === "paid" ? "bg-green-900/40 text-green-300" : "bg-yellow-900/40 text-yellow-200"}`}>
                    {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                  </span>
                </TableCell>
                <TableCell className="text-right text-blue-100 font-bold">
                  ${entry.netPay.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  {/* Mock download; in a real app: href to PDF */}
                  <button
                    className="bg-blue-600/90 hover:bg-blue-700 text-white px-3 py-1 rounded inline-flex items-center gap-1 text-xs font-semibold"
                    title="Download PDF"
                    disabled
                  >
                    <FileText className="w-4 h-4" />
                    PDF
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PayslipHistory;
