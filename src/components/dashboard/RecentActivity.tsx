
import React from 'react';
import { UserPlus, Edit, Trash2, Clock } from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  salary: number;
  startDate: string;
  status: 'active' | 'inactive';
}

interface RecentActivityProps {
  employees: Employee[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ employees }) => {
  // Generate some mock recent activities
  const getRecentActivity = () => {
    const activities = [];
    
    // Recent hires (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentHires = employees
      .filter(emp => new Date(emp.startDate) > thirtyDaysAgo)
      .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
      .slice(0, 3);

    recentHires.forEach(emp => {
      activities.push({
        id: `hire-${emp.id}`,
        type: 'hire',
        message: `${emp.name} joined as ${emp.position}`,
        time: emp.startDate,
        icon: UserPlus,
        color: 'text-green-400'
      });
    });

    // Add some mock edit activities
    const mockEdits = [
      { name: 'Sarah Johnson', action: 'salary updated', time: '2024-01-10' },
      { name: 'Mike Davis', action: 'department changed', time: '2024-01-08' }
    ];

    mockEdits.forEach((edit, index) => {
      activities.push({
        id: `edit-${index}`,
        type: 'edit',
        message: `${edit.name} - ${edit.action}`,
        time: edit.time,
        icon: Edit,
        color: 'text-blue-400'
      });
    });

    return activities
      .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
      .slice(0, 5);
  };

  const activities = getRecentActivity();

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return `${Math.floor(diffInDays / 30)} months ago`;
  };

  return (
    <div className="bg-[#141a2e]/80 border border-blue-950 rounded-xl p-6">
      <h3 className="text-xl font-bold text-blue-100 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.length > 0 ? (
          activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-blue-950/20 transition-colors">
              <div className="bg-blue-950/30 p-2 rounded-lg">
                <activity.icon className={`w-4 h-4 ${activity.color}`} />
              </div>
              <div className="flex-1">
                <p className="text-blue-100 text-sm font-medium">{activity.message}</p>
                <p className="text-blue-300/70 text-xs mt-1 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatTimeAgo(activity.time)}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-blue-300/70 text-sm text-center py-8">No recent activity</p>
        )}
      </div>
    </div>
  );
};

export default RecentActivity;
