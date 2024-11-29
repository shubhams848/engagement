// FeedbackContext.tsx - Manages feedback and appreciation data and operations
import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { FeedbackItem, User } from '../types';
import { useAuth } from './AuthContext';

interface FeedbackContextType {
  feedbacks: FeedbackItem[];
  addFeedback: (feedback: Omit<FeedbackItem, 'id' | 'timestamp' | 'sentiment'>) => void;
  getUserFeedbacks: (userId: string) => {
    given: FeedbackItem[];
    received: FeedbackItem[];
  };
  getUserStats: (userId: string) => {
    feedbackGiven: number;
    feedbackReceived: number;
    appreciationsGiven: number;
    appreciationsReceived: number;
    engagementScore: number;
  };
  getTeamStats: (managerId: string) => {
    totalFeedbacks: number;
    totalAppreciations: number;
    engagementScore: number;
    memberStats: Record<string, {
      given: number;
      received: number;
    }>;
  };
  getOrganizationStats: () => {
    totalFeedbacks: number;
    totalAppreciations: number;
    averageEngagement: number;
    departmentStats: Record<string, {
      feedbacks: number;
      appreciations: number;
      engagement: number;
    }>;
  };
}

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);

// Simple sentiment analysis based on keywords
const analyzeSentiment = (message: string): 'positive' | 'neutral' | 'negative' => {
  const positiveWords = ['great', 'excellent', 'good', 'amazing', 'wonderful', 'fantastic', 'helpful'];
  const negativeWords = ['poor', 'bad', 'terrible', 'unhelpful', 'disappointing', 'needs improvement'];
  
  const words = message.toLowerCase().split(' ');
  const positiveCount = words.filter(word => positiveWords.includes(word)).length;
  const negativeCount = words.filter(word => negativeWords.includes(word)).length;
  
  if (positiveCount > negativeCount) return 'positive';
  if (negativeCount > positiveCount) return 'negative';
  return 'neutral';
};

export const FeedbackProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize feedback state from localStorage if available
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>(() => {
    const storedFeedbacks = localStorage.getItem('feedbacks');
    return storedFeedbacks ? JSON.parse(storedFeedbacks) : [];
  });

  // Add new feedback with sentiment analysis
  const addFeedback = useCallback((feedback: Omit<FeedbackItem, 'id' | 'timestamp' | 'sentiment'>) => {
    const sentiment = analyzeSentiment(feedback.message);
    const newFeedback: FeedbackItem = {
      ...feedback,
      id: `feedback-${Date.now()}`,
      timestamp: new Date().toISOString(),
      sentiment,
    };

    setFeedbacks(prev => {
      const updated = [...prev, newFeedback];
      localStorage.setItem('feedbacks', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Get user-specific feedbacks
  const getUserFeedbacks = useCallback((userId: string) => {
    const given = feedbacks.filter(f => f.senderId === userId);
    const received = feedbacks.filter(f => f.recipientId === userId);
    return { given, received };
  }, [feedbacks]);

  // Calculate user statistics
  const getUserStats = useCallback((userId: string) => {
    const { given, received } = getUserFeedbacks(userId);
    const feedbackGiven = given.filter(f => f.type === 'feedback').length;
    const feedbackReceived = received.filter(f => f.type === 'feedback').length;
    const appreciationsGiven = given.filter(f => f.type === 'appreciation').length;
    const appreciationsReceived = received.filter(f => f.type === 'appreciation').length;
    
    // Calculate engagement score based on activity
    const engagementScore = Math.min(
      100,
      Math.round(
        ((feedbackGiven + appreciationsGiven) * 10 +
          (feedbackReceived + appreciationsReceived) * 5) / 2
      )
    );

    return {
      feedbackGiven,
      feedbackReceived,
      appreciationsGiven,
      appreciationsReceived,
      engagementScore,
    };
  }, [getUserFeedbacks]);

  // Calculate team statistics
  const getTeamStats = useCallback((managerId: string) => {
    const teamFeedbacks = feedbacks.filter(f => 
      f.senderId === managerId || f.recipientId === managerId
    );

    const totalFeedbacks = teamFeedbacks.filter(f => f.type === 'feedback').length;
    const totalAppreciations = teamFeedbacks.filter(f => f.type === 'appreciation').length;
    
    // Calculate member-specific stats
    const memberStats: Record<string, { given: number; received: number }> = {};
    teamFeedbacks.forEach(f => {
      if (!memberStats[f.senderId]) {
        memberStats[f.senderId] = { given: 0, received: 0 };
      }
      if (!memberStats[f.recipientId]) {
        memberStats[f.recipientId] = { given: 0, received: 0 };
      }
      memberStats[f.senderId].given++;
      memberStats[f.recipientId].received++;
    });

    const engagementScore = Math.min(
      100,
      Math.round((totalFeedbacks + totalAppreciations * 2) / Object.keys(memberStats).length)
    );

    return {
      totalFeedbacks,
      totalAppreciations,
      engagementScore,
      memberStats,
    };
  }, [feedbacks]);

  // Calculate organization-wide statistics
  const getOrganizationStats = useCallback(() => {
    const totalFeedbacks = feedbacks.filter(f => f.type === 'feedback').length;
    const totalAppreciations = feedbacks.filter(f => f.type === 'appreciation').length;
    
    // Initialize department stats
    const departmentStats: Record<string, {
      feedbacks: number;
      appreciations: number;
      engagement: number;
    }> = {
      Engineering: { feedbacks: 0, appreciations: 0, engagement: 0 },
      Marketing: { feedbacks: 0, appreciations: 0, engagement: 0 },
      Sales: { feedbacks: 0, appreciations: 0, engagement: 0 },
      HR: { feedbacks: 0, appreciations: 0, engagement: 0 },
    };

    // Distribute feedbacks across departments (mock implementation)
    feedbacks.forEach(f => {
      const departments = Object.keys(departmentStats);
      const department = departments[Math.floor(Math.random() * departments.length)];
      if (f.type === 'feedback') {
        departmentStats[department].feedbacks++;
      } else {
        departmentStats[department].appreciations++;
      }
    });

    // Calculate engagement scores for each department
    Object.keys(departmentStats).forEach(dept => {
      departmentStats[dept].engagement = Math.min(
        100,
        Math.round(
          (departmentStats[dept].feedbacks + departmentStats[dept].appreciations * 2) / 2
        )
      );
    });

    // Calculate average engagement across departments
    const averageEngagement = Math.round(
      Object.values(departmentStats).reduce((acc, curr) => acc + curr.engagement, 0) /
      Object.keys(departmentStats).length
    );

    return {
      totalFeedbacks,
      totalAppreciations,
      averageEngagement,
      departmentStats,
    };
  }, [feedbacks]);

  const value = useMemo(() => ({
    feedbacks,
    addFeedback,
    getUserFeedbacks,
    getUserStats,
    getTeamStats,
    getOrganizationStats,
  }), [feedbacks, addFeedback, getUserFeedbacks, getUserStats, getTeamStats, getOrganizationStats]);

  return (
    <FeedbackContext.Provider value={value}>
      {children}
    </FeedbackContext.Provider>
  );
};

// Custom hook for using feedback context
export const useFeedback = () => {
  const context = useContext(FeedbackContext);
  if (context === undefined) {
    throw new Error('useFeedback must be used within a FeedbackProvider');
  }
  return context;
};