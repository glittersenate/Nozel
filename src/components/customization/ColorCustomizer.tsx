
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ColorCustomizerProps {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
  };
  onColorChange: (key: string, value: string) => void;
}

export const ColorCustomizer: React.FC<ColorCustomizerProps> = ({ colors, onColorChange }) => {
  return (
    <Card className="bg-slate-800/50 border-slate-700/50">
      <CardHeader>
        <CardTitle className="text-white">Color Palette</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {Object.entries(colors).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg border border-slate-600"
                style={{ backgroundColor: value }}
              />
              <div>
                <div className="text-white font-medium capitalize">{key}</div>
                <div className="text-slate-400 text-sm">{value}</div>
              </div>
            </div>
            <input
              type="color"
              value={value}
              onChange={(e) => onColorChange(key, e.target.value)}
              className="w-12 h-8 rounded border border-slate-600 bg-transparent cursor-pointer"
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
