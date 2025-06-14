
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
  })).sort((a, b) => b.avgSalary - a.avgSalary);

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
    <div className="bg-[#141a2e]/80 border border-blue-950 rounded-xl p-6">
      <h3 className="text-xl font-bold text-blue-100 mb-4">Average Salary by Department</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="department" 
              stroke="#9CA3AF"
              fontSize={12}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis 
              stroke="#9CA3AF"
              fontSize={12}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="avgSalary" fill="#3B82F6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalaryChart;
