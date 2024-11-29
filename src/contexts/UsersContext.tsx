// UsersContext.tsx - Manages user data and operations
import React, { createContext, useContext, useState } from 'react';
import { User } from '../types';
import toast from 'react-hot-toast';

interface UsersContextType {
  users: User[];
  addUser: (user: User) => void;
  deleteUser: (userId: string) => void;
  getUser: (id: string) => User | undefined;
  getAllUsers: () => User[];
}

const UsersContext = createContext<UsersContextType | undefined>(undefined);

// Helper function to generate avatar URL
const getAvatarUrl = (name: string) => {
  // Using DiceBear API for consistent, name-based avatars
  // Options: initials style, light background, larger size for better quality
  return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=eef2ff&chars=2&size=128`;
};

// Initial users with personalized avatars
const initialUsers: User[] = [
  {
    id: '1',
    name: 'Naved',
    email: 'naved@example.com',
    role: 'admin',
    avatarUrl: getAvatarUrl('Naved')
  },
  {
    id: '2',
    name: 'Hemant',
    email: 'hemant@example.com',
    role: 'manager',
    avatarUrl: getAvatarUrl('Hemant')
  },
  {
    id: '3',
    name: 'Shubham',
    email: 'shubham@example.com',
    role: 'manager',
    avatarUrl: getAvatarUrl('Shubham')
  },
  {
    id: '4',
    name: 'Demo User',
    email: 'demo@example.com',
    role: 'user',
    managerId: '2', // Assigned to Hemant
    avatarUrl: getAvatarUrl('Demo User')
  }
];

export const UsersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize users from localStorage or use initial mock data
  const [users, setUsers] = useState<User[]>(() => {
    const storedUsers = localStorage.getItem('users');
    return storedUsers ? JSON.parse(storedUsers) : initialUsers;
  });

  // Add new user with generated avatar
  const addUser = (user: User) => {
    setUsers(prevUsers => {
      const userWithAvatar = {
        ...user,
        avatarUrl: user.avatarUrl || getAvatarUrl(user.name)
      };
      const updated = [...prevUsers, userWithAvatar];
      localStorage.setItem('users', JSON.stringify(updated));
      return updated;
    });
  };

  // Delete user with role validation
  const deleteUser = (userId: string) => {
    setUsers(prevUsers => {
      const userToDelete = prevUsers.find(u => u.id === userId);
      if (userToDelete?.role === 'admin') {
        const adminCount = prevUsers.filter(u => u.role === 'admin').length;
        if (adminCount <= 1) {
          toast.error('Cannot delete the last admin user');
          return prevUsers;
        }
      }
      const updated = prevUsers.filter(user => user.id !== userId);
      localStorage.setItem('users', JSON.stringify(updated));
      return updated;
    });
  };

  // Get single user by ID
  const getUser = (id: string) => {
    return users.find(user => user.id === id);
  };

  // Get all users
  const getAllUsers = () => {
    return users;
  };

  return (
    <UsersContext.Provider value={{ users, addUser, deleteUser, getUser, getAllUsers }}>
      {children}
    </UsersContext.Provider>
  );
};

// Custom hook for using users context
export const useUsers = () => {
  const context = useContext(UsersContext);
  if (context === undefined) {
    throw new Error('useUsers must be used within a UsersProvider');
  }
  return context;
};