import React from 'react';
import { Users, BookOpen, Monitor, CheckSquare, FileText, Bell, BarChart2, Calendar, Clock, ArrowRight, PlayCircle, PlusCircle, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { User } from '../../types';

interface Props {
  user: User;
}

const TeacherDashboard: React.FC<Props> = ({ user }) => {
  return (
    <div>
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
          <button className="bg-white hover:bg-gray-50 text-blue-600 px-4 py-2 rounded-lg font-medium transition-colors border border-blue-200 shadow-sm flex items-center gap-2 text-sm">
            <PlusCircle className="w-4 h-4" />
            下发任务
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2 text-sm">
            <PlusCircle className="w-4 h-4" />
            创建新课程
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: '授课班级数', value: '2', suffix: '个', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50', trend: '本学期' },
          { label: '在授课程门数', value: '5', suffix: '门', icon: BookOpen, color: 'text-indigo-600', bg: 'bg-indigo-50', trend: '进行中' },
          { label: '教学任务数', value: '18', suffix: '个', icon: CheckSquare, color: 'text-amber-600', bg: 'bg-amber-50', trend: '本周新增' },
          { label: '评卷数', value: '45', suffix: '份', icon: BarChart2, color: 'text-emerald-600', bg: 'bg-emerald-50', trend: '已完成' },
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
        <div className="lg:col-span-2 flex">
          
          {/* Recent Lab Sessions (Moved Up) */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 w-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <Monitor className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-900">我的教学任务安排</h2>
              </div>
              <Link to="/my-home/teaching" className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 cursor-pointer">
                查看所有教学任务 <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-4">
              {/* Filter Tabs */}
              <div className="flex items-center gap-6 border-b border-gray-100 pb-2 mb-4 text-sm">
                <button className="text-blue-600 font-medium border-b-2 border-blue-600 pb-2 -mb-[9px]">进行中 (919)</button>
                <button className="text-gray-500 hover:text-gray-900 pb-2 -mb-[9px]">已归档 (47)</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: '人工智能训练师（中级工）认证课程1775005481097', time: '2026-04-01 09:05:06', type: '实训任务', class: '试用账号班级', duration: '800分钟', status: '审核通过' },
                  { name: '机器学习基础1775003735950', time: '2026-04-01 08:35:52', type: '实训任务', class: '试用账号班级', duration: '2000分钟', status: '审核通过' },
                ].map((task, idx) => (
                  <div key={idx} className="border border-gray-100 rounded-lg p-5 bg-white shadow-sm flex flex-col justify-between">
                     <div className="flex justify-between items-start mb-4 border-b border-gray-50 pb-3">
                        <h3 className="text-sm font-medium text-gray-800 line-clamp-1">{task.name}</h3>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-green-500 text-xs">{task.status}</span>
                          <span className="text-gray-400 font-bold cursor-pointer hover:text-gray-600">···</span>
                        </div>
                     </div>
                     <div className="flex justify-between items-end">
                       <div className="space-y-2 text-xs text-gray-500">
                         <p>下发时间:{task.time}</p>
                         <p>任务类型:{task.type}</p>
                         <p>归属班级:{task.class}</p>
                         <p className="flex items-center gap-1 pt-1"><Clock className="w-3.5 h-3.5" /> {task.duration}</p>
                       </div>
                       <div className="flex items-center gap-6 text-center">
                          <div>
                            <div className="w-12 h-12 rounded-full bg-gray-50 border border-gray-100 flex flex-col items-center justify-center mb-1.5 mx-auto text-gray-400">
                              <span className="text-sm font-semibold text-gray-700 leading-none">0/1</span>
                              <span className="text-[10px]">已提交</span>
                            </div>
                            <span className="text-[10px] text-gray-500 cursor-pointer hover:text-blue-600">批阅报告</span>
                          </div>
                          <div>
                             <div className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center mb-1.5 mx-auto bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-600">
                                  <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5"/>
                                  <circle cx="18" cy="7" r="2" stroke="currentColor" strokeWidth="1.5"/>
                                  <circle cx="6" cy="7" r="2" stroke="currentColor" strokeWidth="1.5"/>
                                  <circle cx="18" cy="17" r="2" stroke="currentColor" strokeWidth="1.5"/>
                                  <circle cx="6" cy="17" r="2" stroke="currentColor" strokeWidth="1.5"/>
                                  <path d="M12 10V14" stroke="currentColor" strokeWidth="1.5"/>
                                  <path d="M10.5 11L7.5 8" stroke="currentColor" strokeWidth="1.5"/>
                                  <path d="M13.5 11L16.5 8" stroke="currentColor" strokeWidth="1.5"/>
                                  <path d="M10.5 13L7.5 16" stroke="currentColor" strokeWidth="1.5"/>
                                  <path d="M13.5 13L16.5 16" stroke="currentColor" strokeWidth="1.5"/>
                                </svg>
                             </div>
                             <span className="text-[10px] text-gray-500 cursor-pointer hover:text-blue-600">查看数据</span>
                          </div>
                       </div>
                     </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: AI Assistant */}
        <div className="flex">
          
          {/* AI Teaching Assistant Quick Access */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 w-full flex flex-col">
            <h2 className="text-lg font-bold text-gray-900 mb-6">AI工具集</h2>
            <div className="grid grid-cols-2 gap-4 flex-1">
              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100/50 text-center cursor-pointer hover:bg-blue-50 transition-colors flex flex-col items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white mb-3 shadow-sm relative">
                  <MessageSquare className="w-6 h-6" />
                  <span className="absolute -bottom-1 -right-1 bg-purple-500 text-[10px] px-1 rounded font-bold italic border border-white">AI</span>
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">AI课标</h3>
                <p className="text-xs text-gray-500">课程标准定制助手</p>
              </div>

              <div className="bg-purple-50/50 p-4 rounded-xl border border-purple-100/50 text-center cursor-pointer hover:bg-purple-50 transition-colors flex flex-col items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white mb-3 shadow-sm relative">
                  <BookOpen className="w-6 h-6" />
                  <span className="absolute -bottom-1 -right-1 bg-purple-500 text-[10px] px-1 rounded font-bold italic border border-white">AI</span>
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">AI大纲</h3>
                <p className="text-xs text-gray-500">教材大纲设计助手</p>
              </div>

              <div className="bg-orange-50/50 p-4 rounded-xl border border-orange-100/50 text-center cursor-pointer hover:bg-orange-50 transition-colors flex flex-col items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center text-white mb-3 shadow-sm relative">
                  <FileText className="w-6 h-6" />
                  <span className="absolute -bottom-1 -right-1 bg-purple-500 text-[10px] px-1 rounded font-bold italic border border-white">AI</span>
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">AI课件</h3>
                <p className="text-xs text-gray-500">调用AI生成PPT等</p>
              </div>

              <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100/50 text-center cursor-pointer hover:bg-amber-50 transition-colors flex flex-col items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-500 rounded-xl flex items-center justify-center text-white mb-3 shadow-sm relative">
                  <CheckSquare className="w-6 h-6" />
                  <span className="absolute -bottom-1 -right-1 bg-purple-500 text-[10px] px-1 rounded font-bold italic border border-white">AI</span>
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">AI题库</h3>
                <p className="text-xs text-gray-500">题库设计助手</p>
              </div>
            </div>
          </div>
        </div>
      </div>
          {/* Teaching Status (教学情况) */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-8">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-900">教学情况</h2>
              </div>
            </div>

            {/* Teaching Stats Header */}
            <div className="bg-blue-50/50 rounded-xl p-4 mb-6 flex justify-between items-center border border-blue-100/50">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <BarChart2 className="w-3.5 h-3.5" />
                </div>
                <span className="font-semibold text-gray-900 text-sm">教学统计</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">当前选择班级：</span>
                <select className="border border-gray-200 rounded-md text-xs py-1.5 px-3 pr-8 bg-white outline-none focus:border-blue-500 hover:border-blue-300 transition-colors cursor-pointer shadow-sm">
                  <option>20251128厦门技师学院</option>
                  <option>物联网2202班</option>
                  <option>计科2201班</option>
                  <option>大数据2301班</option>
                </select>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="border border-gray-100 rounded-lg p-4 text-center bg-white shadow-sm">
                <p className="text-xs text-gray-500 mb-2">教学任务数</p>
                <div className="text-2xl font-bold text-gray-900">8 <span className="text-sm font-normal text-gray-500">个</span></div>
              </div>
              <div className="border border-gray-100 rounded-lg p-4 text-center bg-white shadow-sm">
                <p className="text-xs text-gray-500 mb-2">平均学习时长</p>
                <div className="text-2xl font-bold text-gray-900">2.25 <span className="text-sm font-normal text-gray-500">分钟</span></div>
              </div>
              <div className="border border-gray-100 rounded-lg p-4 text-center bg-white shadow-sm">
                <p className="text-xs text-gray-500 mb-2">平均完成率</p>
                <div className="text-2xl font-bold text-gray-900">0 <span className="text-sm font-normal text-gray-500">%</span></div>
              </div>
            </div>

            {/* Content Area split */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Lefft: Course List */}
              <div className="w-full md:w-1/4 border border-gray-100 rounded-lg flex flex-col">
                <div className="p-3 border-b border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">班级列表</h3>
                  <div className="relative mb-2">
                    <input type="text" placeholder="班级名称" className="w-full bg-gray-50 border border-gray-200 rounded-md py-1.5 pl-3 pr-8 text-xs focus:outline-none focus:border-blue-500" />
                    <svg className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto max-h-[250px] p-2 space-y-1">
                  <div className="px-3 py-2 bg-blue-50 text-blue-600 text-xs font-medium rounded-md cursor-pointer">20251128厦门技师学院</div>
                  <div className="px-3 py-2 text-gray-600 hover:bg-gray-50 text-xs rounded-md cursor-pointer">物联网2202班</div>
                  <div className="px-3 py-2 text-gray-600 hover:bg-gray-50 text-xs rounded-md cursor-pointer">计科2201班</div>
                  <div className="px-3 py-2 text-gray-600 hover:bg-gray-50 text-xs rounded-md cursor-pointer">大数据2301班</div>
                </div>
              </div>

              {/* Middle: Course List */}
              <div className="w-full md:w-1/4 border border-gray-100 rounded-lg flex flex-col">
                <div className="p-3 border-b border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">课程列表</h3>
                  <div className="relative">
                    <input type="text" placeholder="课程名称" className="w-full bg-gray-50 border border-gray-200 rounded-md py-1.5 pl-3 pr-8 text-xs focus:outline-none focus:border-blue-500" />
                    <svg className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto max-h-[250px] p-2 space-y-1">
                  <div className="px-3 py-2 bg-blue-50 text-blue-600 text-xs font-medium rounded-md cursor-pointer">人工智能应用</div>
                  <div className="px-3 py-2 text-gray-600 hover:bg-gray-50 text-xs rounded-md cursor-pointer">物联网嵌入式技术（仿真）</div>
                  <div className="px-3 py-2 text-gray-600 hover:bg-gray-50 text-xs rounded-md cursor-pointer">人工智能基础</div>
                  <div className="px-3 py-2 text-gray-600 hover:bg-gray-50 text-xs rounded-md cursor-pointer">人工智能导论</div>
                  <div className="px-3 py-2 text-gray-600 hover:bg-gray-50 text-xs rounded-md cursor-pointer">深度学习入门</div>
                  <div className="px-3 py-2 text-gray-600 hover:bg-gray-50 text-xs rounded-md cursor-pointer">智慧行业应用开发</div>
                </div>
              </div>

              {/* Right: Task Overview */}
              <div className="flex-1 border border-gray-100 rounded-lg p-4">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-sm font-semibold text-gray-900">课程任务概览</h3>
                  <select className="border border-gray-200 rounded-md text-xs py-1 px-2 pr-6 bg-white outline-none focus:border-blue-500">
                    <option>人工智能应用1764640186080</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Participant Analysis */}
                  <div className="border border-gray-50 bg-gray-50/50 rounded-lg p-4 flex flex-col justify-center">
                    <h4 className="text-xs font-semibold text-gray-700 mb-4">参与情况分析</h4>
                    <div className="flex items-center justify-between">
                      <div className="text-center flex-1 border-r border-gray-200">
                        <p className="text-[10px] text-gray-500 mb-1">参与人数/总人数</p>
                        <p className="text-sm font-medium text-gray-900"><span className="text-blue-600 font-bold">1</span>/3 <span className="text-xs font-normal text-gray-500">人</span></p>
                      </div>
                      <div className="text-center flex-1 pl-4">
                        <div className="mb-2">
                          <p className="text-[10px] text-gray-500 mb-0.5">学习总时长</p>
                          <p className="text-sm font-medium text-gray-900">53 <span className="text-xs font-normal text-gray-500">分钟</span></p>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-500 mb-0.5">平均时长</p>
                          <p className="text-sm font-medium text-gray-900">53 <span className="text-xs font-normal text-gray-500">分钟/人</span></p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Task Completion Analysis */}
                  <div className="border border-gray-50 bg-gray-50/50 rounded-lg p-4 relative">
                    <div className="flex justify-between items-center mb-2">
                       <h4 className="text-xs font-semibold text-gray-700">任务完成分析</h4>
                       <span className="text-[10px] text-gray-500">总任务数: 3</span>
                    </div>
                    
                    <div className="flex items-center justify-center mt-2 gap-4">
                      {/* CSS-based Donut chart representation to avoid heavy Recharts setup for just one simple static donut */}
                      <div className="relative w-24 h-24">
                        <svg viewBox="0 0 36 36" className="w-full h-full text-red-500 transform -rotate-90">
                           <circle cx="18" cy="18" r="14" fill="none" className="stroke-current opacity-20" strokeWidth="6" />
                           <circle cx="18" cy="18" r="14" fill="none" className="stroke-current" strokeWidth="6" strokeDasharray="87.96" strokeDashoffset="0" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-[10px] font-bold text-gray-400">总体</span>
                        </div>
                      </div>
                      
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center justify-between text-[10px]">
                          <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-blue-500 rounded-sm"></div> <span className="text-gray-600">100%已完成</span></div>
                          <span className="font-medium">0.0%</span>
                        </div>
                        <div className="flex items-center justify-between text-[10px]">
                          <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-green-500 rounded-sm"></div> <span className="text-gray-600">80%-100%</span></div>
                          <span className="font-medium">0.0%</span>
                        </div>
                        <div className="flex items-center justify-between text-[10px]">
                          <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-yellow-500 rounded-sm"></div> <span className="text-gray-600">60%-80%</span></div>
                          <span className="font-medium">0.0%</span>
                        </div>
                        <div className="flex items-center justify-between text-[10px]">
                          <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-red-500 rounded-sm"></div> <span className="text-gray-600">低于60%</span></div>
                          <span className="font-medium">100.0%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Task Details Info (simplified) */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <h4 className="text-xs font-semibold text-gray-700 mb-3">任务详情</h4>
                  <div className="grid grid-cols-4 gap-4 text-center">
                    <div>
                      <p className="text-[10px] text-gray-500 mb-1">任务提交率</p>
                      <p className="text-xs font-bold text-gray-900">0.0%</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 mb-1">已提交</p>
                      <p className="text-xs font-medium text-gray-900">0 <span className="font-normal text-gray-500 text-[10px]">人</span></p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 mb-1">未提交</p>
                      <p className="text-xs font-medium text-red-500">3 <span className="font-normal text-red-400 text-[10px]">人</span></p>
                    </div>
                    <div className="flex items-center justify-center">
                      <a href="#" className="text-xs text-blue-600 hover:text-blue-800">查看</a>
                    </div>
                  </div>
                </div>

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
