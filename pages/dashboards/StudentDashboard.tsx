import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Monitor, Award, Clock, TrendingUp, Calendar } from 'lucide-react';
import { User } from '../../types';

interface Props {
  user: User;
}

const StudentDashboard: React.FC<Props> = ({ user }) => {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">欢迎回来，{user.name} 同学！</h1>
        <p className="text-gray-500 mt-1">今天是继续学习的好日子，看看你今天的学习任务吧。</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: '在学课程', value: '4', icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: '实验时长', value: '32h', icon: Monitor, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: '获得证书', value: '2', icon: Award, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: '学习积分', value: '1,250', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
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
              <h2 className="text-lg font-bold text-gray-900">待办事项</h2>
              <Link to="/my-home/exams" className="text-sm text-blue-600 hover:text-blue-700 font-medium">查看全部</Link>
            </div>
            <div className="space-y-4">
              {[
                { title: '期中测试：计算机网络', time: '明天 14:00', type: '考试', color: 'text-red-600 bg-red-50' },
                { title: '提交实验报告：Linux基础', time: '周五 23:59', type: '作业', color: 'text-amber-600 bg-amber-50' },
                { title: '参加线上答疑：数据结构', time: '周六 10:00', type: '直播', color: 'text-purple-600 bg-purple-50' },
              ].map((task, idx) => (
                <div key={idx} className="flex items-start">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 ${task.color}`}>
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{task.title}</h3>
                    <div className="flex items-center mt-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3 mr-1" /> {task.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Path */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">学习路径</h2>
            <div className="relative border-l-2 border-blue-100 ml-3 space-y-6">
              {[
                { title: 'C语言基础', status: 'completed' },
                { title: '数据结构与算法', status: 'current' },
                { title: '操作系统原理', status: 'upcoming' },
                { title: '计算机网络', status: 'upcoming' },
              ].map((step, idx) => (
                <div key={idx} className="relative pl-6">
                  <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 ${
                    step.status === 'completed' ? 'bg-blue-500 border-blue-500' :
                    step.status === 'current' ? 'bg-white border-blue-500' : 'bg-white border-gray-300'
                  }`}></div>
                  <h3 className={`text-sm font-medium ${
                    step.status === 'completed' ? 'text-gray-500 line-through' :
                    step.status === 'current' ? 'text-blue-600 font-bold' : 'text-gray-400'
                  }`}>{step.title}</h3>
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
