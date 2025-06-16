
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T, value: any) => React.ReactNode;
  sortable?: boolean;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (item: T) => void;
  className?: string;
  emptyMessage?: string;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  onRowClick,
  className = '',
  emptyMessage = 'No data available'
}: DataTableProps<T>) {
  const getValue = (item: T, key: string) => {
    return key.includes('.') 
      ? key.split('.').reduce((obj, k) => obj?.[k], item)
      : item[key];
  };

  return (
    <div className={`bg-[#141a2e]/80 border border-blue-800/30 rounded-lg ${className}`}>
      <Table>
        <TableHeader>
          <TableRow className="border-blue-800/30 hover:bg-transparent">
            {columns.map((column) => (
              <TableHead 
                key={column.key as string} 
                className={`text-blue-300 font-semibold ${column.className || ''}`}
              >
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell 
                colSpan={columns.length} 
                className="text-center text-blue-300/70 py-8"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            data.map((item, index) => (
              <TableRow
                key={index}
                className={`border-blue-800/30 hover:bg-blue-900/20 transition-colors ${
                  onRowClick ? 'cursor-pointer' : ''
                }`}
                onClick={() => onRowClick?.(item)}
              >
                {columns.map((column) => {
                  const value = getValue(item, column.key as string);
                  return (
                    <TableCell 
                      key={column.key as string} 
                      className={`text-white ${column.className || ''}`}
                    >
                      {column.render ? column.render(item, value) : value}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
