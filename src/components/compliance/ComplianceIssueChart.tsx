
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

const mockData = [
  { name: "Mon", issues: 1, resolved: 0 },
  { name: "Tue", issues: 0, resolved: 1 },
  { name: "Wed", issues: 3, resolved: 1 },
  { name: "Thu", issues: 2, resolved: 2 },
  { name: "Fri", issues: 1, resolved: 3 },
  { name: "Sat", issues: 0, resolved: 1 },
  { name: "Sun", issues: 0, resolved: 0 },
];

export const ComplianceIssueChart = () => (
  <Card className="glass-dark rounded-2xl border-0 shadow-lg">
    <CardHeader className="pb-3">
      <CardTitle className="text-white text-xl font-bold">Compliance Issues This Week</CardTitle>
    </CardHeader>
    <CardContent className="p-4 pt-0">
      <div className="w-full h-64">
        <ChartContainer config={{
          issues: { label: "Issues", color: "#ef4444" },
          resolved: { label: "Resolved", color: "#22c55e" }
        }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" opacity={0.3} />
              <XAxis 
                dataKey="name" 
                stroke="#c7d2fe" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#c7d2fe" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<ChartTooltipContent />} />
              <Line 
                type="monotone" 
                dataKey="issues" 
                stroke="#ef4444" 
                strokeWidth={3}
                dot={{ fill: "#ef4444", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "#ef4444", strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="resolved" 
                stroke="#22c55e" 
                strokeWidth={3}
                dot={{ fill: "#22c55e", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "#22c55e", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </CardContent>
  </Card>
);

export default ComplianceIssueChart;
