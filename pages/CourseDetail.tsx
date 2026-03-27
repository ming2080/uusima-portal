import React, { useState, useEffect, useRef } from 'react';
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
  const introRef = useRef<HTMLDivElement>(null);
  const syllabusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!introRef.current || !syllabusRef.current) return;

      const syllabusTop = syllabusRef.current.getBoundingClientRect().top;
      
      // If syllabus section is near the top (e.g., within 200px), set active tab to syllabus
      if (syllabusTop <= 200) {
        setActiveTab('syllabus');
      } else {
        setActiveTab('intro');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (section: 'intro' | 'syllabus') => {
    const ref = section === 'intro' ? introRef : syllabusRef;
    if (ref.current) {
      const headerOffset = 120; // Adjust based on sticky header height
      const elementPosition = ref.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

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
      <div className="bg-white border-b border-slate-200 pt-10 pb-12 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
            {/* Left: Course Cover */}
            <div className="relative group w-full lg:w-[320px] shrink-0">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2rem] opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-500"></div>
              <div className="relative aspect-video lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/20 border border-white/50 ring-1 ring-slate-200/50">
                <img 
                  src={course.cover} 
                  alt="Course Cover" 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                  referrerPolicy="no-referrer" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>
                <div className="absolute bottom-6 left-6 flex items-center gap-2">
                  <div className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-white text-xs font-bold tracking-wider uppercase">
                    {course.difficulty}
                  </div>
                  <div className="px-3 py-1 bg-blue-600 rounded-full text-white text-xs font-bold tracking-wider uppercase shadow-lg">
                    {course.major}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Course Info */}
            <div className="flex-1 space-y-5">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-md border border-blue-100 uppercase tracking-wider">
                    精品课程
                  </span>
                  <div className="h-1 w-1 rounded-full bg-slate-300"></div>
                  <span className="text-slate-500 text-sm font-medium">
                    {course.totalLessons} 课时内容
                  </span>
                </div>
                <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {course.title}
                </h1>
                <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-2xl">
                  {course.subtitle}
                </p>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-8 pt-2">
                <div className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">预计时长</p>
                    <p className="text-sm font-bold text-slate-900">{course.duration || '8小时'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">课程类型</p>
                    <p className="text-sm font-bold text-slate-900">{course.type === '暂无类型' ? '实战演练' : course.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                    <Tag className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">课程标签</p>
                    <p className="text-sm font-bold text-slate-900">{course.tag === '暂无标签' ? 'AIoT / Edge' : course.tag}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                    <BarChart className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">学习难度</p>
                    <p className="text-sm font-bold text-slate-900">{course.difficulty}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">适用专业</p>
                    <p className="text-sm font-bold text-slate-900">{course.major}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-colors">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">在学人数</p>
                    <p className="text-sm font-bold text-slate-900">{course.students} 人</p>
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={() => navigate(-1)}
              className="absolute top-0 right-0 flex items-center gap-2 px-5 py-2.5 bg-slate-100/80 backdrop-blur-sm text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-200 transition-all active:scale-95"
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
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm relative">
            {/* Tabs - Refined sticky positioning and appearance */}
            <div className="flex border-b border-slate-100 sticky top-[79px] bg-white z-30 rounded-t-2xl shadow-sm -mt-px">
              <button 
                onClick={() => scrollToSection('intro')}
                className={`px-6 py-3 text-sm font-bold transition-all relative ${activeTab === 'intro' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
              >
                介绍
                {activeTab === 'intro' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full"></div>}
              </button>
              <button 
                onClick={() => scrollToSection('syllabus')}
                className={`px-6 py-3 text-sm font-bold transition-all relative ${activeTab === 'syllabus' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
              >
                目录
                {activeTab === 'syllabus' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full"></div>}
              </button>
            </div>

            {/* Content - Optimized spacing for compactness and clarity */}
            <div className="p-6 pt-10 space-y-10">
              {/* Introduction Section */}
              <div ref={introRef} id="intro" className="scroll-mt-48">
                <div className="space-y-6">
                  {/* Overview */}
                  <div className="flex flex-col md:flex-row gap-5 items-start">
                    <div className="flex-1">
                      <h2 className="text-lg font-bold text-slate-900 mb-2">课程概述</h2>
                      <p className="text-slate-600 leading-relaxed text-sm">
                        本课程是专为物联网应用开发设计的实训教材，由北京新大陆时代科技有限公司权威编写。课程紧扣产业需求，通过“理论+实操”的模式，带领学员深入探索 AIoT（人工智能物联网）的核心技术架构。
                      </p>
                      <p className="text-slate-600 leading-relaxed mt-2 text-sm">
                        我们不仅关注基础理论的铺垫，更强调在真实场景中的应用落地。从传感器数据采集到云端平台对接，从自动化控制逻辑到 AI 赋能的智能决策，全方位提升学员的系统集成与开发能力。
                      </p>
                    </div>
                    <div className="w-full md:w-1/4 rounded-xl overflow-hidden shadow-sm border border-slate-100">
                      <img src="https://picsum.photos/seed/iot-tech/400/300" alt="IoT Technology" className="w-full h-auto" referrerPolicy="no-referrer" />
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                    <div className="p-2.5 bg-blue-50 rounded-xl border border-blue-100">
                      <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center text-white mb-1.5 shadow-sm shadow-blue-200">
                        <Cpu className="w-3.5 h-3.5" />
                      </div>
                      <h3 className="text-[13px] font-bold text-slate-900 mb-0.5">核心硬件实训</h3>
                      <p className="text-[10px] text-slate-600 leading-relaxed">深入学习 ZigBee、MQTT 等主流通信协议，掌握边缘计算网关的配置与部署。</p>
                    </div>
                    <div className="p-2.5 bg-indigo-50 rounded-xl border border-indigo-100">
                      <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center text-white mb-1.5 shadow-sm shadow-indigo-200">
                        <Database className="w-3.5 h-3.5" />
                      </div>
                      <h3 className="text-[13px] font-bold text-slate-900 mb-0.5">云端平台集成</h3>
                      <p className="text-[10px] text-slate-600 leading-relaxed">实战演练 ThingsBoard 平台对接，构建实时数据可视化仪表盘与规则链引擎。</p>
                    </div>
                    <div className="p-2.5 bg-purple-50 rounded-xl border border-purple-100">
                      <div className="w-7 h-7 bg-purple-600 rounded-lg flex items-center justify-center text-white mb-1.5 shadow-sm shadow-purple-200">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      <h3 className="text-[13px] font-bold text-slate-900 mb-0.5">AI 智能赋能</h3>
                      <p className="text-[10px] text-slate-600 leading-relaxed">引入 AI 智能体辅助教学，提供代码优化建议与实验步骤指导，实现智能化学习。</p>
                    </div>
                  </div>

                  {/* Scenarios */}
                  <div>
                    <h2 className="text-base font-bold text-slate-900 mb-2.5 text-center">核心实战场景</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      <div className="group cursor-pointer">
                        <div className="relative h-36 rounded-xl overflow-hidden mb-1.5 shadow-sm group-hover:shadow-md transition-all">
                          <img src="https://picsum.photos/seed/smarthome/600/400" alt="Smart Home" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2.5">
                            <h4 className="text-white font-bold text-sm">智慧家居环境监测</h4>
                          </div>
                        </div>
                        <p className="text-slate-600 text-[10px] leading-relaxed">
                          利用 EdgeX 和 Node-RED 构建完整的家居自动化系统，实现温湿度自动调节、灯光智能控制及安防报警功能。
                        </p>
                      </div>
                      <div className="group cursor-pointer">
                        <div className="relative h-36 rounded-xl overflow-hidden mb-1.5 shadow-sm group-hover:shadow-md transition-all">
                          <img src="https://picsum.photos/seed/smartfarm/600/400" alt="Smart Farm" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2.5">
                            <h4 className="text-white font-bold text-sm">智慧牧场监控系统</h4>
                          </div>
                        </div>
                        <p className="text-slate-600 text-[10px] leading-relaxed">
                          通过远距离无线通信技术监控牧场环境，结合 AI 视觉分析技术实现牲畜行为识别与健康预警。
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Syllabus Section */}
              <div ref={syllabusRef} id="syllabus" className="scroll-mt-48">
                <div className="space-y-6">
                  {syllabus.map((chapter, idx) => (
                    <div key={idx} className="space-y-3">
                      <h3 className="text-blue-600 font-bold flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-4 bg-blue-600 rounded-full"></div>
                        {chapter.title}
                      </h3>
                      <div className="space-y-1.5">
                        {chapter.tasks.map((task) => (
                          <div key={task.id} className="group flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
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
              </div>
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
              <div 
                onClick={() => navigate(`/ai-interaction/${id || 'default'}`)}
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200 cursor-pointer hover:scale-105 transition-transform"
              >
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
