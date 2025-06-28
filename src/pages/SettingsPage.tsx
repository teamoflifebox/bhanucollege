import React, { useState } from 'react';
import { User, Bell, Shield, Palette, Globe, Smartphone, Mail, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function SettingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    academic: true,
    fees: true,
    attendance: true,
    announcements: false,
  });

  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+91 9876543210',
    address: '123 Main Street, City, State',
    emergencyContact: '+91 9876543211',
    bloodGroup: 'O+',
  });

  const handleNotificationChange = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleProfileChange = (key: string, value: string) => {
    setProfile(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const saveSettings = () => {
    alert('Settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-primary-100 mt-1">
          Manage your account preferences and privacy settings
        </p>
      </div>

      {/* Settings Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {[
              { key: 'profile', label: 'Profile', icon: User },
              { key: 'notifications', label: 'Notifications', icon: Bell },
              { key: 'privacy', label: 'Privacy & Security', icon: Shield },
              { key: 'preferences', label: 'Preferences', icon: Palette },
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
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="flex items-center space-x-6">
                <div className="h-20 w-20 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-2xl font-medium text-primary-600">
                    {user?.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{user?.name}</h3>
                  <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
                  <button className="mt-2 text-sm text-primary-600 hover:text-primary-700">
                    Change Profile Picture
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => handleProfileChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleProfileChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => handleProfileChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Blood Group
                  </label>
                  <select
                    value={profile.bloodGroup}
                    onChange={(e) => handleProfileChange('bloodGroup', e.target.value)}
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
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <textarea
                    value={profile.address}
                    onChange={(e) => handleProfileChange('address', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Emergency Contact
                  </label>
                  <input
                    type="tel"
                    value={profile.emergencyContact}
                    onChange={(e) => handleProfileChange('emergencyContact', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Channels</h3>
                <div className="space-y-4">
                  {[
                    { key: 'email', label: 'Email Notifications', icon: Mail, description: 'Receive notifications via email' },
                    { key: 'sms', label: 'SMS Notifications', icon: Smartphone, description: 'Receive notifications via SMS' },
                    { key: 'push', label: 'Push Notifications', icon: Bell, description: 'Receive push notifications in browser' },
                  ].map((channel) => (
                    <div key={channel.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <channel.icon className="h-5 w-5 text-gray-600" />
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">{channel.label}</h4>
                          <p className="text-sm text-gray-600">{channel.description}</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={notifications[channel.key as keyof typeof notifications]}
                          onChange={() => handleNotificationChange(channel.key)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Types</h3>
                <div className="space-y-4">
                  {[
                    { key: 'academic', label: 'Academic Updates', description: 'Assignments, grades, and course materials' },
                    { key: 'fees', label: 'Fee Reminders', description: 'Payment due dates and fee updates' },
                    { key: 'attendance', label: 'Attendance Alerts', description: 'Low attendance warnings' },
                    { key: 'announcements', label: 'General Announcements', description: 'College events and important notices' },
                  ].map((type) => (
                    <div key={type.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{type.label}</h4>
                        <p className="text-sm text-gray-600">{type.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={notifications[type.key as keyof typeof notifications]}
                          onChange={() => handleNotificationChange(type.key)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-yellow-800">Privacy & Security</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      Your data is protected with industry-standard security measures.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Lock className="h-5 w-5 text-gray-600" />
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Change Password</h4>
                        <p className="text-sm text-gray-600">Update your account password</p>
                      </div>
                    </div>
                    <button className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm hover:bg-primary-700 transition-colors">
                      Change Password
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Shield className="h-5 w-5 text-gray-600" />
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h4>
                        <p className="text-sm text-gray-600">Add an extra layer of security</p>
                      </div>
                    </div>
                    <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-300 transition-colors">
                      Enable 2FA
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <User className="h-5 w-5 text-gray-600" />
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Data Privacy</h4>
                        <p className="text-sm text-gray-600">Control who can see your information</p>
                      </div>
                    </div>
                    <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-300 transition-colors">
                      Manage Privacy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Globe className="h-5 w-5 text-gray-600" />
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Language</h4>
                        <p className="text-sm text-gray-600">Choose your preferred language</p>
                      </div>
                    </div>
                    <select className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                      <option value="en">English</option>
                      <option value="hi">Hindi</option>
                      <option value="ta">Tamil</option>
                      <option value="te">Telugu</option>
                    </select>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Palette className="h-5 w-5 text-gray-600" />
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Theme</h4>
                        <p className="text-sm text-gray-600">Choose your preferred theme</p>
                      </div>
                    </div>
                    <select className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="auto">Auto</option>
                    </select>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Globe className="h-5 w-5 text-gray-600" />
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Time Zone</h4>
                        <p className="text-sm text-gray-600">Set your local time zone</p>
                      </div>
                    </div>
                    <select className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                      <option value="IST">India Standard Time (IST)</option>
                      <option value="UTC">UTC</option>
                      <option value="EST">Eastern Standard Time</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="flex justify-end pt-6 border-t border-gray-200">
            <button
              onClick={saveSettings}
              className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}