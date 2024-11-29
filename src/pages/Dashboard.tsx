import React, { useMemo } from 'react';
import { Award, MessageSquare, TrendingUp, Users } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useUsers } from '../contexts/UsersContext';
import { useFeedback } from '../contexts/FeedbackContext';
import StatCard from '../components/analytics/StatCard';
import FeedbackList from '../components/dashboard/FeedbackList';

const UserDashboard: React.FC<{ userId: string }> = ({ userId }) => {
  const { getUserStats, getUserFeedbacks } = useFeedback();
  const stats = getUserStats(userId);
  const { given, received } = getUserFeedbacks(userId);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={<MessageSquare className="h-6 w-6 text-indigo-600" />}
          label="Feedback Given/Received"
          value={`${stats.feedbackGiven}/${stats.feedbackReceived}`}
        />
        <StatCard
          icon={<Award className="h-6 w-6 text-indigo-600" />}
          label="Appreciations Given/Received"
          value={`${stats.appreciationsGiven}/${stats.appreciationsReceived}`}
        />
        <StatCard
          icon={<TrendingUp className="h-6 w-6 text-indigo-600" />}
          label="Engagement Score"
          value={`${Math.round((stats.feedbackGiven + stats.appreciationsGiven) * 10)}%`}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Given Feedback</h2>
          <FeedbackList items={given} type="given" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Received Feedback</h2>
          <FeedbackList items={received} type="received" />
        </div>
      </div>
    </div>
  );
};

const AdminDashboard: React.FC = () => {
  const { users } = useUsers();
  const { feedbacks } = useFeedback();
  
  const stats = useMemo(() => ({
    totalUsers: users.length,
    totalFeedbacks: feedbacks.length,
    activeUsers: users.filter(u => 
      feedbacks.some(f => f.senderId === u.id || f.recipientId === u.id)
    ).length,
  }), [users, feedbacks]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={<Users className="h-6 w-6 text-indigo-600" />}
          label="Total Users"
          value={stats.totalUsers}
        />
        <StatCard
          icon={<MessageSquare className="h-6 w-6 text-indigo-600" />}
          label="Total Feedbacks"
          value={stats.totalFeedbacks}
        />
        <StatCard
          icon={<TrendingUp className="h-6 w-6 text-indigo-600" />}
          label="Active Users"
          value={`${Math.round((stats.activeUsers / stats.totalUsers) * 100)}%`}
        />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <FeedbackList 
          items={feedbacks.slice(-5).reverse()} 
          type="received"
        />
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          {user.role === 'admin' ? 'Admin Dashboard' : 'My Dashboard'}
        </h1>
      </div>

      {user.role === 'admin' ? (
        <AdminDashboard />
      ) : (
        <UserDashboard userId={user.id} />
      )}
    </div>
  );
};

export default Dashboard;