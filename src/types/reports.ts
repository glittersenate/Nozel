
export interface Report {
  id: string;
  title: string;
  type: 'payroll' | 'time-tracking' | 'leave' | 'performance' | 'employee';
  description: string;
  filters: ReportFilter[];
  generatedAt: string;
  generatedBy: string;
  data: any[];
  format: 'pdf' | 'csv' | 'excel';
}

export interface ReportFilter {
  field: string;
  operator: 'equals' | 'contains' | 'greater-than' | 'less-than' | 'between';
  value: any;
}

export interface ReportTemplate {
  id: string;
  name: string;
  type: string;
  description: string;
  fields: string[];
  defaultFilters: ReportFilter[];
}
