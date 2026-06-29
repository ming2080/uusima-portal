import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Moon, Sun, BookOpen } from 'lucide-react';
import { UserRole } from '../types';

interface LoginProps {
  onLogin: (roles: UserRole[], name: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const accountMap: Record<string, { password: string, name: string, roles: UserRole[] }> = {
      '1': { password: '1', name: '学生张三', roles: [UserRole.STUDENT] },
      '2': { password: '2', name: '王老师', roles: [UserRole.TEACHER] },
      '3': { password: '3', name: '李校长', roles: [UserRole.ADMIN_SCHOOL] },
      '4': { password: '4', name: '系统管理员', roles: [UserRole.ADMIN_PLATFORM] },
      '5': { password: '5', name: '多角色测试人员', roles: [UserRole.STUDENT, UserRole.TEACHER, UserRole.ADMIN_SCHOOL] },
    };

    const account = accountMap[username];
    if (account && account.password === password) {
      setError('');
      onLogin(account.roles, account.name);
      navigate('/');
    } else {
      setError('账号或密码错误（测试提供: 1, 2, 3, 4, 5，密码同账号）');
    }
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`min-h-screen w-full flex relative overflow-hidden transition-colors duration-500 ${
      theme === 'dark' ? 'bg-[#0f172a]' : 'bg-[#eef6ff]'
    }`}>
      {/* Background Shapes */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* White/Dark curved left background */}
        <svg 
          className="absolute top-0 left-0 w-full h-full object-cover" 
          preserveAspectRatio="none" 
          viewBox="0 0 1440 900" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M0 0H450C650 250 350 650 550 900H0V0Z" 
            fill={theme === 'dark' ? '#1e293b' : '#ffffff'} 
            className="transition-colors duration-500"
          />
        </svg>
        
        {/* Decorative clouds/circles on the right */}
        <div className={`absolute top-[10%] right-[10%] w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse ${theme === 'dark' ? 'bg-blue-900' : 'bg-blue-200'}`}></div>
        <div className={`absolute top-[40%] right-[30%] w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse ${theme === 'dark' ? 'bg-indigo-900' : 'bg-indigo-200'}`} style={{ animationDelay: '2s' }}></div>
        <div className={`absolute bottom-[10%] right-[20%] w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse ${theme === 'dark' ? 'bg-cyan-900' : 'bg-cyan-200'}`} style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <button
          onClick={toggleTheme}
          className={`p-2.5 rounded-full flex items-center justify-center transition-all ${
            theme === 'dark' 
              ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' 
              : 'bg-white text-slate-600 hover:bg-slate-100 shadow-sm'
          }`}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex w-full max-w-[1600px] mx-auto h-screen">
        
        {/* Left Side - Form */}
        <div className="w-full lg:w-[45%] xl:w-[40%] flex flex-col justify-center px-8 sm:px-16 lg:px-24">
          <div className="max-w-md w-full mx-auto lg:mx-0">
            {/* Title */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <BookOpen className="w-7 h-7 text-white" />
                </div>
                <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500 tracking-tight">
                  UUSIMA
                </span>
              </div>
              <h2 className={`text-2xl sm:text-3xl font-bold tracking-wide ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                智慧教学平台
              </h2>
              <p className={`mt-4 text-sm font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                下一代数字化教学与实验一站式管理平台
              </p>
              
              <div className={`mt-6 p-4 rounded-xl text-xs space-y-2 ${
                theme === 'dark' ? 'bg-slate-800/50 text-slate-300' : 'bg-blue-50 text-slate-600'
              }`}>
                <p className="font-semibold mb-1">测试账号说明 (账号与密码相同):</p>
                <div className="grid grid-cols-2 gap-2">
                  <div>1: 学生体验账户</div>
                  <div>2: 教师体验账户</div>
                  <div>3: 校管体验账户</div>
                  <div>4: 超管体验账户</div>
                  <div className="col-span-2">5: 多角色集成账户 (学生+教师+校管)</div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className={`p-3 text-sm rounded-lg border ${
                  theme === 'dark' 
                    ? 'bg-red-900/30 border-red-800 text-red-400' 
                    : 'bg-red-50 border-red-200 text-red-600'
                }`}>
                  {error}
                </div>
              )}

