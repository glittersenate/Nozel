
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="h-9 w-9 bg-[#141a2e]/60 hover:bg-[#141a2e]/80 border border-blue-800/30"
    >
      {theme === 'light' ? (
        <Moon className="h-4 w-4 text-blue-200" />
      ) : (
        <Sun className="h-4 w-4 text-yellow-400" />
      )}
    </Button>
  );
};

export default ThemeToggle;
