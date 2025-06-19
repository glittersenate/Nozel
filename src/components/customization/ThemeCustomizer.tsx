import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Palette, 
  Layout, 
  Type, 
  Monitor, 
  Smartphone, 
  Tablet,
  Eye,
  RotateCcw,
  Download,
  Upload,
  Save,
  Zap,
  Grid3X3,
  Maximize2,
  Minimize2,
  Sun,
  Moon,
  Contrast,
  Volume2
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

interface PresetTheme {
  id: string;
  name: string;
  description: string;
  preview: string;
  config: Partial<ThemeConfig>;
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

  const fontOptions = [
    'Inter',
    'Roboto',
    'Open Sans',
    'Lato',
    'Poppins',
    'Montserrat',
    'Source Sans Pro',
    'Nunito'
  ];

  const updateThemeConfig = (section: keyof ThemeConfig, key: string, value: any) => {
    setThemeConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const applyPresetTheme = (preset: PresetTheme) => {
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

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'desktop': return Monitor;
      case 'tablet': return Tablet;
      case 'mobile': return Smartphone;
      default: return Monitor;
    }
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
                    onClick={() => applyPresetTheme(preset)}
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

          {/* Customization Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-slate-800/50 border-slate-700/50 grid grid-cols-5">
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
              <TabsTrigger value="accessibility" className="data-[state=active]:bg-blue-600/20">
                <Eye className="w-4 h-4 mr-2" />
                A11y
              </TabsTrigger>
              <TabsTrigger value="animations" className="data-[state=active]:bg-blue-600/20">
                <Zap className="w-4 h-4 mr-2" />
                Motion
              </TabsTrigger>
            </TabsList>

            {/* Colors Tab */}
            <TabsContent value="colors" className="space-y-4">
              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Color Palette</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {Object.entries(themeConfig.colors).map(([key, value]) => (
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
                        onChange={(e) => updateThemeConfig('colors', key, e.target.value)}
                        className="w-12 h-8 rounded border border-slate-600 bg-transparent cursor-pointer"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Typography Tab */}
            <TabsContent value="typography" className="space-y-4">
              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Typography Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="text-white font-medium mb-2 block">Font Family</label>
                    <select
                      value={themeConfig.typography.fontFamily}
                      onChange={(e) => updateThemeConfig('typography', 'fontFamily', e.target.value)}
                      className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white"
                    >
                      {fontOptions.map((font) => (
                        <option key={font} value={font}>{font}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-white font-medium mb-2 block">
                      Font Size: {themeConfig.typography.fontSize}px
                    </label>
                    <Slider
                      value={[themeConfig.typography.fontSize]}
                      onValueChange={([value]) => updateThemeConfig('typography', 'fontSize', value)}
                      min={12}
                      max={20}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="text-white font-medium mb-2 block">
                      Line Height: {themeConfig.typography.lineHeight}
                    </label>
                    <Slider
                      value={[themeConfig.typography.lineHeight]}
                      onValueChange={([value]) => updateThemeConfig('typography', 'lineHeight', value)}
                      min={1.2}
                      max={2.0}
                      step={0.1}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="text-white font-medium mb-2 block">
                      Font Weight: {themeConfig.typography.fontWeight}
                    </label>
                    <Slider
                      value={[themeConfig.typography.fontWeight]}
                      onValueChange={([value]) => updateThemeConfig('typography', 'fontWeight', value)}
                      min={300}
                      max={700}
                      step={100}
                      className="w-full"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Layout Tab */}
            <TabsContent value="layout" className="space-y-4">
              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Layout Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="text-white font-medium mb-2 block">
                      Sidebar Width: {themeConfig.layout.sidebarWidth}px
                    </label>
                    <Slider
                      value={[themeConfig.layout.sidebarWidth]}
                      onValueChange={([value]) => updateThemeConfig('layout', 'sidebarWidth', value)}
                      min={200}
                      max={400}
                      step={20}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="text-white font-medium mb-2 block">
                      Header Height: {themeConfig.layout.headerHeight}px
                    </label>
                    <Slider
                      value={[themeConfig.layout.headerHeight]}
                      onValueChange={([value]) => updateThemeConfig('layout', 'headerHeight', value)}
                      min={48}
                      max={80}
                      step={4}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="text-white font-medium mb-2 block">
                      Border Radius: {themeConfig.layout.borderRadius}px
                    </label>
                    <Slider
                      value={[themeConfig.layout.borderRadius]}
                      onValueChange={([value]) => updateThemeConfig('layout', 'borderRadius', value)}
                      min={0}
                      max={20}
                      step={2}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="text-white font-medium mb-2 block">
                      Spacing: {themeConfig.layout.spacing}px
                    </label>
                    <Slider
                      value={[themeConfig.layout.spacing]}
                      onValueChange={([value]) => updateThemeConfig('layout', 'spacing', value)}
                      min={8}
                      max={32}
                      step={4}
                      className="w-full"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Accessibility Tab */}
            <TabsContent value="accessibility" className="space-y-4">
              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Accessibility Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(themeConfig.accessibility).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                      <div>
                        <div className="text-white font-medium capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                        <div className="text-slate-400 text-sm">
                          {key === 'highContrast' && 'Increase contrast for better visibility'}
                          {key === 'reducedMotion' && 'Reduce animations and transitions'}
                          {key === 'largeText' && 'Increase text size for readability'}
                          {key === 'focusIndicators' && 'Show focus indicators for keyboard navigation'}
                        </div>
                      </div>
                      <Switch
                        checked={value}
                        onCheckedChange={(checked) => updateThemeConfig('accessibility', key, checked)}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Animations Tab */}
            <TabsContent value="animations" className="space-y-4">
              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Animation Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <div>
                      <div className="text-white font-medium">Enable Animations</div>
                      <div className="text-slate-400 text-sm">Turn on/off all animations</div>
                    </div>
                    <Switch
                      checked={themeConfig.animations.enabled}
                      onCheckedChange={(checked) => updateThemeConfig('animations', 'enabled', checked)}
                    />
                  </div>

                  {themeConfig.animations.enabled && (
                    <>
                      <div>
                        <label className="text-white font-medium mb-2 block">
                          Duration: {themeConfig.animations.duration}ms
                        </label>
                        <Slider
                          value={[themeConfig.animations.duration]}
                          onValueChange={([value]) => updateThemeConfig('animations', 'duration', value)}
                          min={100}
                          max={500}
                          step={50}
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label className="text-white font-medium mb-2 block">Easing Function</label>
                        <select
                          value={themeConfig.animations.easing}
                          onChange={(e) => updateThemeConfig('animations', 'easing', e.target.value)}
                          className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white"
                        >
                          <option value="ease">Ease</option>
                          <option value="ease-in">Ease In</option>
                          <option value="ease-out">Ease Out</option>
                          <option value="ease-in-out">Ease In Out</option>
                          <option value="linear">Linear</option>
                        </select>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Live Preview */}
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
                      onClick={() => setPreviewDevice(device)}
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
      </div>
    </div>
  );
};
