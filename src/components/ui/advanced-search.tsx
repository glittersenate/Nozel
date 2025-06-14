
import React, { useState } from 'react';
import { Search, Filter, Calendar, DollarSign, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export interface AdvancedSearchFilters {
  searchTerm: string;
  salaryMin?: number;
  salaryMax?: number;
  startDateFrom?: string;
  startDateTo?: string;
  departments: string[];
  positions: string[];
}

interface AdvancedSearchProps {
  filters: AdvancedSearchFilters;
  onFiltersChange: (filters: AdvancedSearchFilters) => void;
  departments: string[];
  positions: string[];
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({
  filters,
  onFiltersChange,
  departments,
  positions
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const updateFilter = <K extends keyof AdvancedSearchFilters>(
    key: K,
    value: AdvancedSearchFilters[K]
  ) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const hasActiveFilters = filters.salaryMin || filters.salaryMax || 
    filters.startDateFrom || filters.startDateTo || 
    filters.departments.length > 0 || filters.positions.length > 0;

  const clearAllFilters = () => {
    onFiltersChange({
      searchTerm: filters.searchTerm,
      departments: [],
      positions: []
    });
  };

  return (
    <div className="flex gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-4 h-4" />
        <Input
          placeholder="Search employees..."
          value={filters.searchTerm}
          onChange={(e) => updateFilter('searchTerm', e.target.value)}
          className="pl-10 bg-[#0e1c38]/50 border-blue-800/30 text-blue-100 placeholder:text-blue-400/70"
        />
      </div>
      
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={`bg-[#141a2e]/60 border-blue-800/30 text-blue-200 hover:bg-[#141a2e]/80 ${hasActiveFilters ? 'border-blue-500 bg-blue-600/20' : ''}`}
          >
            <Filter className="w-4 h-4 mr-2" />
            Advanced
            {hasActiveFilters && (
              <span className="ml-2 bg-blue-600 text-xs rounded-full px-2 py-0.5 text-white">
                {[filters.departments.length, filters.positions.length, filters.salaryMin ? 1 : 0, filters.salaryMax ? 1 : 0, filters.startDateFrom ? 1 : 0, filters.startDateTo ? 1 : 0].reduce((a, b) => a + b, 0)}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 bg-[#141a2e] border border-blue-800/30 p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-blue-100">Advanced Filters</h4>
              {hasActiveFilters && (
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={clearAllFilters}
                  className="text-blue-400 hover:text-blue-300"
                >
                  <X className="w-3 h-3 mr-1" />
                  Clear
                </Button>
              )}
            </div>

            <div className="space-y-3">
              <div>
                <Label className="text-blue-200 text-xs">Salary Range</Label>
                <div className="flex gap-2 mt-1">
                  <div className="relative">
                    <DollarSign className="absolute left-2 top-1/2 transform -translate-y-1/2 text-blue-400 w-3 h-3" />
                    <Input
                      placeholder="Min"
                      type="number"
                      value={filters.salaryMin || ''}
                      onChange={(e) => updateFilter('salaryMin', e.target.value ? Number(e.target.value) : undefined)}
                      className="pl-7 h-8 bg-[#0e1c38]/50 border-blue-800/30 text-blue-100 text-xs"
                    />
                  </div>
                  <div className="relative">
                    <DollarSign className="absolute left-2 top-1/2 transform -translate-y-1/2 text-blue-400 w-3 h-3" />
                    <Input
                      placeholder="Max"
                      type="number"
                      value={filters.salaryMax || ''}
                      onChange={(e) => updateFilter('salaryMax', e.target.value ? Number(e.target.value) : undefined)}
                      className="pl-7 h-8 bg-[#0e1c38]/50 border-blue-800/30 text-blue-100 text-xs"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-blue-200 text-xs">Start Date Range</Label>
                <div className="flex gap-2 mt-1">
                  <div className="relative">
                    <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 text-blue-400 w-3 h-3" />
                    <Input
                      type="date"
                      value={filters.startDateFrom || ''}
                      onChange={(e) => updateFilter('startDateFrom', e.target.value)}
                      className="pl-7 h-8 bg-[#0e1c38]/50 border-blue-800/30 text-blue-100 text-xs"
                    />
                  </div>
                  <div className="relative">
                    <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 text-blue-400 w-3 h-3" />
                    <Input
                      type="date"
                      value={filters.startDateTo || ''}
                      onChange={(e) => updateFilter('startDateTo', e.target.value)}
                      className="pl-7 h-8 bg-[#0e1c38]/50 border-blue-800/30 text-blue-100 text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AdvancedSearch;
