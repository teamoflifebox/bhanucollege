import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  className?: string;
}

export default function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  change, 
  changeType = 'neutral',
  className = ''
}: StatCardProps) {
  const changeColorClass = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-gray-600'
  }[changeType];

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-semibold text-gray-900 mt-2">{value}</p>
          {change && (
            <p className={`text-sm mt-2 ${changeColorClass}`}>
              {change}
            </p>
          )}
        </div>
        <div className="flex-shrink-0">
          <Icon className="h-8 w-8 text-primary-600" />
        </div>
      </div>
    </div>
  );
}