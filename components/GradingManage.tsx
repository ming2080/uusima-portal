import React, { useState } from "react";
import {
  RotateCcw,
  Search,
  Calendar,
  Inbox
} from "lucide-react";

const GradingManage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("grading");

  const tabs = [
    { id: "grading", label: "批阅管理" },
    { id: "waiting", label: "待我批阅" },
    { id: "free", label: "自由批阅" },
  ];

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Tabs */}
      <div className="flex items-center border-b border-slate-200 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 text-sm font-medium transition-all relative ${
              activeTab === tab.id
                ? "text-blue-600"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
            )}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap gap-3 items-center">
        <div className="w-48">
          <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white">
            <option value="">请选择考试</option>
          </select>
        </div>
        <div className="w-48">
          <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white">
            <option value="">选择阅卷分类</option>
          </select>
        </div>
        <div className="w-40">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="考试开始时间"
              className="w-full pl-10 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>
        <div className="w-40">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="考试结束时间"
              className="w-full pl-10 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>
        <div className="w-48">
          <input
            type="text"
            placeholder="搜索考试名称"
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors ml-auto">
          <RotateCcw className="w-4 h-4" />
          重置
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px] flex flex-col">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-4 py-3 text-sm font-bold text-slate-700">考试名称</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">协作方式</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">阅卷时间</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">试卷总数</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">待阅试卷</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">已阅试卷</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">指派状态</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">阅卷状态</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">操作</th>
            </tr>
          </thead>
        </table>
        
        {/* Empty State */}
        <div className="flex-1 flex flex-col items-center justify-center text-slate-400 py-20">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
            <Inbox className="w-8 h-8 text-slate-300" />
          </div>
          <p className="text-sm">暂无数据</p>
        </div>
      </div>
    </div>
  );
};

export default GradingManage;
