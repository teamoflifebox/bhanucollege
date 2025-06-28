import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { BarChart3, Users, TrendingUp, Award, Calendar, BookOpen, UserCheck, AlertTriangle } from 'lucide-react';
import StatCard from '../components/UI/StatCard';
import DataTable from '../components/UI/DataTable';

const departmentData = {
  students: 450,
  faculty: 26,
  avgGPA: 8.2,
  attendanceRate: 89,
};

const yearWiseData = [
  { year: '1st Year', students: 120, avgGPA: 7.2, placement: 0 },
  { year: '2nd Year', students: 115, avgGPA: 7.5, placement: 0 },
  { year: '3rd Year', students: 110, avgGPA: 7.8, placement: 15 },
  { year: '4th Year', students: 105, avgGPA: 8.1, placement: 85 },
];

const subjectPerformance = [
  { subject: 'Data Structures', avgScore: 78, passRate: 92, faculty: 'Dr. Sarah Wilson' },
  { subject: 'Algorithms', avgScore: 72, passRate: 88, faculty: 'Prof. John Davis' },
  { subject: 'Database Systems', avgScore: 85, passRate: 95, faculty: 'Dr. Emily Brown' },
  { subject: 'Computer Networks', avgScore: 80, passRate: 90, faculty: 'Prof. Mike Johnson' },
  { subject: 'Operating Systems', avgScore: 75, passRate: 87, faculty: 'Dr. Lisa Chen' },
];

const facultyData = [
  { name: 'Dr. Sarah Wilson', experience: 8, rating: 4.5, subjects: 3, publications: 12 },
  { name: 'Prof. John Davis', experience: 12, rating: 4.2, subjects: 2, publications: 8 },
  { name: 'Dr. Emily Brown', experience: 6, rating: 4.7, subjects: 3, publications: 15 },
  { name: 'Prof. Mike Johnson', experience: 10, rating: 4.1, subjects: 2, publications: 6 },
  { name: 'Dr. Lisa Chen', experience: 5, rating: 4.4, subjects: 2, publications: 9 },
];

const placementData = [
  { company: 'TCS', students: 15, package: 350000 },
  { company: 'Infosys', students: 12, package: 400000 },
  { company: 'Wipro', students: 10, package: 380000 },
  { company: 'Accenture', students: 8, package: 450000 },
  { company: 'Cognizant', students: 6, package: 420000 },
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export default function DepartmentAnalyticsPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const subjectColumns = [
    { key: 'subject', label: 'Subject' },
    { key: 'faculty', label: 'Faculty' },
    { key: 'avgScore', label: 'Avg Score' },
    { key: 'passRate', label: 'Pass Rate (%)' },
  ];

  const facultyColumns = [
    { key: 'name', label: 'Faculty Name' },
    { key: 'experience', label: 'Experience (Years)' },
    { key: 'rating', label: 'Rating' },
    { key: 'subjects', label: 'Subjects' },
    { key: 'publications', label: 'Publications' },
  ];

  const placementColumns = [
    { key: 'company', label: 'Company' },
    { key: 'students', label: 'Students Placed' },
    { key: 'package', label: 'Avg Package (₹)' },
  ];

  const processedPlacementData = placementData.map(item => ({
    ...item,
    package: `₹${(item.package / 100000).toFixed(1)}L`,
  }));

  const totalPlacements = placementData.reduce((sum, item) => sum + item.students, 0);
  const avgPackage = Math.round(placementData.reduce((sum, item) => sum + item.package, 0) / placementData.length / 100000);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold">Department Analytics</h1>
        <p className="text-primary-100 mt-1">
          Computer Science Department - Comprehensive Performance Analysis
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Students"
          value={departmentData.students}
          icon={Users}
          change="All years combined"
          changeType="neutral"
        />
        <StatCard
          title="Faculty Members"
          value={departmentData.faculty}
          icon={UserCheck}
          change="Active faculty"
          changeType="positive"
        />
        <StatCard
          title="Department GPA"
          value={departmentData.avgGPA}
          icon={Award}
          change="Average performance"
          changeType="positive"
        />
        <StatCard
          title="Attendance Rate"
          value={`${departmentData.attendanceRate}%`}
          icon={Calendar}
          change="Department average"
          changeType="positive"
        />
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {[
              { key: 'overview', label: 'Overview', icon: BarChart3 },
              { key: 'academic', label: 'Academic Performance', icon: BookOpen },
              { key: 'faculty', label: 'Faculty Analysis', icon: UserCheck },
              { key: 'placements', label: 'Placements', icon: TrendingUp },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2 ${
                  activeTab === tab.key
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Year-wise Distribution */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Year-wise Student Distribution</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={yearWiseData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="students" fill="#3B82F6" name="Students" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* GPA Trend */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Year-wise GPA Performance</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={yearWiseData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis domain={[6, 10]} />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="avgGPA" 
                        stroke="#10B981" 
                        strokeWidth={3}
                        dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Department Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Strengths</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">High Placement Rate</span>
                      <span className="font-semibold text-green-600">81%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Faculty-Student Ratio</span>
                      <span className="font-semibold text-blue-600">1:17</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Research Publications</span>
                      <span className="font-semibold text-purple-600">50+ per year</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Industry Partnerships</span>
                      <span className="font-semibold text-gold-600">15+ companies</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Areas for Improvement</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Attendance Rate</span>
                      <span className="font-semibold text-yellow-600">Target: 95%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Research Funding</span>
                      <span className="font-semibold text-red-600">Increase by 20%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">International Exposure</span>
                      <span className="font-semibold text-blue-600">More exchange programs</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'academic' && (
            <div className="space-y-6">
              <DataTable columns={subjectColumns} data={subjectPerformance} />
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Subject Performance Analysis</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={subjectPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="avgScore" fill="#3B82F6" name="Average Score" />
                    <Bar dataKey="passRate" fill="#10B981" name="Pass Rate %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === 'faculty' && (
            <div className="space-y-6">
              <DataTable columns={facultyColumns} data={facultyData} />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Faculty Experience Distribution</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: '0-5 years', value: 2 },
                          { name: '6-10 years', value: 2 },
                          { name: '10+ years', value: 1 },
                        ]}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {[0, 1, 2].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Faculty Performance Metrics</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700">Average Rating</span>
                        <span className="text-sm text-gray-600">4.4/5.0</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '88%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700">Research Publications</span>
                        <span className="text-sm text-gray-600">50 total</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700">Teaching Load</span>
                        <span className="text-sm text-gray-600">Balanced</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'placements' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                  title="Students Placed"
                  value={totalPlacements}
                  icon={Users}
                  change="Out of 105 final year"
                  changeType="positive"
                />
                <StatCard
                  title="Placement Rate"
                  value="81%"
                  icon={TrendingUp}
                  change="Above college average"
                  changeType="positive"
                />
                <StatCard
                  title="Avg Package"
                  value={`₹${avgPackage}L`}
                  icon={Award}
                  change="Per annum"
                  changeType="positive"
                />
              </div>

              <DataTable columns={placementColumns} data={processedPlacementData} />
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Company-wise Placements</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={placementData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="company" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="students" fill="#3B82F6" name="Students Placed" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}