import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  FileText, 
  BookOpen, 
  Users, 
  ClipboardCheck, 
  FileBadge, 
  User as UserIcon
} from 'lucide-react';
import { UserRole } from '../types';

interface MenuItem {
  label: string;
  path?: string;
  icon: any;
  color: string;
  children?: MenuItem[];
}

interface SidebarProps {
  role: UserRole;
}

const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  const location = useLocation();

  const getMenuItems = (): MenuItem[] => {
    const commonItems: MenuItem[] = [
      { label: '个人中心', path: '/my-home/profile', icon: UserIcon, color: 'text-indigo-500' },
    ];

    switch (role) {
      case UserRole.TEACHER:
        return [
          { label: '首页', path: '/my-home', icon: Home, color: 'text-emerald-500' },
          { label: '我的课程', path: '/my-home/courses', icon: FileBadge, color: 'text-blue-500' },
          { label: '我的教学', path: '/my-home/teaching', icon: FileText, color: 'text-emerald-500' },
          { label: '评卷管理', path: '/my-home/grading', icon: FileBadge, color: 'text-amber-500' },
          ...commonItems,
        ];
      case UserRole.STUDENT:
        return [
          { label: '首页', path: '/my-home', icon: Home, color: 'text-emerald-500' },
          { label: '我的学习', path: '/my-home/learning', icon: BookOpen, color: 'text-blue-500' },
          { label: '我的考试', path: '/my-home/exams', icon: ClipboardCheck, color: 'text-amber-500' },
          ...commonItems,
        ];
      case UserRole.ADMIN_SCHOOL:
        return [
          { label: '首页', path: '/my-home', icon: Home, color: 'text-emerald-500' },
          ...commonItems,
        ];
      default:
        return [
          { label: '首页', path: '/my-home', icon: Home, color: 'text-emerald-500' },
          ...commonItems
        ];
    }
  };

  const menuItems = getMenuItems();

  const renderMenuItem = (item: MenuItem, depth = 0) => {
    const isActive = item.path ? location.pathname === item.path : false;

    return (
      <div key={item.label}>
        {item.path && (
          <Link
            to={item.path}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              isActive
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            } ${depth > 0 ? 'ml-4' : ''}`}
          >
            <item.icon className={`w-4.5 h-4.5 ${isActive ? 'text-blue-700' : item.color}`} />
            {item.label}
          </Link>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-4 h-full overflow-y-auto">
      <nav className="space-y-1">
        {menuItems.map(item => renderMenuItem(item))}
      </nav>
    </div>
  );
};

export default Sidebar;
