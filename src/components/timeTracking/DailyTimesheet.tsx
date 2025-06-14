
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Save, X, Plus } from 'lucide-react';
import { useTimeTracking } from '@/hooks/useTimeTracking';
import { TimeEntry } from '@/types/timeTracking';

export const DailyTimesheet = () => {
  const { todayEntries } = useTimeTracking();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingEntry, setEditingEntry] = useState<Partial<TimeEntry>>({});
  const [showAddEntry, setShowAddEntry] = useState(false);

  const startEdit = (entry: TimeEntry) => {
    setEditingId(entry.id);
    setEditingEntry(entry);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingEntry({});
  };

  const saveEdit = () => {
    // In a real app, this would update the backend
    console.log('Saving entry:', editingEntry);
    setEditingId(null);
    setEditingEntry({});
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'clocked-in':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'on-break':
        return <Badge className="bg-orange-500">Break</Badge>;
      case 'clocked-out':
        return <Badge variant="secondary">Complete</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const calculateDuration = (entry: TimeEntry) => {
    if (!entry.clockOut) return 'In Progress';
    const start = new Date(`2024-01-01 ${entry.clockIn}`);
    const end = new Date(`2024-01-01 ${entry.clockOut}`);
    const diff = end.getTime() - start.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <Card className="bg-[#141a2e]/80 border border-blue-800/30">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl text-white">Daily Timesheet</CardTitle>
        <Button
          onClick={() => setShowAddEntry(true)}
          size="sm"
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Entry
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-blue-800/30">
                <TableHead className="text-blue-300">Time In</TableHead>
                <TableHead className="text-blue-300">Time Out</TableHead>
                <TableHead className="text-blue-300">Project</TableHead>
                <TableHead className="text-blue-300">Task</TableHead>
                <TableHead className="text-blue-300">Duration</TableHead>
                <TableHead className="text-blue-300">Status</TableHead>
                <TableHead className="text-blue-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {todayEntries.map((entry) => (
                <TableRow key={entry.id} className="border-blue-800/30">
                  <TableCell className="text-white">
                    {editingId === entry.id ? (
                      <Input
                        value={editingEntry.clockIn || ''}
                        onChange={(e) => setEditingEntry(prev => ({ ...prev, clockIn: e.target.value }))}
                        className="w-20 bg-blue-900/20"
                      />
                    ) : (
                      entry.clockIn
                    )}
                  </TableCell>
                  <TableCell className="text-white">
                    {editingId === entry.id ? (
                      <Input
                        value={editingEntry.clockOut || ''}
                        onChange={(e) => setEditingEntry(prev => ({ ...prev, clockOut: e.target.value }))}
                        className="w-20 bg-blue-900/20"
                      />
                    ) : (
                      entry.clockOut || '-'
                    )}
                  </TableCell>
                  <TableCell className="text-blue-300">
                    {editingId === entry.id ? (
                      <Input
                        value={editingEntry.project || ''}
                        onChange={(e) => setEditingEntry(prev => ({ ...prev, project: e.target.value }))}
                        className="w-32 bg-blue-900/20"
                      />
                    ) : (
                      entry.project || '-'
                    )}
                  </TableCell>
                  <TableCell className="text-blue-300">
                    {editingId === entry.id ? (
                      <Input
                        value={editingEntry.task || ''}
                        onChange={(e) => setEditingEntry(prev => ({ ...prev, task: e.target.value }))}
                        className="w-32 bg-blue-900/20"
                      />
                    ) : (
                      entry.task || '-'
                    )}
                  </TableCell>
                  <TableCell className="text-white">
                    {calculateDuration(entry)}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(entry.status)}
                  </TableCell>
                  <TableCell>
                    {editingId === entry.id ? (
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          onClick={saveEdit}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Save className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={cancelEdit}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => startEdit(entry)}
                        className="border-blue-500/50"
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                    )}
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
