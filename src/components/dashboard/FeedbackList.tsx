import React from 'react';
import { FeedbackItem, User } from '../../types';
import { MessageSquare, Award } from 'lucide-react';
import { useUsers } from '../../contexts/UsersContext';

interface FeedbackListProps {
  items: FeedbackItem[];
  type: 'given' | 'received';
}

const FeedbackList: React.FC<FeedbackListProps> = ({ items, type }) => {
  const { users } = useUsers();

  const getUser = (id: string): User | undefined => {
    return users.find(u => u.id === id);
  };

  return (
    <div className="space-y-4">
      {items.map((item) => {
        const otherUser = getUser(type === 'given' ? item.recipientId : item.senderId);
        
        return (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-indigo-50 rounded-lg">
                {item.type === 'feedback' ? (
                  <MessageSquare className="h-5 w-5 text-indigo-600" />
                ) : (
                  <Award className="h-5 w-5 text-indigo-600" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img
                      src={otherUser?.avatarUrl}
                      alt={otherUser?.name}
                      className="h-6 w-6 rounded-full"
                    />
                    <span className="text-sm font-medium text-gray-900">
                      {type === 'given' ? `To: ${otherUser?.name}` : `From: ${otherUser?.name}`}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(item.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-600">{item.message}</p>
                <div className="mt-2 flex items-center space-x-2">
                  <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </span>
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    {item.category}
                  </span>
                  {item.sentiment && (
                    <span className={`text-xs font-medium px-2 py-1 rounded ${
                      item.sentiment === 'positive' ? 'bg-green-50 text-green-600' :
                      item.sentiment === 'negative' ? 'bg-red-50 text-red-600' :
                      'bg-gray-50 text-gray-600'
                    }`}>
                      {item.sentiment.charAt(0).toUpperCase() + item.sentiment.slice(1)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FeedbackList;