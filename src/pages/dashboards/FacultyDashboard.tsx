import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, BookOpen, Upload, MessageSquare, TrendingUp, Calendar, Award, Clock } from 'lucide-react';
import StatCard from '../../components/UI/StatCard';
import DataTable from '../../components/UI/DataTable';
import { useAuth } from '../../contexts/AuthContext';

const classAttendanceData = [
  { class: 'CSE-A', present: 45, absent: 5, total: 50 },
  { class: 'CSE-B', present: 42, absent: 8, total: 50 },
  { class: 'CSE-C', present: 47, absent: 3, total: 50 },
];

const subjectPerformance = [
  { subject: 'Data Structures', avgScore: 78, students: 150 },
  { subject: 'Algorithms', avgScore: 72, students: 150 },
  { subject: 'Database Systems', avgScore: 85, students: 100 },
];

const recentActivities = [
  { activity: 'Uploaded assignment for Data Structures', time: '2 hours ago' },
  { activity: 'Marked attendance for CSE-A', time: '4 hours ago' },
  { activity: 'Graded midterm exams', time: '1 day ago' },
  { activity: 'Published study materials', time: '2 days ago' },
];

const upcomingClasses = [
  { subject: 'Data Structures', class: 'CSE-A', time: '10:00 AM', room: 'Lab-101' },
  { subject: 'Algorithms', class: 'CSE-B', time: '02:00 PM', room: 'Room-205' },
  { subject: 'Database Systems', class: 'CSE-C', time: '04:00 PM', room: 'Lab-102' },
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

export default function FacultyDashboard() {
  const { user } = useAuth();

  const columns = [
    { key: 'subject', label: 'Subject' },
    { key: 'avgScore', label: 'Avg Score' },
    { key: 'students', label: 'Students' },
  ];

  const classColumns = [
    { key: 'subject', label: 'Subject' },
    { key: 'class', label: 'Class' },
    { key: 'time', label: 'Time' },
    { key: 'room', label: 'Room' },
  ];

  const totalStudents = classAttendanceData.reduce((sum, cls) => sum + cls.total, 0);
  const totalPresent = classAttendanceData.reduce((sum, cls) => sum + cls.present, 0);
  const avgAttendance = Math.round((totalPresent / totalStudents) * 100);
  const avgPerformance = Math.round(subjectPerformance.reduce((sum, sub) => sum + sub.avgScore, 0) / subjectPerformance.length);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold">Welcome, {user?.name}!</h1>
        <p className="text-primary-100 mt-1">
          Employee ID: {user?.employeeId} | Department: {user?.department}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Students"
          value={totalStudents}
          icon={Users}
          change="Across all classes"
          changeType="neutral"
        />
        <StatCard
          title="Avg Attendance"
          value={`${avgAttendance}%`}
          icon={Calendar}
          change="This month"
          changeType="positive"
        />
        <StatCard
          title="Avg Performance"
          value={`${avgPerformance}%`}
          icon={Award}
          change="Class average"
          changeType="positive"
        />
        <StatCard
          title="Pending Tasks"
          value="5"
          icon={BookOpen}
          change="To be completed"
          changeType="neutral"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Class Attendance */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Today's Attendance</h3>
            <TrendingUp className="h-5 w-5 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={classAttendanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="class" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="present" fill="#10B981" name="Present" />
              <Bar dataKey="absent" fill="#EF4444" name="Absent" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
            <Clock className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.activity}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Subject Performance */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Subject Performance</h3>
          <Award className="h-5 w-5 text-gray-400" />
        </div>
        <DataTable columns={columns} data={subjectPerformance} />
      </div>

      {/* Upcoming Classes */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Today's Schedule</h3>
          <Calendar className="h-5 w-5 text-gray-400" />
        </div>
        <DataTable columns={classColumns} data={upcomingClasses} />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-primary-500 hover:bg-primary-50 transition-colors text-center">
          <Calendar className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <span className="text-sm font-medium text-gray-700">Mark Attendance</span>
        </button>
        <button className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-primary-500 hover:bg-primary-50 transition-colors text-center">
          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <span className="text-sm font-medium text-gray-700">Upload Materials</span>
        </button>
        <button className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-primary-500 hover:bg-primary-50 transition-colors text-center">
          <BookOpen className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <span className="text-sm font-medium text-gray-700">Grade Assignments</span>
        </button>
        <button className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-primary-500 hover:bg-primary-50 transition-colors text-center">
          <MessageSquare className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <span className="text-sm font-medium text-gray-700">View Feedback</span>
        </button>
      </div>
    </div>
  );
}