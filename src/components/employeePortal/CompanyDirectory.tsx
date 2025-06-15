
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { useEmployees } from "@/hooks/useEmployees";
import { User } from "lucide-react";

const CompanyDirectory: React.FC = () => {
  const { employees } = useEmployees();

  return (
    <Card className="glass-dark border-0 rounded-2xl shadow mb-4">
      <CardContent className="p-0">
        <div className="flex items-center gap-3 px-6 pt-6 pb-2">
          <div className="p-2 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white leading-snug">Company Directory</h3>
            <p className="text-blue-200 text-xs">Browse all employees</p>
          </div>
        </div>
        <div className="overflow-x-auto px-2">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-950/60">
                <TableHead className="text-yellow-200">Name</TableHead>
                <TableHead className="text-yellow-200">Email</TableHead>
                <TableHead className="text-yellow-200">Department</TableHead>
                <TableHead className="text-yellow-200">Position</TableHead>
                <TableHead className="text-yellow-200">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((emp) => (
                <TableRow key={emp.id} className="hover:bg-blue-900/20 transition">
                  <TableCell className="text-white font-semibold">{emp.name}</TableCell>
                  <TableCell className="text-blue-100">{emp.email}</TableCell>
                  <TableCell className="text-blue-200">{emp.department}</TableCell>
                  <TableCell className="text-blue-200">{emp.position}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold
                      ${emp.status === "active" ? "bg-green-900/40 text-green-300" : "bg-gray-800/30 text-gray-300"}
                    `}>
                      {emp.status.charAt(0).toUpperCase() + emp.status.slice(1)}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyDirectory;
