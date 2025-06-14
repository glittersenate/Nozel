
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export const WeeklyTimeChart = () => {
  // Mock data for the week
  const weeklyData = [
    { day: 'Mon', regular: 8, overtime: 0, break: 1 },
    { day: 'Tue', regular: 8, overtime: 1, break: 1 },
    { day: 'Wed', regular: 7.5, overtime: 0, break: 1.5 },
    { day: 'Thu', regular: 8, overtime: 2, break: 1 },
    { day: 'Fri', regular: 6, overtime: 0, break: 1 },
    { day: 'Sat', regular: 0, overtime: 0, break: 0 },
    { day: 'Sun', regular: 0, overtime: 0, break: 0 },
  ];

  return (
    <Card className="bg-[#141a2e]/80 border border-blue-800/30">
      <CardHeader>
        <CardTitle className="text-xl text-white">Weekly Time Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis dataKey="day" stroke="#94a3b8" />
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
            <Bar 
              dataKey="regular" 
              stackId="time"
              fill="#3b82f6" 
              name="Regular Hours"
              radius={[0, 0, 4, 4]}
            />
            <Bar 
              dataKey="overtime" 
              stackId="time"
              fill="#f59e0b" 
              name="Overtime"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
