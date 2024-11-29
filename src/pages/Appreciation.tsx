import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useUsers } from '../contexts/UsersContext';
import { useFeedback } from '../contexts/FeedbackContext';
import { ContinueCategory } from '../types';
import { Award } from 'lucide-react';
import toast from 'react-hot-toast';

const CONTINUE_CATEGORIES: ContinueCategory[] = [
  'Team Contributions',
  'Outstanding Performance',
  'Creativity and Innovation',
  'Leadership Excellence',
  'Commitment and Dedication',
  'Customer Impact',
  'Learning and Growth',
  'Workplace Values'
];

const Appreciation: React.FC = () => {
  const { user: currentUser } = useAuth();
  const { users } = useUsers();
  const { addFeedback } = useFeedback();
  const [recipient, setRecipient] = useState('');
  const [category, setCategory] = useState<ContinueCategory>('Team Contributions');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!recipient || !message || !category) {
      toast.error('Please fill in all fields');
      return;
    }

    addFeedback({
      type: 'continue',
      category,
      senderId: currentUser?.id || '',
      recipientId: recipient,
      message
    });

    toast.success('Continue feedback sent successfully!');
    setRecipient('');
    setCategory('Team Contributions');
    setMessage('');
  };

  const otherUsers = users.filter(u => u.id !== currentUser?.id);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center space-x-3">
        <Award className="h-8 w-8 text-indigo-600" />
        <h1 className="text-2xl font-bold text-gray-900">Continue Feedback</h1>
      </div>
      
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
            Continue Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as ContinueCategory)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            {CONTINUE_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Continue Message
          </label>
          <textarea
            id="message"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Write your continue feedback here..."
          />
        </div>

        <button
          type="submit"
          className="w-full btn-primary"
        >
          Send Continue Feedback
        </button>
      </form>
    </div>
  );
};

export default Appreciation;