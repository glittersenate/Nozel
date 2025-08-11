
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, Calendar, Users, DollarSign, TrendingUp, Filter, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState<string>('');
  const [dateRange, setDateRange] = useState<string>('');

  const reportTypes = [
    {
      id: 'payroll',
      title: 'Payroll Reports',
      description: 'Monthly payroll summaries and employee compensation details',
      icon: DollarSign,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/20'
    },
    {
      id: 'attendance',
      title: 'Attendance Reports',
      description: 'Employee attendance tracking and time-off analysis',
      icon: Calendar,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20'
    },
    {
      id: 'employee',
      title: 'Employee Reports',
      description: 'Headcount, demographics, and organizational charts',
      icon: Users,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20'
    },
    {
      id: 'performance',
      title: 'Performance Reports',
      description: 'Performance reviews, goals tracking, and KPI metrics',
      icon: TrendingUp,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/20'
    }
  ];

  const recentReports = [
    { name: 'Monthly Payroll - March 2024', date: '2024-03-31', type: 'Payroll', status: 'Completed' },
    { name: 'Q1 Performance Summary', date: '2024-03-30', type: 'Performance', status: 'Completed' },
    { name: 'Attendance Summary - March', date: '2024-03-29', type: 'Attendance', status: 'Completed' },
    { name: 'Employee Headcount Report', date: '2024-03-28', type: 'Employee', status: 'Completed' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
            Reports & Analytics
          </h1>
          <p className="text-blue-300 text-lg">Generate comprehensive reports and insights for your organization</p>
        </div>

        {/* Report Generation Section */}
        <Card className="glass-dark border-blue-500/20 mb-8">
          <CardHeader>
            <CardTitle className="text-white font-heading flex items-center gap-3">
              <FileText className="w-6 h-6 text-blue-400" />
              Generate New Report
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-blue-200 text-sm font-medium mb-2 block">Report Type</label>
                <Select value={selectedReport} onValueChange={setSelectedReport}>
                  <SelectTrigger className="bg-slate-800/50 border-blue-500/30 text-white">
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-blue-500/30 text-white">
                    {reportTypes.map((report) => (
                      <SelectItem key={report.id} value={report.id}>
                        {report.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-blue-200 text-sm font-medium mb-2 block">Date Range</label>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="bg-slate-800/50 border-blue-500/30 text-white">
                    <SelectValue placeholder="Select date range" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-blue-500/30 text-white">
                    <SelectItem value="current-month">Current Month</SelectItem>
                    <SelectItem value="last-month">Last Month</SelectItem>
                    <SelectItem value="current-quarter">Current Quarter</SelectItem>
                    <SelectItem value="last-quarter">Last Quarter</SelectItem>
                    <SelectItem value="current-year">Current Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  disabled={!selectedReport || !dateRange}
                >
                  Generate Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Report Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {reportTypes.map((report) => {
            const Icon = report.icon;
            return (
              <Card key={report.id} className="glass-dark border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 group cursor-pointer">
                <CardContent className="p-6">
                  <div className={`${report.bgColor} p-4 rounded-2xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-8 h-8 ${report.color}`} />
                  </div>
                  <h3 className="text-white font-heading font-semibold mb-2">{report.title}</h3>
                  <p className="text-blue-300/70 text-sm">{report.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Reports */}
        <Card className="glass-dark border-blue-500/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white font-heading">Recent Reports</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
                  <Input 
                    placeholder="Search reports..." 
                    className="pl-10 bg-slate-800/50 border-blue-500/30 text-white w-64"
                  />
                </div>
                <Button variant="outline" size="sm" className="border-blue-500/30 text-blue-300 hover:bg-blue-500/10">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReports.map((report, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-800/30 rounded-xl hover:bg-slate-800/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{report.name}</h4>
                      <p className="text-blue-300/70 text-sm">{report.type} • {report.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-green-400 text-sm font-medium">{report.status}</span>
                    <Button variant="ghost" size="sm" className="text-blue-300 hover:text-white hover:bg-blue-500/20">
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
};

export default Reports;
