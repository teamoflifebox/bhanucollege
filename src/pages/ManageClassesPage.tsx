import React, { useState } from 'react';
import { Users, Plus, Edit, Trash2, Calendar, Clock, MapPin } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import StatCard from '../components/UI/StatCard';
import DataTable from '../components/UI/DataTable';

const classesData = [
  {
    id: '1',
    name: 'CS-A',
    department: 'Computer Science',
    semester: 3,
    section: 'A',
    students: 50,
    faculty: 'Dr. Sarah Wilson',
    room: 'Room 101',
    schedule: 'Mon, Wed, Fri - 9:00 AM',
    subject: 'Data Structures',
  },
  {
    id: '2',
    name: 'CS-B',
    department: 'Computer Science',
    semester: 3,
    section: 'B',
    students: 48,
    faculty: 'Prof. John Davis',
    room: 'Room 102',
    schedule: 'Tue, Thu - 11:00 AM',
    subject: 'Algorithms',
  },
  {
    id: '3',
    name: 'CS-C',
    department: 'Computer Science',
    semester: 5,
    section: 'A',
    students: 45,
    faculty: 'Dr. Emily Brown',
    room: 'Lab 201',
    schedule: 'Mon, Wed - 2:00 PM',
    subject: 'Database Systems',
  },
];

const facultyList = [
  'Dr. Sarah Wilson',
  'Prof. John Davis',
  'Dr. Emily Brown',
  'Prof. Mike Johnson',
  'Dr. Lisa Chen',
];

const subjects = [
  'Data Structures',
  'Algorithms',
  'Database Systems',
  'Computer Networks',
  'Operating Systems',
  'Software Engineering',
];

