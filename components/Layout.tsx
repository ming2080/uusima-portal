import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  LogIn,
  User as UserIcon,
  LogOut,
  GraduationCap,
  Beaker,
  FileBadge,
  Box,
  Users,
  BrainCircuit,
  BookOpenText,
  BookOpen,
  ChevronDown,
  Settings,
  Globe,
  Activity,
} from "lucide-react";
import { User } from "../types";

interface LayoutProps {
  children: React.ReactNode;
  user: User | null;
  onLoginClick: () => void;
  onLogoutClick: () => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  user,
  onLoginClick,
  onLogoutClick,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<"zh" | "en">("zh");
  const location = useLocation();

  const navItems = [
    { label: "首页", path: "/", icon: null },
    {
      label: "课程大厅",
      path: "/courses",
      icon: <GraduationCap className="w-5 h-5 mr-1.5" />,
    },
    {
      label: "实训中心",
      path: "/labs",
      icon: <Beaker className="w-5 h-5 mr-1.5" />,
    },
    {
      label: "考试认证",
      path: "/exams",
      icon: <FileBadge className="w-5 h-5 mr-1.5" />,
    },
    {
      label: "配置管理",
      path: "/config",
      icon: <Settings className="w-5 h-5 mr-1.5" />,
    },
  ];

