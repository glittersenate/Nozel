
import React from 'react';
import { Trash2, Mail, UserCheck, UserX, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface BulkActionsProps {
  selectedCount: number;
  onBulkDelete: () => void;
  onBulkStatusChange: (status: 'active' | 'inactive') => void;
  onBulkExport: () => void;
  onBulkEmail: () => void;
}

const BulkActions: React.FC<BulkActionsProps> = ({
  selectedCount,
  onBulkDelete,
  onBulkStatusChange,
  onBulkExport,
  onBulkEmail
}) => {
  if (selectedCount === 0) return null;

  return (
    <div className="flex items-center gap-3 p-4 bg-blue-600/10 border border-blue-600/30 rounded-lg">
      <span className="text-blue-200 text-sm font-medium">
        {selectedCount} employee{selectedCount > 1 ? 's' : ''} selected
      </span>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            size="sm" 
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Bulk Actions
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-[#141a2e] border border-blue-800/30">
          <DropdownMenuItem 
            onClick={onBulkEmail}
            className="text-blue-200 hover:bg-blue-800/20"
          >
            <Mail className="w-4 h-4 mr-2" />
            Send Email
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={onBulkExport}
            className="text-blue-200 hover:bg-blue-800/20"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Selected
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-blue-800/30" />
          <DropdownMenuItem 
            onClick={() => onBulkStatusChange('active')}
            className="text-green-400 hover:bg-green-800/20"
          >
            <UserCheck className="w-4 h-4 mr-2" />
            Mark as Active
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => onBulkStatusChange('inactive')}
            className="text-yellow-400 hover:bg-yellow-800/20"
          >
            <UserX className="w-4 h-4 mr-2" />
            Mark as Inactive
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-blue-800/30" />
          <DropdownMenuItem 
            onClick={onBulkDelete}
            className="text-red-400 hover:bg-red-800/20"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Selected
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default BulkActions;
