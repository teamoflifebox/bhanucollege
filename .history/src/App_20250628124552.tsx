import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import FeesPage from './pages/FeesPage';
import NotificationsPage from './pages/NotificationsPage';
import AttendancePage from './pages/AttendancePage';
import AcademicsPage from './pages/AcademicsPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import MarkAttendancePage from './pages/MarkAttendancePage';
import UploadMaterialsPage from './pages/UploadMaterialsPage';
import StudentFeedbackPage from './pages/StudentFeedbackPage';
import DepartmentAnalyticsPage from './pages/DepartmentAnalyticsPage';
import FacultyManagementPage from './pages/FacultyManagementPage';
import AnnouncementsPage from './pages/AnnouncementsPage';
import ProfilePage from './pages/ProfilePage';
import AddStudentPage from './pages/AddStudentPage';
import AddFacultyPage from './pages/AddFacultyPage';
import ManageClassesPage from './pages/ManageClassesPage';
import DashboardLayout from './components/Layout/DashboardLayout';
import LandingPage from './LandingPage';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  return user ? <>{children}</> : <Navigate to="/login" replace />;
}

function AppRoutes() {
  return (
    <Routes>
    <Route path="/" element={<LandingPage/>}/>
      <Route path="/login" element={<Login />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="fees" element={<FeesPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="attendance" element={<AttendancePage />} />
        <Route path="academics" element={<AcademicsPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="mark-attendance" element={<MarkAttendancePage />} />
        <Route path="upload" element={<UploadMaterialsPage />} />
        <Route path="feedback" element={<StudentFeedbackPage />} />
        <Route path="department" element={<DepartmentAnalyticsPage />} />
        <Route path="faculty" element={<FacultyManagementPage />} />
        <Route path="announcements" element={<AnnouncementsPage />} />
        <Route path="add-student" element={<AddStudentPage />} />
        <Route path="add-faculty" element={<AddFacultyPage />} />
        <Route path="manage-classes" element={<ManageClassesPage />} />
        <Route path="" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <div className="font-inter">
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;