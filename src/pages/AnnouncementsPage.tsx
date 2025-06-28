import React, { useState } from 'react';
import { Megaphone, Plus, Edit, Trash2, Calendar, Users, Eye, Send } from 'lucide-react';
import StatCard from '../components/UI/StatCard';
import DataTable from '../components/UI/DataTable';

const announcementsData = [
  {
    id: '1',
    title: 'Annual Day Celebration 2024',
    content: 'We are excited to announce our Annual Day celebration on March 15, 2024. All students and faculty are invited to participate.',
    category: 'Event',
    audience: 'All',
    priority: 'High',
    status: 'Published',
    publishDate: '2024-01-15',
    author: 'Dr. Emily Johnson',
    views: 245,
  },
  {
    id: '2',
    title: 'Mid-term Examination Schedule',
    content: 'The mid-term examinations will commence from February 1, 2024. Please check your individual timetables.',
    category: 'Academic',
    audience: 'Students',
    priority: 'High',
    status: 'Published',
    publishDate: '2024-01-14',
    author: 'Dr. Emily Johnson',
    views: 189,
  },
  {
    id: '3',
    title: 'Faculty Development Program',
    content: 'A faculty development program on modern teaching methodologies will be conducted on February 10-12, 2024.',
    category: 'Training',
    audience: 'Faculty',
    priority: 'Medium',
    status: 'Draft',
    publishDate: '2024-01-13',
    author: 'Dr. Emily Johnson',
    views: 0,
  },
];

