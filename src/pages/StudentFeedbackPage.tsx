import React, { useState } from 'react';
import { MessageSquare, Star, TrendingUp, Users, Filter, Eye } from 'lucide-react';
import StatCard from '../components/UI/StatCard';
import DataTable from '../components/UI/DataTable';

const feedbackData = [
  {
    id: '1',
    student: 'Alice Johnson',
    rollNo: 'CS2024001',
    subject: 'Data Structures',
    rating: 4.5,
    feedback: 'Excellent teaching methodology. Concepts are explained very clearly.',
    date: '2024-01-15',
    category: 'Teaching Quality',
  },
  {
    id: '2',
    student: 'Bob Smith',
    rollNo: 'CS2024002',
    subject: 'Algorithms',
    rating: 4.0,
    feedback: 'Good pace of teaching, but would like more practical examples.',
    date: '2024-01-14',
    category: 'Course Content',
  },
  {
    id: '3',
    student: 'Carol Davis',
    rollNo: 'CS2024003',
    subject: 'Database Systems',
    rating: 5.0,
    feedback: 'Outstanding professor! Makes complex topics easy to understand.',
    date: '2024-01-13',
    category: 'Teaching Quality',
  },
  {
    id: '4',
    student: 'David Wilson',
    rollNo: 'CS2024004',
    subject: 'Data Structures',
    rating: 3.5,
    feedback: 'Course is good but assignments are quite challenging.',
    date: '2024-01-12',
    category: 'Assignments',
  },
];

const subjects = ['All Subjects', 'Data Structures', 'Algorithms', 'Database Systems'];
const categories = ['All Categories', 'Teaching Quality', 'Course Content', 'Assignments', 'Lab Sessions'];

export default function StudentFeedbackPage() {
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedFeedback, setSelectedFeedback] = useState<any>(null);

  const filteredFeedback = feedbackData.filter(feedback => {
    const subjectMatch = selectedSubject === 'All Subjects' || feedback.subject === selectedSubject;
    const categoryMatch = selectedCategory === 'All Categories' || feedback.category === selectedCategory;
    return subjectMatch && categoryMatch;
  });

  const columns = [
    { key: 'student', label: 'Student' },
    { key: 'subject', label: 'Subject' },
    { key: 'rating', label: 'Rating' },
    { key: 'category', label: 'Category' },
    { key: 'date', label: 'Date' },
    { key: 'actions', label: 'Actions' },
  ];

  const processedData = filteredFeedback.map(feedback => ({
    ...feedback,
    rating: (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < Math.floor(feedback.rating)
                ? 'text-yellow-400 fill-current'
                : i < feedback.rating
                ? 'text-yellow-400 fill-current opacity-50'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-1">{feedback.rating}</span>
      </div>
    ),
    actions: (
      <button
        onClick={() => setSelectedFeedback(feedback)}
        className="text-primary-600 hover:text-primary-800 flex items-center space-x-1"
      >
        <Eye className="w-4 h-4" />
        <span>View</span>
      </button>
    )
  }));

  const averageRating = (feedbackData.reduce((sum, f) => sum + f.rating, 0) / feedbackData.length).toFixed(1);
  const totalFeedback = feedbackData.length;
  const positiveRating = feedbackData.filter(f => f.rating >= 4).length;
  const responseRate = 85; // Mock response rate

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold">Student Feedback</h1>
        <p className="text-primary-100 mt-1">
          Review and analyze student feedback on your courses
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Average Rating"
          value={averageRating}
          icon={Star}
          change="Out of 5.0"
          changeType="positive"
        />
        <StatCard
          title="Total Feedback"
          value={totalFeedback}
          icon={MessageSquare}
          change="This semester"
          changeType="neutral"
        />
        <StatCard
          title="Positive Ratings"
          value={`${Math.round((positiveRating / totalFeedback) * 100)}%`}
          icon={TrendingUp}
          change="4+ star ratings"
          changeType="positive"
        />
        <StatCard
          title="Response Rate"
          value={`${responseRate}%`}
          icon={Users}
          change="Student participation"
          changeType="positive"
        />
      </div>

      {/* Filters and Feedback Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <h3 className="text-lg font-semibold text-gray-900">Feedback Overview</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <DataTable columns={columns} data={processedData} />
        </div>
      </div>

      {/* Rating Distribution */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Rating Distribution</h3>
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map(rating => {
            const count = feedbackData.filter(f => Math.floor(f.rating) === rating).length;
            const percentage = (count / totalFeedback) * 100;
            return (
              <div key={rating} className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 w-16">
                  <span className="text-sm font-medium">{rating}</span>
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full" 
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 w-12">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Feedback Modal */}
      {selectedFeedback && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Feedback Details</h3>
              <button
                onClick={() => setSelectedFeedback(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Student</p>
                <p className="text-gray-900">{selectedFeedback.student} ({selectedFeedback.rollNo})</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700">Subject</p>
                <p className="text-gray-900">{selectedFeedback.subject}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700">Rating</p>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(selectedFeedback.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">{selectedFeedback.rating}</span>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700">Category</p>
                <p className="text-gray-900">{selectedFeedback.category}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700">Feedback</p>
                <p className="text-gray-900 bg-gray-50 p-3 rounded">{selectedFeedback.feedback}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700">Date</p>
                <p className="text-gray-900">{selectedFeedback.date}</p>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedFeedback(null)}
                className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}