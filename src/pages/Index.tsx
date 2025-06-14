import React from "react";
import EnhancedStatsCards from "@/components/dashboard/EnhancedStatsCards";
import AnimatedPayrollButton from "@/components/dashboard/AnimatedPayrollButton";
import { useRealTimeData } from "@/hooks/useRealTimeData";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { OnboardingWizardDialog } from "@/components/onboarding/OnboardingWizard";

export default function Index() {
  const { user, permissions } = useAuth();

  const employees = [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      position: "Software Engineer",
      department: "Engineering",
      salary: 90000,
      startDate: "2022-01-15",
      status: "active",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      position: "HR Manager",
      department: "Human Resources",
      salary: 80000,
      startDate: "2021-05-20",
      status: "active",
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
      position: "Project Manager",
      department: "Management",
      salary: 100000,
      startDate: "2020-11-01",
      status: "active",
    },
    {
      id: "4",
      name: "Sarah Connor",
      email: "sarah.connor@example.com",
      position: "Accountant",
      department: "Finance",
      salary: 75000,
      startDate: "2023-03-10",
      status: "inactive",
    },
    {
      id: "5",
      name: "David Lee",
      email: "david.lee@example.com",
      position: "Marketing Specialist",
      department: "Marketing",
      salary: 85000,
      startDate: "2022-09-01",
      status: "active",
    },
    {
      id: "6",
      name: "Emily White",
      email: "emily.white@example.com",
      position: "Data Analyst",
      department: "Analytics",
      salary: 95000,
      startDate: "2021-07-01",
      status: "active",
    },
    {
      id: "7",
      name: "Kevin Brown",
      email: "kevin.brown@example.com",
      position: "Sales Representative",
      department: "Sales",
      salary: 80000,
      startDate: "2022-04-01",
      status: "active",
    },
    {
      id: "8",
      name: "Linda Green",
      email: "linda.green@example.com",
      position: "Customer Support",
      department: "Support",
      salary: 70000,
      startDate: "2023-01-01",
      status: "active",
    },
    {
      id: "9",
      name: "Brian Black",
      email: "brian.black@example.com",
      position: "UX Designer",
      department: "Design",
      salary: 90000,
      startDate: "2022-06-01",
      status: "active",
    },
    {
      id: "10",
      name: "Alice Gray",
      email: "alice.gray@example.com",
      position: "Product Manager",
      department: "Product",
      salary: 100000,
      startDate: "2021-09-01",
      status: "active",
    },
  ];

  const { metrics, isLive, toggleLiveMode } = useRealTimeData(employees);

  return (
    <div>
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold text-white mb-6">
          Dashboard Overview
        </h1>

        <EnhancedStatsCards employees={employees} />

        <AnimatedPayrollButton
          totalPayroll={metrics.totalPayroll}
          activeEmployees={metrics.activeEmployees}
          onRunPayroll={() => alert("Payroll run successfully!")}
          canRunPayroll={permissions.canRunPayroll}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-[#141a2e]/80 border border-blue-800/30">
            <CardHeader>
              <CardTitle className="text-xl text-white">
                Department Growth
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {Object.entries(metrics.departmentGrowth).map(
                  ([department, growth]) => (
                    <li
                      key={department}
                      className="flex items-center justify-between"
                    >
                      <span className="text-blue-300">{department}</span>
                      <span
                        className={`font-bold ${
                          growth >= 0 ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {growth > 0 ? "+" : ""}
                        {growth}%
                      </span>
                    </li>
                  )
                )}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-[#141a2e]/80 border border-blue-800/30">
            <CardHeader>
              <CardTitle className="text-xl text-white">Salary Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={metrics.salaryTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1e293b", border: "none" }}
                    itemStyle={{ color: "#cbd5e1" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="average"
                    stroke="#6366f1"
                    fill="#312e81"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-[#141a2e]/80 border border-blue-800/30 mb-8">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-xl text-white">Activity Feed</CardTitle>
            <div className="flex items-center space-x-2">
              <Label htmlFor="live-switch" className="text-sm text-blue-300">
                Live Mode
              </Label>
              <Switch id="live-switch" checked={isLive} onCheckedChange={toggleLiveMode} />
            </div>
          </CardHeader>
          <CardContent className="h-[400px] p-0">
            <ScrollArea className="h-full">
              <div className="p-4 space-y-4">
                {metrics.activityFeed.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start space-x-4"
                  >
                    <Avatar>
                      <AvatarImage src={`https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`} />
                      <AvatarFallback>
                        {activity.employee?.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none text-white">
                        {activity.message}
                      </p>
                      <p className="text-sm text-blue-300 opacity-70">
                        {activity.timestamp.toLocaleTimeString()}
                      </p>
                      <Badge variant="secondary">{activity.type}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-center my-8">
        <OnboardingWizardDialog />
      </div>
    </div>
  );
}
