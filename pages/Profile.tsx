import React, { useState } from 'react';
import { 
  User as UserIcon, 
  Mail, 
  MapPin, 
  Calendar, 
  Edit3, 
  Settings, 
  Bell, 
  Shield, 
  Clock,
  ChevronRight,
  Camera,
  MoreHorizontal,
  Share2,
  Phone,
  Lock,
  Smartphone,
  CheckCircle2,
  Activity,
  LogOut,
  Users,
  BookOpen,
  FileBadge,
  Server,
  Database,
  Monitor,
  LogIn,
  Globe
} from 'lucide-react';
import { User, UserRole } from '../types';

interface Props {
  user: User;
}

const Profile: React.FC<Props> = ({ user }) => {
  const [activeTab, setActiveTab] = useState('profile');

  // Role-based stats
  const getStats = () => {
    switch (user.role) {
      case UserRole.STUDENT:
        return [
          { label: '学习时长', value: '128h', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: '实验次数', value: '45', icon: Monitor, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: '获得证书', value: '6', icon: FileBadge, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: '学习积分', value: '2,450', icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        ];
      case UserRole.TEACHER:
        return [
          { label: '授课数量', value: '12', icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: '学生人数', value: '340', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: '待批阅任务', value: '28', icon: FileBadge, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: '教学评分', value: '4.9', icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        ];
      case UserRole.ADMIN_SCHOOL:
        return [
          { label: '教师人数', value: '156', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: '学生人数', value: '4,200', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: '活跃课程', value: '89', icon: BookOpen, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: '资源使用率', value: '68%', icon: Database, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        ];
      case UserRole.ADMIN_PLATFORM:
        return [
          { label: '入驻学校', value: '45', icon: Server, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: '平台总用户', value: '12.5w', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: '运行节点', value: '128', icon: Monitor, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: '系统负载', value: '42%', icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        ];
      default:
        return [];
    }
  };

  const stats = getStats();

  const quickActions = [
    { id: 'profile', label: '个人资料', icon: UserIcon },
    { id: 'security', label: '账号安全', icon: Shield },
    { id: 'notifications', label: '消息通知', icon: Bell, count: 3 },
    { id: 'activity', label: '操作日志', icon: Activity },
  ];

  const getRoleName = (role: string) => {
    switch (role) {
      case 'STUDENT': return '学生';
      case 'TEACHER': return '教师';
      case 'ADMIN_SCHOOL': return '学校管理员';
      case 'ADMIN_PLATFORM': return '系统管理员';
      default: return role;
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto">
      {/* Header Section with Banner */}
      <div className="relative bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden mb-8">
        {/* Banner Background */}
        <div className="h-48 md:h-64 w-full relative">
          <img 
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1600" 
            alt="Profile Banner" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          
          <button className="absolute bottom-4 right-6 flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-xl text-white text-sm font-medium transition-all border border-white/20">
            <Camera className="w-4 h-4" />
            更换封面
          </button>
        </div>

        {/* User Info Section */}
        <div className="px-8 pb-8">
          <div className="relative flex flex-col md:flex-row items-end md:items-center gap-6 -mt-12 md:-mt-16 mb-6">
            {/* Avatar */}
            <div className="relative group">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl border-4 border-white shadow-xl overflow-hidden bg-slate-100">
                <img src={user.avatar || "https://ui-avatars.com/api/?name=User&background=random"} alt={user.name} className="w-full h-full object-cover" />
              </div>
              <button className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl">
                <Camera className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Basic Info */}
            <div className="flex-1 text-center md:text-left pt-2 md:pt-16">
              <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-slate-900">{user.name}</h1>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700 uppercase tracking-wider">
                  {getRoleName(user.role)}
                </span>
              </div>
              <p className="text-slate-500 text-sm max-w-2xl">
                {user.role === UserRole.STUDENT && "热爱物联网与人工智能，正在探索边缘计算在智能家居中的应用。保持好奇，持续进化。"}
                {user.role === UserRole.TEACHER && "致力于计算机科学教育，专注于将前沿技术融入课堂，培养下一代优秀工程师。"}
                {user.role === UserRole.ADMIN_SCHOOL && "负责学校信息化建设与教学资源管理，致力于提升全校师生的数字化体验。"}
                {user.role === UserRole.ADMIN_PLATFORM && "平台核心维护者，保障系统稳定运行，持续优化平台架构与服务体验。"}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-4 md:pt-16">
              <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-200">
                <Edit3 className="w-4 h-4" />
                编辑资料
              </button>
            </div>
          </div>

          {/* Quick Stats Grid */}
          {stats.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-t border-slate-100">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">{stat.label}</p>
                    <p className="text-xl font-black text-slate-900">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Column: Navigation & Quick Functions */}
        <div className="space-y-6">
          {/* Functional Entrances */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-4">
            <div className="grid grid-cols-1 gap-1">
              {quickActions.map((action, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveTab(action.id)}
                  className={`flex items-center justify-between w-full p-3 rounded-xl transition-all group ${
                    activeTab === action.id ? 'bg-blue-50' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                      activeTab === action.id ? 'bg-blue-100 text-blue-600' : 'bg-slate-50 text-slate-500 group-hover:bg-white group-hover:text-blue-600'
                    }`}>
                      <action.icon className="w-5 h-5" />
                    </div>
                    <span className={`text-sm font-bold ${
                      activeTab === action.id ? 'text-blue-700' : 'text-slate-700 group-hover:text-slate-900'
                    }`}>{action.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {action.count && action.count > 0 && (
                      <span className="px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-black rounded-full">
                        {action.count}
                      </span>
                    )}
                    <ChevronRight className={`w-4 h-4 ${
                      activeTab === action.id ? 'text-blue-400' : 'text-slate-300 group-hover:text-slate-500'
                    }`} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Main Tabs Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Tab Content Area */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 min-h-[400px]">
            {activeTab === 'profile' && (
              <div className="space-y-8">
                <h2 className="text-xl font-bold text-slate-900 mb-6">基本信息</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-500">姓名</label>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-900 font-medium">
                      {user.name}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-500">角色</label>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-900 font-medium">
                      {getRoleName(user.role)}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-500">邮箱</label>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-900 font-medium flex items-center gap-2">
                      <Mail className="w-4 h-4 text-slate-400" />
                      {user.name.toLowerCase()}@uusima.edu
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-500">手机号码</label>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-900 font-medium flex items-center gap-2">
                      <Phone className="w-4 h-4 text-slate-400" />
                      138****8888
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-500">所在地区</label>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-900 font-medium flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      中国 · 深圳
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-500">注册时间</label>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-900 font-medium flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      2024-03-15
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-8">
                <h2 className="text-xl font-bold text-slate-900 mb-6">账号安全</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-slate-500 shadow-sm">
                        <Lock className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">登录密码</h4>
                        <p className="text-sm text-slate-500">建议定期更改密码以保护账号安全</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                      修改
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-emerald-500 shadow-sm">
                        <Smartphone className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 flex items-center gap-2">
                          手机绑定
                          <span className="flex items-center gap-1 text-[10px] text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3 h-3" /> 已绑定
                          </span>
                        </h4>
                        <p className="text-sm text-slate-500">138****8888</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                      更换
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-emerald-500 shadow-sm">
                        <Mail className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 flex items-center gap-2">
                          邮箱绑定
                          <span className="flex items-center gap-1 text-[10px] text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3 h-3" /> 已绑定
                          </span>
                        </h4>
                        <p className="text-sm text-slate-500">{user.name.toLowerCase()}@uusima.edu</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                      更换
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-slate-900">消息通知</h2>
                  <button className="text-sm font-bold text-blue-600 hover:text-blue-700">全部标记为已读</button>
                </div>
                <div className="space-y-4">
                  {[
                    { title: '系统升级通知', desc: '平台将于本周日凌晨 2:00-4:00 进行系统维护，期间可能无法访问。', time: '10分钟前', unread: true },
                    { title: '安全提醒', desc: '您的账号在新的设备（Mac OS）上登录，如非本人操作请尽快修改密码。', time: '昨天 14:30', unread: true },
                    { title: '欢迎加入 UUSIMA', desc: '感谢您注册 UUSIMA 智慧教学平台，开启您的数字化学习/教学之旅。', time: '2024-03-15', unread: false },
                  ].map((msg, idx) => (
                    <div key={idx} className={`p-4 rounded-2xl border ${msg.unread ? 'bg-blue-50/50 border-blue-100' : 'bg-slate-50 border-slate-100'}`}>
                      <div className="flex items-start justify-between mb-2">
                        <h4 className={`font-bold flex items-center gap-2 ${msg.unread ? 'text-slate-900' : 'text-slate-700'}`}>
                          {msg.unread && <span className="w-2 h-2 rounded-full bg-blue-600"></span>}
                          {msg.title}
                        </h4>
                        <span className="text-xs text-slate-400">{msg.time}</span>
                      </div>
                      <p className="text-sm text-slate-500 pl-4">{msg.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="space-y-8">
                <h2 className="text-xl font-bold text-slate-900 mb-6">操作日志</h2>
                <div className="space-y-6 relative before:absolute before:left-6 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                  {[
                    { action: '登录系统', ip: '192.168.1.100', device: 'Mac OS / Chrome', time: '今天 09:30', icon: LogIn, color: 'bg-emerald-500' },
                    { action: '修改个人资料', ip: '192.168.1.100', device: 'Mac OS / Chrome', time: '昨天 15:20', icon: Edit3, color: 'bg-blue-500' },
                    { action: '登录系统', ip: '10.0.0.5', device: 'Windows / Edge', time: '2024-03-20 10:15', icon: LogIn, color: 'bg-emerald-500' },
                  ].map((log, idx) => (
                    <div key={idx} className="relative pl-14">
                      <div className={`absolute left-3 top-1 w-6 h-6 rounded-full ${log.color} border-4 border-white shadow-sm z-10 flex items-center justify-center`}>
                        <log.icon className="w-2.5 h-2.5 text-white" />
                      </div>
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <h4 className="text-sm font-bold text-slate-900 mb-2">{log.action}</h4>
                        <div className="flex items-center gap-4 text-xs text-slate-500">
                          <span className="flex items-center gap-1"><Monitor className="w-3 h-3" /> {log.device}</span>
                          <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> {log.ip}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {log.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
