import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import UserAnalytics from '../components/analytics/UserAnalytics';
import ManagerAnalytics from '../components/analytics/ManagerAnalytics';
import AdminAnalytics from '../components/analytics/AdminAnalytics';

const Analytics: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">
        {user.role === 'admin' 
          ? 'Organization Analytics' 
          : user.role === 'manager'
          ? 'Team Analytics'
          : 'Personal Analytics'}
      </h1>

      {user.role === 'admin' ? (
        <AdminAnalytics />
      ) : user.role === 'manager' ? (
        <ManagerAnalytics managerId={user.id} />
      ) : (
        <UserAnalytics user={user} />
      )}
    </div>
  );
};

export default Analytics;