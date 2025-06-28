import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Users, TrendingUp, Award, AlertTriangle, Calendar, BookOpen, UserCheck, MessageSquare } from 'lucide-react';
import StatCard from '../../components/UI/StatCard';
import DataTable from '../../components/UI/DataTable';
import { useAuth } from '../../contexts/AuthContext';

const departmentStats = [
  { month: 'Sep', students: 450, faculty: 25, performance: 78 },
  { month: 'Oct', students: 455, faculty: 25, performance: 82 },
  { month: 'Nov', students: 450, faculty: 26, performance: 80 },
  { month: 'Dec', students: 448, faculty: 26, performance: 85 },
];

const facultyPerformance = [
  { name: 'Dr. Sarah Wilson', subjects: 3, avgRating: 4.5, students: 150 },
  { name: 'Prof. John Davis', subjects: 2, avgRating: 4.2, students: 100 },
  { name: 'Dr. Emily Brown', subjects: 3, avgRating: 4.7, students: 120 },
  { name: 'Prof. Mike Johnson', subjects: 2, avgRating: 4.1, students: 80 },
];

const complaints = [
  { id: 'C001', student: 'Alice Johnson', type: 'Academic', status: 'Open', priority: 'High' },
  { id: 'C002', student: 'Bob Smith', type: 'Infrastructure', status: 'In Progress', priority: 'Medium' },
  { id: 'C003', student: 'Carol Davis', type: 'Faculty', status: 'Resolved', priority: 'Low' },
];

const yearWisePerformance = [
  { year: '1st Year', students: 120, avgGPA: 7.2 },
  { year: '2nd Year', students: 115, avgGPA: 7.5 },
  { year: '3rd Year', students: 110, avgGPA: 7.8 },
  { year: '4th Year', students: 105, avgGPA: 8.1 },
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

export default function HODDashboard() {
  const { user } = useAuth();

  const facultyColumns = [
    { key: 'name', label: 'Faculty Name' },
    { key: 'subjects', label: 'Subjects' },
    { key: 'avgRating', label: 'Avg Rating' },
    { key: 'students', label: 'Students' },
  ];

  const complaintColumns = [
    { key: 'id', label: 'ID' },
    { key: 'student', label: 'Student' },
    { key: 'type', label: 'Type' },
    { 
      key: 'status', 
      label: 'Status',
      className: 'text-center'
    },
    { 
      key: 'priority', 
      label: 'Priority',
      className: 'text-center'
    },
  ];

  const processedComplaints = complaints.map(complaint => ({
    ...complaint,
    status: (
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
        complaint.status === 'Resolved' 
          ? 'bg-green-100 text-green-800'
          : complaint.status === 'In Progress'
          ? 'bg-yellow-100 text-yellow-800'
          : 'bg-red-100 text-red-800'
      }`}>
        {complaint.status}
      </span>
    ),
    priority: (
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
        complaint.priority === 'High' 
          ? 'bg-red-100 text-red-800'
          : complaint.priority === 'Medium'
          ? 'bg-yellow-100 text-yellow-800'
          : 'bg-green-100 text-green-800'
      }`}>
        {complaint.priority}
      </span>
    )
  }));

  const currentStats = departmentStats[departmentStats.length - 1];
  const avgFacultyRating = (facultyPerformance.reduce((sum, f) => sum + f.avgRating, 0) / facultyPerformance.length).toFixed(1);
  const openComplaints = complaints.filter(c => c.status !== 'Resolved').length;

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold">Department Overview - {user?.name}</h1>
        <p className="text-primary-100 mt-1">
          Head of Department | {user?.department} | Employee ID: {user?.employeeId}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Students"
          value={currentStats.students}
          icon={Users}
          change="+2 this month"
          changeType="positive"
        />
        <StatCard
          title="Faculty Members"
          value={currentStats.faculty}
          icon={UserCheck}
          change="All active"
          changeType="positive"
        />
        <StatCard
          title="Avg Faculty Rating"
          value={avgFacultyRating}
          icon={Award}
          change="Out of 5.0"
          changeType="positive"
        />
        <StatCard
          title="Open Complaints"
          value={openComplaints}
          icon={AlertTriangle}
          change="Needs attention"
          changeType={openComplaints > 0 ? "negative" : "positive"}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Trends */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Department Trends</h3>
            <TrendingUp className="h-5 w-5 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={departmentStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="students" 
                stroke="#3B82F6" 
                strokeWidth={2}
                name="Students"
              />
              <Line 
                type="monotone" 
                dataKey="performance" 
                stroke="#10B981" 
                strokeWidth={2}
                name="Performance %"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Year-wise Performance */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Year-wise Performance</h3>
            <Award className="h-5 w-5 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={yearWisePerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="avgGPA" fill="#3B82F6" name="Average GPA" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Faculty Performance */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Faculty Performance</h3>
          <UserCheck className="h-5 w-5 text-gray-400" />
        </div>
        <DataTable columns={facultyColumns} data={facultyPerformance} />
      </div>

      {/* Student Complaints */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Student Complaints</h3>
          <MessageSquare className="h-5 w-5 text-gray-400" />
        </div>
        <DataTable columns={complaintColumns} data={processedComplaints} />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-primary-500 hover:bg-primary-50 transition-colors text-center">
          <Users className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <span className="text-sm font-medium text-gray-700">Faculty Reviews</span>
        </button>
        <button className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-primary-500 hover:bg-primary-50 transition-colors text-center">
          <BookOpen className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <span className="text-sm font-medium text-gray-700">Curriculum Planning</span>
        </button>
        <button className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-primary-500 hover:bg-primary-50 transition-colors text-center">
          <AlertTriangle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <span className="text-sm font-medium text-gray-700">Handle Complaints</span>
        </button>
        <button className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-primary-500 hover:bg-primary-50 transition-colors text-center">
          <Calendar className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <span className="text-sm font-medium text-gray-700">Schedule Meeting</span>
        </button>
      </div>
    </div>
  );
}