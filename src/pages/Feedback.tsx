import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useUsers } from '../contexts/UsersContext';
import { useFeedback } from '../contexts/FeedbackContext';
import { ConsiderCategory } from '../types';
import toast from 'react-hot-toast';

const CONSIDER_CATEGORIES: ConsiderCategory[] = [
  'Skill Development',
  'Communication',
  'Time Management',
  'Quality of Work',
  'Innovation and Initiative',
  'Team Collaboration',
  'Leadership',
  'Customer-Centricity',
  'Compliance and Ethics',
  'Adaptability'
];

const Feedback: React.FC = () => {
  const { user: currentUser } = useAuth();
  const { users } = useUsers();
  const { addFeedback } = useFeedback();
  const [recipient, setRecipient] = useState('');
  const [category, setCategory] = useState<ConsiderCategory>('Skill Development');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!recipient || !message || !category) {
      toast.error('Please fill in all fields');
      return;
    }

    addFeedback({
      type: 'consider',
      category,
      senderId: currentUser?.id || '',
      recipientId: recipient,
      message
    });

    toast.success('Consider feedback submitted successfully!');
    setRecipient('');
    setCategory('Skill Development');
    setMessage('');
  };

  const otherUsers = users.filter(u => u.id !== currentUser?.id);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Consider Feedback</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <div>
          <label htmlFor="recipient" className="block text-sm font-medium text-gray-700">
            Recipient
          </label>
          <select
            id="recipient"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select a team member</option>
            {otherUsers.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Consider Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as ConsiderCategory)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            {CONSIDER_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Consider Message
          </label>
          <textarea
            id="message"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Write your consider feedback here..."
          />
        </div>

        <button
          type="submit"
          className="w-full btn-primary"
        >
          Submit Consider Feedback
        </button>
      </form>
    </div>
  );
};

export default Feedback;