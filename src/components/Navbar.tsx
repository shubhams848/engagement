import React from 'react';
import { Link } from 'react-router-dom';
import { Users, MessageSquare, Bell, UserCircle, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <Users className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">
                EngagePro
              </span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-indigo-600 rounded-full hover:bg-gray-100">
              <MessageSquare className="h-6 w-6" />
            </button>
            <button className="p-2 text-gray-600 hover:text-indigo-600 rounded-full hover:bg-gray-100">
              <Bell className="h-6 w-6" />
            </button>
            <div className="relative group">
              <button className="flex items-center space-x-2 p-2 text-gray-600 hover:text-indigo-600 rounded-full hover:bg-gray-100">
                {user?.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="h-6 w-6 rounded-full"
                  />
                ) : (
                  <UserCircle className="h-6 w-6" />
                )}
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
                <button
                  onClick={logout}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;