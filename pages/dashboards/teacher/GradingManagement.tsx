import React, { useState } from 'react';
import { Search, Filter, Clock, ChevronRight, FileText, LayoutGrid, List } from 'lucide-react';

const GradingManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('常规考试');

  const tabs = ['常规考试', '认证体系', '竞赛'];

  const examList = [
    {
      id: 1,
      title: '实操题考试',
      major: '传感器',
      period: '2026-01-16 11:08:55 - 2026-04-08 00:04:59',
      status: '批阅中',
    }
  ];

  const pendingExams = [
    {
      id: 1,
      title: '实操题考试',
      major: '传感器',
      period: '2026-01-16 11:08:55 - 2026-04-08 00:04:59',
    }
  ];

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Tabs */}
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

          {/* Filters */}
          <div className="p-6 border-b border-gray-50 bg-gray-50/30">
            <div className="flex flex-wrap items-center gap-4">
              <div className="relative flex-1 min-w-[240px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索考试名称..."
                  className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">状态</span>
                  <select className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                    <option>全部状态</option>
                    <option>批阅中</option>
                    <option>已结束</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">专业</span>
                  <select className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                    <option>请选择专业</option>
                    <option>传感器</option>
                    <option>物联网</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* List */}
          <div className="p-6 space-y-4">
            {examList.map((exam) => (
              <div key={exam.id} className="bg-blue-50/30 border border-blue-100 rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-1 h-12 bg-blue-600 rounded-full mt-1" />
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-bold text-gray-900">{exam.title}</h3>
                      <span className="px-2.5 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded-md border border-blue-200">
                        {exam.status}
                      </span>
                    </div>
                    <p className="text-sm text-blue-600 font-medium mb-3">{exam.major}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>批阅日期</span>
                      <span>{exam.period}</span>
                    </div>
                  </div>
                </div>
                <button className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all">
                  继续评阅
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Side Panel */}
        <div className="w-full lg:w-80 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-base font-bold text-gray-900 mb-6">待评阅试卷列表</h2>
            <div className="space-y-4">
              {pendingExams.map((exam) => (
                <div key={exam.id} className="bg-blue-50/30 border border-blue-100 rounded-xl p-5 group hover:shadow-md transition-all">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{exam.title}</h3>
                  <p className="text-sm text-blue-600 font-medium mb-4">{exam.major}</p>
                  
                  <div className="flex items-center gap-2 text-[10px] text-gray-400 mb-6">
                    <Clock className="w-3.5 h-3.5" />
                    <div className="flex flex-col">
                      <span>批阅日期</span>
                      <span>{exam.period}</span>
                    </div>
                  </div>

                  <div className="relative h-24 mb-6 flex justify-center">
                    <div className="w-20 h-24 bg-white rounded-lg shadow-sm border border-blue-100 flex items-center justify-center relative overflow-hidden">
                       <FileText className="w-10 h-10 text-blue-200" />
                       <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent" />
                    </div>
                    <div className="absolute -right-2 top-4 w-12 h-16 bg-blue-600 rounded-lg shadow-lg flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform">
                       <FileText className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all text-sm">
                    继续评阅
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradingManagement;
