
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Monitor, Tablet, Smartphone } from 'lucide-react';

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

interface LivePreviewProps {
  themeConfig: ThemeConfig;
  previewDevice: 'desktop' | 'tablet' | 'mobile';
  isLivePreview: boolean;
  onDeviceChange: (device: 'desktop' | 'tablet' | 'mobile') => void;
}

export const LivePreview: React.FC<LivePreviewProps> = ({
  themeConfig,
  previewDevice,
  isLivePreview,
  onDeviceChange
}) => {
  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'desktop': return Monitor;
      case 'tablet': return Tablet;
      case 'mobile': return Smartphone;
      default: return Monitor;
    }
  };

  return (
    <div className="space-y-4">
      {/* Device Selector */}
      <Card className="bg-slate-800/50 border-slate-700/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-sm">Preview Device</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            {(['desktop', 'tablet', 'mobile'] as const).map((device) => {
              const Icon = getDeviceIcon(device);
              return (
                <Button
                  key={device}
                  variant={previewDevice === device ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onDeviceChange(device)}
                  className={previewDevice === device ? 'bg-blue-600' : 'border-slate-600 text-slate-300'}
                >
                  <Icon className="w-4 h-4" />
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Preview Window */}
      <Card className="bg-slate-800/50 border-slate-700/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-sm flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Live Preview
            {isLivePreview && (
              <Badge className="bg-green-500/20 text-green-300 text-xs">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse" />
                Live
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={`
              bg-slate-900 rounded-lg overflow-hidden border border-slate-700 transition-all duration-300
              ${previewDevice === 'mobile' ? 'max-w-sm mx-auto' : ''}
              ${previewDevice === 'tablet' ? 'max-w-md mx-auto' : ''}
            `}
            style={{
              fontFamily: themeConfig.typography.fontFamily,
              fontSize: `${themeConfig.typography.fontSize}px`,
              lineHeight: themeConfig.typography.lineHeight
            }}
          >
            {/* Preview Header */}
            <div
              className="p-4 border-b border-slate-700"
              style={{
                backgroundColor: themeConfig.colors.surface,
                height: `${themeConfig.layout.headerHeight}px`,
                borderRadius: `${themeConfig.layout.borderRadius}px ${themeConfig.layout.borderRadius}px 0 0`
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full"
                  style={{ backgroundColor: themeConfig.colors.primary }}
                />
                <div>
                  <div className="font-bold" style={{ color: themeConfig.colors.text }}>
                    HR Dashboard
                  </div>
                  <div className="text-xs" style={{ color: themeConfig.colors.secondary }}>
                    Preview Mode
                  </div>
                </div>
              </div>
            </div>

            {/* Preview Content */}
            <div className="p-4 space-y-4">
              <div
                className="p-4 rounded-lg"
                style={{
                  backgroundColor: themeConfig.colors.surface,
                  borderRadius: `${themeConfig.layout.borderRadius}px`
                }}
              >
                <div
                  className="font-medium mb-2"
                  style={{ color: themeConfig.colors.text }}
                >
                  Sample Card
                </div>
                <div
                  className="text-sm"
                  style={{ color: themeConfig.colors.secondary }}
                >
                  This is how your content will look with the current theme settings.
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  className="px-4 py-2 rounded text-white text-sm font-medium transition-colors"
                  style={{
                    backgroundColor: themeConfig.colors.primary,
                    borderRadius: `${themeConfig.layout.borderRadius}px`
                  }}
                >
                  Primary Button
                </button>
                <button
                  className="px-4 py-2 rounded text-sm font-medium transition-colors border"
                  style={{
                    color: themeConfig.colors.text,
                    borderColor: themeConfig.colors.secondary,
                    borderRadius: `${themeConfig.layout.borderRadius}px`
                  }}
                >
                  Secondary
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Theme Info */}
      <Card className="bg-slate-800/50 border-slate-700/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-sm">Theme Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-400">Primary Color:</span>
            <span className="text-white">{themeConfig.colors.primary}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Font Family:</span>
            <span className="text-white">{themeConfig.typography.fontFamily}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Border Radius:</span>
            <span className="text-white">{themeConfig.layout.borderRadius}px</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Animations:</span>
            <span className="text-white">{themeConfig.animations.enabled ? 'Enabled' : 'Disabled'}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
