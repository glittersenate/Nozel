
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Check, X, Eye } from 'lucide-react';
import { useLeave } from '@/hooks/useLeave';

type LeaveRequestsTableProps = {
  requests: ReturnType<typeof useLeave>['leaveRequests'];
  title?: string;
  sortBy?: 'startDate' | 'endDate' | 'status';
  sortDir?: 'asc' | 'desc';
  showActions?: boolean;
};

function sortRequests(requests: any[], sortBy: string, sortDir: string) {
  if (!sortBy) return requests;
  return [...requests].sort((a, b) => {
    if (sortBy === 'status') {
      if (a.status < b.status) return sortDir === 'asc' ? -1 : 1;
      if (a.status > b.status) return sortDir === 'asc' ? 1 : -1;
      return 0;
    }
    const aVal = new Date(a[sortBy]);
    const bVal = new Date(b[sortBy]);
    if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });
}

export const LeaveRequestsTable: React.FC<LeaveRequestsTableProps> = ({
  requests,
  title,
  sortBy = 'startDate',
  sortDir = 'desc',
  showActions = false,
}) => {
  // HR actions prominently exposed!
  const { /* approveLeave, rejectLeave */ } = useLeave();

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

  // Sorting
  const sorted = sortRequests(requests, sortBy, sortDir);

  return (
    <Card className="bg-[#141a2e]/80 border border-blue-800/30 my-5">
      <CardHeader>
        <CardTitle className="text-lg text-blue-200">{title}</CardTitle>
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
                {showActions && <TableHead className="text-blue-300">Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={showActions ? 5 : 4} className="text-blue-300/70 text-center">
                    No leave requests found.
                  </TableCell>
                </TableRow>
              ) : sorted.map((request) => (
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
                  {showActions && (
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" className="border-blue-500/50 ring-2 ring-blue-800 hover:bg-blue-800/30" title="View Details">
                          <Eye className="w-4 h-4" />
                        </Button>
                        {request.status === 'pending' && (
                          <>
                            <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white font-bold px-3 shadow" /*onClick={() => approveLeave(request.id)}*/>
                              <Check className="w-4 h-4" />
                              <span className="ml-1">Approve</span>
                            </Button>
                            <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white font-bold px-3 shadow" /*onClick={() => rejectLeave(request.id)}*/>
                              <X className="w-4 h-4" />
                              <span className="ml-1">Decline</span>
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
