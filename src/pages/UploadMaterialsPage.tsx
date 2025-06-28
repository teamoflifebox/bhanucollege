import React, { useState } from 'react';
import { Upload, FileText, Video, Image, Download, Trash2, Eye, Plus } from 'lucide-react';
import StatCard from '../components/UI/StatCard';
import DataTable from '../components/UI/DataTable';

const existingMaterials = [
  {
    id: '1',
    title: 'Data Structures - Lecture 1',
    subject: 'Data Structures',
    type: 'PDF',
    size: '2.5 MB',
    uploadDate: '2024-01-15',
    downloads: 45,
  },
  {
    id: '2',
    title: 'Algorithm Analysis Video',
    subject: 'Algorithms',
    type: 'Video',
    size: '125 MB',
    uploadDate: '2024-01-14',
    downloads: 32,
  },
  {
    id: '3',
    title: 'Database ER Diagram Examples',
    subject: 'Database Systems',
    type: 'PDF',
    size: '1.8 MB',
    uploadDate: '2024-01-12',
    downloads: 28,
  },
];

const subjects = [
  'Data Structures',
  'Algorithms',
  'Database Systems',
  'Computer Networks',
  'Operating Systems',
];

export default function UploadMaterialsPage() {
  const [activeTab, setActiveTab] = useState('upload');
  const [materials, setMaterials] = useState(existingMaterials);
  const [uploadForm, setUploadForm] = useState({
    title: '',
    subject: '',
    description: '',
    type: 'pdf',
  });
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      setSelectedFiles(prev => [...prev, ...files]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...files]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const uploadMaterials = () => {
    if (!uploadForm.title || !uploadForm.subject || selectedFiles.length === 0) {
      alert('Please fill all required fields and select files');
      return;
    }

    // Simulate upload
    const newMaterials = selectedFiles.map((file, index) => ({
      id: `new-${Date.now()}-${index}`,
      title: uploadForm.title,
      subject: uploadForm.subject,
      type: file.type.includes('video') ? 'Video' : file.type.includes('image') ? 'Image' : 'PDF',
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      uploadDate: new Date().toISOString().split('T')[0],
      downloads: 0,
    }));

    setMaterials(prev => [...newMaterials, ...prev]);
    
    // Reset form
    setUploadForm({ title: '', subject: '', description: '', type: 'pdf' });
    setSelectedFiles([]);
    
    alert('Materials uploaded successfully!');
  };

  const deleteMaterial = (id: string) => {
    if (confirm('Are you sure you want to delete this material?')) {
      setMaterials(prev => prev.filter(m => m.id !== id));
    }
  };

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'subject', label: 'Subject' },
    { key: 'type', label: 'Type' },
    { key: 'size', label: 'Size' },
    { key: 'uploadDate', label: 'Upload Date' },
    { key: 'downloads', label: 'Downloads' },
    { key: 'actions', label: 'Actions' },
  ];

  const processedMaterials = materials.map(material => ({
    ...material,
    type: (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${
        material.type === 'PDF' ? 'bg-red-100 text-red-800' :
        material.type === 'Video' ? 'bg-blue-100 text-blue-800' :
        'bg-green-100 text-green-800'
      }`}>
        {material.type === 'PDF' && <FileText className="w-3 h-3 mr-1" />}
        {material.type === 'Video' && <Video className="w-3 h-3 mr-1" />}
        {material.type === 'Image' && <Image className="w-3 h-3 mr-1" />}
        {material.type}
      </span>
    ),
    actions: (
      <div className="flex space-x-2">
        <button className="text-blue-600 hover:text-blue-800">
          <Eye className="w-4 h-4" />
        </button>
        <button className="text-green-600 hover:text-green-800">
          <Download className="w-4 h-4" />
        </button>
        <button 
          onClick={() => deleteMaterial(material.id)}
          className="text-red-600 hover:text-red-800"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    )
  }));

  const totalMaterials = materials.length;
  const totalDownloads = materials.reduce((sum, m) => sum + m.downloads, 0);
  const recentUploads = materials.filter(m => {
    const uploadDate = new Date(m.uploadDate);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return uploadDate >= weekAgo;
  }).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold">Upload Study Materials</h1>
        <p className="text-primary-100 mt-1">
          Share resources and materials with your students
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Materials"
          value={totalMaterials}
          icon={FileText}
          change="All subjects"
          changeType="neutral"
        />
        <StatCard
          title="Total Downloads"
          value={totalDownloads}
          icon={Download}
          change="Student downloads"
          changeType="positive"
        />
        <StatCard
          title="Recent Uploads"
          value={recentUploads}
          icon={Upload}
          change="This week"
          changeType="neutral"
        />
        <StatCard
          title="Subjects Covered"
          value={new Set(materials.map(m => m.subject)).size}
          icon={Plus}
          change="Active subjects"
          changeType="positive"
        />
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {[
              { key: 'upload', label: 'Upload Materials' },
              { key: 'manage', label: 'Manage Materials' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.key
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'upload' && (
            <div className="space-y-6">
              {/* Upload Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Material Title *
                  </label>
                  <input
                    type="text"
                    value={uploadForm.title}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter material title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    value={uploadForm.subject}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, subject: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Select Subject</option>
                    {subjects.map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={uploadForm.description}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Brief description of the material"
                  />
                </div>
              </div>

              {/* File Upload Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive 
                    ? 'border-primary-500 bg-primary-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Drop files here or click to browse
                </h3>
                <p className="text-gray-600 mb-4">
                  Support for PDF, DOC, PPT, images, and videos up to 100MB
                </p>
                <input
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png,.mp4,.avi,.mov"
                />
                <label
                  htmlFor="file-upload"
                  className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700 transition-colors cursor-pointer inline-block"
                >
                  Choose Files
                </label>
              </div>

              {/* Selected Files */}
              {selectedFiles.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Selected Files</h4>
                  <div className="space-y-2">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-white p-3 rounded border">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{file.name}</p>
                            <p className="text-xs text-gray-500">
                              {(file.size / (1024 * 1024)).toFixed(1)} MB
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFile(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Upload Button */}
              <div className="flex justify-end">
                <button
                  onClick={uploadMaterials}
                  className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700 transition-colors flex items-center space-x-2"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload Materials</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'manage' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Uploaded Materials</h3>
                <button
                  onClick={() => setActiveTab('upload')}
                  className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm hover:bg-primary-700 transition-colors flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Upload New</span>
                </button>
              </div>
              
              <DataTable columns={columns} data={processedMaterials} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}