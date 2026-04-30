export enum UserRole {
  GUEST = 'GUEST',
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  ADMIN_SCHOOL = 'ADMIN_SCHOOL',
  ADMIN_PLATFORM = 'ADMIN_PLATFORM'
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  roles?: UserRole[];
  avatar?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  lessons: number;
  duration: string;
  difficulty: '初级' | '中级' | '高级';
}

export interface Lab {
  id: string;
  title: string;
  description: string;
  tools: string[];
  thumbnail: string;
  status: '运行中' | '维护中';
}

export interface Exam {
  id: string;
  title: string;
  duration: string;
  questions: number;
  certification: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}