const categories = ['Event', 'Academic', 'Training', 'Infrastructure', 'General'];
const audiences = ['All', 'Students', 'Faculty', 'Staff'];
const priorities = ['Low', 'Medium', 'High', 'Urgent'];

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState(announcementsData);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<any>(null);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    category: 'General',
    audience: 'All',
    priority: 'Medium',
    status: 'Draft',
  });

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'category', label: 'Category' },
    { key: 'audience', label: 'Audience' },
    { key: 'priority', label: 'Priority' },
    { key: 'status', label: 'Status' },
    { key: 'publishDate', label: 'Date' },
    { key: 'views', label: 'Views' },
    { key: 'actions', label: 'Actions' },
  ];

  const processedData = announcements.map(announcement => ({
    ...announcement,
    priority: (
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
        announcement.priority === 'Urgent' ? 'bg-red-100 text-red-800' :
        announcement.priority === 'High' ? 'bg-orange-100 text-orange-800' :
        announcement.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
        'bg-green-100 text-green-800'
      }`}>
        {announcement.priority}
      </span>
    ),
    status: (
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
        announcement.status === 'Published' 
          ? 'bg-green-100 text-green-800' 
          : 'bg-gray-100 text-gray-800'
      }`}>
        {announcement.status}
      </span>
    ),
    actions: (
      <div className="flex space-x-2">
        <button
          onClick={() => setSelectedAnnouncement(announcement)}
          className="text-blue-600 hover:text-blue-800"
        >
          <Eye className="w-4 h-4" />
        </button>
        <button className="text-green-600 hover:text-green-800">
          <Edit className="w-4 h-4" />
        </button>
        <button
          onClick={() => deleteAnnouncement(announcement.id)}
          className="text-red-600 hover:text-red-800"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    )
  }));

  const createAnnouncement = () => {
    if (!newAnnouncement.title || !newAnnouncement.content) {
      alert('Please fill all required fields');
      return;
    }

    const announcement = {
      id: Date.now().toString(),
      ...newAnnouncement,
      publishDate: new Date().toISOString().split('T')[0],
      author: 'Dr. Emily Johnson',
      views: 0,
    };

    setAnnouncements(prev => [announcement, ...prev]);
    setNewAnnouncement({
      title: '',
      content: '',
      category: 'General',
      audience: 'All',
      priority: 'Medium',
      status: 'Draft',
    });
    setShowCreateModal(false);
    alert('Announcement created successfully!');
  };

  const deleteAnnouncement = (id: string) => {
    if (confirm('Are you sure you want to delete this announcement?')) {
      setAnnouncements(prev => prev.filter(a => a.id !== id));
    }
  };

  const publishAnnouncement = (id: string) => {
    setAnnouncements(prev =>
      prev.map(a =>
        a.id === id ? { ...a, status: 'Published' } : a
      )
    );
    alert('Announcement published successfully!');
  };

  const totalAnnouncements = announcements.length;
  const publishedAnnouncements = announcements.filter(a => a.status === 'Published').length;
  const totalViews = announcements.reduce((sum, a) => sum + a.views, 0);
  const draftAnnouncements = announcements.filter(a => a.status === 'Draft').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Announcements</h1>
            <p className="text-primary-100 mt-1">
              Create and manage institutional announcements
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-white text-primary-600 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Announcement</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Announcements"
          value={totalAnnouncements}
          icon={Megaphone}
          change="All time"
          changeType="neutral"
        />
        <StatCard
          title="Published"
          value={publishedAnnouncements}
          icon={Send}
          change="Currently active"
          changeType="positive"
        />
        <StatCard
          title="Total Views"
          value={totalViews}
          icon={Eye}
          change="Engagement metric"
          changeType="positive"
        />
        <StatCard
          title="Drafts"
          value={draftAnnouncements}
          icon={Edit}
          change="Pending publication"
          changeType="neutral"
        />
      </div>

      {/* Announcements Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">All Announcements</h3>
        </div>
        
        <div className="p-6">
          <DataTable columns={columns} data={processedData} />
        </div>
      </div>

      {/* Create Announcement Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Create New Announcement</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Enter announcement title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content *
                </label>
                <textarea
                  value={newAnnouncement.content}
                  onChange={(e) => setNewAnnouncement(prev => ({ ...prev, content: e.target.value }))}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Enter announcement content"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={newAnnouncement.category}
                    onChange={(e) => setNewAnnouncement(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Audience
                  </label>
                  <select
                    value={newAnnouncement.audience}
                    onChange={(e) => setNewAnnouncement(prev => ({ ...prev, audience: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {audiences.map(audience => (
                      <option key={audience} value={audience}>{audience}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <select
                    value={newAnnouncement.priority}
                    onChange={(e) => setNewAnnouncement(prev => ({ ...prev, priority: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {priorities.map(priority => (
                      <option key={priority} value={priority}>{priority}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setNewAnnouncement(prev => ({ ...prev, status: 'Draft' }));
                  createAnnouncement();
                }}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
              >
                Save as Draft
              </button>
              <button
                onClick={() => {
                  setNewAnnouncement(prev => ({ ...prev, status: 'Published' }));
                  createAnnouncement();
                }}
                className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
              >
                Publish Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Announcement Modal */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Announcement Details</h3>
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-xl font-semibold text-gray-900">{selectedAnnouncement.title}</h4>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                  <span>By {selectedAnnouncement.author}</span>
                  <span>•</span>
                  <span>{selectedAnnouncement.publishDate}</span>
                  <span>•</span>
                  <span>{selectedAnnouncement.views} views</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  selectedAnnouncement.priority === 'Urgent' ? 'bg-red-100 text-red-800' :
                  selectedAnnouncement.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                  selectedAnnouncement.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {selectedAnnouncement.priority} Priority
                </span>
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  {selectedAnnouncement.category}
                </span>
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                  {selectedAnnouncement.audience}
                </span>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-900 whitespace-pre-wrap">{selectedAnnouncement.content}</p>
              </div>
            </div>
            
            <div className="mt-6 flex justify-between">
              <div>
                {selectedAnnouncement.status === 'Draft' && (
                  <button
                    onClick={() => {
                      publishAnnouncement(selectedAnnouncement.id);
                      setSelectedAnnouncement(null);
                    }}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Publish</span>
                  </button>
                )}
              </div>
              <button
                onClick={() => setSelectedAnnouncement(null)}
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