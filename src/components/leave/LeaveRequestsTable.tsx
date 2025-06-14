
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Check, X, Eye } from 'lucide-react';
import { useLeave } from '@/hooks/useLeave';

export const LeaveRequestsTable = () => {
  const { leaveRequests } = useLeave();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-orange-500">Pending</Badge>;
      case 'approved':
        return <Badge className="bg-green-500">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500">Rejected</Badge>;
      case 'cancelled':
        return <Badge variant="secondary">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getLeaveTypeColor = (type: string) => {
    switch (type) {
      case 'vacation':
        return 'text-blue-300';
      case 'sick':
        return 'text-red-300';
      case 'personal':
        return 'text-purple-300';
      default:
        return 'text-blue-300';
    }
  };

  return (
    <Card className="bg-[#141a2e]/80 border border-blue-800/30">
      <CardHeader>
        <CardTitle className="text-xl text-white">Leave Requests</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-blue-800/30">
                <TableHead className="text-blue-300">Type</TableHead>
                <TableHead className="text-blue-300">Dates</TableHead>
                <TableHead className="text-blue-300">Days</TableHead>
                <TableHead className="text-blue-300">Status</TableHead>
                <TableHead className="text-blue-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaveRequests.slice(0, 5).map((request) => (
                <TableRow key={request.id} className="border-blue-800/30">
                  <TableCell className={getLeaveTypeColor(request.type)}>
                    {request.type.charAt(0).toUpperCase() + request.type.slice(1)}
                  </TableCell>
                  <TableCell className="text-white">
                    {request.startDate} - {request.endDate}
                  </TableCell>
                  <TableCell className="text-white">
                    {request.days}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(request.status)}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" className="border-blue-500/50">
                        <Eye className="w-3 h-3" />
                      </Button>
                      {request.status === 'pending' && (
                        <>
                          <Button size="sm" variant="outline" className="border-green-500/50 text-green-300">
                            <Check className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline" className="border-red-500/50 text-red-300">
                            <X className="w-3 h-3" />
                          </Button>
                        </>
                      )}
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
