
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

const mockData = [
  { name: "Mon", issues: 1 },
  { name: "Tue", issues: 0 },
  { name: "Wed", issues: 3 },
  { name: "Thu", issues: 2 },
  { name: "Fri", issues: 1 },
  { name: "Sat", issues: 0 },
  { name: "Sun", issues: 0 },
];

export const ComplianceIssueChart = () => (
  <Card className="glass-dark rounded-2xl border-0">
    <CardHeader>
      <CardTitle className="text-white">Compliance Issues This Week</CardTitle>
    </CardHeader>
    <CardContent className="p-4 pt-0">
      <div className="w-full h-56">
        <ChartContainer config={{
          issues: { label: "Issues", color: "#facc15" }
        }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockData}>
              <XAxis dataKey="name" stroke="#c7d2fe" />
              <YAxis stroke="#c7d2fe" />
              <Tooltip content={<ChartTooltipContent />} />
              <Bar dataKey="issues" fill="#facc15" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </CardContent>
  </Card>
);

export default ComplianceIssueChart;
