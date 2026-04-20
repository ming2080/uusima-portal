import React, { useState } from 'react';
import { Search, Filter, Monitor, Clock, BookOpen, ArrowRight, LayoutGrid, List, ChevronDown, Download, Share2, MoreHorizontal, FileText, CheckCircle2, BarChart2, Eye } from 'lucide-react';

const MyTeaching: React.FC = () => {
  const [activeTab, setActiveTab] = useState('全部');
  const [activeSubTab, setActiveSubTab] = useState('进行中');

  const tabs = ['全部', '练习任务', '实训任务', '考试任务'];
  const subTabs = ['进行中 (1)', '已归档 (0)'];

  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const tasks = [
    {
      id: 1,
      title: '多步骤仿真1774408865995',
      status: '审核通过',
      time: '2026-03-25 11:21:18',
      type: '实训任务',
      duration: '1000分钟',
      submission: '0/1',
      icon: Share2
    },
    {
      id: 2,
      title: '物联网基础练习',
      status: '进行中',
      time: '2026-03-24 09:00:00',
      type: '练习任务',
      duration: '120分钟',
      submission: '15/45',
      icon: BookOpen
    },
    {
      id: 3,
      title: '期中模拟考试',
      status: '待审核',
      time: '2026-03-23 14:30:00',
      type: '考试任务',
      duration: '90分钟',
      submission: '42/42',
      icon: FileText
    },
    {
      id: 4,
      title: '传感器综合实训',
      status: '审核通过',
      time: '2026-03-22 10:00:00',
      type: '实训任务',
      duration: '180分钟',
      submission: '10/38',
      icon: Monitor
    }
  ];

  return (
    <div>
      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="border-b border-gray-100 px-6">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 text-sm font-bold transition-all relative ${
                  activeTab === tab ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex space-x-8">
              {subTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveSubTab(tab.split(' ')[0])}
                  className={`py-2 text-sm font-bold transition-all relative ${
                    activeSubTab === tab.split(' ')[0] ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                  {activeSubTab === tab.split(' ')[0] && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center mb-8">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-all shadow-lg shadow-blue-600/20">
              <Download className="w-4 h-4" /> 下发任务
            </button>
            
            <div className="flex-1 max-w-md relative ml-4">
              <input 
                type="text" 
                placeholder="请输入任务名称/账户名/学生姓名" 
                className="w-full pl-4 pr-12 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-white border border-gray-100 rounded-md text-gray-400 hover:text-blue-600 transition-colors">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Task Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <div key={task.id} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-all group flex flex-col relative">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate pr-2" title={task.title}>
                      {task.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-emerald-500 text-xs font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> {task.status}
                      </span>
                    </div>
                  </div>
                  <div className="relative">
                    <button 
                      onClick={() => setOpenMenuId(openMenuId === task.id ? null : task.id)}
                      className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                    >
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                    
                    {openMenuId === task.id && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setOpenMenuId(null)} />
                        <div className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-20 animate-in fade-in zoom-in duration-200">
                          <button className="w-full px-4 py-2 text-left text-sm text-gray-600 hover:bg-gray-50 hover:text-blue-600 flex items-center gap-2">
                            <BookOpen className="w-4 h-4" /> 归档任务
                          </button>
                          <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                            <ArrowRight className="w-4 h-4 rotate-180" /> 取消任务
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="space-y-3 mb-6 flex-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">下发时间</span>
                    <span className="text-gray-600 font-medium">{task.time.split(' ')[0]}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">任务类型</span>
                    <span className="text-gray-600 font-medium">{task.type}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">持续时长</span>
                    <div className="flex items-center gap-1 text-gray-600 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      {task.duration}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-50">
                  <div className="flex flex-col items-center justify-center">
                    <div className="relative w-14 h-14 rounded-full border-2 border-gray-100 flex flex-col items-center justify-center mb-1.5">
                      <span className="text-sm font-bold text-gray-900">{task.submission}</span>
                      <span className="text-[8px] text-gray-400 uppercase">已提交</span>
                      <div className="absolute inset-0 border-2 border-blue-500 rounded-full border-t-transparent border-r-transparent -rotate-45" />
                    </div>
                    <button className="text-xs font-bold text-gray-500 hover:text-blue-600 transition-colors">批阅报告</button>
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-1.5 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      <task.icon className="w-7 h-7" />
                    </div>
                    <button className="text-xs font-bold text-gray-500 hover:text-blue-600 transition-colors">查看数据</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex items-center justify-between text-sm text-gray-500">
            <div>共 {tasks.length} 条</div>
            <div className="flex items-center gap-4">
              <select className="bg-white border border-gray-200 rounded-lg px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                <option>12条/页</option>
                <option>24条/页</option>
              </select>
              <div className="flex items-center gap-1">
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50" disabled>
                  &lt;
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white font-bold shadow-sm">
                  1
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50" disabled>
                  &gt;
                </button>
              </div>
              <div className="flex items-center gap-2">
                前往 <input type="text" className="w-10 h-8 border border-gray-200 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500/20" defaultValue="1" /> 页
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTeaching;
