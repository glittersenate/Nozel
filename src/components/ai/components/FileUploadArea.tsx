
import React from 'react';
import { FileText } from 'lucide-react';

interface FileUploadAreaProps {
  uploadedFiles: File[];
  onRemoveFile: (index: number) => void;
}

export const FileUploadArea: React.FC<FileUploadAreaProps> = ({ 
  uploadedFiles, 
  onRemoveFile 
}) => {
  if (uploadedFiles.length === 0) return null;

  return (
    <div className="px-4 py-2 border-t border-blue-500/20">
      <div className="flex flex-wrap gap-2">
        {uploadedFiles.map((file, index) => (
          <div key={index} className="flex items-center gap-2 bg-slate-800 rounded-lg px-2 py-1">
            <FileText className="w-3 h-3 text-blue-400" />
            <span className="text-xs text-blue-200 truncate max-w-20">{file.name}</span>
            <button
              onClick={() => onRemoveFile(index)}
              className="text-blue-400 hover:text-red-400"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
