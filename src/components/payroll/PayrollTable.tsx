
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, Download, Send } from 'lucide-react';
import { usePayroll } from '@/hooks/usePayroll';

export const PayrollTable = () => {
  const { payrollEntries } = usePayroll();
  const [selectedPeriod, setSelectedPeriod] = useState('current');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <Badge variant="secondary">Draft</Badge>;
      case 'pending':
        return <Badge className="bg-orange-500">Pending</Badge>;
      case 'approved':
        return <Badge className="bg-blue-500">Approved</Badge>;
      case 'paid':
        return <Badge className="bg-green-500">Paid</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card className="bg-[#141a2e]/80 border border-blue-800/30">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl text-white">Payroll History</CardTitle>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="border-blue-500/50">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-blue-800/30">
                <TableHead className="text-blue-300">Pay Period</TableHead>
                <TableHead className="text-blue-300">Employees</TableHead>
                <TableHead className="text-blue-300">Gross Pay</TableHead>
                <TableHead className="text-blue-300">Deductions</TableHead>
                <TableHead className="text-blue-300">Net Pay</TableHead>
                <TableHead className="text-blue-300">Status</TableHead>
                <TableHead className="text-blue-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payrollEntries.map((entry) => (
                <TableRow key={entry.id} className="border-blue-800/30">
                  <TableCell className="text-white">
                    {entry.payPeriodStart} - {entry.payPeriodEnd}
                  </TableCell>
                  <TableCell className="text-white">
                    24
                  </TableCell>
                  <TableCell className="text-white">
                    ${entry.grossPay.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-white">
                    ${entry.deductions.reduce((sum, d) => sum + d.amount, 0).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-white">
                    ${entry.netPay.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(entry.status)}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" className="border-blue-500/50">
                        <Eye className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline" className="border-green-500/50">
                        <Send className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
