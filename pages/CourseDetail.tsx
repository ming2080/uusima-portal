import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Clock, BookOpen, Tag, BarChart, GraduationCap, 
  Users, Play, CheckCircle2, ChevronRight, Wrench, 
  Cpu, Database, Box, Sparkles, MessageSquare, User,
  ArrowUp
} from 'lucide-react';

const CourseDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'intro' | 'syllabus'>('intro');

  // Mock data based on the image
  const course = {
    title: 'AIoT实训平台基础及案例实战',
    subtitle: 'AIoT实训平台基础及案例实战',
    duration: '0 小时',
    type: '暂无类型',
    tag: '暂无标签',
    difficulty: '容易',
    major: '物联网',
    students: 239,
    progress: 0,
    completedLessons: 0,
    totalLessons: 7,
    cover: 'https://picsum.photos/seed/aiot/600/300',
    instructor: {
      name: '陆老师',
      role: '讲师',
      avatar: 'https://i.pravatar.cc/150?u=teacher_lu'
    }
  };

  const syllabus = [
    {
      title: '第一章：智能家居环境监测系统(用EdgeX+Node-RED实现) 专项实战',
      tasks: [
        { id: '1-1', title: '1.1-1 使用MQTT协议将设备接入TB', type: 'iot' },
        { id: '1-2', title: '2.1-2 分析通过EdgeX和Node-RED将设备接入TB的技术架构', type: 'iot' },
        { id: '1-3', title: '3.1-3 在仿真平台安装ZigBee网络设备', type: 'iot' },
        { id: '1-4', title: '4.1-4 部署EdgeX并对接北向TB和南向MQTT协议设备', type: 'iot' },
        { id: '1-5', title: '5.1-5 使用Node-RED处理上报数据和下发命令的数据流', type: 'iot' },
        { id: '1-6', title: '6.1-6 实现空调控制规则链', type: 'iot' },
        { id: '1-7', title: '7.1-7 实现灯光控制规则链', type: 'iot' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header Banner */}
      <div className="bg-white border-b border-slate-200 pt-8 pb-12 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex justify-between items-start">
            <div className="flex-1 pr-12">
              <h1 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">{course.title}</h1>
              <p className="text-slate-500 mb-8">{course.subtitle}</p>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span>课时：<span className="font-medium text-slate-900">{course.duration}</span></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-blue-500" />
                  <span>课程类型：<span className="font-medium text-slate-900">{course.type}</span></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Tag className="w-4 h-4 text-blue-500" />
                  <span>课程标签：<span className="font-medium text-slate-900">{course.tag}</span></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <BarChart className="w-4 h-4 text-blue-500" />
                  <span>难度：<span className="font-medium text-slate-900">{course.difficulty}</span></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-blue-500" />
                  <span>专业：<span className="font-medium text-slate-900">{course.major}</span></span>
                </div>
              </div>
            </div>

            <div className="hidden lg:block w-[400px] h-[220px] rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/10 border border-slate-100">
              <img src={course.cover} alt="Course Cover" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>

            <button 
              onClick={() => navigate(-1)}
              className="absolute top-0 right-0 flex items-center gap-1.5 px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> 返回
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90">
                <circle cx="32" cy="32" r="28" fill="none" stroke="#f1f5f9" strokeWidth="4" />
                <circle cx="32" cy="32" r="28" fill="none" stroke="#3b82f6" strokeWidth="4" strokeDasharray={176} strokeDashoffset={176 * (1 - course.progress / 100)} strokeLinecap="round" />
              </svg>
              <span className="absolute text-sm font-bold text-slate-700">{course.progress}%</span>
            </div>
            <div>
              <p className="text-slate-500 text-sm">已学 {course.completedLessons} 节 | 学完 {course.progress}%</p>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="text-right">
              <p className="text-slate-500 text-sm">已有 <span className="font-bold text-slate-900">{course.students}</span> 人在学</p>
            </div>
            <button className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2">
              <Play className="w-4 h-4 fill-current" /> 去学习
            </button>
            {/* Small book illustration placeholder */}
            <div className="hidden xl:block w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Column: Content */}
        <div className="lg:col-span-3 space-y-8">
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            {/* Tabs */}
            <div className="flex border-b border-slate-100">
              <button 
                onClick={() => setActiveTab('intro')}
                className={`px-8 py-4 text-sm font-bold transition-all relative ${activeTab === 'intro' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
              >
                介绍
                {activeTab === 'intro' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full"></div>}
              </button>
              <button 
                onClick={() => setActiveTab('syllabus')}
                className={`px-8 py-4 text-sm font-bold transition-all relative ${activeTab === 'syllabus' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
              >
                目录
                {activeTab === 'syllabus' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full"></div>}
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-8">
              {activeTab === 'intro' ? (
                <div className="prose prose-slate max-w-none">
                  <p className="text-slate-600 leading-relaxed">
                    本教材由北京新大陆时代科技有限公司编写的物联网应用开发实训教材，旨在指导学生和从业者掌握智能家居与牧场监控系统的开发技能，适合作为物联网相关专业的实训课程教材，也适合IT从业者和爱好者自学使用。
                  </p>
                </div>
              ) : (
                <div className="space-y-8">
                  {syllabus.map((chapter, idx) => (
                    <div key={idx} className="space-y-4">
                      <h3 className="text-blue-600 font-bold flex items-center gap-2">
                        <div className="w-1.5 h-4 bg-blue-600 rounded-full"></div>
                        {chapter.title}
                      </h3>
                      <div className="space-y-2">
                        {chapter.tasks.map((task) => (
                          <div key={task.id} className="group flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
                            <div className="flex items-center gap-4">
                              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">
                                <Wrench className="w-4 h-4" />
                              </div>
                              <span className="text-slate-700 font-medium">{task.title}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-400" title="物联网">
                                  <Cpu className="w-3.5 h-3.5" />
                                </div>
                                <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-400" title="ThingsBoard">
                                  <Database className="w-3.5 h-3.5" />
                                </div>
                                <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-400" title="虚拟仿真">
                                  <Box className="w-3.5 h-3.5" />
                                </div>
                              </div>
                              <button className="px-4 py-1.5 bg-white border border-blue-200 text-blue-600 rounded-lg text-sm font-bold hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                                开始学习
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Sidebar */}
        <div className="space-y-6">
          {/* AI Tools */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-6 flex items-center gap-2">
              <div className="w-1 h-4 bg-blue-600 rounded-full"></div>
              AI工具
            </h3>
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200 cursor-pointer hover:scale-105 transition-transform">
                <Sparkles className="w-8 h-8" />
              </div>
              <span className="text-sm font-bold text-slate-700">AI工具</span>
            </div>
          </div>

          {/* Instructor */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-6 flex items-center gap-2">
              <div className="w-1 h-4 bg-blue-600 rounded-full"></div>
              课程开发人员
            </h3>
            <div className="flex items-center gap-4">
              <img src={course.instructor.avatar} alt={course.instructor.name} className="w-14 h-14 rounded-full border-2 border-white shadow-md" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{course.instructor.name}</span>
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded">{course.instructor.role}</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">讲师</p>
              </div>
            </div>
          </div>

          {/* Lab Environment */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-6 flex items-center gap-2">
              <div className="w-1 h-4 bg-blue-600 rounded-full"></div>
              实验环境
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-blue-500 border border-slate-100 hover:bg-blue-50 transition-colors cursor-pointer">
                  <Cpu className="w-6 h-6" />
                </div>
                <span className="text-[10px] text-slate-500 text-center font-medium">物联网实验环境</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-blue-500 border border-slate-100 hover:bg-blue-50 transition-colors cursor-pointer">
                  <Database className="w-6 h-6" />
                </div>
                <span className="text-[10px] text-slate-500 text-center font-medium">ThingsBoard</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-blue-500 border border-slate-100 hover:bg-blue-50 transition-colors cursor-pointer">
                  <Box className="w-6 h-6" />
                </div>
                <span className="text-[10px] text-slate-500 text-center font-medium">工程虚拟仿真</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Buttons */}
      <div className="fixed right-8 bottom-8 flex flex-col gap-4 z-50">
        <button className="w-14 h-14 bg-white rounded-2xl shadow-2xl border border-slate-100 flex flex-col items-center justify-center text-blue-600 hover:bg-blue-50 transition-all group">
          <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform" />
          <span className="text-[10px] font-bold mt-1">申请试用</span>
        </button>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-14 h-14 bg-white rounded-2xl shadow-2xl border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all group"
        >
          <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default CourseDetail;
