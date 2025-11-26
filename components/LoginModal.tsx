import React, { useState } from 'react';
import { X, User, Lock, ArrowRight } from 'lucide-react';
import { UserRole } from '../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (role: UserRole, name: string) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [role, setRole] = useState<UserRole>(UserRole.STUDENT);
  const [username, setUsername] = useState('张三');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login delay
    setTimeout(() => {
        onLogin(role, username);
        onClose();
    }, 500);
  };

  const getRoleDisplayName = (r: UserRole) => {
    switch (r) {
      case UserRole.STUDENT: return '学生';
      case UserRole.TEACHER: return '教师';
      case UserRole.ADMIN_SCHOOL: return '校级管理员';
      default: return r;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative mx-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 bg-gray-50 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
             <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">欢迎回来</h2>
          <p className="text-gray-500 mt-2">请登录以访问课程和实验室资源</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">选择角色</label>
            <div className="grid grid-cols-3 gap-3">
              {[UserRole.STUDENT, UserRole.TEACHER, UserRole.ADMIN_SCHOOL].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`px-2 py-2 text-sm rounded-lg border text-center transition-colors ${
                    role === r
                      ? 'bg-blue-50 border-blue-500 text-blue-700 font-medium'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {getRoleDisplayName(r)}
                </button>
              ))}
            </div>
          </div>

          <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">用户名</label>
             <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="请输入用户名"
                  required
                />
             </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              登录 <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>

          <div className="text-center mt-4">
             <span className="text-sm text-gray-500">还没有账号？ </span>
             <button type="button" className="text-sm font-medium text-blue-600 hover:text-blue-500">申请试用</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;