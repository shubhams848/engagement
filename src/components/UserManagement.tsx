import React from 'react';
import { useUsers } from '../contexts/UsersContext';
import { useAuth } from '../contexts/AuthContext';
import { Trash2, Shield, UserCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const UserManagement: React.FC = () => {
  const { users, deleteUser } = useUsers();
  const { user: currentUser } = useAuth();

  const handleDeleteUser = (userId: string, userRole: string) => {
    if (userId === currentUser?.id) {
      toast.error('You cannot delete your own account');
      return;
    }

    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(userId);
      toast.success('User deleted successfully');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">User Management</h3>
        <p className="mt-1 text-sm text-gray-500">Manage all users in the system</p>
      </div>
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          {users.map((user) => (
            <li key={user.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={user.avatarUrl}
                    alt={user.name}
                  />
                  <div className="ml-4">
                    <div className="flex items-center">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      {user.role === 'admin' && (
                        <Shield className="ml-2 h-4 w-4 text-indigo-600" />
                      )}
                      {user.role === 'manager' && (
                        <UserCircle className="ml-2 h-4 w-4 text-blue-600" />
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${user.role === 'admin' ? 'bg-indigo-100 text-indigo-800' : 
                      user.role === 'manager' ? 'bg-blue-100 text-blue-800' : 
                      'bg-green-100 text-green-800'}`}>
                    {user.role}
                  </span>
                  {currentUser?.role === 'admin' && user.id !== currentUser.id && (
                    <button
                      onClick={() => handleDeleteUser(user.id, user.role)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserManagement;