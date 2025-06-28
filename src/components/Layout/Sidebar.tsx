import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Calendar, 
  BookOpen, 
  CreditCard, 
  FileText, 
  Bell, 
  Users, 
  Settings,
  GraduationCap,
  BarChart3,
  UserCheck,
  Upload,
  MessageSquare,
  Megaphone,
  User,
  UserPlus,
  UsersIcon,
  School
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types/auth';

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
  roles: UserRole[];
}

const navigation: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: Home, roles: ['student', 'faculty', 'hod', 'principal', 'director'] },
  { name: 'Profile', href: '/profile', icon: User, roles: ['student', 'faculty', 'hod', 'principal', 'director'] },
  { name: 'Attendance', href: '/attendance', icon: Calendar, roles: ['student', 'faculty', 'hod', 'principal'] },
  { name: 'Academics', href: '/academics', icon: BookOpen, roles: ['student', 'faculty', 'hod', 'principal'] },
  { name: 'Fee Management', href: '/fees', icon: CreditCard, roles: ['student', 'principal', 'director'] },
  
  // Faculty specific
  { name: 'Mark Attendance', href: '/mark-attendance', icon: UserCheck, roles: ['faculty'] },
  { name: 'Upload Materials', href: '/upload', icon: Upload, roles: ['faculty'] },
  { name: 'Student Feedback', href: '/feedback', icon: MessageSquare, roles: ['faculty', 'hod'] },
  
  // HOD specific
  { name: 'Department Analytics', href: '/department', icon: BarChart3, roles: ['hod'] },
  { name: 'Manage Classes', href: '/manage-classes', icon: School, roles: ['hod', 'principal', 'director'] },
  
  // HOD and above
  { name: 'Faculty Management', href: '/faculty', icon: Users, roles: ['hod', 'principal'] },
  { name: 'Add Student', href: '/add-student', icon: UserPlus, roles: ['hod', 'principal', 'director'] },
  { name: 'Add Faculty', href: '/add-faculty', icon: UsersIcon, roles: ['hod', 'principal', 'director'] },
  
  // Principal and Director
  { name: 'Announcements', href: '/announcements', icon: Megaphone, roles: ['principal', 'director'] },
  
  // Common
  { name: 'Reports', href: '/reports', icon: FileText, roles: ['student', 'faculty', 'hod', 'principal', 'director'] },
  { name: 'Notifications', href: '/notifications', icon: Bell, roles: ['student', 'faculty', 'hod', 'principal', 'director'] },
  { name: 'Settings', href: '/settings', icon: Settings, roles: ['student', 'faculty', 'hod', 'principal', 'director'] },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { user } = useAuth();

  const filteredNavigation = navigation.filter(item => 
    user && item.roles.includes(user.role)
  );

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-4 bg-primary-600">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-white" />
              <span className="text-xl font-bold text-white">Oxford ERP</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 bg-gray-50 overflow-y-auto">
            <div className="space-y-1">
              {filteredNavigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    `group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? 'bg-primary-100 text-primary-700 border-r-2 border-primary-600'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`
                  }
                  onClick={() => window.innerWidth < 1024 && onClose()}
                >
                  <item.icon
                    className="mr-3 flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  {item.name}
                </NavLink>
              ))}
            </div>
          </nav>

          {/* User info */}
          <div className="flex-shrink-0 p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-sm font-medium text-primary-600">
                    {user?.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500 capitalize truncate">
                  {user?.role}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}