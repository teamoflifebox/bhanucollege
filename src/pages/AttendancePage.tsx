import React, { useState } from 'react';
import { Calendar, Users, TrendingUp, Clock, CheckCircle, X, Filter } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import StatCard from '../components/UI/StatCard';
import DataTable from '../components/UI/DataTable';

const attendanceData = [
  { date: '2024-01-15', subject: 'Mathematics', status: 'Present', time: '09:00 AM' },
  { date: '2024-01-15', subject: 'Physics', status: 'Present', time: '11:00 AM' },
  { date: '2024-01-15', subject: 'Chemistry', status: 'Absent', time: '02:00 PM' },
  { date: '2024-01-14', subject: 'Computer Science', status: 'Present', time: '10:00 AM' },
  { date: '2024-01-14', subject: 'English', status: 'Present', time: '03:00 PM' },
  { date: '2024-01-13', subject: 'Mathematics', status: 'Present', time: '09:00 AM' },
  { date: '2024-01-13', subject: 'Physics', status: 'Present', time: '11:00 AM' },
  { date: '2024-01-12', subject: 'Chemistry', status: 'Present', time: '02:00 PM' },
];

const monthlyStats = [
  { month: 'Sep', present: 22, total: 25, percentage: 88 },
  { month: 'Oct', present: 25, total: 27, percentage: 93 },
  { month: 'Nov', present: 20, total: 25, percentage: 80 },
  { month: 'Dec', present: 23, total: 25, percentage: 92 },
];

export default function AttendancePage() {
  const { user } = useAuth();
  const [filter, setFilter] = useState('all');

  const filteredAttendance = attendanceData.filter(record => {
    if (filter === 'present') return record.status === 'Present';
    if (filter === 'absent') return record.status === 'Absent';
    return true;
  });

  const columns = [
    { key: 'date', label: 'Date' },
    { key: 'subject', label: 'Subject' },
    { key: 'time', label: 'Time' },
    { key: 'status', label: 'Status' },
  ];

  const processedData = filteredAttendance.map(record => ({
    ...record,
    status: (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${
        record.status === 'Present' 
          ? 'bg-green-100 text-green-800' 
          : 'bg-red-100 text-red-800'
      }`}>
        {record.status === 'Present' ? (
          <CheckCircle className="w-3 h-3 mr-1" />
        ) : (
          <X className="w-3 h-3 mr-1" />
        )}
        {record.status}
      </span>
    )
  }));

  const totalClasses = attendanceData.length;
  const presentClasses = attendanceData.filter(r => r.status === 'Present').length;
  const overallPercentage = Math.round((presentClasses / totalClasses) * 100);
  const currentMonth = monthlyStats[monthlyStats.length - 1];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold">Attendance Overview</h1>
        <p className="text-primary-100 mt-1">
          Track your attendance across all subjects
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Overall Attendance"
          value={`${overallPercentage}%`}
          icon={TrendingUp}
          change={overallPercentage >= 85 ? "Good standing" : "Needs improvement"}
          changeType={overallPercentage >= 85 ? "positive" : "negative"}
        />
        <StatCard
          title="This Month"
          value={`${currentMonth.percentage}%`}
          icon={Calendar}
          change={`${currentMonth.present}/${currentMonth.total} classes`}
          changeType="neutral"
        />
        <StatCard
          title="Classes Attended"
          value={presentClasses}
          icon={CheckCircle}
          change={`Out of ${totalClasses} total`}
          changeType="positive"
        />
        <StatCard
          title="Classes Missed"
          value={totalClasses - presentClasses}
          icon={X}
          change="This semester"
          changeType="negative"
        />
      </div>

      {/* Attendance Records */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <h3 className="text-lg font-semibold text-gray-900">Attendance Records</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="all">All Records</option>
                  <option value="present">Present Only</option>
                  <option value="absent">Absent Only</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <DataTable columns={columns} data={processedData} />
        </div>
      </div>

      {/* Monthly Breakdown */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {monthlyStats.map((month) => (
            <div key={month.month} className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">{month.month}</span>
                <span className={`text-sm font-semibold ${
                  month.percentage >= 85 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {month.percentage}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    month.percentage >= 85 ? 'bg-green-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${month.percentage}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {month.present}/{month.total} classes
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Attendance Guidelines */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-yellow-800">Attendance Requirements</h4>
            <div className="text-sm text-yellow-700 mt-1 space-y-1">
              <p>• Minimum 85% attendance required for semester examination eligibility</p>
              <p>• Medical leave requires proper documentation</p>
              <p>• Contact your faculty for attendance-related queries</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}