import React, { useState } from 'react';
import { FileText, Download, Calendar, TrendingUp, Award, BarChart3, PieChart, Users, BookOpen, Target, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart as RechartsPieChart, Cell, AreaChart, Area } from 'recharts';
import StatCard from '../components/UI/StatCard';
import { useAuth } from '../contexts/AuthContext';

const semesterData = [
  { semester: 'Sem 1', gpa: 8.2, credits: 20, attendance: 92, subjects: 6 },
  { semester: 'Sem 2', gpa: 8.5, credits: 22, attendance: 89, subjects: 6 },
  { semester: 'Sem 3', gpa: 8.8, credits: 21, attendance: 94, subjects: 5 },
  { semester: 'Sem 4', gpa: 8.6, credits: 23, attendance: 91, subjects: 6 },
  { semester: 'Sem 5', gpa: 8.9, credits: 22, attendance: 93, subjects: 5 },
  { semester: 'Sem 6', gpa: 9.1, credits: 24, attendance: 95, subjects: 6 },
];

const subjectPerformance = [
  { subject: 'Mathematics', score: 85, grade: 'A', credits: 4, attendance: 92 },
  { subject: 'Physics', score: 78, grade: 'B+', credits: 3, attendance: 88 },
  { subject: 'Chemistry', score: 92, grade: 'A+', credits: 4, attendance: 95 },
  { subject: 'Computer Science', score: 88, grade: 'A', credits: 4, attendance: 90 },
  { subject: 'English', score: 75, grade: 'B+', credits: 2, attendance: 85 },
  { subject: 'Engineering Drawing', score: 82, grade: 'A', credits: 3, attendance: 89 },
];

const gradeDistribution = [
  { grade: 'A+', count: 8, percentage: 33, color: '#10B981' },
  { grade: 'A', count: 10, percentage: 42, color: '#3B82F6' },
  { grade: 'B+', count: 4, percentage: 17, color: '#F59E0B' },
  { grade: 'B', count: 2, percentage: 8, color: '#EF4444' },
];

const attendanceData = [
  { month: 'Jan', percentage: 92, classes: 22 },
  { month: 'Feb', percentage: 89, classes: 20 },
  { month: 'Mar', percentage: 94, classes: 23 },
  { month: 'Apr', percentage: 91, classes: 21 },
  { month: 'May', percentage: 93, classes: 19 },
  { month: 'Jun', percentage: 95, classes: 24 },
];

const reportTypes = [
  { 
    id: 'academic', 
    title: 'Academic Performance Report', 
    description: 'Comprehensive academic performance with grades and GPA analysis',
    icon: Award,
    color: 'bg-blue-500',
    features: ['Semester-wise GPA', 'Subject Performance', 'Grade Distribution', 'Credit Analysis']
  },
  { 
    id: 'attendance', 
    title: 'Attendance Analysis Report', 
    description: 'Detailed attendance tracking and analysis across all subjects',
    icon: Calendar,
    color: 'bg-green-500',
    features: ['Monthly Attendance', 'Subject-wise Tracking', 'Trend Analysis', 'Compliance Status']
  },
  { 
    id: 'semester', 
    title: 'Semester Progress Report', 
    description: 'Complete semester performance with comparative analysis',
    icon: BarChart3,
    color: 'bg-purple-500',
    features: ['Progress Tracking', 'Comparative Analysis', 'Performance Trends', 'Goal Achievement']
  },
  { 
    id: 'transcript', 
    title: 'Official Academic Transcript', 
    description: 'Official document with complete academic record',
    icon: FileText,
    color: 'bg-indigo-500',
    features: ['Official Seal', 'Complete Record', 'Verification Code', 'Digital Signature']
  },
  { 
    id: 'consolidated', 
    title: 'Consolidated Report', 
    description: 'All-in-one comprehensive report with complete academic overview',
    icon: Target,
    color: 'bg-orange-500',
    features: ['Complete Overview', 'All Metrics', 'Visual Analytics', 'Executive Summary']
  },
  { 
    id: 'custom', 
    title: 'Custom Report Builder', 
    description: 'Build custom reports with selected metrics and date ranges',
    icon: PieChart,
    color: 'bg-pink-500',
    features: ['Custom Metrics', 'Date Range Selection', 'Export Options', 'Personalized Layout']
  },
];

