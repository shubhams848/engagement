import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  trend?: {
    value: number;
    label: string;
  };
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, trend }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className="p-2 bg-indigo-50 rounded-lg">
          {icon}
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
      {trend && (
        <span className={`text-sm flex items-center ${
          trend.value >= 0 ? 'text-green-600' : 'text-red-600'
        }`}>
          {trend.value >= 0 ? (
            <ChevronUp className="h-4 w-4 mr-1" />
          ) : (
            <ChevronDown className="h-4 w-4 mr-1" />
          )}
          {Math.abs(trend.value)}% {trend.label}
        </span>
      )}
    </div>
  </div>
);

export default StatCard;