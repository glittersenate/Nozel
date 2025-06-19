
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PresetThemes } from './PresetThemes';
import { ColorCustomizer } from './ColorCustomizer';
import { LivePreview } from './LivePreview';
import { 
  Palette, 
  Layout, 
  Type, 
  Eye,
  RotateCcw,
  Download,
  Save
} from 'lucide-react';

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

export const ThemeCustomizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState('colors');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isLivePreview, setIsLivePreview] = useState(true);

  const [themeConfig, setThemeConfig] = useState<ThemeConfig>({
    colors: {
      primary: '#3b82f6',
      secondary: '#64748b',
      accent: '#8b5cf6',
      background: '#0f172a',
      surface: '#1e293b',
      text: '#f8fafc'
    },
    typography: {
      fontFamily: 'Inter',
      fontSize: 14,
      lineHeight: 1.5,
      fontWeight: 400
    },
    layout: {
      sidebarWidth: 280,
      headerHeight: 64,
      borderRadius: 8,
      spacing: 16
    },
    accessibility: {
      highContrast: false,
      reducedMotion: false,
      largeText: false,
      focusIndicators: true
    },
    animations: {
      enabled: true,
      duration: 200,
      easing: 'ease-in-out'
    }
  });

  const updateThemeConfig = (section: keyof ThemeConfig, key: string, value: any) => {
    setThemeConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const applyPresetTheme = (preset: any) => {
    setThemeConfig(prev => ({
      ...prev,
      ...preset.config
    }));
  };

  const resetToDefaults = () => {
    setThemeConfig({
      colors: {
        primary: '#3b82f6',
        secondary: '#64748b',
        accent: '#8b5cf6',
        background: '#0f172a',
        surface: '#1e293b',
        text: '#f8fafc'
      },
      typography: {
        fontFamily: 'Inter',
        fontSize: 14,
        lineHeight: 1.5,
        fontWeight: 400
      },
      layout: {
        sidebarWidth: 280,
        headerHeight: 64,
        borderRadius: 8,
        spacing: 16
      },
      accessibility: {
        highContrast: false,
        reducedMotion: false,
        largeText: false,
        focusIndicators: true
      },
      animations: {
        enabled: true,
        duration: 200,
        easing: 'ease-in-out'
      }
    });
  };

  const exportTheme = () => {
    const dataStr = JSON.stringify(themeConfig, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'theme-config.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Theme Customizer</h1>
          <p className="text-slate-400">Customize the look and feel of your HR system</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 mr-4">
            <Eye className="w-4 h-4 text-slate-400" />
            <span className="text-slate-400 text-sm">Live Preview</span>
            <Switch
              checked={isLivePreview}
              onCheckedChange={setIsLivePreview}
            />
          </div>
          <Button variant="outline" onClick={resetToDefaults} className="border-slate-600 text-slate-300">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button variant="outline" onClick={exportTheme} className="border-slate-600 text-slate-300">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Save className="w-4 h-4 mr-2" />
            Save Theme
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customization Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Preset Themes */}
          <PresetThemes onApplyPreset={applyPresetTheme} />

          {/* Customization Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-slate-800/50 border-slate-700/50 grid grid-cols-3">
              <TabsTrigger value="colors" className="data-[state=active]:bg-blue-600/20">
                <Palette className="w-4 h-4 mr-2" />
                Colors
              </TabsTrigger>
              <TabsTrigger value="typography" className="data-[state=active]:bg-blue-600/20">
                <Type className="w-4 h-4 mr-2" />
                Typography
              </TabsTrigger>
              <TabsTrigger value="layout" className="data-[state=active]:bg-blue-600/20">
                <Layout className="w-4 h-4 mr-2" />
                Layout
              </TabsTrigger>
            </TabsList>

            {/* Colors Tab */}
            <TabsContent value="colors" className="space-y-4">
              <ColorCustomizer 
                colors={themeConfig.colors}
                onColorChange={(key, value) => updateThemeConfig('colors', key, value)}
              />
            </TabsContent>

            {/* Typography Tab */}
            <TabsContent value="typography" className="space-y-4">
              <p className="text-slate-400 text-sm">Typography customization coming soon...</p>
            </TabsContent>

            {/* Layout Tab */}
            <TabsContent value="layout" className="space-y-4">
              <p className="text-slate-400 text-sm">Layout customization coming soon...</p>
            </TabsContent>
          </Tabs>
        </div>

        {/* Live Preview */}
        <LivePreview 
          themeConfig={themeConfig}
          previewDevice={previewDevice}
          isLivePreview={isLivePreview}
          onDeviceChange={setPreviewDevice}
        />
      </div>
    </div>
  );
};
