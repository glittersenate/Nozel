
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, FileText, Download, Filter, Users, DollarSign, Clock, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export default function Reports() {
  const [date, setDate] = useState<Date>();

  const reportTypes = [
    {
      id: 'employee',
      title: 'Employee Reports',
      description: 'Comprehensive employee data and demographics',
      icon: Users,
      color: 'bg-blue-500',
      reports: ['Employee List', 'New Hires', 'Terminations', 'Demographics']
    },
    {
      id: 'payroll',
      title: 'Payroll Reports',
      description: 'Salary, benefits, and compensation analysis',
      icon: DollarSign,
      color: 'bg-green-500',
      reports: ['Payroll Summary', 'Tax Reports', 'Benefits Cost', 'Overtime Analysis']
    },
    {
      id: 'attendance',
      title: 'Attendance Reports',
      description: 'Time tracking and attendance patterns',
      icon: Clock,
      color: 'bg-purple-500',
      reports: ['Time Sheets', 'Attendance Summary', 'Late Arrivals', 'Overtime Hours']
    },
    {
      id: 'performance',
      title: 'Performance Reports',
      description: 'Employee performance and goal tracking',
      icon: TrendingUp,
      color: 'bg-orange-500',
      reports: ['Performance Reviews', 'Goal Progress', 'Skill Assessment', 'Career Development']
    }
  ];

  const recentReports = [
    { name: 'Monthly Payroll Report', date: '2024-03-01', type: 'Payroll', status: 'completed' },
    { name: 'Employee Attendance', date: '2024-02-28', type: 'Attendance', status: 'completed' },
    { name: 'Performance Review Summary', date: '2024-02-25', type: 'Performance', status: 'completed' },
    { name: 'New Hire Report', date: '2024-02-20', type: 'Employee', status: 'completed' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Reports & Analytics</h1>
          <p className="text-muted-foreground">Generate comprehensive reports and insights</p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Report Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="hr">Human Resources</SelectItem>
                </SelectContent>
              </Select>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-48 justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Report Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Report Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {reportTypes.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card key={category.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${category.color}`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    {category.title}
                  </CardTitle>
                  <p className="text-muted-foreground">{category.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {category.reports.map((report) => (
                      <div key={report} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                        <span className="text-sm">{report}</span>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-1" />
                          Generate
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Reports */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Recent Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReports.map((report, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{report.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {report.type} • Generated on {report.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      {report.status}
                    </Badge>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
