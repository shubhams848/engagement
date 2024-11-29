import React from 'react';
import { useUsers } from '../contexts/UsersContext';
import { User } from '../types';

const TeamMemberCard: React.FC<{ user: User }> = ({ user }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
    <div className="flex items-center space-x-4">
      <img
        src={user.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`}
        alt={user.name}
        className="w-12 h-12 rounded-full"
      />
      <div>
        <h3 className="text-lg font-medium text-gray-900">{user.name}</h3>
        <p className="text-sm text-gray-500">{user.email}</p>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 mt-1">
          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
        </span>
      </div>
    </div>
  </div>
);

const Team: React.FC = () => {
  const { users } = useUsers();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Team Members</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <TeamMemberCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Team;