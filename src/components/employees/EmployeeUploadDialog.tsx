
import React, { useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import * as XLSX from "xlsx";
import { Employee } from "@/types/employee";
import { useToast } from "@/hooks/use-toast";

interface EmployeeUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImport: (employees: Omit<Employee, "id">[]) => void;
}

const EmployeeUploadDialog: React.FC<EmployeeUploadDialogProps> = ({
  open,
  onOpenChange,
  onImport,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isImporting, setIsImporting] = useState(false);
  const { toast } = useToast();

  const handleBrowse = () => {
    fileInputRef.current?.click();
  };

  // Helper function to parse spreadsheet
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // Parse to json
      const rows: Record<string, any>[] = XLSX.utils.sheet_to_json(sheet, { defval: "" });
      // Map the data to Omit<Employee, "id">
      const mapped = rows.map((row) => {
        // Robust status normalization
        let rawStatus = row["Status"] || row["status"] || "";
        rawStatus = String(rawStatus).toLowerCase().trim();
        let status: "active" | "inactive" = "active";
        if (
          rawStatus === "inactive" ||
          rawStatus === "disabled" ||
          rawStatus === "terminated"
        ) {
          status = "inactive";
        }

        return {
          name: row["Name"] || row["name"] || "",
          email: row["Email"] || row["email"] || "",
          position: row["Position"] || row["position"] || "",
          department: row["Department"] || row["department"] || "",
          salary: Number(row["Salary"] || row["salary"] || 0),
          startDate: row["Start Date"] || row["startDate"] || "",
          status,
          avatar: row["Avatar"] || row["avatar"] || undefined,
          phone: row["Phone"] || row["phone"] || undefined,
          address: row["Address"] || row["address"] || undefined,
        };
      });

      // Filter invalid entries
      const validEmployees = mapped.filter(emp =>
        emp.name && emp.email && emp.department && emp.position && emp.salary && emp.startDate
      );

      if (validEmployees.length === 0) {
        toast({
          title: "No valid employees found",
          description: "Please check your file. It must include Name, Email, Department, Position, Salary, and Start Date columns.",
          variant: "destructive",
        });
      } else {
        onImport(validEmployees);
        toast({
          title: "Employees Imported",
          description: `Successfully imported ${validEmployees.length} employees.`,
        });
        onOpenChange(false);
      }
    } catch (err) {
      toast({
        title: "Error reading file",
        description: "Please try again or upload a different spreadsheet.",
        variant: "destructive",
      });
    }
    setIsImporting(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-[#141a2e]/90 border-blue-800/40 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            <Upload className="w-6 h-6 text-blue-400" />
            Import Employees from Spreadsheet
          </DialogTitle>
        </DialogHeader>
        <div className="my-5">
          <p className="text-blue-200 mb-3 text-sm">
            Upload a spreadsheet (.xlsx, .csv, .xls) with columns like <b>Name, Email, Department, Position, Salary, Start Date, Status</b>.
            Rows with missing required fields will be skipped.
          </p>
          <Button
            type="button"
            variant="outline"
            className="w-full py-5 flex items-center justify-center border-blue-700 text-blue-100 hover:bg-blue-700/10"
            onClick={handleBrowse}
            disabled={isImporting}
          >
            <Upload className="w-5 h-5 mr-2" />
            {isImporting ? "Importing..." : "Select File to Upload"}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls,.csv"
            className="hidden"
            onChange={handleFileChange}
            disabled={isImporting}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeUploadDialog;

