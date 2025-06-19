import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  FileText, 
  CreditCard, 
  Shield, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  Upload,
  Camera,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building,
  Users,
  Briefcase,
  Star,
  Clock,
  AlertCircle
} from 'lucide-react';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  status: 'pending' | 'current' | 'completed';
  estimatedTime: string;
}

export const ModernOnboardingWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    personalInfo: {},
    documents: {},
    benefits: {},
    security: {}
  });

  const steps: OnboardingStep[] = [
    {
      id: 'personal',
      title: 'Personal Information',
      description: 'Basic details and contact information',
      icon: User,
      status: currentStep === 0 ? 'current' : currentStep > 0 ? 'completed' : 'pending',
      estimatedTime: '5 min'
    },
    {
      id: 'documents',
      title: 'Document Upload',
      description: 'Required documents and verification',
      icon: FileText,
      status: currentStep === 1 ? 'current' : currentStep > 1 ? 'completed' : 'pending',
      estimatedTime: '10 min'
    },
    {
      id: 'benefits',
      title: 'Benefits Selection',
      description: 'Choose your benefits package',
      icon: CreditCard,
      status: currentStep === 2 ? 'current' : currentStep > 2 ? 'completed' : 'pending',
      estimatedTime: '15 min'
    },
    {
      id: 'security',
      title: 'Security Setup',
      description: 'Account security and access',
      icon: Shield,
      status: currentStep === 3 ? 'current' : currentStep > 3 ? 'completed' : 'pending',
      estimatedTime: '5 min'
    }
  ];

  const totalSteps = steps.length;
  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepIndex: number) => {
    if (stepIndex <= currentStep) {
      setCurrentStep(stepIndex);
    }
  };

  const getStepIcon = (step: OnboardingStep, index: number) => {
    const IconComponent = step.icon;
    
    if (step.status === 'completed') {
      return <CheckCircle className="w-6 h-6 text-green-400" />;
    } else if (step.status === 'current') {
      return <IconComponent className="w-6 h-6 text-blue-400" />;
    } else {
      return <IconComponent className="w-6 h-6 text-slate-500" />;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Welcome to the Team!</h2>
              <p className="text-slate-400">Let's get your profile set up</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="firstName" className="text-white">First Name</Label>
                  <Input id="firstName" className="bg-slate-800/50 border-slate-700 text-white mt-1" />
                </div>
                <div>
                  <Label htmlFor="email" className="text-white">Email Address</Label>
                  <Input id="email" type="email" className="bg-slate-800/50 border-slate-700 text-white mt-1" />
                </div>
                <div>
                  <Label htmlFor="address" className="text-white">Address</Label>
                  <Input id="address" className="bg-slate-800/50 border-slate-700 text-white mt-1" />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="lastName" className="text-white">Last Name</Label>
                  <Input id="lastName" className="bg-slate-800/50 border-slate-700 text-white mt-1" />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-white">Phone Number</Label>
                  <Input id="phone" className="bg-slate-800/50 border-slate-700 text-white mt-1" />
                </div>
                <div>
                  <Label htmlFor="startDate" className="text-white">Start Date</Label>
                  <Input id="startDate" type="date" className="bg-slate-800/50 border-slate-700 text-white mt-1" />
                </div>
              </div>
            </div>

            {/* Profile Photo Upload */}
            <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center">
              <Camera className="w-12 h-12 text-slate-500 mx-auto mb-4" />
              <h3 className="text-white font-medium mb-2">Upload Profile Photo</h3>
              <p className="text-slate-400 text-sm mb-4">JPG, PNG or GIF (max 5MB)</p>
              <Button variant="outline" className="border-blue-500/30 text-blue-300">
                <Upload className="w-4 h-4 mr-2" />
                Choose File
              </Button>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Document Verification</h2>
              <p className="text-slate-400">Upload required documents for verification</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: 'Government ID', description: 'Driver\'s license or passport', required: true },
                { title: 'Social Security Card', description: 'For tax purposes', required: true },
                { title: 'Bank Information', description: 'For direct deposit setup', required: true },
                { title: 'Emergency Contact', description: 'Contact information form', required: false }
              ].map((doc, index) => (
                <Card key={index} className="bg-slate-800/50 border-slate-700/50">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-white font-medium">{doc.title}</h3>
                        <p className="text-slate-400 text-sm">{doc.description}</p>
                      </div>
                      {doc.required && (
                        <Badge variant="destructive" className="text-xs">Required</Badge>
                      )}
                    </div>
                    <div className="border-2 border-dashed border-slate-600 rounded-lg p-4 text-center">
                      <Upload className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                      <Button variant="outline" size="sm" className="border-blue-500/30 text-blue-300">
                        Upload File
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Benefits Selection</h2>
              <p className="text-slate-400">Choose your benefits package</p>
            </div>

            <div className="space-y-6">
              {[
                {
                  title: 'Health Insurance',
                  options: ['Basic Plan ($50/month)', 'Premium Plan ($120/month)', 'Family Plan ($200/month)'],
                  selected: 0
                },
                {
                  title: '401(k) Retirement',
                  options: ['3% match', '5% match', '7% match'],
                  selected: 1
                },
                {
                  title: 'Dental Coverage',
                  options: ['Basic ($15/month)', 'Premium ($30/month)', 'No coverage'],
                  selected: 0
                }
              ].map((benefit, index) => (
                <Card key={index} className="bg-slate-800/50 border-slate-700/50">
                  <CardHeader>
                    <CardTitle className="text-white">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {benefit.options.map((option, optionIndex) => (
                        <label key={optionIndex} className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name={`benefit-${index}`}
                            defaultChecked={optionIndex === benefit.selected}
                            className="text-blue-600"
                          />
                          <span className="text-white">{option}</span>
                        </label>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Security Setup</h2>
              <p className="text-slate-400">Secure your account and set up access</p>
            </div>

            <div className="space-y-6">
              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Create Password</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="password" className="text-white">Password</Label>
                    <Input id="password" type="password" className="bg-slate-800/50 border-slate-700 text-white mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
                    <Input id="confirmPassword" type="password" className="bg-slate-800/50 border-slate-700 text-white mt-1" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Two-Factor Authentication</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-3">
                    <input type="checkbox" className="text-blue-600" />
                    <span className="text-white">Enable 2FA for enhanced security</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Employee Onboarding</h1>
          <p className="text-slate-400">Complete your setup to get started</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-white font-medium">Step {currentStep + 1} of {totalSteps}</span>
            <span className="text-slate-400">{Math.round(progressPercentage)}% Complete</span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
        </div>

        {/* Step Navigation */}
        <div className="flex justify-between mb-8">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex-1 cursor-pointer ${index < steps.length - 1 ? 'mr-4' : ''}`}
              onClick={() => handleStepClick(index)}
            >
              <div className={`
                p-4 rounded-lg border-2 transition-all duration-300
                ${step.status === 'current' 
                  ? 'border-blue-500 bg-blue-500/10' 
                  : step.status === 'completed'
                  ? 'border-green-500 bg-green-500/10'
                  : 'border-slate-700 bg-slate-800/30 hover:border-slate-600'
                }
              `}>
                <div className="flex items-center gap-3 mb-2">
                  {getStepIcon(step, index)}
                  <div className="flex-1">
                    <h3 className={`font-medium ${
                      step.status === 'current' ? 'text-blue-300' :
                      step.status === 'completed' ? 'text-green-300' : 'text-slate-400'
                    }`}>
                      {step.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Clock className="w-3 h-3" />
                    {step.estimatedTime}
                  </div>
                </div>
                <p className="text-sm text-slate-400">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <Card className="bg-slate-800/50 border-slate-700/50 mb-8">
          <CardContent className="p-8">
            {renderStepContent()}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <div className="flex gap-3">
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
              Save Draft
            </Button>
            <Button
              onClick={handleNext}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {currentStep === totalSteps - 1 ? 'Complete Setup' : 'Continue'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 text-slate-400 text-sm">
            <AlertCircle className="w-4 h-4" />
            Need help? Contact HR at hr@company.com or call (555) 123-4567
          </div>
        </div>
      </div>
    </div>
  );
};