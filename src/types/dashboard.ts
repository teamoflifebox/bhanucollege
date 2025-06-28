export interface AttendanceData {
  month: string;
  present: number;
  absent: number;
  percentage: number;
}

export interface SubjectMark {
  subject: string;
  internal: number;
  external: number;
  total: number;
  grade: string;
}

export interface FeeDetails {
  category: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  timestamp: string;
  read: boolean;
}