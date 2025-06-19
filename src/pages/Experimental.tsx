
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ModernDashboardLayouts } from '@/components/dashboard/ModernDashboardLayouts';
import { EnhancedEmployeeProfile } from '@/components/employee/EnhancedEmployeeProfile';
import { ModernOnboardingWizard } from '@/components/onboarding/ModernOnboardingWizard';
import { ConversationalRecruitmentBot } from '@/components/ai/ConversationalRecruitmentBot';
import { SmartNotificationCenter } from '@/components/notifications/SmartNotificationCenter';
import { IntegrationControlCenter } from '@/components/integrations/IntegrationControlCenter';
import { ThemeCustomizer } from '@/components/customization/ThemeCustomizer';
import { BackToDashboardButton } from '@/components/BackToDashboardButton';
import { 
  BarChart3, 
  User, 
  UserPlus, 
  Bot, 
  Bell, 
  Settings, 
  Paintbrush,
  Sparkles,
  Eye,
  FlaskConical
} from 'lucide-react';

const Experimental = () => {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

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

  const experimentalFeatures = [
    {
      id: 'dashboards',
      title: 'Modern Dashboards',
      description: 'Interactive analytics with drill-down capabilities and real-time data visualization',
      icon: BarChart3,
      color: 'blue',
      component: <ModernDashboardLayouts layoutType="executive" />
    },
    {
      id: 'profiles',
      title: 'Enhanced Profiles',
      description: 'Comprehensive employee profile management with advanced editing capabilities',
      icon: User,
      color: 'green',
      component: <EnhancedEmployeeProfile employee={mockEmployee} />
    },
    {
      id: 'onboarding',
      title: 'Smart Onboarding',
      description: 'AI-powered step-by-step employee onboarding experience',
      icon: UserPlus,
      color: 'purple',
      component: <ModernOnboardingWizard />
    },
    {
      id: 'ai-chat',
      title: 'AI Recruitment Bot',
      description: 'Conversational AI assistant for recruitment and HR tasks',
      icon: Bot,
      color: 'orange',
      component: <ConversationalRecruitmentBot />
    },
    {
      id: 'notifications',
      title: 'Smart Notifications',
      description: 'Intelligent notification center with personalized preferences',
      icon: Bell,
      color: 'red',
      component: <SmartNotificationCenter />
    },
    {
      id: 'integrations',
      title: 'Integration Hub',
      description: 'Unified control center for third-party service integrations',
      icon: Settings,
      color: 'cyan',
      component: <IntegrationControlCenter />
    },
    {
      id: 'customization',
      title: 'Theme Studio',
      description: 'Live theme customization with accessibility compliance',
      icon: Paintbrush,
      color: 'pink',
      component: <ThemeCustomizer />
    }
  ];

  const handleFeatureClick = (featureId: string) => {
    setSelectedComponent(selectedComponent === featureId ? null : featureId);
  };

  const selectedFeature = experimentalFeatures.find(f => f.id === selectedComponent);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950/50 to-slate-950">
      <BackToDashboardButton />
      
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <FlaskConical className="w-8 h-8 text-purple-400" />
              <h1 className="text-4xl font-bold font-heading bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                Experimental Lab
              </h1>
            </div>
            <p className="text-blue-300/80 text-lg max-w-2xl">
              Prototype features and UI/UX improvements being tested for future integration into the HR system
            </p>
          </div>
          <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 px-4 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            Beta Features
          </Badge>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experimentalFeatures.map((feature) => {
            const Icon = feature.icon;
            const isSelected = selectedComponent === feature.id;
            
            return (
              <Card
                key={feature.id}
                className={`
                  bg-[#141a2e]/80 border-slate-700/50 hover:border-blue-500/50 
                  transition-all duration-300 cursor-pointer group
                  ${isSelected ? 'ring-2 ring-blue-500/50 border-blue-500/50' : ''}
                `}
                onClick={() => handleFeatureClick(feature.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-${feature.color}-500/10 border border-${feature.color}-500/20`}>
                        <Icon className={`w-5 h-5 text-${feature.color}-400`} />
                      </div>
                      <div>
                        <CardTitle className="text-white font-heading text-lg">
                          {feature.title}
                        </CardTitle>
                      </div>
                    </div>
                    {isSelected && (
                      <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                        <Eye className="w-3 h-3 mr-1" />
                        Active
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-blue-300/70 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Selected Component Display */}
        {selectedFeature && (
          <Card className="bg-[#141a2e]/80 border-slate-700/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <selectedFeature.icon className={`w-6 h-6 text-${selectedFeature.color}-400`} />
                  <div>
                    <CardTitle className="text-white font-heading text-xl">
                      {selectedFeature.title}
                    </CardTitle>
                    <p className="text-blue-300/80 mt-1">
                      {selectedFeature.description}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setSelectedComponent(null)}
                  className="border-slate-600/50 text-slate-300 hover:bg-slate-700/50"
                >
                  Close Preview
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/50">
                {selectedFeature.component}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="text-center pt-8 border-t border-slate-700/50">
          <div className="inline-flex items-center gap-2 text-slate-400 text-sm">
            <FlaskConical className="w-4 h-4" />
            These experimental features are prototypes and may be subject to changes
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experimental;
