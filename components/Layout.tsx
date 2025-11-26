import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogIn, User as UserIcon, LogOut, GraduationCap, Beaker, FileBadge, Box, Users, BrainCircuit, BookOpenText } from 'lucide-react';
import { User } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  user: User | null;
  onLoginClick: () => void;
  onLogoutClick: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onLoginClick, onLogoutClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: '首页', path: '/', icon: null },
    { label: '课程大厅', path: '/courses', icon: <GraduationCap className="w-5 h-5 mr-1.5" /> },
    { label: '实验大厅', path: '/labs', icon: <Beaker className="w-5 h-5 mr-1.5" /> },
    { label: '考试认证', path: '/exams', icon: <FileBadge className="w-5 h-5 mr-1.5" /> },
    { label: '产品中心', path: '/products', icon: <Box className="w-5 h-5 mr-1.5" /> },
    { label: '关于我们', path: '/about', icon: <Users className="w-5 h-5 mr-1.5" /> },
  ];

  const getRoleName = (role: string) => {
    switch (role) {
      case 'STUDENT': return '学生';
      case 'TEACHER': return '教师';
      case 'ADMIN_SCHOOL': return '校管';
      case 'ADMIN_PLATFORM': return '超管';
      default: return role;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      {/* Header - Optimized Design */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo Section */}
            <Link to="/" className="flex-shrink-0 flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-white font-extrabold text-xl shadow-lg group-hover:scale-105 transition-transform duration-300">
                U
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-2xl text-slate-900 tracking-tight leading-none group-hover:text-blue-700 transition-colors">
                  UUSIMA
                </span>
                <span className="text-[10px] text-gray-500 font-medium tracking-widest uppercase mt-0.5">
                  智慧教学实验平台
                </span>
              </div>
            </Link>

            {/* Desktop Nav - Larger fonts & Pill hover effect */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`
                      flex items-center px-4 py-2.5 rounded-full text-base font-semibold transition-all duration-200
                      ${isActive 
                        ? 'text-blue-700 bg-blue-50 shadow-sm ring-1 ring-blue-100' 
                        : 'text-slate-600 hover:text-blue-600 hover:bg-gray-50'
                      }
                    `}
                  >
                    {/* Hide icon on smaller desktop screens to save space, show on large */}
                    <span className="hidden xl:inline-block">{isActive ? item.icon : null}</span>
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Side: External Links + Auth */}
            <div className="flex items-center ml-auto md:ml-0">
               {/* External Utility Links (Desktop) */}
               <div className="hidden lg:flex items-center gap-4 mr-6">
                  <a 
                    href="https://aistudio.google.com/" 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center text-sm font-bold text-slate-600 hover:text-purple-600 transition-colors bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-lg border border-transparent hover:border-purple-200"
                  >
                     <BrainCircuit className="w-4 h-4 mr-2 text-purple-600" />
                     学科大模型
                  </a>
                  <a 
                    href="#" 
                    className="flex items-center text-sm font-bold text-slate-600 hover:text-teal-600 transition-colors bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-lg border border-transparent hover:border-teal-200"
                  >
                     <BookOpenText className="w-4 h-4 mr-2 text-teal-600" />
                     帮助文档
                  </a>
               </div>

                {/* Auth Button */}
                <div className="hidden md:flex items-center pl-6 border-l border-gray-200">
                  {user ? (
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-3 pl-2">
                        <div className="flex flex-col items-end">
                          <span className="text-sm font-bold text-gray-800 leading-tight">{user.name}</span>
                          <span className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded-full mt-0.5">
                            {getRoleName(user.role)}
                          </span>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-blue-100 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
                          <UserIcon className="w-6 h-6 text-blue-600" />
                        </div>
                      </div>
                      <button
                        onClick={onLogoutClick}
                        className="text-gray-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-full transition-all"
                        title="退出登录"
                      >
                        <LogOut className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={onLoginClick}
                      className="group relative inline-flex items-center justify-center px-6 py-2.5 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 overflow-hidden"
                    >
                      <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
                      <LogIn className="w-5 h-5 mr-2 -ml-1 group-hover:scale-110 transition-transform" />
                      登录平台
                    </button>
                  )}
                </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden ml-4">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-500 hover:text-blue-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 animate-fade-in-down shadow-xl absolute w-full z-50">
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-base font-semibold flex items-center transition-colors ${
                     location.pathname === item.path 
                     ? 'bg-blue-50 text-blue-700 border border-blue-100' 
                     : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
              
              {/* Mobile External Links */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                 <a href="https://aistudio.google.com/" target="_blank" rel="noreferrer" className="flex items-center justify-center px-4 py-3 bg-purple-50 text-purple-700 rounded-xl text-sm font-bold">
                    <BrainCircuit className="w-5 h-5 mr-2" />
                    学科大模型
                 </a>
                 <a href="#" className="flex items-center justify-center px-4 py-3 bg-teal-50 text-teal-700 rounded-xl text-sm font-bold">
                    <BookOpenText className="w-5 h-5 mr-2" />
                    帮助文档
                 </a>
              </div>

              <div className="pt-6 mt-4 border-t border-gray-100">
                 {user ? (
                   <div className="flex items-center justify-between px-2">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <UserIcon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <div className="font-bold text-gray-900">{user.name}</div>
                            <div className="text-xs text-blue-600">{getRoleName(user.role)}</div>
                        </div>
                     </div>
                     <button 
                        onClick={() => { onLogoutClick(); setIsMobileMenuOpen(false); }} 
                        className="flex items-center text-red-600 bg-red-50 px-3 py-1.5 rounded-lg text-sm font-medium"
                     >
                        <LogOut className="w-4 h-4 mr-1" />
                        退出
                     </button>
                   </div>
                 ) : (
                    <button
                      onClick={() => { onLoginClick(); setIsMobileMenuOpen(false); }}
                      className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-xl shadow-sm text-base font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all"
                    >
                      <LogIn className="w-5 h-5 mr-2" />
                      立即登录
                    </button>
                 )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white pt-16 pb-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-1">
               <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold shadow-lg shadow-blue-900/50">U</div>
                  <span className="text-2xl font-bold tracking-tight">UUSIMA</span>
               </div>
               <p className="text-slate-400 text-sm leading-relaxed mb-6">
                 致力于用智能技术和虚拟仿真赋能职业教育，连接课堂与产业，打造下一代数字化教学平台。
               </p>
               <div className="flex space-x-4">
                  {/* Social placeholders */}
                  <div className="w-8 h-8 bg-slate-800 rounded-full hover:bg-blue-600 transition-colors cursor-pointer"></div>
                  <div className="w-8 h-8 bg-slate-800 rounded-full hover:bg-blue-600 transition-colors cursor-pointer"></div>
                  <div className="w-8 h-8 bg-slate-800 rounded-full hover:bg-blue-600 transition-colors cursor-pointer"></div>
               </div>
            </div>
            
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">核心栏目</h3>
              <ul className="space-y-3 text-sm text-slate-300">
                <li><Link to="/courses" className="hover:text-white hover:translate-x-1 transition-transform inline-block">课程大厅</Link></li>
                <li><Link to="/labs" className="hover:text-white hover:translate-x-1 transition-transform inline-block">实验大厅</Link></li>
                <li><Link to="/exams" className="hover:text-white hover:translate-x-1 transition-transform inline-block">考试认证</Link></li>
                <li><Link to="/products" className="hover:text-white hover:translate-x-1 transition-transform inline-block">产品中心</Link></li>
              </ul>
            </div>

             <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">服务支持</h3>
              <ul className="space-y-3 text-sm text-slate-300">
                <li><Link to="/about" className="hover:text-white hover:translate-x-1 transition-transform inline-block">关于我们</Link></li>
                <li><Link to="#" className="hover:text-white hover:translate-x-1 transition-transform inline-block">合作咨询</Link></li>
                <li><Link to="#" className="hover:text-white hover:translate-x-1 transition-transform inline-block">技术文档</Link></li>
                <li><Link to="#" className="hover:text-white hover:translate-x-1 transition-transform inline-block">隐私政策</Link></li>
              </ul>
            </div>

             <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">联系我们</h3>
              <div className="space-y-3 text-sm text-slate-300">
                <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> 邮箱: support@uusima.edu</p>
                <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> 电话: 400-123-4567</p>
                <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> 地址: 深圳市南山区科技园</p>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
            &copy; {new Date().getFullYear()} UUSIMA 智慧教学平台. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;