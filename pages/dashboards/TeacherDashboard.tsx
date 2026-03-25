import React from 'react';
import { Users, BookOpen, Monitor, CheckSquare, FileText, Bell, BarChart2, Calendar, Clock, ArrowRight, PlayCircle, PlusCircle, MessageSquare } from 'lucide-react';
import { User } from '../../types';

interface Props {
  user: User;
}

const TeacherDashboard: React.FC<Props> = ({ user }) => {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-bold">
            {user.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">您好，{user.name} 老师！</h1>
            <p className="text-gray-500 mt-1 flex items-center gap-2">
              <Calendar className="w-4 h-4" /> 今天是 2024年3月20日，星期三
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            消息通知
            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">3</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2">
            <PlusCircle className="w-4 h-4" />
            创建新课程
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: '授课班级', value: '6', suffix: '个', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50', trend: '+1 本学期' },
          { label: '在教课程', value: '3', suffix: '门', icon: BookOpen, color: 'text-indigo-600', bg: 'bg-indigo-50', trend: '共 128 课时' },
          { label: '待批改作业', value: '12', suffix: '份', icon: CheckSquare, color: 'text-amber-600', bg: 'bg-amber-50', trend: '需在周五前完成' },
          { label: '实验资源使用率', value: '78', suffix: '%', icon: BarChart2, color: 'text-emerald-600', bg: 'bg-emerald-50', trend: '高于平均水平 15%' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded-md">{stat.trend}</span>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900 mb-1">
                {stat.value}<span className="text-lg font-medium text-gray-500 ml-1">{stat.suffix}</span>
              </p>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Teaching Management */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Recent Lab Sessions (Moved Up) */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <Monitor className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-900">今日实验安排</h2>
              </div>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                查看完整课表 <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              {[
                { name: '传感器数据采集实验', class: '物联网2202班', time: '14:00 - 16:00', status: '即将开始', color: 'text-amber-600 bg-amber-50', active: true },
                { name: 'Linux基础命令操作', class: '计科2201班', time: '08:00 - 10:00', status: '已结束', color: 'text-gray-500 bg-gray-100', active: false },
              ].map((lab, idx) => (
                <div key={idx} className={`flex items-center justify-between p-4 rounded-xl border ${lab.active ? 'border-blue-100 bg-blue-50/30' : 'border-gray-100 bg-white'}`}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gray-50 flex flex-col items-center justify-center border border-gray-100">
                      <span className="text-xs text-gray-500">周三</span>
                      <span className="text-sm font-bold text-gray-900">{lab.time.split(' ')[0]}</span>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-900">{lab.name}</h3>
                      <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                        <Users className="w-3.5 h-3.5" /> {lab.class}
                        <span className="text-gray-300">|</span>
                        <Clock className="w-3.5 h-3.5" /> {lab.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${lab.color}`}>{lab.status}</span>
                    {lab.active && (
                      <button className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm">
                        <PlayCircle className="w-4 h-4" /> 进入监控室
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* My Courses */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-900">我的课程</h2>
              </div>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                课程管理 <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: '物联网综合实训', class: '计科2201班', students: 45, progress: 60, nextTopic: 'MQTT协议应用' },
                { title: '嵌入式系统开发', class: '物联网2202班', students: 38, progress: 45, nextTopic: 'RTOS任务调度' },
                { title: 'Python数据分析', class: '大数据2301班', students: 50, progress: 20, nextTopic: 'Pandas数据清洗' },
              ].map((course, idx) => (
                <div key={idx} className="p-5 border border-gray-100 rounded-xl hover:shadow-md transition-all group">
                  <div className="flex justify-between items-start mb-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <button className="text-sm font-medium text-blue-600 hover:text-blue-800 px-3 py-1.5 bg-blue-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      备课
                    </button>
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-1">{course.title}</h3>
                  <p className="text-sm text-gray-500 mb-4">{course.class} · {course.students} 人</p>
                  
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <p className="text-xs text-gray-500 mb-1">下次课程内容：</p>
                    <p className="text-sm font-medium text-gray-900">{course.nextTopic}</p>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                      <span>教学进度</span>
                      <span className="font-medium text-gray-900">{course.progress}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${course.progress}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Tasks & AI Assistant */}
        <div className="space-y-8">
          
          {/* AI Teaching Assistant Quick Access */}
          <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-2xl shadow-lg p-6 text-white relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <SparklesIcon className="w-5 h-5 text-yellow-300" />
                <h2 className="text-lg font-bold">UusiBot 教学助手</h2>
              </div>
              <p className="text-blue-100 text-sm mb-6 leading-relaxed">
                基于大模型的智能助手，可帮您自动生成教案、批改作业、分析学情，大幅提升备课效率。
              </p>
              
              <div className="space-y-3">
                <button className="w-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-colors py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2">
                  <FileText className="w-4 h-4" /> 一键生成本周教案
                </button>
                <button className="w-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-colors py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2">
                  <CheckSquare className="w-4 h-4" /> 智能批改待办作业
                </button>
                <button className="w-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-colors py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2">
                  <BarChart2 className="w-4 h-4" /> 生成班级学情报告
                </button>
              </div>
            </div>
          </div>

          {/* Pending Tasks */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-900">待办任务</h2>
              <span className="bg-red-50 text-red-600 text-xs font-bold px-2 py-1 rounded-md">18 项待办</span>
            </div>
            <div className="space-y-3">
              {[
                { title: '批改《嵌入式系统》实验报告', count: 12, icon: FileText, color: 'text-blue-600 bg-blue-50', urgent: true },
                { title: '审核《Python基础》期中试卷', count: 1, icon: CheckSquare, color: 'text-purple-600 bg-purple-50', urgent: false },
                { title: '处理学生答疑请求', count: 5, icon: Bell, color: 'text-amber-600 bg-amber-50', urgent: true },
              ].map((task, idx) => (
                <div key={idx} className="flex items-center p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-gray-100 group">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 ${task.color}`}>
                    <task.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{task.title}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{task.count} 项待处理</p>
                  </div>
                  {task.urgent && <div className="w-2 h-2 rounded-full bg-red-500"></div>}
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 text-sm text-gray-500 hover:text-gray-900 font-medium transition-colors">
              查看全部任务
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

// Helper component for Sparkles icon
const SparklesIcon = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
);

export default TeacherDashboard;
