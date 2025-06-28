import React, { useState } from 'react';
import { Calendar, Users, CheckCircle, X, Search, Filter, Clock } from 'lucide-react';
import StatCard from '../components/UI/StatCard';
import DataTable from '../components/UI/DataTable';

const students = [
  { id: '1', rollNo: 'CS2024001', name: 'Alice Johnson', status: null },
  { id: '2', rollNo: 'CS2024002', name: 'Bob Smith', status: null },
  { id: '3', rollNo: 'CS2024003', name: 'Carol Davis', status: null },
  { id: '4', rollNo: 'CS2024004', name: 'David Wilson', status: null },
  { id: '5', rollNo: 'CS2024005', name: 'Emma Brown', status: null },
  { id: '6', rollNo: 'CS2024006', name: 'Frank Miller', status: null },
  { id: '7', rollNo: 'CS2024007', name: 'Grace Lee', status: null },
  { id: '8', rollNo: 'CS2024008', name: 'Henry Taylor', status: null },
];

const classes = [
  { id: '1', name: 'Data Structures - CSE A', time: '09:00 AM', students: 50 },
  { id: '2', name: 'Algorithms - CSE B', time: '11:00 AM', students: 48 },
  { id: '3', name: 'Database Systems - CSE C', time: '02:00 PM', students: 45 },
];

export default function MarkAttendancePage() {
  const [selectedClass, setSelectedClass] = useState('');
  const [attendanceData, setAttendanceData] = useState(students);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredStudents = attendanceData.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const markAttendance = (studentId: string, status: 'present' | 'absent') => {
    setAttendanceData(prev =>
      prev.map(student =>
        student.id === studentId ? { ...student, status } : student
      )
    );
  };

  const markAllPresent = () => {
    setAttendanceData(prev =>
      prev.map(student => ({ ...student, status: 'present' as const }))
    );
  };

  const markAllAbsent = () => {
    setAttendanceData(prev =>
      prev.map(student => ({ ...student, status: 'absent' as const }))
    );
  };

  const submitAttendance = async () => {
    if (!selectedClass) {
      alert('Please select a class first');
      return;
    }

    const unmarkedStudents = attendanceData.filter(s => s.status === null);
    if (unmarkedStudents.length > 0) {
      const confirm = window.confirm(
        `${unmarkedStudents.length} students are unmarked. Do you want to mark them as absent?`
      );
      if (confirm) {
        setAttendanceData(prev =>
          prev.map(student =>
            student.status === null ? { ...student, status: 'absent' as const } : student
          )
        );
      } else {
        return;
      }
    }

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      alert('Attendance submitted successfully!');
      setIsSubmitting(false);
      // Reset form
      setAttendanceData(students);
      setSelectedClass('');
    }, 2000);
  };

  const columns = [
    { key: 'rollNo', label: 'Roll Number' },
    { key: 'name', label: 'Student Name' },
    { key: 'status', label: 'Attendance Status' },
    { key: 'actions', label: 'Actions' },
  ];

  const processedData = filteredStudents.map(student => ({
    ...student,
    status: student.status ? (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${
        student.status === 'present' 
          ? 'bg-green-100 text-green-800' 
          : 'bg-red-100 text-red-800'
      }`}>
        {student.status === 'present' ? (
          <CheckCircle className="w-3 h-3 mr-1" />
        ) : (
          <X className="w-3 h-3 mr-1" />
        )}
        {student.status === 'present' ? 'Present' : 'Absent'}
      </span>
    ) : (
      <span className="text-gray-500 text-sm">Not marked</span>
    ),
    actions: (
      <div className="flex space-x-2">
        <button
          onClick={() => markAttendance(student.id, 'present')}
          className={`px-2 py-1 text-xs rounded transition-colors ${
            student.status === 'present'
              ? 'bg-green-600 text-white'
              : 'bg-green-100 text-green-700 hover:bg-green-200'
          }`}
        >
          Present
        </button>
        <button
          onClick={() => markAttendance(student.id, 'absent')}
          className={`px-2 py-1 text-xs rounded transition-colors ${
            student.status === 'absent'
              ? 'bg-red-600 text-white'
              : 'bg-red-100 text-red-700 hover:bg-red-200'
          }`}
        >
          Absent
        </button>
      </div>
    )
  }));

  const presentCount = attendanceData.filter(s => s.status === 'present').length;
  const absentCount = attendanceData.filter(s => s.status === 'absent').length;
  const unmarkedCount = attendanceData.filter(s => s.status === null).length;
  const attendancePercentage = attendanceData.length > 0 ? Math.round((presentCount / attendanceData.length) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold">Mark Attendance</h1>
        <p className="text-primary-100 mt-1">
          Record student attendance for your classes
        </p>
      </div>

      {/* Class Selection */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Class</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {classes.map((classItem) => (
            <button
              key={classItem.id}
              onClick={() => setSelectedClass(classItem.id)}
              className={`p-4 rounded-lg border-2 transition-colors text-left ${
                selectedClass === classItem.id
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{classItem.name}</h4>
                  <p className="text-sm text-gray-600 flex items-center mt-1">
                    <Clock className="w-4 h-4 mr-1" />
                    {classItem.time}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center mt-1">
                    <Users className="w-4 h-4 mr-1" />
                    {classItem.students} students
                  </p>
                </div>
                {selectedClass === classItem.id && (
                  <CheckCircle className="w-6 h-6 text-primary-600" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedClass && (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Students"
              value={attendanceData.length}
              icon={Users}
              change="In selected class"
              changeType="neutral"
            />
            <StatCard
              title="Present"
              value={presentCount}
              icon={CheckCircle}
              change={`${attendancePercentage}% attendance`}
              changeType="positive"
            />
            <StatCard
              title="Absent"
              value={absentCount}
              icon={X}
              change="Students absent"
              changeType="negative"
            />
            <StatCard
              title="Unmarked"
              value={unmarkedCount}
              icon={Clock}
              change="Pending marking"
              changeType="neutral"
            />
          </div>

          {/* Attendance Marking */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
                <h3 className="text-lg font-semibold text-gray-900">Student Attendance</h3>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search students..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={markAllPresent}
                      className="bg-green-600 text-white px-3 py-2 rounded-md text-sm hover:bg-green-700 transition-colors"
                    >
                      Mark All Present
                    </button>
                    <button
                      onClick={markAllAbsent}
                      className="bg-red-600 text-white px-3 py-2 rounded-md text-sm hover:bg-red-700 transition-colors"
                    >
                      Mark All Absent
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <DataTable columns={columns} data={processedData} />
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                {presentCount} present, {absentCount} absent, {unmarkedCount} unmarked
              </div>
              <button
                onClick={submitAttendance}
                disabled={isSubmitting}
                className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Submit Attendance</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </>
      )}

      {!selectedClass && (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Class</h3>
          <p className="text-gray-600">
            Choose a class from above to start marking attendance for your students.
          </p>
        </div>
      )}
    </div>
  );
}