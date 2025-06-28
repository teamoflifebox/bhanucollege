import React, { useState } from 'react';
import { Users, Plus, Edit, Trash2, Mail, Phone, Award, BookOpen, Search, Filter } from 'lucide-react';
import StatCard from '../components/UI/StatCard';
import DataTable from '../components/UI/DataTable';

const facultyData = [
  {
    id: '1',
    name: 'Dr. Sarah Wilson',
    email: 'sarah.wilson@oxford.edu',
    phone: '+91 9876543210',
    department: 'Computer Science',
    designation: 'Associate Professor',
    experience: 8,
    qualification: 'Ph.D. Computer Science',
    subjects: ['Data Structures', 'Algorithms', 'Programming'],
    rating: 4.5,
    status: 'Active',
    joiningDate: '2016-07-15',
  },
  {
    id: '2',
    name: 'Prof. John Davis',
    email: 'john.davis@oxford.edu',
    phone: '+91 9876543211',
    department: 'Computer Science',
    designation: 'Professor',
    experience: 12,
    qualification: 'Ph.D. Software Engineering',
    subjects: ['Software Engineering', 'Project Management'],
    rating: 4.2,
    status: 'Active',
    joiningDate: '2012-08-20',
  },
  {
    id: '3',
    name: 'Dr. Emily Brown',
    email: 'emily.brown@oxford.edu',
    phone: '+91 9876543212',
    department: 'Computer Science',
    designation: 'Assistant Professor',
    experience: 6,
    qualification: 'Ph.D. Database Systems',
    subjects: ['Database Systems', 'Data Mining'],
    rating: 4.7,
    status: 'Active',
    joiningDate: '2018-01-10',
  },
  {
    id: '4',
    name: 'Prof. Mike Johnson',
    email: 'mike.johnson@oxford.edu',
    phone: '+91 9876543213',
    department: 'Computer Science',
    designation: 'Associate Professor',
    experience: 10,
    qualification: 'M.Tech Computer Networks',
    subjects: ['Computer Networks', 'Network Security'],
    rating: 4.1,
    status: 'On Leave',
    joiningDate: '2014-03-25',
  },
];

const designations = ['Professor', 'Associate Professor', 'Assistant Professor', 'Lecturer'];
const departments = ['Computer Science', 'Electronics', 'Mechanical', 'Civil'];

