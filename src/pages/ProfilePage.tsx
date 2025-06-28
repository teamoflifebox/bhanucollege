import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit, Save, X, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function ProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+91 9876543210',
    address: '123 Main Street, City, State',
    dateOfBirth: '1995-06-15',
    bloodGroup: 'O+',
    emergencyContact: '+91 9876543211',
    parentName: 'John Doe Sr.',
    parentPhone: '+91 9876543212',
  });

  // Check if user can edit profile
  const canEdit = user?.role !== 'student';

  const handleSave = () => {
    // Save profile data
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    // Reset to original data
    setProfileData({
      name: user?.name || '',
      email: user?.email || '',
      phone: '+91 9876543210',
      address: '123 Main Street, City, State',
      dateOfBirth: '1995-06-15',
      bloodGroup: 'O+',
      emergencyContact: '+91 9876543211',
      parentName: 'John Doe Sr.',
      parentPhone: '+91 9876543212',
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Profile</h1>
            <p className="text-primary-100 mt-1">
              {canEdit ? 'Manage your profile information' : 'View your profile information'}
            </p>
          </div>
          {canEdit && !isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-white text-primary-600 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors flex items-center space-x-2"
            >
              <Edit className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
          )}
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          {/* Profile Header */}
          <div className="flex items-center space-x-6 mb-8">
            <div className="h-24 w-24 rounded-full bg-primary-100 flex items-center justify-center">
              <span className="text-3xl font-medium text-primary-600">
                {user?.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
              <p className="text-gray-600 capitalize">{user?.role}</p>
              {user?.department && (
                <p className="text-sm text-gray-500">{user?.department}</p>
              )}
              {user?.rollNumber && (
                <p className="text-sm text-gray-500">Roll No: {user?.rollNumber}</p>
              )}
              {user?.employeeId && (
                <p className="text-sm text-gray-500">Employee ID: {user?.employeeId}</p>
              )}
            </div>
          </div>

          {/* Role Restriction Notice */}
          {!canEdit && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-yellow-800">View Only Access</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    Students can view their profile information but cannot make changes. 
                    Contact the administration office for any updates.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Profile Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Email Address
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              ) : (
                <p className="text-gray-900 py-2">{profileData.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 inline mr-2" />
                Phone Number
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              ) : (
                <p className="text-gray-900 py-2">{profileData.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Date of Birth
              </label>
              {isEditing ? (
                <input
                  type="date"
                  value={profileData.dateOfBirth}
                  onChange={(e) => setProfileData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              ) : (
                <p className="text-gray-900 py-2">{new Date(profileData.dateOfBirth).toLocaleDateString()}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Blood Group
              </label>
              {isEditing ? (
                <select
                  value={profileData.bloodGroup}
                  onChange={(e) => setProfileData(prev => ({ ...prev, bloodGroup: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              ) : (
                <p className="text-gray-900 py-2">{profileData.bloodGroup}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                Address
              </label>
              {isEditing ? (
                <textarea
                  value={profileData.address}
                  onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              ) : (
                <p className="text-gray-900 py-2">{profileData.address}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Emergency Contact
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={profileData.emergencyContact}
                  onChange={(e) => setProfileData(prev => ({ ...prev, emergencyContact: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              ) : (
                <p className="text-gray-900 py-2">{profileData.emergencyContact}</p>
              )}
            </div>

            {user?.role === 'student' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Parent/Guardian Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.parentName}
                      onChange={(e) => setProfileData(prev => ({ ...prev, parentName: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{profileData.parentName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Parent/Guardian Phone
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profileData.parentPhone}
                      onChange={(e) => setProfileData(prev => ({ ...prev, parentPhone: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{profileData.parentPhone}</p>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Action Buttons */}
          {isEditing && canEdit && (
            <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handleCancel}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors flex items-center space-x-2"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
              <button
                onClick={handleSave}
                className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700 transition-colors flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}