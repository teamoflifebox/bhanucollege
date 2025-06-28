import React, { useState } from 'react';
import { BookOpen, Download, Calendar, Award, FileText, Clock, Star } from 'lucide-react';
import StatCard from '../components/UI/StatCard';
import DataTable from '../components/UI/DataTable';

const subjects = [
  { 
    code: 'CS301', 
    name: 'Data Structures', 
    credits: 4, 
    faculty: 'Dr. Sarah Wilson',
    grade: 'A',
    gpa: 9.0,
    attendance: 92
  },
  { 
    code: 'CS302', 
    name: 'Algorithms', 
    credits: 4, 
    faculty: 'Prof. John Davis',
    grade: 'A-',
    gpa: 8.5,
    attendance: 88
  },
  { 
    code: 'CS303', 
    name: 'Database Systems', 
    credits: 3, 
    faculty: 'Dr. Emily Brown',
    grade: 'A+',
    gpa: 9.5,
    attendance: 95
  },
  { 
    code: 'CS304', 
    name: 'Computer Networks', 
    credits: 3, 
    faculty: 'Prof. Mike Johnson',
    grade: 'B+',
    gpa: 7.5,
    attendance: 82
  },
];

const assignments = [
  { 
    subject: 'Data Structures', 
    title: 'Binary Tree Implementation', 
    dueDate: '2024-01-20',
    status: 'Submitted',
    score: 85
  },
  { 
    subject: 'Algorithms', 
    title: 'Sorting Algorithm Analysis', 
    dueDate: '2024-01-22',
    status: 'Pending',
    score: null
  },
  { 
    subject: 'Database Systems', 
    title: 'ER Diagram Design', 
    dueDate: '2024-01-25',
    status: 'Not Started',
    score: null
  },
];

const studyMaterials = [
  { 
    subject: 'Data Structures', 
    title: 'Lecture Notes - Trees and Graphs', 
    type: 'PDF',
    uploadDate: '2024-01-15',
    size: '2.5 MB'
  },
  { 
    subject: 'Algorithms', 
    title: 'Practice Problems Set 3', 
    type: 'PDF',
    uploadDate: '2024-01-14',
    size: '1.8 MB'
  },
  { 
    subject: 'Database Systems', 
    title: 'SQL Tutorial Videos', 
    type: 'Video',
    uploadDate: '2024-01-12',
    size: '45 MB'
  },
];

const examSchedule = [
  { 
    subject: 'Data Structures', 
    type: 'Mid-term', 
    date: '2024-02-15',
    time: '10:00 AM',
    duration: '3 hours',
    room: 'Hall A'
  },
  { 
    subject: 'Algorithms', 
    type: 'Mid-term', 
    date: '2024-02-17',
    time: '02:00 PM',
    duration: '3 hours',
    room: 'Hall B'
  },
];

export default function AcademicsPage() {
  const [activeTab, setActiveTab] = useState('subjects');

  const subjectColumns = [
    { key: 'code', label: 'Code' },
    { key: 'name', label: 'Subject' },
    { key: 'credits', label: 'Credits' },
    { key: 'faculty', label: 'Faculty' },
    { key: 'grade', label: 'Grade' },
    { key: 'attendance', label: 'Attendance' },
  ];

  const assignmentColumns = [
    { key: 'subject', label: 'Subject' },
    { key: 'title', label: 'Assignment' },
    { key: 'dueDate', label: 'Due Date' },
    { key: 'status', label: 'Status' },
    { key: 'score', label: 'Score' },
  ];

  const materialColumns = [
    { key: 'subject', label: 'Subject' },
    { key: 'title', label: 'Material' },
    { key: 'type', label: 'Type' },
    { key: 'uploadDate', label: 'Upload Date' },
    { key: 'action', label: 'Action' },
  ];

  const examColumns = [
    { key: 'subject', label: 'Subject' },
    { key: 'type', label: 'Exam Type' },
    { key: 'date', label: 'Date' },
    { key: 'time', label: 'Time' },
    { key: 'room', label: 'Room' },
  ];

  const processedSubjects = subjects.map(subject => ({
    ...subject,
    attendance: `${subject.attendance}%`,
    grade: (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${
        subject.gpa >= 9 ? 'bg-green-100 text-green-800' :
        subject.gpa >= 8 ? 'bg-blue-100 text-blue-800' :
        subject.gpa >= 7 ? 'bg-yellow-100 text-yellow-800' :
        'bg-red-100 text-red-800'
      }`}>
        {subject.grade}
      </span>
    )
  }));

  const processedAssignments = assignments.map(assignment => ({
    ...assignment,
    status: (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${
        assignment.status === 'Submitted' ? 'bg-green-100 text-green-800' :
        assignment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
        'bg-red-100 text-red-800'
      }`}>
        {assignment.status}
      </span>
    ),
    score: assignment.score ? `${assignment.score}/100` : '-'
  }));

  const processedMaterials = studyMaterials.map(material => ({
    ...material,
    action: (
      <button className="bg-primary-600 text-white px-3 py-1 rounded text-xs hover:bg-primary-700 transition-colors flex items-center space-x-1">
        <Download className="w-3 h-3" />
        <span>Download</span>
      </button>
    )
  }));

  const currentGPA = (subjects.reduce((sum, subject) => sum + subject.gpa, 0) / subjects.length).toFixed(2);
  const totalCredits = subjects.reduce((sum, subject) => sum + subject.credits, 0);
  const pendingAssignments = assignments.filter(a => a.status !== 'Submitted').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold">Academic Dashboard</h1>
        <p className="text-primary-100 mt-1">
          Track your academic progress and access study materials
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Current GPA"
          value={currentGPA}
          icon={Award}
          change="Out of 10.0"
          changeType="positive"
        />
        <StatCard
          title="Total Credits"
          value={totalCredits}
          icon={BookOpen}
          change="This semester"
          changeType="neutral"
        />
        <StatCard
          title="Pending Assignments"
          value={pendingAssignments}
          icon={Clock}
          change="Due soon"
          changeType={pendingAssignments > 0 ? "negative" : "positive"}
        />
        <StatCard
          title="Subjects Enrolled"
          value={subjects.length}
          icon={FileText}
          change="Active courses"
          changeType="neutral"
        />
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {[
              { key: 'subjects', label: 'Subjects', icon: BookOpen },
              { key: 'assignments', label: 'Assignments', icon: FileText },
              { key: 'materials', label: 'Study Materials', icon: Download },
              { key: 'exams', label: 'Exam Schedule', icon: Calendar },
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
          {activeTab === 'subjects' && (
            <DataTable columns={subjectColumns} data={processedSubjects} />
          )}

          {activeTab === 'assignments' && (
            <div className="space-y-4">
              <DataTable columns={assignmentColumns} data={processedAssignments} />
              {pendingAssignments > 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-yellow-800">Pending Assignments</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        You have {pendingAssignments} assignment{pendingAssignments > 1 ? 's' : ''} pending. 
                        Make sure to submit them before the due date.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'materials' && (
            <DataTable columns={materialColumns} data={processedMaterials} />
          )}

          {activeTab === 'exams' && (
            <div className="space-y-4">
              <DataTable columns={examColumns} data={examSchedule} />
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-800">Exam Guidelines</h4>
                    <div className="text-sm text-blue-700 mt-1 space-y-1">
                      <p>• Arrive 30 minutes before the exam time</p>
                      <p>• Bring your student ID and required stationery</p>
                      <p>• Mobile phones are not allowed in the exam hall</p>
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