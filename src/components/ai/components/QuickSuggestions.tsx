
import React from 'react';
import { Button } from '@/components/ui/button';

interface QuickSuggestionsProps {
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
  showSuggestions: boolean;
}

export const QuickSuggestions: React.FC<QuickSuggestionsProps> = ({
  suggestions,
  onSuggestionClick,
  showSuggestions
}) => {
  if (!showSuggestions) return null;

  return (
    <div className="space-y-2 p-4 bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-lg border border-purple-200/30">
      <p className="text-xs text-purple-600 dark:text-purple-300 font-medium flex items-center gap-1">
        ✨ Quick suggestions:
      </p>
      <div className="grid grid-cols-2 gap-2">
        {suggestions.map((suggestion, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => onSuggestionClick(suggestion)}
            className="h-8 text-xs justify-start hover:bg-purple-100 dark:hover:bg-purple-900 border-purple-200 dark:border-purple-700 text-purple-700 dark:text-purple-200"
          >
            {suggestion}
          </Button>
        ))}
      </div>
    </div>
  );
};
