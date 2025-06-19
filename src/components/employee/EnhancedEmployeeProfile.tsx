import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Trophy, 
  Target,
  TrendingUp,
  Clock,
  Award,
  BookOpen,
  MessageSquare,
  Edit3,
  Camera,
  Star,
  ChevronRight,
  Activity
} from 'lucide-react';

interface EnhancedEmployeeProfileProps {
  employee: {
    id: string;
    name: string;
    email: string;
    position: string;
    department: string;
    salary: number;
    startDate: string;
    status: string;
    avatar?: string;
    phone?: string;
    address?: string;
  };
}

export const EnhancedEmployeeProfile: React.FC<EnhancedEmployeeProfileProps> = ({ employee }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);

  // Mock data for enhanced profile
  const performanceData = {
    currentRating: 4.2,
    goals: [
      { title: 'Complete React Certification', progress: 75, dueDate: '2024-06-30' },
      { title: 'Lead Team Project', progress: 60, dueDate: '2024-05-15' },
      { title: 'Improve Code Quality', progress: 90, dueDate: '2024-04-30' }
    ],
    achievements: [
      { title: 'Employee of the Month', date: '2024-03-01', type: 'recognition' },
      { title: 'React Certification', date: '2024-02-15', type: 'skill' },
      { title: '5 Years Service', date: '2024-01-15', type: 'milestone' }
    ],
    skills: [
      { name: 'React', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'Node.js', level: 80 },
      { name: 'Team Leadership', level: 75 }
    ]
  };

  const timelineData = [
    { date: '2024-03-01', event: 'Promoted to Senior Developer', type: 'promotion' },
    { date: '2024-01-15', event: '5 Year Anniversary', type: 'milestone' },
    { date: '2023-12-01', event: 'Completed Leadership Training', type: 'training' },
    { date: '2023-06-01', event: 'Salary Review - 8% increase', type: 'compensation' }
  ];

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'promotion': return <TrendingUp className="w-4 h-4 text-green-400" />;
      case 'milestone': return <Award className="w-4 h-4 text-blue-400" />;
      case 'training': return <BookOpen className="w-4 h-4 text-purple-400" />;
      case 'compensation': return <DollarSign className="w-4 h-4 text-yellow-400" />;
      default: return <Activity className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Section */}
      <Card className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 border-slate-700/50">
        <CardContent className="p-8">
          <div className="flex items-start gap-6">
            {/* Avatar Section */}
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                {employee.avatar ? (
                  <img src={employee.avatar} alt={employee.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  getInitials(employee.name)
                )}
              </div>
              <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Basic Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-white">{employee.name}</h1>
                <Badge className={`${employee.status === 'active' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                  {employee.status}
                </Badge>
              </div>
              <p className="text-xl text-blue-300 mb-4">{employee.position}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-slate-300">
                  <Mail className="w-4 h-4 text-blue-400" />
                  {employee.email}
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Phone className="w-4 h-4 text-green-400" />
                  {employee.phone || '+1 (555) 123-4567'}
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Calendar className="w-4 h-4 text-purple-400" />
                  Started {new Date(employee.startDate).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <DollarSign className="w-4 h-4 text-yellow-400" />
                  ${employee.salary.toLocaleString()} annually
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
                className="border-blue-500/30 text-blue-300 hover:bg-blue-500/10"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
              <Button variant="outline" size="sm" className="border-green-500/30 text-green-300 hover:bg-green-500/10">
                <MessageSquare className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabbed Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 border-slate-700/50">
          <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-300">
            Overview
          </TabsTrigger>
          <TabsTrigger value="performance" className="data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-300">
            Performance
          </TabsTrigger>
          <TabsTrigger value="timeline" className="data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-300">
            Timeline
          </TabsTrigger>
          <TabsTrigger value="documents" className="data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-300">
            Documents
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Performance Summary */}
            <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  Performance Rating
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-400 mb-2">
                    {performanceData.currentRating}
                  </div>
                  <div className="text-sm text-slate-400 mb-4">out of 5.0</div>
                  <div className="flex justify-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${
                          star <= performanceData.currentRating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-slate-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Goals */}
            <Card className="lg:col-span-2 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-400" />
                  Current Goals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {performanceData.goals.map((goal, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium">{goal.title}</span>
                      <span className="text-sm text-slate-400">Due: {goal.dueDate}</span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                    <div className="text-right text-sm text-blue-300">{goal.progress}% complete</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Skills & Achievements */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Skills */}
            <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-purple-400" />
                  Skills & Competencies
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {performanceData.skills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-white">{skill.name}</span>
                      <span className="text-blue-300">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {performanceData.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-medium">{achievement.title}</div>
                      <div className="text-sm text-slate-400">{achievement.date}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <div className="text-white">
            <h3 className="text-xl font-bold mb-4">Performance Analytics</h3>
            <p className="text-slate-400">Detailed performance metrics and analytics would be displayed here.</p>
          </div>
        </TabsContent>

        {/* Timeline Tab */}
        <TabsContent value="timeline" className="space-y-6">
          <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-400" />
                Employee Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timelineData.map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors">
                    <div className="flex-shrink-0 w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center">
                      {getEventIcon(item.type)}
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-medium">{item.event}</div>
                      <div className="text-sm text-slate-400">{item.date}</div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-500" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-6">
          <div className="text-white">
            <h3 className="text-xl font-bold mb-4">Documents & Files</h3>
            <p className="text-slate-400">Employee documents and file management would be displayed here.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};