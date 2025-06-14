
import React, { useState } from 'react';
import { Search, Filter, X, Calendar, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';

interface SearchFilters {
  searchTerm: string;
  departments: string[];
  salaryRange: { min: number | null; max: number | null };
  dateRange: { from: string; to: string };
  status: string[];
}

interface AdvancedSearchProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  availableDepartments: string[];
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({
  filters,
  onFiltersChange,
  availableDepartments
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const updateFilter = (key: keyof SearchFilters, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      searchTerm: '',
      departments: [],
      salaryRange: { min: null, max: null },
      dateRange: { from: '', to: '' },
      status: []
    });
  };

  const activeFilterCount = [
    filters.departments.length > 0,
    filters.salaryRange.min !== null || filters.salaryRange.max !== null,
    filters.dateRange.from || filters.dateRange.to,
    filters.status.length > 0
  ].filter(Boolean).length;

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-4 h-4" />
        <Input
          placeholder="Search employees, departments, positions..."
          value={filters.searchTerm}
          onChange={(e) => updateFilter('searchTerm', e.target.value)}
          className="pl-10 bg-[#0e1c38]/50 border-blue-800/30 text-blue-100 placeholder:text-blue-400"
        />
      </div>

      {/* Advanced Filters */}
      <DropdownMenu open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="bg-[#141a2e]/60 border-blue-800/30 text-blue-200 hover:bg-[#141a2e]/80"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="ml-2 bg-blue-600 text-white">
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          className="w-80 bg-[#141a2e] border-blue-800/30 text-blue-100 p-4"
          align="end"
        >
          {/* Department Filter */}
          <div className="mb-4">
            <label className="text-sm font-medium text-blue-200">Departments</label>
            <div className="mt-2 space-y-1">
              {availableDepartments.map((dept) => (
                <DropdownMenuCheckboxItem
                  key={dept}
                  checked={filters.departments.includes(dept)}
                  onCheckedChange={(checked) => {
                    const updated = checked 
                      ? [...filters.departments, dept]
                      : filters.departments.filter(d => d !== dept);
                    updateFilter('departments', updated);
                  }}
                  className="text-blue-200 hover:bg-blue-600/20"
                >
                  {dept}
                </DropdownMenuCheckboxItem>
              ))}
            </div>
          </div>

          {/* Salary Range */}
          <div className="mb-4">
            <label className="text-sm font-medium text-blue-200">Salary Range</label>
            <div className="mt-2 flex gap-2">
              <Input
                placeholder="Min"
                type="number"
                value={filters.salaryRange.min || ''}
                onChange={(e) => updateFilter('salaryRange', { 
                  ...filters.salaryRange, 
                  min: e.target.value ? Number(e.target.value) : null 
                })}
                className="bg-[#0e1c38]/50 border-blue-800/30 text-blue-100"
              />
              <Input
                placeholder="Max"
                type="number"
                value={filters.salaryRange.max || ''}
                onChange={(e) => updateFilter('salaryRange', { 
                  ...filters.salaryRange, 
                  max: e.target.value ? Number(e.target.value) : null 
                })}
                className="bg-[#0e1c38]/50 border-blue-800/30 text-blue-100"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="mb-4">
            <label className="text-sm font-medium text-blue-200">Status</label>
            <div className="mt-2 space-y-1">
              {['active', 'inactive'].map((status) => (
                <DropdownMenuCheckboxItem
                  key={status}
                  checked={filters.status.includes(status)}
                  onCheckedChange={(checked) => {
                    const updated = checked 
                      ? [...filters.status, status]
                      : filters.status.filter(s => s !== status);
                    updateFilter('status', updated);
                  }}
                  className="text-blue-200 hover:bg-blue-600/20 capitalize"
                >
                  {status}
                </DropdownMenuCheckboxItem>
              ))}
            </div>
          </div>

          <Button 
            onClick={clearFilters}
            variant="outline"
            size="sm"
            className="w-full bg-red-600/20 border-red-600/30 text-red-300 hover:bg-red-600/30"
          >
            Clear All Filters
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Active Filters Display */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.departments.map((dept) => (
            <Badge 
              key={dept} 
              variant="secondary" 
              className="bg-blue-600/20 text-blue-200 border border-blue-600/30"
            >
              {dept}
              <X 
                className="w-3 h-3 ml-1 cursor-pointer" 
                onClick={() => updateFilter('departments', filters.departments.filter(d => d !== dept))}
              />
            </Badge>
          ))}
          {(filters.salaryRange.min || filters.salaryRange.max) && (
            <Badge variant="secondary" className="bg-green-600/20 text-green-200 border border-green-600/30">
              Salary: ${filters.salaryRange.min || 0}k - ${filters.salaryRange.max || '∞'}k
              <X 
                className="w-3 h-3 ml-1 cursor-pointer" 
                onClick={() => updateFilter('salaryRange', { min: null, max: null })}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default AdvancedSearch;
