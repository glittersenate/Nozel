
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export const PayrollChart = () => {
  const payrollData = [
    { month: 'Jan', grossPay: 450000, netPay: 360000 },
    { month: 'Feb', grossPay: 465000, netPay: 372000 },
    { month: 'Mar', grossPay: 478000, netPay: 382400 },
    { month: 'Apr', grossPay: 485000, netPay: 388000 },
    { month: 'May', grossPay: 492000, netPay: 393600 },
    { month: 'Jun', grossPay: 498000, netPay: 398400 },
  ];

  return (
    <Card className="bg-[#141a2e]/80 border border-blue-800/30">
      <CardHeader>
        <CardTitle className="text-xl text-white">Payroll Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={payrollData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis dataKey="month" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{ 
                backgroundColor: "#1e293b", 
                border: "none",
                borderRadius: "8px"
              }}
              itemStyle={{ color: "#cbd5e1" }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="grossPay" 
              stroke="#3b82f6" 
              strokeWidth={2}
              name="Gross Pay"
            />
            <Line 
              type="monotone" 
              dataKey="netPay" 
              stroke="#10b981" 
              strokeWidth={2}
              name="Net Pay"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
