// AuthContext.tsx - Manages user authentication state and operations
import React, { createContext, useContext, useState, useCallback } from 'react';
import { User } from '../types';
import { useUsers } from './UsersContext';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, userData: Omit<User, 'id'>) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State to track the currently authenticated user
  const [user, setUser] = useState<User | null>(() => {
    // Initialize user from localStorage if available
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  
  const { users, addUser } = useUsers();

  // Handle user login
  const login = useCallback(async (email: string, password: string) => {
    const foundUser = users.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
    } else {
      throw new Error('Invalid credentials');
    }
  }, [users]);

  // Handle user signup
  const signup = useCallback(async (email: string, password: string, userData: Omit<User, 'id'>) => {
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      throw new Error('Email already exists');
    }

    // Create new user with unique ID
    const newUser: User = {
      id: `user-${Date.now()}`,
      ...userData,
      email,
    };

    // Add user to the system and set as current user
    addUser(newUser);
    setUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
  }, [users, addUser]);

  // Handle user logout
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('currentUser');
  }, []);

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      signup, 
      logout, 
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};