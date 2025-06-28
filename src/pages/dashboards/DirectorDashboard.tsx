import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import { Building2, TrendingUp, DollarSign, Target, Globe, Award, Users, BarChart3 } from 'lucide-react';
import StatCard from '../../components/UI/StatCard';
import DataTable from '../../components/UI/DataTable';
import { useAuth } from '../../contexts/AuthContext';

const organizationStats = [
  { year: '2021', revenue: 450000000, students: 8500, colleges: 3 },
  { year: '2022', revenue: 520000000, students: 9200, colleges: 4 },
  { year: '2023', revenue: 610000000, students: 10100, colleges: 4 },
  { year: '2024', revenue: 720000000, students: 11200, colleges: 5 },
];

const collegePerformance = [
  { college: 'Oxford College of Engineering', students: 2490, revenue: 180000000, rating: 4.5 },
  { college: 'Oxford College of Arts & Science', students: 3200, revenue: 160000000, rating: 4.3 },
  { college: 'Oxford Medical College', students: 1800, revenue: 250000000, rating: 4.7 },
  { college: 'Oxford Business School', students: 2400, revenue: 120000000, rating: 4.4 },
  { college: 'Oxford Law College', students: 1312, revenue: 80000000, rating: 4.2 },
];

const strategicMetrics = [
  { metric: 'Market Share', current: 15, target: 20, unit: '%' },
  { metric: 'Student Satisfaction', current: 4.4, target: 4.6, unit: '/5' },
  { metric: 'Faculty Retention', current: 92, target: 95, unit: '%' },
  { metric: 'Research Publications', current: 180, target: 200, unit: 'papers' },
];

const financialData = [
  { quarter: 'Q1', revenue: 170000000, expenses: 145000000, profit: 25000000 },
  { quarter: 'Q2', revenue: 185000000, expenses: 158000000, profit: 27000000 },
  { quarter: 'Q3', revenue: 195000000, expenses: 165000000, profit: 30000000 },
  { quarter: 'Q4', revenue: 210000000, expenses: 178000000, profit: 32000000 },
];

export default function DirectorDashboard() {
  const { user } = useAuth();

  const collegeColumns = [
    { key: 'college', label: 'College Name' },
    { key: 'students', label: 'Students' },
    { key: 'revenue', label: 'Revenue (₹Cr)' },
    { key: 'rating', label: 'Rating' },
  ];

  const metricsColumns = [
    { key: 'metric', label: 'Strategic Metric' },
    { key: 'current', label: 'Current' },
    { key: 'target', label: 'Target' },
    { key: 'progress', label: 'Progress' },
  ];

  const processedCollegeData = collegePerformance.map(college => ({
    ...college,
    revenue: (college.revenue / 10000000).toFixed(1),
  }));

  const processedMetricsData = strategicMetrics.map(metric => ({
    ...metric,
    current: `${metric.current}${metric.unit}`,
    target: `${metric.target}${metric.unit}`,
    progress: (
      <div className="flex items-center space-x-2">
        <div className="w-20 bg-gray-200 rounded-full h-2">
          <div 
            className="bg-primary-600 h-2 rounded-full" 
            style={{ width: `${(metric.current / metric.target) * 100}%` }}
          ></div>
        </div>
        <span className="text-sm text-gray-600">
          {Math.round((metric.current / metric.target) * 100)}%
        </span>
      </div>
    )
  }));

  const currentYear = organizationStats[organizationStats.length - 1];
  const totalRevenue = currentYear.revenue;
  const totalStudents = currentYear.students;
  const totalColleges = currentYear.colleges;

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold">Director's Strategic Dashboard - {user?.name}</h1>
        <p className="text-primary-100 mt-1">
          Oxford Education Group | Employee ID: {user?.employeeId}
        </p>
      </div>

      {/* Strategic Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={`₹${(totalRevenue / 10000000).toFixed(0)}Cr`}
          icon={DollarSign}
          change="+18% YoY growth"
          changeType="positive"
        />
        <StatCard
          title="Total Students"
          value={totalStudents.toLocaleString()}
          icon={Users}
          change="Across all colleges"
          changeType="positive"
        />
        <StatCard
          title="Colleges"
          value={totalColleges}
          icon={Building2}
          change="Multi-campus network"
          changeType="positive"
        />
        <StatCard
          title="Market Position"
          value="#3"
          icon={Target}
          change="In regional ranking"
          changeType="positive"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Organization Growth */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Organization Growth</h3>
            <TrendingUp className="h-5 w-5 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={organizationStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip formatter={(value, name) => {
                if (name === 'revenue') return [`₹${(value / 10000000).toFixed(0)}Cr`, 'Revenue'];
                if (name === 'students') return [value.toLocaleString(), 'Students'];
                return [value, name];
              }} />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stackId="1"
                stroke="#3B82F6" 
                fill="#3B82F6"
                fillOpacity={0.6}
                name="revenue"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Financial Performance */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Quarterly Financial Performance</h3>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={financialData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="quarter" />
              <YAxis />
              <Tooltip formatter={(value) => `₹${(value / 10000000).toFixed(1)}Cr`} />
              <Bar dataKey="revenue" fill="#3B82F6" name="Revenue" />
              <Bar dataKey="profit" fill="#10B981" name="Profit" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Strategic Metrics */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Strategic KPIs</h3>
          <Target className="h-5 w-5 text-gray-400" />
        </div>
        <DataTable columns={metricsColumns} data={processedMetricsData} />
      </div>

      {/* College Performance */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">College Performance Matrix</h3>
          <Award className="h-5 w-5 text-gray-400" />
        </div>
        <DataTable columns={collegeColumns} data={processedCollegeData} />
      </div>

      {/* Strategic Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-primary-500 hover:bg-primary-50 transition-colors text-center">
          <Globe className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <span className="text-sm font-medium text-gray-700">Expansion Planning</span>
        </button>
        <button className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-primary-500 hover:bg-primary-50 transition-colors text-center">
          <BarChart3 className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <span className="text-sm font-medium text-gray-700">Strategic Analytics</span>
        </button>
        <button className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-primary-500 hover:bg-primary-50 transition-colors text-center">
          <Target className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <span className="text-sm font-medium text-gray-700">Goal Setting</span>
        </button>
        <button className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-primary-500 hover:bg-primary-50 transition-colors text-center">
          <Award className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <span className="text-sm font-medium text-gray-700">Accreditation</span>
        </button>
      </div>
    </div>
  );
}