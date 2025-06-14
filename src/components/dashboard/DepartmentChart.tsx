
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

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

interface DepartmentChartProps {
  employees: Employee[];
}

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

const DepartmentChart: React.FC<DepartmentChartProps> = ({ employees }) => {
  // Count employees by department
  const departmentData = employees.reduce((acc, emp) => {
    if (emp.status === 'active') {
      acc[emp.department] = (acc[emp.department] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(departmentData).map(([name, value]) => ({
    name,
    value,
    percentage: ((value / employees.filter(e => e.status === 'active').length) * 100).toFixed(1)
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#141a2e] border border-blue-800/30 rounded-lg p-3 shadow-lg">
          <p className="text-blue-100 font-medium">{data.name}</p>
          <p className="text-blue-300 text-sm">{data.value} employees ({data.percentage}%)</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-[#141a2e]/80 border border-blue-950 rounded-xl p-6">
      <h3 className="text-xl font-bold text-blue-100 mb-4">Department Distribution</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percentage }) => `${name} (${percentage}%)`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DepartmentChart;