export default function ReportsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedReport, setSelectedReport] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const currentGPA = (semesterData.reduce((sum, sem) => sum + sem.gpa, 0) / semesterData.length).toFixed(2);
  const totalCredits = semesterData.reduce((sum, sem) => sum + sem.credits, 0);
  const avgAttendance = Math.round(attendanceData.reduce((sum, month) => sum + month.percentage, 0) / attendanceData.length);
  const avgScore = Math.round(subjectPerformance.reduce((sum, sub) => sum + sub.score, 0) / subjectPerformance.length);

  const generateReport = async (reportType: string) => {
    setSelectedReport(reportType);
    setIsGenerating(true);
    
    // Simulate report generation with realistic timing
    const reportTime = Math.random() * 3000 + 2000; // 2-5 seconds
    
    setTimeout(() => {
      setIsGenerating(false);
      setSelectedReport('');
      
      // Create a mock download
      const reportData = {
        type: reportType,
        student: user?.name,
        rollNumber: user?.rollNumber,
        department: user?.department,
        generatedAt: new Date().toISOString(),
        data: {
          gpa: currentGPA,
          attendance: avgAttendance,
          credits: totalCredits,
          subjects: subjectPerformance.length
        }
      };
      
      const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${reportType.replace(/\s+/g, '_')}_${user?.rollNumber || 'report'}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      alert(`${reportType} generated and downloaded successfully!`);
    }, reportTime);
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Header with Gradient */}
      <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 rounded-xl p-8 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Academic Reports & Analytics</h1>
              <p className="text-primary-100 text-lg">
                Generate comprehensive reports and analyze your academic performance
              </p>
              <div className="flex items-center space-x-6 mt-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>{user?.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4" />
                  <span>{user?.department}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Academic Year 2024-25</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <BarChart3 className="w-16 h-16 text-white/80" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Cumulative GPA</p>
              <p className="text-3xl font-bold mt-1">{currentGPA}</p>
              <p className="text-blue-100 text-xs mt-1">Out of 10.0</p>
            </div>
            <Award className="h-8 w-8 text-blue-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Attendance Rate</p>
              <p className="text-3xl font-bold mt-1">{avgAttendance}%</p>
              <p className="text-green-100 text-xs mt-1">Overall average</p>
            </div>
            <Calendar className="h-8 w-8 text-green-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Total Credits</p>
              <p className="text-3xl font-bold mt-1">{totalCredits}</p>
              <p className="text-purple-100 text-xs mt-1">Completed</p>
            </div>
            <FileText className="h-8 w-8 text-purple-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Average Score</p>
              <p className="text-3xl font-bold mt-1">{avgScore}%</p>
              <p className="text-orange-100 text-xs mt-1">All subjects</p>
            </div>
            <TrendingUp className="h-8 w-8 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Enhanced Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200 bg-gray-50">
          <nav className="flex space-x-8 px-6">
            {[
              { key: 'overview', label: 'Performance Overview', icon: BarChart3 },
              { key: 'analytics', label: 'Advanced Analytics', icon: TrendingUp },
              { key: 'generate', label: 'Generate Reports', icon: FileText },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-all duration-200 flex items-center space-x-2 ${
                  activeTab === tab.key
                    ? 'border-primary-500 text-primary-600 bg-white rounded-t-lg -mb-px'
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
            <div className="space-y-8">
              {/* Semester Performance Chart */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-primary-600" />
                    Semester-wise GPA Trend
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={semesterData}>
                      <defs>
                        <linearGradient id="gpaGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="semester" stroke="#6B7280" />
                      <YAxis domain={[7, 10]} stroke="#6B7280" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #E5E7EB',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="gpa" 
                        stroke="#3B82F6" 
                        strokeWidth={3}
                        fill="url(#gpaGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <PieChart className="w-5 h-5 mr-2 text-primary-600" />
                    Grade Distribution
                  </h3>
                  {/* <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={gradeDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="count"
                        label={({ grade, percentage }) => `${grade}: ${percentage}%`}
                      >
                        {gradeDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer> */}
                </div>
              </div>

              {/* Subject Performance */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-primary-600" />
                  Subject-wise Performance Analysis
                </h3>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={subjectPerformance} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="subject" stroke="#6B7280" />
                    <YAxis stroke="#6B7280" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #E5E7EB',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Bar dataKey="score" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Performance Insights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                  <h3 className="text-lg font-semibold text-green-800 mb-4">Academic Strengths</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-green-700">Highest GPA Semester</span>
                      <span className="font-semibold text-green-800">Sem 6 (9.1)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-green-700">Best Subject</span>
                      <span className="font-semibold text-green-800">Chemistry (92%)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-green-700">Consistency</span>
                      <span className="font-semibold text-green-800">Improving Trend</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                  <h3 className="text-lg font-semibold text-blue-800 mb-4">Growth Opportunities</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-blue-700">Focus Area</span>
                      <span className="font-semibold text-blue-800">English (75%)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-700">Attendance Goal</span>
                      <span className="font-semibold text-blue-800">Maintain 95%+</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-700">Target GPA</span>
                      <span className="font-semibold text-blue-800">9.5+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-8">
              {/* Attendance Analytics */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-primary-600" />
                  Monthly Attendance Analysis
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="month" stroke="#6B7280" />
                    <YAxis domain={[80, 100]} stroke="#6B7280" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #E5E7EB',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="percentage" 
                      stroke="#10B981" 
                      strokeWidth={3}
                      dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Comparative Analysis */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Performance Metrics</h4>
                  <div className="space-y-4">
                    {[
                      { label: 'Academic Performance', value: 88, color: 'bg-blue-500' },
                      { label: 'Attendance Rate', value: 93, color: 'bg-green-500' },
                      { label: 'Assignment Completion', value: 95, color: 'bg-purple-500' },
                      { label: 'Participation', value: 85, color: 'bg-orange-500' },
                    ].map((metric, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-700">{metric.label}</span>
                          <span className="text-sm text-gray-600">{metric.value}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`${metric.color} h-2 rounded-full transition-all duration-500`}
                            style={{ width: `${metric.value}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Class Ranking</h4>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary-600 mb-2">7th</div>
                    <div className="text-gray-600 mb-4">out of 50 students</div>
                    <div className="bg-primary-50 rounded-lg p-4">
                      <div className="text-sm text-primary-700">
                        You're in the top <span className="font-semibold">14%</span> of your class
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'generate' && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <FileText className="h-16 w-16 text-primary-600 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Generate Academic Reports</h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Choose from our comprehensive report templates or create custom reports tailored to your needs
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reportTypes.map((report) => (
                  <div key={report.id} className="group bg-white rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all duration-300 overflow-hidden">
                    <div className={`${report.color} p-4`}>
                      <div className="flex items-center justify-between text-white">
                        <report.icon className="h-8 w-8" />
                        <div className="text-right">
                          <div className="text-xs opacity-75">Report Type</div>
                          <div className="text-sm font-medium">Professional</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{report.title}</h4>
                      <p className="text-sm text-gray-600 mb-4">{report.description}</p>
                      
                      <div className="space-y-2 mb-6">
                        <div className="text-xs font-medium text-gray-700 mb-2">Includes:</div>
                        {report.features.map((feature, index) => (
                          <div key={index} className="flex items-center text-xs text-gray-600">
                            <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></div>
                            {feature}
                          </div>
                        ))}
                      </div>
                      
                      <button
                        onClick={() => generateReport(report.title)}
                        disabled={selectedReport === report.title || isGenerating}
                        className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                      >
                        {selectedReport === report.title ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            <span>Generating...</span>
                          </>
                        ) : (
                          <>
                            <Download className="h-4 w-4" />
                            <span>Generate Report</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Report Information */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 rounded-lg p-3">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-blue-900 mb-2">Report Information & Guidelines</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
                      <div className="space-y-2">
                        <p className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          Reports are generated in real-time (2-5 seconds)
                        </p>
                        <p className="flex items-center">
                          <Download className="w-4 h-4 mr-2" />
                          Available in PDF, Excel, and JSON formats
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p className="flex items-center">
                          <Award className="w-4 h-4 mr-2" />
                          All reports include digital verification
                        </p>
                        <p className="flex items-center">
                          <Users className="w-4 h-4 mr-2" />
                          Contact academic office for certified copies
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}