export default function FacultyManagementPage() {
  const [faculty, setFaculty] = useState(facultyData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedFaculty, setSelectedFaculty] = useState<any>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newFaculty, setNewFaculty] = useState({
    name: '',
    email: '',
    phone: '',
    department: 'Computer Science',
    designation: 'Assistant Professor',
    qualification: '',
    subjects: '',
  });

  const filteredFaculty = faculty.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || member.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'designation', label: 'Designation' },
    { key: 'experience', label: 'Experience' },
    { key: 'subjects', label: 'Subjects' },
    { key: 'rating', label: 'Rating' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: 'Actions' },
  ];

  const processedData = filteredFaculty.map(member => ({
    ...member,
    experience: `${member.experience} years`,
    subjects: member.subjects.slice(0, 2).join(', ') + (member.subjects.length > 2 ? '...' : ''),
    rating: (
      <div className="flex items-center space-x-1">
        <Award className="w-4 h-4 text-yellow-400" />
        <span>{member.rating}</span>
      </div>
    ),
    status: (
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
        member.status === 'Active' 
          ? 'bg-green-100 text-green-800' 
          : 'bg-yellow-100 text-yellow-800'
      }`}>
        {member.status}
      </span>
    ),
    actions: (
      <div className="flex space-x-2">
        <button
          onClick={() => setSelectedFaculty(member)}
          className="text-blue-600 hover:text-blue-800"
        >
          <Edit className="w-4 h-4" />
        </button>
        <button
          onClick={() => deleteFaculty(member.id)}
          className="text-red-600 hover:text-red-800"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    )
  }));

  const addFaculty = () => {
    if (!newFaculty.name || !newFaculty.email) {
      alert('Please fill all required fields');
      return;
    }

    const faculty = {
      id: Date.now().toString(),
      ...newFaculty,
      subjects: newFaculty.subjects.split(',').map(s => s.trim()),
      experience: 0,
      rating: 0,
      status: 'Active',
      joiningDate: new Date().toISOString().split('T')[0],
    };

    setFaculty(prev => [faculty, ...prev]);
    setNewFaculty({
      name: '',
      email: '',
      phone: '',
      department: 'Computer Science',
      designation: 'Assistant Professor',
      qualification: '',
      subjects: '',
    });
    setShowAddModal(false);
    alert('Faculty member added successfully!');
  };

  const deleteFaculty = (id: string) => {
    if (confirm('Are you sure you want to remove this faculty member?')) {
      setFaculty(prev => prev.filter(f => f.id !== id));
    }
  };

  const activeFaculty = faculty.filter(f => f.status === 'Active').length;
  const avgRating = (faculty.reduce((sum, f) => sum + f.rating, 0) / faculty.length).toFixed(1);
  const avgExperience = Math.round(faculty.reduce((sum, f) => sum + f.experience, 0) / faculty.length);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Faculty Management</h1>
            <p className="text-primary-100 mt-1">
              Manage faculty members and their information
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-white text-primary-600 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Faculty</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Faculty"
          value={faculty.length}
          icon={Users}
          change="Department strength"
          changeType="neutral"
        />
        <StatCard
          title="Active Faculty"
          value={activeFaculty}
          icon={Users}
          change="Currently teaching"
          changeType="positive"
        />
        <StatCard
          title="Avg Rating"
          value={avgRating}
          icon={Award}
          change="Student feedback"
          changeType="positive"
        />
        <StatCard
          title="Avg Experience"
          value={`${avgExperience} years`}
          icon={BookOpen}
          change="Teaching experience"
          changeType="positive"
        />
      </div>

      {/* Faculty Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <h3 className="text-lg font-semibold text-gray-900">Faculty Directory</h3>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search faculty..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="On Leave">On Leave</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <DataTable columns={columns} data={processedData} />
        </div>
      </div>

      {/* Add Faculty Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Add New Faculty</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={newFaculty.name}
                  onChange={(e) => setNewFaculty(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={newFaculty.email}
                  onChange={(e) => setNewFaculty(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={newFaculty.phone}
                  onChange={(e) => setNewFaculty(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department
                </label>
                <select
                  value={newFaculty.department}
                  onChange={(e) => setNewFaculty(prev => ({ ...prev, department: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Designation
                </label>
                <select
                  value={newFaculty.designation}
                  onChange={(e) => setNewFaculty(prev => ({ ...prev, designation: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {designations.map(designation => (
                    <option key={designation} value={designation}>{designation}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Qualification
                </label>
                <input
                  type="text"
                  value={newFaculty.qualification}
                  onChange={(e) => setNewFaculty(prev => ({ ...prev, qualification: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g., Ph.D. Computer Science"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subjects (comma separated)
                </label>
                <input
                  type="text"
                  value={newFaculty.subjects}
                  onChange={(e) => setNewFaculty(prev => ({ ...prev, subjects: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g., Data Structures, Algorithms, Programming"
                />
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addFaculty}
                className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
              >
                Add Faculty
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Faculty Details Modal */}
      {selectedFaculty && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Faculty Details</h3>
              <button
                onClick={() => setSelectedFaculty(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Personal Information</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Name</p>
                    <p className="text-gray-900">{selectedFaculty.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Email</p>
                    <p className="text-gray-900 flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      {selectedFaculty.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Phone</p>
                    <p className="text-gray-900 flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      {selectedFaculty.phone}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-4">Professional Information</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Designation</p>
                    <p className="text-gray-900">{selectedFaculty.designation}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Experience</p>
                    <p className="text-gray-900">{selectedFaculty.experience} years</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Qualification</p>
                    <p className="text-gray-900">{selectedFaculty.qualification}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Rating</p>
                    <p className="text-gray-900 flex items-center">
                      <Award className="w-4 h-4 mr-2 text-yellow-400" />
                      {selectedFaculty.rating}/5.0
                    </p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <p className="text-sm font-medium text-gray-700 mb-2">Subjects Teaching</p>
                <div className="flex flex-wrap gap-2">
                  {selectedFaculty.subjects.map((subject: string, index: number) => (
                    <span
                      key={index}
                      className="bg-primary-100 text-primary-800 px-2 py-1 rounded text-sm"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedFaculty(null)}
                className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}