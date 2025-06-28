import React, { useState } from 'react';
import { UserPlus, Save, X, Upload } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const departments = [
  'Computer Science',
  'Electronics',
  'Mechanical',
  'Civil',
  'Electrical',
  'Information Technology',
];

const courses = [
  'B.Tech',
  'M.Tech',
  'B.Sc',
  'M.Sc',
  'BCA',
  'MCA',
];

export default function AddStudentPage() {
  const { user } = useAuth();
  const [studentData, setStudentData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    department: user?.role === 'hod' ? user?.department : '',
    course: '',
    semester: '',
    admissionYear: new Date().getFullYear().toString(),
    bloodGroup: '',
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    previousSchool: '',
    percentage10th: '',
    percentage12th: '',
    entranceScore: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check permissions
  const canAddStudent = user?.role === 'hod' || user?.role === 'principal' || user?.role === 'director';

  if (!canAddStudent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to add students.</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'department', 'course'];
    const missingFields = requiredFields.filter(field => !studentData[field as keyof typeof studentData]);

    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
      setIsSubmitting(false);
      return;
    }

    // Generate roll number
    const rollNumber = `${studentData.department.substring(0, 2).toUpperCase()}${studentData.admissionYear}${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;

    // Simulate API call
    setTimeout(() => {
      alert(`Student added successfully! Roll Number: ${rollNumber}`);
      setIsSubmitting(false);
      // Reset form
      setStudentData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        gender: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        department: user?.role === 'hod' ? user?.department : '',
        course: '',
        semester: '',
        admissionYear: new Date().getFullYear().toString(),
        bloodGroup: '',
        parentName: '',
        parentPhone: '',
        parentEmail: '',
        previousSchool: '',
        percentage10th: '',
        percentage12th: '',
        entranceScore: '',
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold">Add New Student</h1>
        <p className="text-primary-100 mt-1">
          Register a new student in the system
        </p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  value={studentData.firstName}
                  onChange={(e) => setStudentData(prev => ({ ...prev, firstName: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  value={studentData.lastName}
                  onChange={(e) => setStudentData(prev => ({ ...prev, lastName: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={studentData.email}
                  onChange={(e) => setStudentData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  value={studentData.phone}
                  onChange={(e) => setStudentData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={studentData.dateOfBirth}
                  onChange={(e) => setStudentData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <select
                  value={studentData.gender}
                  onChange={(e) => setStudentData(prev => ({ ...prev, gender: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blood Group
                </label>
                <select
                  value={studentData.bloodGroup}
                  onChange={(e) => setStudentData(prev => ({ ...prev, bloodGroup: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Address Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="md:col-span-2 lg:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <textarea
                  value={studentData.address}
                  onChange={(e) => setStudentData(prev => ({ ...prev, address: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  value={studentData.city}
                  onChange={(e) => setStudentData(prev => ({ ...prev, city: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State
                </label>
                <input
                  type="text"
                  value={studentData.state}
                  onChange={(e) => setStudentData(prev => ({ ...prev, state: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pincode
                </label>
                <input
                  type="text"
                  value={studentData.pincode}
                  onChange={(e) => setStudentData(prev => ({ ...prev, pincode: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Academic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department *
                </label>
                <select
                  value={studentData.department}
                  onChange={(e) => setStudentData(prev => ({ ...prev, department: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                  disabled={user?.role === 'hod'}
                >
                  <option value="">Select Department</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course *
                </label>
                <select
                  value={studentData.course}
                  onChange={(e) => setStudentData(prev => ({ ...prev, course: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                >
                  <option value="">Select Course</option>
                  {courses.map(course => (
                    <option key={course} value={course}>{course}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Semester
                </label>
                <select
                  value={studentData.semester}
                  onChange={(e) => setStudentData(prev => ({ ...prev, semester: e.target.value }))}
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
                  Admission Year
                </label>
                <input
                  type="number"
                  value={studentData.admissionYear}
                  onChange={(e) => setStudentData(prev => ({ ...prev, admissionYear: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  min="2020"
                  max="2030"
                />
              </div>
            </div>
          </div>

          {/* Parent/Guardian Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Parent/Guardian Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Parent/Guardian Name
                </label>
                <input
                  type="text"
                  value={studentData.parentName}
                  onChange={(e) => setStudentData(prev => ({ ...prev, parentName: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Parent Phone
                </label>
                <input
                  type="tel"
                  value={studentData.parentPhone}
                  onChange={(e) => setStudentData(prev => ({ ...prev, parentPhone: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Parent Email
                </label>
                <input
                  type="email"
                  value={studentData.parentEmail}
                  onChange={(e) => setStudentData(prev => ({ ...prev, parentEmail: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>

          {/* Academic History */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Academic History</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Previous School/College
                </label>
                <input
                  type="text"
                  value={studentData.previousSchool}
                  onChange={(e) => setStudentData(prev => ({ ...prev, previousSchool: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  10th Percentage
                </label>
                <input
                  type="number"
                  value={studentData.percentage10th}
                  onChange={(e) => setStudentData(prev => ({ ...prev, percentage10th: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  min="0"
                  max="100"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  12th Percentage
                </label>
                <input
                  type="number"
                  value={studentData.percentage12th}
                  onChange={(e) => setStudentData(prev => ({ ...prev, percentage12th: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  min="0"
                  max="100"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Entrance Exam Score
                </label>
                <input
                  type="number"
                  value={studentData.entranceScore}
                  onChange={(e) => setStudentData(prev => ({ ...prev, entranceScore: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors flex items-center space-x-2"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Adding Student...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Add Student</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}