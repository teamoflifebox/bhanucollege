import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Calendar, BookOpen, CreditCard, Download, TrendingUp, Award, Clock, AlertTriangle } from 'lucide-react';
import StatCard from '../../components/UI/StatCard';
import DataTable from '../../components/UI/DataTable';
import { useAuth } from '../../contexts/AuthContext';

const attendanceData = [
  { month: 'Aug', present: 22, absent: 3, percentage: 88 },
  { month: 'Sep', present: 25, absent: 2, percentage: 93 },
  { month: 'Oct', present: 20, absent: 5, percentage: 80 },
  { month: 'Nov', present: 23, absent: 2, percentage: 92 },
  { month: 'Dec', present: 18, absent: 3, percentage: 86 },
];

const marksData = [
  { subject: 'Mathematics', internal: 85, external: 78, total: 163, grade: 'A' },
  { subject: 'Physics', internal: 82, external: 75, total: 157, grade: 'A' },
  { subject: 'Chemistry', internal: 78, external: 72, total: 150, grade: 'B+' },
  { subject: 'Computer Science', internal: 92, external: 88, total: 180, grade: 'A+' },
  { subject: 'English', internal: 75, external: 70, total: 145, grade: 'B+' },
];

const feeData = [
  { category: 'Tuition Fee', amount: 25000, dueDate: '2024-01-15', status: 'Paid' },
  { category: 'Lab Fee', amount: 5000, dueDate: '2024-01-15', status: 'Paid' },
  { category: 'Library Fee', amount: 2000, dueDate: '2024-02-15', status: 'Pending' },
  { category: 'Sports Fee', amount: 3000, dueDate: '2024-02-15', status: 'Pending' },
];

const recentActivities = [
  { activity: 'Assignment submitted for Mathematics', time: '2 hours ago' },
  { activity: 'Attended Computer Science Lab', time: '1 day ago' },
  { activity: 'Downloaded Physics notes', time: '2 days ago' },
  { activity: 'Fee payment completed', time: '3 days ago' },
];

export default function StudentDashboard() {
  const { user } = useAuth();
  
  const columns = [
    { key: 'subject', label: 'Subject' },
    { key: 'internal', label: 'Internal (100)' },
    { key: 'external', label: 'External (100)' },
    { key: 'total', label: 'Total (200)' },
    { key: 'grade', label: 'Grade' },
  ];

  const feeColumns = [
    { key: 'category', label: 'Fee Category' },
    { key: 'amount', label: 'Amount (₹)' },
    { key: 'dueDate', label: 'Due Date' },
    { 
      key: 'status', 
      label: 'Status',
      className: 'text-center'
    },
  ];

  const processedFeeData = feeData.map(item => ({
    ...item,
    amount: `₹${item.amount.toLocaleString()}`,
    status: (
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
        item.status === 'Paid' 
          ? 'bg-green-100 text-green-800' 
          : 'bg-yellow-100 text-yellow-800'
      }`}>
        {item.status}
      </span>
    )
  }));

  const currentAttendance = attendanceData[attendanceData.length - 1]?.percentage || 0;
  const currentGPA = (marksData.reduce((sum, subject) => sum + subject.total, 0) / (marksData.length * 200) * 10).toFixed(2);
  const pendingFees = feeData.filter(fee => fee.status === 'Pending').reduce((sum, fee) => sum + fee.amount, 0);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold">Welcome back, {user?.name}!</h1>
        <p className="text-primary-100 mt-1">
          Roll Number: {user?.rollNumber} | Department: {user?.department}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Current Attendance"
          value={`${currentAttendance}%`}
          icon={Calendar}
          change={currentAttendance >= 85 ? "Good attendance" : "Needs improvement"}
          changeType={currentAttendance >= 85 ? "positive" : "negative"}
        />
        <StatCard
          title="Current GPA"
          value={currentGPA}
          icon={Award}
          change="Above average"
          changeType="positive"
        />
        <StatCard
          title="Pending Fees"
          value={`₹${pendingFees.toLocaleString()}`}
          icon={CreditCard}
          change={pendingFees > 0 ? "Payment due" : "All paid"}
          changeType={pendingFees > 0 ? "negative" : "positive"}
        />
        <StatCard
          title="Assignments Due"
          value="3"
          icon={BookOpen}
          change="This week"
          changeType="neutral"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Attendance Overview</h3>
            <TrendingUp className="h-5 w-5 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="percentage" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
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

      {/* Academic Performance */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Academic Performance</h3>
          <Award className="h-5 w-5 text-gray-400" />
        </div>
        <DataTable columns={columns} data={marksData} />
      </div>

      {/* Fee Management */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Fee Status</h3>
          <div className="flex space-x-2">
            <button className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm hover:bg-primary-700 transition-colors">
              Pay Fees
            </button>
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-200 transition-colors">
              Download Receipt
            </button>
          </div>
        </div>
        <DataTable columns={feeColumns} data={processedFeeData} />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-primary-500 hover:bg-primary-50 transition-colors text-center">
          <Download className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <span className="text-sm font-medium text-gray-700">Download Bonafide</span>
        </button>
        <button className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-primary-500 hover:bg-primary-50 transition-colors text-center">
          <Download className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <span className="text-sm font-medium text-gray-700">Transfer Certificate</span>
        </button>
        <button className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-primary-500 hover:bg-primary-50 transition-colors text-center">
          <BookOpen className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <span className="text-sm font-medium text-gray-700">Study Materials</span>
        </button>
        <button className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-primary-500 hover:bg-primary-50 transition-colors text-center">
          <AlertTriangle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <span className="text-sm font-medium text-gray-700">Submit Complaint</span>
        </button>
      </div>
    </div>
  );
}