              {/* Username Input */}
              <div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`w-full px-6 py-4 rounded-full text-sm outline-none transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-slate-800 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500/50'
                      : 'bg-[#f4f7fb] text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-blue-500/20'
                  }`}
                  placeholder="请输入账号"
                  required
                />
              </div>

              {/* Password Input */}
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full px-6 py-4 rounded-full text-sm outline-none transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-slate-800 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500/50'
                      : 'bg-[#f4f7fb] text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-blue-500/20'
                  }`}
                  placeholder="请输入密码"
                  required
                />
              </div>

              {/* Actions Row */}
              <div className="flex items-center gap-6 pt-2">
                <button
                  type="submit"
                  className="px-10 py-3.5 bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white rounded-full text-sm font-bold transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5"
                >
                  登录
                </button>

                <label className="flex items-center cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input 
                      type="checkbox" 
                      className="sr-only" 
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                      rememberMe 
                        ? 'border-blue-500 bg-blue-500' 
                        : theme === 'dark' ? 'border-slate-600' : 'border-slate-300'
                    }`}>
                      {rememberMe && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                    </div>
                  </div>
                  <span className={`ml-2 text-sm transition-colors ${theme === 'dark' ? 'text-slate-400 group-hover:text-slate-300' : 'text-slate-500 group-hover:text-slate-700'}`}>
                    记住我
                  </span>
                </label>
              </div>

              {/* Forgot Password */}
              <div className="pt-6">
                <a href="#" className="text-sm text-blue-500 hover:text-blue-600 font-medium transition-colors">
                  忘记密码？
                </a>
              </div>
            </form>
          </div>
        </div>

        {/* Right Side - Illustration */}
        <div className="hidden lg:flex w-[55%] xl:w-[60%] items-center justify-center relative p-12">
          <div className="relative w-full max-w-3xl aspect-square flex items-center justify-center">
            {/* SVG Illustration */}
            <svg viewBox="0 0 800 600" className="w-full h-full drop-shadow-2xl" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#1d4ed8" />
                </linearGradient>
                <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#6d28d9" />
                </linearGradient>
                <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#0891b2" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Base Rings */}
              <ellipse cx="400" cy="450" rx="300" ry="100" fill="none" stroke={theme === 'dark' ? '#1e293b' : '#e2e8f0'} strokeWidth="2" />
              <ellipse cx="400" cy="450" rx="200" ry="65" fill="none" stroke={theme === 'dark' ? '#334155' : '#cbd5e1'} strokeWidth="2" strokeDasharray="10 5" className="animate-[spin_40s_linear_infinite]" style={{ transformOrigin: '400px 450px' }} />
              <ellipse cx="400" cy="450" rx="100" ry="32" fill="none" stroke={theme === 'dark' ? '#475569' : '#94a3b8'} strokeWidth="1" strokeDasharray="5 5" className="animate-[spin_20s_linear_infinite_reverse]" style={{ transformOrigin: '400px 450px' }} />

              {/* Center Server/Brain */}
              <g transform="translate(400, 350)">
                {/* Base */}
                <path d="M-80 25 L0 65 L80 25 L0 -15 Z" fill="url(#grad1)" opacity="0.9" />
                <path d="M-80 25 L0 65 L0 125 L-80 85 Z" fill="url(#grad1)" opacity="0.7" />
                <path d="M80 25 L0 65 L0 125 L80 85 Z" fill="url(#grad1)" opacity="0.5" />
                
                {/* Middle Tier */}
                <path d="M-60 -5 L0 25 L60 -5 L0 -35 Z" fill="url(#grad3)" opacity="0.9" />
                <path d="M-60 -5 L0 25 L0 65 L-60 35 Z" fill="url(#grad3)" opacity="0.7" />
                <path d="M60 -5 L0 25 L0 65 L60 35 Z" fill="url(#grad3)" opacity="0.5" />

                {/* Top Tier */}
                <path d="M-40 -35 L0 -15 L40 -35 L0 -55 Z" fill="url(#grad2)" opacity="0.9" />
                <path d="M-40 -35 L0 -15 L0 15 L-40 -5 Z" fill="url(#grad2)" opacity="0.7" />
                <path d="M40 -35 L0 -15 L0 15 L40 -5 Z" fill="url(#grad2)" opacity="0.5" />
              </g>

              {/* Floating Node 1 (Left) */}
              <g transform="translate(150, 250)" className="animate-[bounce_4s_ease-in-out_infinite]">
                <path d="M-40 15 L0 35 L40 15 L0 -5 Z" fill="url(#grad2)" opacity="0.9" />
                <path d="M-40 15 L0 35 L0 75 L-40 55 Z" fill="url(#grad2)" opacity="0.7" />
                <path d="M40 15 L0 35 L0 75 L40 55 Z" fill="url(#grad2)" opacity="0.5" />
                {/* Connection Line */}
                <path d="M40 35 Q 150 100 220 120" fill="none" stroke="url(#grad2)" strokeWidth="2" strokeDasharray="5 5" className="animate-pulse" />
              </g>

              {/* Floating Node 2 (Right) */}
              <g transform="translate(650, 200)" className="animate-[bounce_5s_ease-in-out_infinite_0.5s]">
                <path d="M-30 10 L0 25 L30 10 L0 -5 Z" fill="url(#grad3)" opacity="0.9" />
                <path d="M-30 10 L0 25 L0 55 L-30 40 Z" fill="url(#grad3)" opacity="0.7" />
                <path d="M30 10 L0 25 L0 55 L30 40 Z" fill="url(#grad3)" opacity="0.5" />
                {/* Connection Line */}
                <path d="M-30 25 Q -150 100 -220 130" fill="none" stroke="url(#grad3)" strokeWidth="2" strokeDasharray="5 5" className="animate-pulse" />
              </g>

              {/* Floating Node 3 (Top) */}
              <g transform="translate(400, 100)" className="animate-[bounce_6s_ease-in-out_infinite_1s]">
                <path d="M-25 8 L0 20 L25 8 L0 -4 Z" fill="url(#grad1)" opacity="0.9" />
                <path d="M-25 8 L0 20 L0 45 L-25 33 Z" fill="url(#grad1)" opacity="0.7" />
                <path d="M25 8 L0 20 L0 45 L25 33 Z" fill="url(#grad1)" opacity="0.5" />
                {/* Connection Line */}
                <path d="M0 45 L 0 180" fill="none" stroke="url(#grad1)" strokeWidth="2" strokeDasharray="5 5" className="animate-pulse" />
              </g>

              {/* Data Particles */}
              <circle cx="280" cy="320" r="4" fill="#60a5fa" filter="url(#glow)" className="animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" />
              <circle cx="520" cy="280" r="4" fill="#34d399" filter="url(#glow)" className="animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite_1s]" />
              <circle cx="400" cy="240" r="4" fill="#a78bfa" filter="url(#glow)" className="animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite_0.5s]" />
              <circle cx="450" cy="380" r="3" fill="#38bdf8" filter="url(#glow)" className="animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite_1.5s]" />
              <circle cx="350" cy="400" r="5" fill="#818cf8" filter="url(#glow)" className="animate-[ping_3.5s_cubic-bezier(0,0,0.2,1)_infinite_0.2s]" />
            </svg>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
