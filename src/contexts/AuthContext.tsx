import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType, UserRole } from '../types/auth';

const AuthContext = createContext<AuthContextType | null>(null);

// Demo users for different roles
const demoUsers: Record<string, User> = {
  'student@oxford.edu': {
    id: '1',
    name: 'John Smith',
    email: 'student@oxford.edu',
    role: 'student',
    department: 'Computer Science',
    rollNumber: 'CS2024001',
  },
  'faculty@oxford.edu': {
    id: '2',
    name: 'Dr. Sarah Wilson',
    email: 'faculty@oxford.edu',
    role: 'faculty',
    department: 'Computer Science',
    employeeId: 'FAC001',
  },
  'hod@oxford.edu': {
    id: '3',
    name: 'Prof. Michael Brown',
    email: 'hod@oxford.edu',
    role: 'hod',
    department: 'Computer Science',
    employeeId: 'HOD001',
  },
  'principal@oxford.edu': {
    id: '4',
    name: 'Dr. Emily Johnson',
    email: 'principal@oxford.edu',
    role: 'principal',
    employeeId: 'PRIN001',
  },
  'director@oxford.edu': {
    id: '5',
    name: 'Dr. Robert Davis',
    email: 'director@oxford.edu',
    role: 'director',
    employeeId: 'DIR001',
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const savedUser = localStorage.getItem('oxford_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Demo authentication - any password works
    const foundUser = demoUsers[email];
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('oxford_user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('oxford_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}