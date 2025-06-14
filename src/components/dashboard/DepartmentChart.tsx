
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

// Exotic and lovely color palette
const EXOTIC_COLORS = [
  '#FF6B9D', // Hot Pink
  '#45B7D1', // Sky Blue
  '#96CEB4', // Mint Green
  '#FFEAA7', // Warm Yellow
  '#DDA0DD', // Plum
  '#FFB347', // Peach
  '#87CEEB', // Light Blue
  '#F0A500', // Orange
  '#C44569', // Deep Pink
  '#40E0D0'  // Turquoise
];

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
          <p className="text-blue-300 text-sm">{data.value} employees</p>
          <p className="text-blue-300 text-sm">{data.percentage}% of workforce</p>
        </div>
      );
    }
    return null;
  };

  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="font-bold text-sm drop-shadow-lg"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
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
        <h3 className="text-xl font-bold text-blue-100 mb-4">Department Distribution</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <defs>
                {EXOTIC_COLORS.map((color, index) => (
                  <radialGradient key={index} id={`gradient-${index}`} cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor={color} stopOpacity={1} />
                    <stop offset="100%" stopColor={color} stopOpacity={0.8} />
                  </radialGradient>
                ))}
              </defs>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={120}
                innerRadius={50}
                fill="#8884d8"
                dataKey="value"
                labelLine={false}
                label={CustomLabel}
                // Do NOT set stroke or strokeWidth!
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={`url(#gradient-${index % EXOTIC_COLORS.length})`}
                    style={{
                      filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.2))',
                      cursor: 'pointer'
                    }}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                wrapperStyle={{
                  paddingTop: '20px',
                  fontSize: '14px',
                  color: '#e2e8f0'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DepartmentChart;

