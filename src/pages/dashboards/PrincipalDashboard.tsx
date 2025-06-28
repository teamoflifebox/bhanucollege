import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Building, Users, TrendingUp, DollarSign, GraduationCap, Megaphone, FileText, Award } from 'lucide-react';
import StatCard from '../../components/UI/StatCard';
import DataTable from '../../components/UI/DataTable';
import { useAuth } from '../../contexts/AuthContext';

const institutionStats = [
  { month: 'Sep', students: 2450, faculty: 125, revenue: 12500000 },
  { month: 'Oct', students: 2480, faculty: 128, revenue: 13200000 },
  { month: 'Nov', students: 2475, faculty: 130, revenue: 13800000 },
  { month: 'Dec', students: 2490, faculty: 132, revenue: 14500000 },
];

const departmentPerformance = [
  { department: 'Computer Science', students: 450, faculty: 26, avgGPA: 8.2 },
  { department: 'Electronics', students: 420, faculty: 24, avgGPA: 8.0 },
  { department: 'Mechanical', students: 380, faculty: 22, avgGPA: 7.8 },
  { department: 'Civil', students: 360, faculty: 20, avgGPA: 7.9 },
  { department: 'Electrical', students: 340, faculty: 18, avgGPA: 8.1 },
];

const salaryReports = [
  { category: 'Faculty Salaries', amount: 8500000, percentage: 65 },
  { category: 'Staff Salaries', amount: 2800000, percentage: 21 },
  { category: 'Admin Salaries', amount: 1200000, percentage: 9 },
  { category: 'Others', amount: 650000, percentage: 5 },
];

const recentAnnouncements = [
  { title: 'Annual Day Celebration', date: '2024-01-15', category: 'Event' },
  { title: 'Mid-term Examinations', date: '2024-02-01', category: 'Academic' },
  { title: 'Faculty Development Program', date: '2024-02-10', category: 'Training' },
  { title: 'New Lab Inauguration', date: '2024-02-20', category: 'Infrastructure' },
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export default function PrincipalDashboard() {
  const { user } = useAuth();

  const deptColumns = [
    { key: 'department', label: 'Department' },
    { key: 'students', label: 'Students' },
    { key: 'faculty', label: 'Faculty' },
    { key: 'avgGPA', label: 'Avg GPA' },
  ];

  const announcementColumns = [
    { key: 'title', label: 'Announcement' },
    { key: 'date', label: 'Date' },
    { key: 'category', label: 'Category' },
  ];

  const currentStats = institutionStats[institutionStats.length - 1];
  const totalSalaries = salaryReports.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold">Principal Dashboard - {user?.name}</h1>
        <p className="text-primary-100 mt-1">
          Oxford College of Engineering | Employee ID: {user?.employeeId}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Students"
          value={currentStats.students.toLocaleString()}
          icon={GraduationCap}
          change="+15 this month"
          changeType="positive"
        />
        <StatCard
          title="Total Faculty"
          value={currentStats.faculty}
          icon={Users}
          change="+2 new hires"
          changeType="positive"
        />
        <StatCard
          title="Monthly Revenue"
          value={`₹${(currentStats.revenue / 10000000).toFixed(1)}Cr`}
          icon={DollarSign}
          change="+5% from last month"
          changeType="positive"
        />
        <StatCard
          title="Departments"
          value="5"
          icon={Building}
          change="All active"
          changeType="positive"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Institution Growth */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Institution Growth</h3>
            <TrendingUp className="h-5 w-5 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={institutionStats}>
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
                dataKey="faculty" 
                stroke="#10B981" 
                strokeWidth={2}
                name="Faculty"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Salary Distribution */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Salary Distribution</h3>
            <DollarSign className="h-5 w-5 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={salaryReports}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="amount"
                label={({ category, percentage }) => `${category}: ${percentage}%`}
              >
                {salaryReports.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `₹${(value / 1000000).toFixed(1)}M`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Total Monthly Salaries: ₹{(totalSalaries / 10000000).toFixed(1)} Crores
            </p>
          </div>
        </div>
      </div>

      {/* Department Performance */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Department Performance</h3>
          <Award className="h-5 w-5 text-gray-400" />
        </div>
        <DataTable columns={deptColumns} data={departmentPerformance} />
      </div>

      {/* Recent Announcements */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Announcements</h3>
          <div className="flex space-x-2">
            <button className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm hover:bg-primary-700 transition-colors">
              New Announcement
            </button>
          </div>
        </div>
        <DataTable columns={announcementColumns} data={recentAnnouncements} />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-primary-500 hover:bg-primary-50 transition-colors text-center">
          <Megaphone className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <span className="text-sm font-medium text-gray-700">Broadcast Message</span>
        </button>
        <button className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-primary-500 hover:bg-primary-50 transition-colors text-center">
          <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <span className="text-sm font-medium text-gray-700">Generate Reports</span>
        </button>
        <button className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-primary-500 hover:bg-primary-50 transition-colors text-center">
          <Users className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <span className="text-sm font-medium text-gray-700">Faculty Management</span>
        </button>
        <button className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-primary-500 hover:bg-primary-50 transition-colors text-center">
          <Building className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <span className="text-sm font-medium text-gray-700">Infrastructure</span>
        </button>
      </div>
    </div>
  );
}