import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, FileText, BookOpen, Settings, Users, BarChart2, ClipboardCheck, FileBadge, GraduationCap } from 'lucide-react';
import { UserRole } from '../types';

interface SidebarProps {
  role: UserRole;
}

const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  const location = useLocation();

  const getMenuItems = () => {
    switch (role) {
      case UserRole.TEACHER:
        return [
          { label: '首页', path: '/my-home', icon: Home, color: 'text-emerald-500' },
          { label: '评卷管理', path: '/my-home/grading', icon: FileBadge, color: 'text-amber-500' },
          { label: '我的课程', path: '/my-home/courses', icon: FileBadge, color: 'text-blue-500' },
          { label: '我的教学', path: '/my-home/teaching', icon: FileText, color: 'text-emerald-500' },
        ];
      case UserRole.STUDENT:
        return [
          { label: '首页', path: '/my-home', icon: Home, color: 'text-emerald-500' },
          { label: '我的考试', path: '/my-home/exams', icon: ClipboardCheck, color: 'text-amber-500' },
          { label: '我的学习', path: '/my-home/learning', icon: BookOpen, color: 'text-blue-500' },
        ];
      default:
        return [{ label: '首页', path: '/my-home', icon: Home, color: 'text-emerald-500' }];
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-80px)] p-4">
      <nav className="space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-blue-700' : item.color}`} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
