
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap } from 'lucide-react';

interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
  };
  typography: {
    fontFamily: string;
    fontSize: number;
    lineHeight: number;
    fontWeight: number;
  };
  layout: {
    sidebarWidth: number;
    headerHeight: number;
    borderRadius: number;
    spacing: number;
  };
  accessibility: {
    highContrast: boolean;
    reducedMotion: boolean;
    largeText: boolean;
    focusIndicators: boolean;
  };
  animations: {
    enabled: boolean;
    duration: number;
    easing: string;
  };
}

interface PresetTheme {
  id: string;
  name: string;
  description: string;
  preview: string;
  config: Partial<ThemeConfig>;
}

interface PresetThemesProps {
  onApplyPreset: (preset: PresetTheme) => void;
}

export const PresetThemes: React.FC<PresetThemesProps> = ({ onApplyPreset }) => {
  const presetThemes: PresetTheme[] = [
    {
      id: 'default',
      name: 'Default Blue',
      description: 'Professional blue theme',
      preview: 'linear-gradient(135deg, #3b82f6, #1e40af)',
      config: {
        colors: {
          primary: '#3b82f6',
          secondary: '#64748b',
          accent: '#8b5cf6',
          background: '#0f172a',
          surface: '#1e293b',
          text: '#f8fafc'
        }
      }
    },
    {
      id: 'emerald',
      name: 'Emerald Green',
      description: 'Fresh and modern green',
      preview: 'linear-gradient(135deg, #10b981, #047857)',
      config: {
        colors: {
          primary: '#10b981',
          secondary: '#6b7280',
          accent: '#f59e0b',
          background: '#0f172a',
          surface: '#1e293b',
          text: '#f8fafc'
        }
      }
    },
    {
      id: 'purple',
      name: 'Royal Purple',
      description: 'Elegant purple theme',
      preview: 'linear-gradient(135deg, #8b5cf6, #5b21b6)',
      config: {
        colors: {
          primary: '#8b5cf6',
          secondary: '#64748b',
          accent: '#f97316',
          background: '#0f172a',
          surface: '#1e293b',
          text: '#f8fafc'
        }
      }
    },
    {
      id: 'rose',
      name: 'Rose Pink',
      description: 'Warm and inviting',
      preview: 'linear-gradient(135deg, #f43f5e, #be123c)',
      config: {
        colors: {
          primary: '#f43f5e',
          secondary: '#64748b',
          accent: '#06b6d4',
          background: '#0f172a',
          surface: '#1e293b',
          text: '#f8fafc'
        }
      }
    }
  ];

  return (
    <Card className="bg-slate-800/50 border-slate-700/50">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-400" />
          Quick Presets
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {presetThemes.map((preset) => (
            <div
              key={preset.id}
              className="cursor-pointer group"
              onClick={() => onApplyPreset(preset)}
            >
              <div
                className="w-full h-20 rounded-lg mb-2 group-hover:scale-105 transition-transform"
                style={{ background: preset.preview }}
              />
              <h4 className="text-white font-medium text-sm">{preset.name}</h4>
              <p className="text-slate-400 text-xs">{preset.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