export default function ManageClassesPage() {
  const { user } = useAuth();
  const [classes, setClasses] = useState(classesData);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingClass, setEditingClass] = useState<any>(null);
  const [newClass, setNewClass] = useState({
    name: '',
    department: user?.department || '',
    semester: '',
    section: '',
    subject: '',
    faculty: '',
    room: '',
    schedule: '',
    maxStudents: 50,
  });

  // Check permissions
  const canManageClasses = user?.role === 'hod' || user?.role === 'principal' || user?.role === 'director';

  if (!canManageClasses) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to manage classes.</p>
        </div>
      </div>
    );
  }

  const columns = [
    { key: 'name', label: 'Class Name' },
    { key: 'subject', label: 'Subject' },
    { key: 'faculty', label: 'Faculty' },
    { key: 'students', label: 'Students' },
    { key: 'room', label: 'Room' },
    { key: 'schedule', label: 'Schedule' },
    { key: 'actions', label: 'Actions' },
  ];

  const processedData = classes.map(classItem => ({
    ...classItem,
    actions: (
      <div className="flex space-x-2">
        <button
          onClick={() => editClass(classItem)}
          className="text-blue-600 hover:text-blue-800"
        >
          <Edit className="w-4 h-4" />
        </button>
        <button
          onClick={() => deleteClass(classItem.id)}
          className="text-red-600 hover:text-red-800"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    )
  }));

  const addClass = () => {
    if (!newClass.name || !newClass.subject || !newClass.faculty) {
      alert('Please fill all required fields');
      return;
    }

    const classData = {
      id: Date.now().toString(),
      ...newClass,
      students: 0,
      department: user?.department || newClass.department,
    };

    setClasses(prev => [classData, ...prev]);
    setNewClass({
      name: '',
      department: user?.department || '',
      semester: '',
      section: '',
      subject: '',
      faculty: '',
      room: '',
      schedule: '',
      maxStudents: 50,
    });
    setShowAddModal(false);
    alert('Class added successfully!');
  };

  const editClass = (classItem: any) => {
    setEditingClass(classItem);
    setNewClass(classItem);
    setShowAddModal(true);
  };

  const updateClass = () => {
    if (!newClass.name || !newClass.subject || !newClass.faculty) {
      alert('Please fill all required fields');
      return;
    }

    setClasses(prev =>
      prev.map(c =>
        c.id === editingClass.id ? { ...newClass, id: editingClass.id } : c
      )
    );
    
    setEditingClass(null);
    setNewClass({
      name: '',
      department: user?.department || '',
      semester: '',
      section: '',
      subject: '',
      faculty: '',
      room: '',
      schedule: '',
      maxStudents: 50,
    });
    setShowAddModal(false);
    alert('Class updated successfully!');
  };

  const deleteClass = (id: string) => {
    if (confirm('Are you sure you want to delete this class?')) {
      setClasses(prev => prev.filter(c => c.id !== id));
    }
  };

  const totalClasses = classes.length;
  const totalStudents = classes.reduce((sum, c) => sum + c.students, 0);
  const avgClassSize = Math.round(totalStudents / totalClasses);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Manage Classes</h1>
            <p className="text-primary-100 mt-1">
              Create and manage class schedules and assignments
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-white text-primary-600 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Class</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Classes"
          value={totalClasses}
          icon={Users}
          change="Active classes"
          changeType="neutral"
        />
        <StatCard
          title="Total Students"
          value={totalStudents}
          icon={Users}
          change="Enrolled students"
          changeType="positive"
        />
        <StatCard
          title="Avg Class Size"
          value={avgClassSize}
          icon={Users}
          change="Students per class"
          changeType="neutral"
        />
        <StatCard
          title="Active Faculty"
          value={new Set(classes.map(c => c.faculty)).size}
          icon={Users}
          change="Teaching faculty"
          changeType="positive"
        />
      </div>

      {/* Classes Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Class Schedule</h3>
        </div>
        
        <div className="p-6">
          <DataTable columns={columns} data={processedData} />
        </div>
      </div>

      {/* Add/Edit Class Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingClass ? 'Edit Class' : 'Add New Class'}
              </h3>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingClass(null);
                  setNewClass({
                    name: '',
                    department: user?.department || '',
                    semester: '',
                    section: '',
                    subject: '',
                    faculty: '',
                    room: '',
                    schedule: '',
                    maxStudents: 50,
                  });
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Class Name *
                </label>
                <input
                  type="text"
                  value={newClass.name}
                  onChange={(e) => setNewClass(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g., CS-A, ECE-B"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <select
                  value={newClass.subject}
                  onChange={(e) => setNewClass(prev => ({ ...prev, subject: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Select Subject</option>
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Semester
                </label>
                <select
                  value={newClass.semester}
                  onChange={(e) => setNewClass(prev => ({ ...prev, semester: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Select Semester</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                    <option key={sem} value={sem}>{sem}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section
                </label>
                <select
                  value={newClass.section}
                  onChange={(e) => setNewClass(prev => ({ ...prev, section: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Select Section</option>
                  {['A', 'B', 'C', 'D'].map(section => (
                    <option key={section} value={section}>{section}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Faculty *
                </label>
                <select
                  value={newClass.faculty}
                  onChange={(e) => setNewClass(prev => ({ ...prev, faculty: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Select Faculty</option>
                  {facultyList.map(faculty => (
                    <option key={faculty} value={faculty}>{faculty}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Room
                </label>
                <input
                  type="text"
                  value={newClass.room}
                  onChange={(e) => setNewClass(prev => ({ ...prev, room: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g., Room 101, Lab 201"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Students
                </label>
                <input
                  type="number"
                  value={newClass.maxStudents}
                  onChange={(e) => setNewClass(prev => ({ ...prev, maxStudents: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  min="1"
                  max="100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Schedule
                </label>
                <input
                  type="text"
                  value={newClass.schedule}
                  onChange={(e) => setNewClass(prev => ({ ...prev, schedule: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g., Mon, Wed, Fri - 9:00 AM"
                />
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingClass(null);
                  setNewClass({
                    name: '',
                    department: user?.department || '',
                    semester: '',
                    section: '',
                    subject: '',
                    faculty: '',
                    room: '',
                    schedule: '',
                    maxStudents: 50,
                  });
                }}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={editingClass ? updateClass : addClass}
                className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
              >
                {editingClass ? 'Update Class' : 'Add Class'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}