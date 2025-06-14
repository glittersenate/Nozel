
import React from 'react';
import { X, Mail, Phone, MapPin, Calendar, DollarSign, Trophy, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Employee } from '@/pages/Employees';
import EmployeeAvatar from '@/components/employees/EmployeeAvatar';

interface EmployeeProfileModalProps {
  employee: Employee | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EmployeeProfileModal: React.FC<EmployeeProfileModalProps> = ({
  employee,
  open,
  onOpenChange
}) => {
  if (!employee) return null;

  const mockPerformanceData = {
    rating: 4.8,
    reviews: 12,
    achievements: ['Top Performer Q3', 'Innovation Award', 'Team Lead'],
    skills: ['React', 'TypeScript', 'Node.js', 'AWS', 'Team Leadership'],
    lastReview: '2024-01-15',
    nextReview: '2024-07-15'
  };

  const formatSalary = (salary: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(salary);
  };

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-green-600/20 text-green-300 border-green-600/30'
      : 'bg-red-600/20 text-red-300 border-red-600/30';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl bg-[#141a2e] border-blue-800/30 text-blue-100 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-100">Employee Profile</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Basic Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Avatar and Basic Info */}
            <div className="text-center">
              <EmployeeAvatar name={employee.name} size="lg" className="mx-auto mb-4 w-24 h-24" />
              <h2 className="text-xl font-bold text-blue-100">{employee.name}</h2>
              <p className="text-blue-300">{employee.position}</p>
              <Badge variant="outline" className={`mt-2 ${getStatusColor(employee.status)}`}>
                {employee.status}
              </Badge>
            </div>

            {/* Contact Info */}
            <div className="bg-[#0e1c38]/50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-100 mb-3">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-blue-200">{employee.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-blue-200">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-blue-200">San Francisco, CA</span>
                </div>
              </div>
            </div>

            {/* Employment Details */}
            <div className="bg-[#0e1c38]/50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-100 mb-3">Employment Details</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-blue-400" />
                  <div>
                    <p className="text-sm text-blue-300">Start Date</p>
                    <p className="text-sm text-blue-100">{new Date(employee.startDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <DollarSign className="w-4 h-4 text-blue-400" />
                  <div>
                    <p className="text-sm text-blue-300">Annual Salary</p>
                    <p className="text-sm text-blue-100 font-semibold">{formatSalary(employee.salary)}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-blue-300">Department</p>
                  <Badge variant="outline" className="mt-1 bg-blue-600/20 text-blue-200 border-blue-600/30">
                    {employee.department}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Performance & Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Performance Overview */}
            <div className="bg-[#0e1c38]/50 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <h3 className="font-semibold text-blue-100">Performance Overview</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-[#141a2e]/60 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-400">{mockPerformanceData.rating}</div>
                  <div className="text-sm text-blue-300">Overall Rating</div>
                </div>
                <div className="text-center p-4 bg-[#141a2e]/60 rounded-lg">
                  <div className="text-2xl font-bold text-blue-400">{mockPerformanceData.reviews}</div>
                  <div className="text-sm text-blue-300">Total Reviews</div>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-blue-200 mb-2">Recent Achievements</h4>
                <div className="flex flex-wrap gap-2">
                  {mockPerformanceData.achievements.map((achievement, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="bg-green-600/20 text-green-300 border-green-600/30"
                    >
                      {achievement}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-blue-300">Last Review:</span>
                  <span className="text-blue-100 ml-2">{new Date(mockPerformanceData.lastReview).toLocaleDateString()}</span>
                </div>
                <div>
                  <span className="text-blue-300">Next Review:</span>
                  <span className="text-blue-100 ml-2">{new Date(mockPerformanceData.nextReview).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Skills & Competencies */}
            <div className="bg-[#0e1c38]/50 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Activity className="w-5 h-5 text-blue-400" />
                <h3 className="font-semibold text-blue-100">Skills & Competencies</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {mockPerformanceData.skills.map((skill, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="bg-purple-600/20 text-purple-300 border-purple-600/30"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-[#0e1c38]/50 rounded-lg p-6">
              <h3 className="font-semibold text-blue-100 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  className="bg-blue-600/20 border-blue-600/30 text-blue-200 hover:bg-blue-600/30"
                >
                  Send Message
                </Button>
                <Button 
                  variant="outline" 
                  className="bg-green-600/20 border-green-600/30 text-green-200 hover:bg-green-600/30"
                >
                  Schedule Review
                </Button>
                <Button 
                  variant="outline" 
                  className="bg-purple-600/20 border-purple-600/30 text-purple-200 hover:bg-purple-600/30"
                >
                  Update Salary
                </Button>
                <Button 
                  variant="outline" 
                  className="bg-orange-600/20 border-orange-600/30 text-orange-200 hover:bg-orange-600/30"
                >
                  View Reports
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeProfileModal;
