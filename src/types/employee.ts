
export interface Employee {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  salary: number;
  startDate: string;
  status: 'active' | 'inactive';
  avatar?: string;
  phone?: string;
  address?: string;
}

export interface SortConfig {
  key: keyof Employee;
  direction: 'asc' | 'desc';
}
