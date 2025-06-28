import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import StudentDashboard from './dashboards/StudentDashboard';
import FacultyDashboard from './dashboards/FacultyDashboard';
import HODDashboard from './dashboards/HODDashboard';
import PrincipalDashboard from './dashboards/PrincipalDashboard';
import DirectorDashboard from './dashboards/DirectorDashboard';

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) return null;

  switch (user.role) {
    case 'student':
      return <StudentDashboard />;
    case 'faculty':
      return <FacultyDashboard />;
    case 'hod':
      return <HODDashboard />;
    case 'principal':
      return <PrincipalDashboard />;
    case 'director':
      return <DirectorDashboard />;
    default:
      return <div>Invalid user role</div>;
  }
}