// types/index.ts - Type definitions for the application
export type UserRole = 'user' | 'manager' | 'admin';

export type ConsiderCategory = 
  | 'Skill Development'
  | 'Communication'
  | 'Time Management'
  | 'Quality of Work'
  | 'Innovation and Initiative'
  | 'Team Collaboration'
  | 'Leadership'
  | 'Customer-Centricity'
  | 'Compliance and Ethics'
  | 'Adaptability';

export type ContinueCategory =
  | 'Team Contributions'
  | 'Outstanding Performance'
  | 'Creativity and Innovation'
  | 'Leadership Excellence'
  | 'Commitment and Dedication'
  | 'Customer Impact'
  | 'Learning and Growth'
  | 'Workplace Values';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  managerId?: string;
  teamId?: string;
  avatarUrl?: string;
}

export interface FeedbackItem {
  id: string;
  type: 'consider' | 'continue';
  category: ConsiderCategory | ContinueCategory;
  senderId: string;
  recipientId: string;
  message: string;
  timestamp: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
}

export interface UserStats {
  considerGiven: number;
  considerReceived: number;
  continueGiven: number;
  continueReceived: number;
  engagementScore: number;
}