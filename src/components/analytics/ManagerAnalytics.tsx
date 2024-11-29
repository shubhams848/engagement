import React from 'react';
import EngagementChart from './EngagementChart';
import { User } from '../../types';
import StatCard from './StatCard';
import { Users, MessageSquare, Award } from 'lucide-react';
import { useUsers } from '../../contexts/UsersContext';

interface ManagerAnalyticsProps {
  managerId: string;
}

const ManagerAnalytics: React.FC<ManagerAnalyticsProps> = ({ managerId }) => {
  const { users } = useUsers();
  const teamMembers = users.filter(user => user.managerId === managerId);

  const teamEngagementData = {
    labels: teamMembers.map(member => member.name),
    datasets: [
      {
        label: 'Feedback Given',
        data: teamMembers.map(() => Math.floor(Math.random() * 20) + 5),
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
      },
      {
        label: 'Appreciations Received',
        data: teamMembers.map(() => Math.floor(Math.random() * 20) + 5),
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
      },
    ],
  };

  const teamTrendsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Team Engagement Score',
        data: [75, 78, 80, 82, 85, 88],
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={<Users className="h-6 w-6 text-indigo-600" />}
          label="Team Members"
          value={teamMembers.length}
        />
        <StatCard
          icon={<MessageSquare className="h-6 w-6 text-indigo-600" />}
          label="Team Feedback Rate"
          value="85%"
          trend={{ value: 10, label: 'vs last month' }}
        />
        <StatCard
          icon={<Award className="h-6 w-6 text-indigo-600" />}
          label="Team Appreciation Rate"
          value="92%"
          trend={{ value: 15, label: 'vs last month' }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EngagementChart
          type="bar"
          data={teamEngagementData}
          title="Team Member Activity"
        />
        <EngagementChart
          type="line"
          data={teamTrendsData}
          title="Team Engagement Trends"
        />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Team Members</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teamMembers.map((member) => (
            <div key={member.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <img
                src={member.avatarUrl}
                alt={member.name}
                className="h-10 w-10 rounded-full"
              />
              <div>
                <p className="font-medium text-gray-900">{member.name}</p>
                <p className="text-sm text-gray-500">{member.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManagerAnalytics;