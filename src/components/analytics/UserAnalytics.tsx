import React, { useMemo } from 'react';
import EngagementChart from './EngagementChart';
import { User } from '../../types';
import StatCard from './StatCard';
import { MessageSquare, Award, TrendingUp } from 'lucide-react';
import { useFeedback } from '../../contexts/FeedbackContext';

interface UserAnalyticsProps {
  user: User;
}

const UserAnalytics: React.FC<UserAnalyticsProps> = ({ user }) => {
  const { getUserStats, getUserFeedbacks } = useFeedback();
  const stats = getUserStats(user.id);
  const { given, received } = getUserFeedbacks(user.id);

  const personalEngagementData = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const givenByMonth = new Array(6).fill(0);
    const receivedByMonth = new Array(6).fill(0);

    given.forEach(f => {
      const month = new Date(f.timestamp).getMonth();
      if (month < 6) givenByMonth[month]++;
    });

    received.forEach(f => {
      const month = new Date(f.timestamp).getMonth();
      if (month < 6) receivedByMonth[month]++;
    });

    return {
      labels: months,
      datasets: [
        {
          label: 'Given',
          data: givenByMonth,
          borderColor: 'rgb(99, 102, 241)',
          backgroundColor: 'rgba(99, 102, 241, 0.5)',
        },
        {
          label: 'Received',
          data: receivedByMonth,
          borderColor: 'rgb(34, 197, 94)',
          backgroundColor: 'rgba(34, 197, 94, 0.5)',
        },
      ],
    };
  }, [given, received]);

  const sentimentData = useMemo(() => {
    const allFeedback = [...given, ...received];
    const sentiments = {
      positive: allFeedback.filter(f => f.sentiment === 'positive').length,
      neutral: allFeedback.filter(f => f.sentiment === 'neutral').length,
      negative: allFeedback.filter(f => f.sentiment === 'negative').length,
    };

    return {
      labels: ['Positive', 'Neutral', 'Negative'],
      datasets: [
        {
          data: [sentiments.positive, sentiments.neutral, sentiments.negative],
          backgroundColor: [
            'rgba(34, 197, 94, 0.5)',
            'rgba(99, 102, 241, 0.5)',
            'rgba(239, 68, 68, 0.5)',
          ],
        },
      ],
    };
  }, [given, received]);

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
          value={`${stats.engagementScore}%`}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EngagementChart
          type="line"
          data={personalEngagementData}
          title="Feedback Activity"
        />
        <EngagementChart
          type="bar"
          data={sentimentData}
          title="Feedback Sentiment Analysis"
        />
      </div>
    </div>
  );
};

export default UserAnalytics;