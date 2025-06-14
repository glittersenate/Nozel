
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, Plus } from 'lucide-react';

export const CreateReviewDialog = () => {
  const [open, setOpen] = useState(false);
  const [reviewType, setReviewType] = useState('');
  const [period, setPeriod] = useState('');
  const [employee, setEmployee] = useState('');

  const handleCreateReview = () => {
    // In a real app, this would create a new performance review
    console.log('Creating review:', { reviewType, period, employee });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          New Review
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#141a2e] border-blue-800/30">
        <DialogHeader>
          <DialogTitle className="text-white">Create Performance Review</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="employee" className="text-blue-300">Employee</Label>
            <Select onValueChange={setEmployee}>
              <SelectTrigger className="bg-blue-900/20 border-blue-700/50">
                <SelectValue placeholder="Select employee" />
              </SelectTrigger>
              <SelectContent className="bg-[#141a2e] border-blue-800/30">
                <SelectItem value="john">John Doe</SelectItem>
                <SelectItem value="jane">Jane Smith</SelectItem>
                <SelectItem value="mike">Mike Johnson</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="reviewType" className="text-blue-300">Review Type</Label>
            <Select onValueChange={setReviewType}>
              <SelectTrigger className="bg-blue-900/20 border-blue-700/50">
                <SelectValue placeholder="Select review type" />
              </SelectTrigger>
              <SelectContent className="bg-[#141a2e] border-blue-800/30">
                <SelectItem value="annual">Annual Review</SelectItem>
                <SelectItem value="quarterly">Quarterly Review</SelectItem>
                <SelectItem value="probation">Probation Review</SelectItem>
                <SelectItem value="project">Project Review</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="period" className="text-blue-300">Review Period</Label>
            <Input
              id="period"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              placeholder="e.g., Q1 2024, Jan-Dec 2024"
              className="bg-blue-900/20 border-blue-700/50 text-white"
            />
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleCreateReview} className="flex-1 bg-purple-600 hover:bg-purple-700">
              Create Review
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
