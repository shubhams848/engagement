import React from 'react';
import EngagementChart from './EngagementChart';
import { useUsers } from '../../contexts/UsersContext';
import StatCard from './StatCard';
import { Users, MessageSquare, Award, TrendingUp } from 'lucide-react';

const AdminAnalytics: React.FC = () => {
  const { users } = useUsers();
  
  const stats = {
    totalUsers: users.length,
    managers: users.filter(u => u.role === 'manager').length,
    admins: users.filter(u => u.role === 'admin').length,
    activeUsers: Math.floor(users.length * 0.85), // Mock active users (85%)
  };

  const organizationData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Overall Engagement',
        data: [70, 75, 78, 80, 85, 88],
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
      },
    ],
  };

  const departmentData = {
    labels: ['Engineering', 'Marketing', 'Sales', 'HR', 'Product'],
    datasets: [
      {
        label: 'Department Engagement',
        data: [88, 82, 85, 90, 86],
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<Users className="h-6 w-6 text-indigo-600" />}
          label="Total Users"
          value={stats.totalUsers}
          trend={{ value: 15.5, label: 'vs last month' }}
        />
        <StatCard
          icon={<Users className="h-6 w-6 text-indigo-600" />}
          label="Managers"
          value={stats.managers}
        />
        <StatCard
          icon={<Users className="h-6 w-6 text-indigo-600" />}
          label="Admins"
          value={stats.admins}
        />
        <StatCard
          icon={<TrendingUp className="h-6 w-6 text-indigo-600" />}
          label="Active Users"
          value={`${Math.round((stats.activeUsers / stats.totalUsers) * 100)}%`}
          trend={{ value: 5.1, label: 'vs last month' }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EngagementChart
          type="line"
          data={organizationData}
          title="Organization-wide Engagement"
        />
        <EngagementChart
          type="bar"
          data={departmentData}
          title="Department-wise Engagement"
        />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">User Directory</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        className="h-8 w-8 rounded-full"
                        src={user.avatarUrl}
                        alt={user.name}
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;