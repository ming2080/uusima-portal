import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Monitor, Award, Clock, TrendingUp, Calendar, CheckSquare, ListTodo, FileText, BadgeCheck, GraduationCap, Building, NotebookTabs } from 'lucide-react';
import { User } from '../../types';

interface Props {
  user: User;
}

const StudentDashboard: React.FC<Props> = ({ user }) => {
  return (
    <div>
      {/* New Hero Section */}
      <div className="bg-gradient-to-r from-[#F0F5FF] to-[#E5EDFC] rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between shadow-sm relative overflow-hidden">
        {/* Background Decoration Pattern */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 w-64 h-64 bg-blue-200/40 blur-3xl rounded-full pointer-events-none"></div>

        <div className="flex-1 relative z-10">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">
            Hi, 15306915030 同学 下午好 欢迎回来~
          </h1>
          <div className="flex flex-wrap gap-8 items-center text-sm">
             <div className="flex items-center gap-2">
                 <div className="w-8 h-8 rounded-full bg-indigo-400 text-white flex items-center justify-center shadow-sm">
                   <GraduationCap className="w-4 h-4" />
                 </div>
                 <div>
                    <p className="text-gray-500 text-xs mb-0.5">班级</p>
                    <p className="font-semibold text-gray-800">试用账号班级</p>
                 </div>
             </div>
             <div className="flex items-center gap-2">
                 <div className="w-8 h-8 rounded-full bg-orange-300 text-white flex items-center justify-center shadow-sm">
                   <Building className="w-4 h-4" />
                 </div>
                 <div>
                    <p className="text-gray-500 text-xs mb-0.5">学院</p>
                    <p className="font-semibold text-gray-800">试用账号管理学校</p>
                 </div>
             </div>
             <div className="flex items-center gap-2">
                 <div className="w-8 h-8 rounded-full bg-sky-400 text-white flex items-center justify-center shadow-sm">
                   <NotebookTabs className="w-4 h-4" />
                 </div>
                 <div>
                    <p className="text-gray-500 text-xs mb-0.5">专业</p>
                    <p className="font-semibold text-gray-800">物联网 |</p>
                 </div>
             </div>
          </div>
        </div>
        
        <div className="relative z-10 hidden md:block shrink-0 mt-4 md:mt-0">
          {/* Vector style illustration replacement for the graphic in right of header */}
          <div className="w-32 h-32 relative flex items-center justify-center">
            <div className="absolute w-28 h-28 bg-white/60 blur-xl rounded-full"></div>
            <FileText className="w-20 h-20 text-blue-500 rotate-12 drop-shadow-lg" />
            <BadgeCheck className="w-10 h-10 text-emerald-400 absolute bottom-2 right-2 drop-shadow-md bg-white rounded-full" />
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {[
          { label: '待办任务', value: '8', unit: '个', icon: ListTodo, color: 'text-violet-500' },
          { label: '已完成任务', value: '1', unit: '个', icon: CheckSquare, color: 'text-blue-500' },
          { label: '已用时长', value: '176', unit: '分钟', icon: Clock, color: 'text-cyan-500' },
          { label: '剩余时长', value: '11,024', unit: '分钟', icon: Monitor, color: 'text-blue-600' },
          { label: '实验报告数', value: '1', unit: '份', icon: FileText, color: 'text-indigo-500' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden group">
            <div className="relative z-10">
              <p className="text-[13px] text-gray-500 font-medium mb-3">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 bg-clip-text text-transparent bg-gradient-to-br from-gray-900 to-gray-700">
                {stat.value} <span className="text-xs font-normal text-gray-500 ml-0.5">{stat.unit}</span>
              </p>
            </div>
            <div className={`absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 group-hover:opacity-20 transition-all duration-300 ${stat.color}`}>
              <stat.icon className="w-20 h-20 rotate-12" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Recent Learning */}
        <div className="lg:col-span-2 space-y-8">
          {/* Recent Courses */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-900">最近学习</h2>
              <Link to="/my-home/learning" className="text-sm text-blue-600 hover:text-blue-700 font-medium">查看全部</Link>
            </div>
            <div className="space-y-4">
              {[
                { title: '嵌入式系统开发与仿真', progress: 65, lastTime: '2小时前' },
                { title: 'Linux 服务器管理与运维实战', progress: 30, lastTime: '昨天' },
                { title: '物联网虚拟仿真综合实验', progress: 85, lastTime: '3天前' },
              ].map((course, idx) => (
                <div key={idx} className="flex items-center p-4 hover:bg-gray-50 rounded-xl transition-colors border border-gray-50">
                  <div className="w-16 h-12 bg-gray-200 rounded-lg mr-4 overflow-hidden">
                    <img src={`https://picsum.photos/seed/${idx + 10}/200/150`} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-gray-900 mb-1">{course.title}</h3>
                    <div className="flex items-center">
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full mr-3">
                        <div className="h-1.5 bg-blue-500 rounded-full" style={{ width: `${course.progress}%` }}></div>
                      </div>
                      <span className="text-xs text-gray-500 w-8">{course.progress}%</span>
                    </div>
                  </div>
                  <div className="ml-4 text-right">
                    <p className="text-xs text-gray-400 mb-1">{course.lastTime}</p>
                    <button className="text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors">
                      继续
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Labs */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-900">推荐实验</h2>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">进入实训中心</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: 'IoT 智能家居数据流实战', category: '组合型' },
                { title: 'Jupyter 交互式数据分析', category: '容器型' },
              ].map((lab, idx) => (
                <div key={idx} className="border border-gray-100 rounded-xl p-4 hover:border-blue-200 hover:shadow-md transition-all cursor-pointer group">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">{lab.category}</span>
                    <Monitor className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 mb-2">{lab.title}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2">基于虚拟仿真平台，完成从传感器数据采集、网关传输到云端平台展示...</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Schedule & Notifications */}
        <div className="space-y-8">
          {/* Upcoming Exams/Tasks */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-900">待考试任务</h2>
              <Link to="/my-home/exams" className="text-sm text-blue-600 hover:text-blue-700 font-medium">查看全部</Link>
            </div>
            <div className="space-y-4">
              {[
                { title: '期中测试：计算机网络', time: '明天 14:00', type: '考试', color: 'text-red-600 bg-red-50' },
                { title: '随堂测试：数据结构', time: '周五 10:00', type: '考试', color: 'text-red-600 bg-red-50' },
                { title: '期末模拟考试', time: '下周一 09:00', type: '考试', color: 'text-red-600 bg-red-50' },
              ].map((task, idx) => (
                <div key={idx} className="flex items-start">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 ${task.color}`}>
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-1">{task.title}</h3>
                    <div className="flex items-center mt-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3 mr-1" /> {task.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
