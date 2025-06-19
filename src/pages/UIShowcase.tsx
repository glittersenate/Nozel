import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ModernDashboardLayouts } from '@/components/dashboard/ModernDashboardLayouts';
import { EnhancedEmployeeProfile } from '@/components/employee/EnhancedEmployeeProfile';
import { ModernOnboardingWizard } from '@/components/onboarding/ModernOnboardingWizard';
import { ConversationalRecruitmentBot } from '@/components/ai/ConversationalRecruitmentBot';
import { SmartNotificationCenter } from '@/components/notifications/SmartNotificationCenter';
import { IntegrationControlCenter } from '@/components/integrations/IntegrationControlCenter';
import { ThemeCustomizer } from '@/components/customization/ThemeCustomizer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Palette, 
  BarChart3, 
  User, 
  UserPlus, 
  Bot, 
  Bell, 
  Settings, 
  Paintbrush,
  Sparkles,
  Eye,
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UIShowcase = () => {
  const [activeTab, setActiveTab] = useState('dashboards');
  const navigate = useNavigate();

  // Mock employee data for profile demo
  const mockEmployee = {
    id: '1',
    name: 'Sarah Connor',
    email: 'sarah.connor@company.com',
    position: 'Senior Software Engineer',
    department: 'Engineering',
    salary: 125000,
    startDate: '2022-03-15',
    status: 'active',
    phone: '+1 (555) 123-4567',
    address: '123 Tech Street, San Francisco, CA'
  };

  const showcaseItems = [
    {
      id: 'dashboards',
      title: 'Modern Dashboards',
      description: 'Interactive analytics with drill-down capabilities',
      icon: BarChart3,
      color: 'blue',
      component: <ModernDashboardLayouts layoutType="executive" />
    },
    {
      id: 'profiles',
      title: 'Enhanced Profiles',
      description: 'Comprehensive employee profile management',
      icon: User,
      color: 'green',
      component: <EnhancedEmployeeProfile employee={mockEmployee} />
    },
    {
      id: 'onboarding',
      title: 'Onboarding Wizard',
      description: 'Step-by-step employee onboarding experience',
      icon: UserPlus,
      color: 'purple',
      component: <ModernOnboardingWizard />
    },
    {
      id: 'ai-chat',
      title: 'AI Recruitment Bot',
      description: 'Conversational AI for recruitment tasks',
      icon: Bot,
      color: 'orange',
      component: <ConversationalRecruitmentBot />
    },
    {
      id: 'notifications',
      title: 'Smart Notifications',
      description: 'Intelligent notification center with preferences',
      icon: Bell,
      color: 'red',
      component: <SmartNotificationCenter />
    },
    {
      id: 'integrations',
      title: 'Integration Center',
      description: 'Unified control for third-party integrations',
      icon: Settings,
      color: 'cyan',
      component: <IntegrationControlCenter />
    },
    {
      id: 'customization',
      title: 'Theme Customizer',
      description: 'Live theme customization with accessibility',
      icon: Paintbrush,
      color: 'pink',
      component: <ThemeCustomizer />
    }
  ];

  const activeItem = showcaseItems.find(item => item.id === activeTab);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="border-blue-500/30 text-blue-300 hover:bg-blue-500/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
                UI/UX Showcase
              </h1>
              <p className="text-blue-300 text-lg">Modern interface improvements and enhanced user experience</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-yellow-400" />
            <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
              Interactive Demo
            </Badge>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Navigation Tabs */}
          <div className="mb-8">
            <TabsList className="bg-slate-800/50 border-slate-700/50 p-1 h-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-1 w-full">
                {showcaseItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <TabsTrigger
                      key={item.id}
                      value={item.id}
                      className="data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-300 flex flex-col items-center gap-2 p-4 h-auto"
                    >
                      <Icon className={`w-5 h-5 text-${item.color}-400`} />
                      <div className="text-center">
                        <div className="font-medium text-xs">{item.title}</div>
                        <div className="text-xs text-slate-400 hidden lg:block">{item.description}</div>
                      </div>
                    </TabsTrigger>
                  );
                })}
              </div>
            </TabsList>
          </div>

          {/* Active Component Display */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              {activeItem && (
                <>
                  <activeItem.icon className={`w-6 h-6 text-${activeItem.color}-400`} />
                  <div>
                    <h2 className="text-2xl font-bold text-white">{activeItem.title}</h2>
                    <p className="text-slate-400">{activeItem.description}</p>
                  </div>
                  <Badge className={`bg-${activeItem.color}-500/20 text-${activeItem.color}-300 border-${activeItem.color}-500/30 ml-auto`}>
                    <Eye className="w-3 h-3 mr-1" />
                    Live Demo
                  </Badge>
                </>
              )}
            </div>
          </div>

          {/* Tab Content */}
          {showcaseItems.map((item) => (
            <TabsContent key={item.id} value={item.id} className="mt-0">
              <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-700/50">
                {item.component}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 text-slate-400 text-sm">
            <Sparkles className="w-4 h-4" />
            This showcase demonstrates modern UI/UX improvements for the HR management system
          </div>
        </div>
      </div>
    </div>
  );
};

export default UIShowcase;