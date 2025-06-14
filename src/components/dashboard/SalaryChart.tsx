
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Employee {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  salary: number;
  startDate: string;
  status: 'active' | 'inactive';
}

interface SalaryChartProps {
  employees: Employee[];
}

const SalaryChart: React.FC<SalaryChartProps> = ({ employees }) => {
  // Calculate average salary by department
  const departmentSalaries = employees
    .filter(emp => emp.status === 'active')
    .reduce((acc, emp) => {
      if (!acc[emp.department]) {
        acc[emp.department] = { total: 0, count: 0 };
      }
      acc[emp.department].total += emp.salary;
      acc[emp.department].count += 1;
      return acc;
    }, {} as Record<string, { total: number; count: number }>);

  const chartData = Object.entries(departmentSalaries).map(([department, data]) => ({
    department,
    avgSalary: Math.round(data.total / data.count),
    employees: data.count
  })).sort((a, b) => a.department.localeCompare(b.department));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#141a2e] border border-blue-800/30 rounded-lg p-3 shadow-lg">
          <p className="text-blue-100 font-medium">{label}</p>
          <p className="text-blue-300 text-sm">
            Avg Salary: ${data.avgSalary.toLocaleString()}
          </p>
          <p className="text-blue-300 text-sm">
            Employees: {data.employees}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className="shadow-lg rounded-2xl p-0 border"
      style={{
        background: "linear-gradient(115deg,rgba(31,42,70,0.98) 65%,rgba(32,55,116,0.94) 100%)",
        border: "1px solid rgba(87,120,255,0.06)",
      }}
    >
      <div className="p-6">
        <h3 className="text-xl font-bold text-blue-100 mb-4">Average Salary by Department</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <defs>
                <linearGradient id="mountainGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#00D4FF" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis 
                dataKey="department" 
                stroke="#9CA3AF"
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={80}
                tick={{ fill: '#9CA3AF' }}
              />
              <YAxis 
                stroke="#9CA3AF"
                fontSize={12}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                tick={{ fill: '#9CA3AF' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="avgSalary" 
                stroke="#00D4FF" 
                strokeWidth={3}
                fill="url(#mountainGradient)"
                dot={{ fill: '#00D4FF', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: '#00D4FF', strokeWidth: 2, fill: '#ffffff' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SalaryChart;
