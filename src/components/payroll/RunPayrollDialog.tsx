
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, DollarSign } from 'lucide-react';

export const RunPayrollDialog = () => {
  const [open, setOpen] = useState(false);
  const [payPeriod, setPayPeriod] = useState('');
  const [payDate, setPayDate] = useState('');

  const handleRunPayroll = () => {
    // In a real app, this would trigger payroll processing
    console.log('Running payroll for:', { payPeriod, payDate });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700">
          <DollarSign className="w-4 h-4 mr-2" />
          Run Payroll
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#141a2e] border-blue-800/30">
        <DialogHeader>
          <DialogTitle className="text-white">Run Payroll</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="payPeriod" className="text-blue-300">Pay Period</Label>
            <Select onValueChange={setPayPeriod}>
              <SelectTrigger className="bg-blue-900/20 border-blue-700/50">
                <SelectValue placeholder="Select pay period" />
              </SelectTrigger>
              <SelectContent className="bg-[#141a2e] border-blue-800/30">
                <SelectItem value="current">Current Period (Mar 1-15, 2024)</SelectItem>
                <SelectItem value="next">Next Period (Mar 16-31, 2024)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="payDate" className="text-blue-300">Pay Date</Label>
            <Input
              id="payDate"
              type="date"
              value={payDate}
              onChange={(e) => setPayDate(e.target.value)}
              className="bg-blue-900/20 border-blue-700/50 text-white"
            />
          </div>

          <div className="bg-blue-900/20 p-4 rounded-lg">
            <h4 className="text-white font-medium mb-2">Payroll Summary</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between text-blue-300">
                <span>Employees:</span>
                <span>24</span>
              </div>
              <div className="flex justify-between text-blue-300">
                <span>Total Hours:</span>
                <span>960</span>
              </div>
              <div className="flex justify-between text-blue-300">
                <span>Estimated Gross:</span>
                <span>$48,000</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleRunPayroll} className="flex-1 bg-green-600 hover:bg-green-700">
              Process Payroll
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