  const getRoleName = (role: string) => {
    switch (role) {
      case "STUDENT":
        return "学生";
      case "TEACHER":
        return "教师";
      case "ADMIN_SCHOOL":
        return "校管";
      case "ADMIN_PLATFORM":
        return "超管";
      default:
        return role;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      {/* Header - Optimized Design */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-lg border-b border-gray-200/80 shadow-sm transition-all duration-300 supports-[backdrop-filter]:bg-white/60">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <Link
              to="/"
              className="flex-shrink-0 flex items-center gap-2 group mr-6 lg:mr-8 relative z-50"
            >
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500 tracking-tight">
                UUSIMA
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-4 flex-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`
                      flex items-center px-4 py-2 rounded-full font-semibold transition-all duration-200 whitespace-nowrap text-base
                      ${
                        isActive
                          ? "text-blue-700 bg-blue-50 shadow-sm ring-1 ring-blue-100"
                          : "text-slate-600 hover:text-blue-600 hover:bg-gray-50/80"
                      }
                    `}
                  >
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Side: Action Block (Icons Only) */}
            <div className="hidden md:flex items-center gap-4 ml-auto pl-6 border-l border-gray-200 h-8 flex-shrink-0">
              {/* External Utility Links (Icons) */}
              <div className="flex items-center gap-1.5">
                <Link
                  to="/operations-dashboard"
                  className="p-2.5 text-slate-400 hover:text-cyan-600 hover:bg-cyan-50 rounded-xl transition-all relative group/tooltip"
                  aria-label="运营大屏"
                >
                  <Activity className="w-5 h-5 transition-transform group-hover/tooltip:scale-110" />
                  <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] font-medium px-2 py-1 rounded-md opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-xl translate-y-1 group-hover/tooltip:translate-y-0">
                    运营大屏
                  </span>
                </Link>
                <button
                  onClick={() => setLanguage(lang => lang === "zh" ? "en" : "zh")}
                  className="p-2.5 flex items-center gap-1 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all relative group/tooltip"
                  aria-label="切换语言"
                >
                  <Globe className="w-5 h-5 transition-transform group-hover/tooltip:scale-110" />
                  <span className="text-sm font-medium">{language === "zh" ? "中" : "EN"}</span>
                  <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] font-medium px-2 py-1 rounded-md opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-xl translate-y-1 group-hover/tooltip:translate-y-0">
                    {language === "zh" ? "Switch to English" : "切换到中文"}
                  </span>
                </button>
                <a
                  href="https://aistudio.google.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all relative group/tooltip"
                  aria-label="学科大模型"
                >
                  <BrainCircuit className="w-5 h-5 transition-transform group-hover/tooltip:scale-110" />
                  <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] font-medium px-2 py-1 rounded-md opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-xl translate-y-1 group-hover/tooltip:translate-y-0">
                    学科大模型
                  </span>
                </a>
                <a
                  href="#"
                  className="p-2.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all relative group/tooltip"
                  aria-label="帮助文档"
                >
                  <BookOpenText className="w-5 h-5 transition-transform group-hover/tooltip:scale-110" />
                  <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] font-medium px-2 py-1 rounded-md opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-xl translate-y-1 group-hover/tooltip:translate-y-0">
                    帮助文档
                  </span>
                </a>
              </div>

              {/* Auth Section (Icons) */}
              <div className="flex items-center gap-2 ml-2">
                {user && (
                  <Link
                    to="/my-home"
                    className={`
                      flex items-center px-4 py-2 rounded-full font-semibold transition-all duration-200 whitespace-nowrap text-sm
                      ${
                        location.pathname.startsWith("/my-home")
                          ? "text-blue-700 bg-blue-50 shadow-sm ring-1 ring-blue-100"
                          : "text-slate-600 hover:text-blue-600 hover:bg-gray-50/80"
                      }
                    `}
                  >
                    我的主页
                  </Link>
                )}
                {user ? (
                  <>
                    <div className="relative group/user py-1">
                      <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-blue-100 to-indigo-100 border-2 border-white ring-1 ring-gray-100 shadow-sm flex items-center justify-center overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-200 transition-all">
                        {user.avatar && !user.avatar.includes("http") ? (
                          <UserIcon className="w-5 h-5 text-blue-600" />
                        ) : (
                          <img
                            src={
                              user.avatar ||
                              "https://ui-avatars.com/api/?name=User&background=random"
                            }
                            alt={user.name}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      {/* User Tooltip */}
                      <div className="absolute top-full right-0 mt-3 w-48 bg-white text-gray-800 p-3 rounded-xl opacity-0 invisible group-hover/user:opacity-100 group-hover/user:visible transition-all pointer-events-none shadow-xl border border-gray-100 z-50 transform translate-y-2 group-hover/user:translate-y-0">
                        <div className="flex items-center gap-3 mb-2 pb-2 border-b border-gray-50">
                          <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xs">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-sm text-gray-900">
                              {user.name}
                            </p>
                            <p className="text-xs text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded inline-block mt-0.5">
                              {getRoleName(user.role)}
                            </p>
                          </div>
                        </div>
                        <div className="text-xs text-gray-400 text-center">
                          已登录
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={onLogoutClick}
                      className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all relative group/tooltip"
                      aria-label="退出登录"
                    >
                      <LogOut className="w-5 h-5 transition-transform group-hover/tooltip:scale-110" />
                      <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] font-medium px-2 py-1 rounded-md opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-xl translate-y-1 group-hover/tooltip:translate-y-0">
                        退出登录
                      </span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={onLoginClick}
                    className="p-2.5 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:shadow-blue-600/40 hover:-translate-y-0.5 transition-all duration-300 relative group/tooltip"
                    aria-label="登录平台"
                  >
                    <LogIn className="w-5 h-5" />
                    <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] font-medium px-2 py-1 rounded-md opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-xl translate-y-1 group-hover/tooltip:translate-y-0">
                      立即登录
                    </span>
                  </button>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden ml-auto">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-500 hover:text-blue-600 p-2 rounded-xl hover:bg-gray-100 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-7 h-7" />
                ) : (
                  <Menu className="w-7 h-7" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 animate-fade-in-down shadow-2xl absolute w-full z-50 max-h-[90vh] overflow-y-auto rounded-b-2xl">
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-base font-semibold flex items-center transition-colors ${
                    location.pathname === item.path
                      ? "bg-blue-50 text-blue-700 border border-blue-100"
                      : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}

              <div className="pt-6 mt-4 border-t border-gray-100">
                {user ? (
                  <div className="flex items-center justify-between px-2 bg-gray-50 p-3 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-gray-200 shadow-sm">
                        <UserIcon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">
                          {user.name}
                        </div>
                        <div className="text-xs text-blue-600 bg-blue-100 px-1.5 rounded inline-block">
                          {getRoleName(user.role)}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        onLogoutClick();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center text-red-600 bg-white border border-red-100 px-3 py-1.5 rounded-lg text-sm font-medium shadow-sm hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4 mr-1" />
                      退出
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      onLoginClick();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-xl shadow-lg shadow-blue-500/20 text-base font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all"
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
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white pt-16 pb-8 border-t border-slate-800">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white tracking-tight">
                  UUSIMA
                </span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                致力于用智能技术和虚拟仿真赋能职业教育，连接课堂与产业，打造下一代数字化教学平台。
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">
                核心栏目
              </h3>
              <ul className="space-y-3 text-sm text-slate-300">
                <li>
                  <Link
                    to="/courses"
                    className="hover:text-white hover:translate-x-1 transition-transform inline-block"
                  >
                    课程大厅
                  </Link>
                </li>
                <li>
                  <Link
                    to="/labs"
                    className="hover:text-white hover:translate-x-1 transition-transform inline-block"
                  >
                    实训中心
                  </Link>
                </li>
                <li>
                  <Link
                    to="/exams"
                    className="hover:text-white hover:translate-x-1 transition-transform inline-block"
                  >
                    考试认证
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">
                服务支持
              </h3>
              <ul className="space-y-3 text-sm text-slate-300">
                <li>
                  <Link
                    to="/about"
                    className="hover:text-white hover:translate-x-1 transition-transform inline-block"
                  >
                    关于 UUSIMA
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="hover:text-white hover:translate-x-1 transition-transform inline-block"
                  >
                    合作咨询
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="hover:text-white hover:translate-x-1 transition-transform inline-block"
                  >
                    技术文档
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="hover:text-white hover:translate-x-1 transition-transform inline-block"
                  >
                    隐私政策
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">
                联系我们
              </h3>
              <div className="space-y-3 text-sm text-slate-300">
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>{" "}
                  邮箱: support@uusima.edu
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>{" "}
                  电话: 400-123-4567
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>{" "}
                  地址: 深圳市南山区科技园
                </p>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
            &copy; {new Date().getFullYear()} UUSIMA 智慧教学平台. All rights
            reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
