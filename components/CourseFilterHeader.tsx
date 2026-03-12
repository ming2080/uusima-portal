import React, { useState } from 'react';
import { Search, ChevronUp, ChevronDown, BookOpen } from 'lucide-react';

interface CourseFilterHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

const CourseFilterHeader: React.FC<CourseFilterHeaderProps> = ({ title, subtitle, icon }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeFilters, setActiveFilters] = useState({
    major: '人工智能',
    subCategory: '全部',
    courseType: '全部',
    level: '全部',
    sort: '默认排序'
  });

  const filters = [
    {
      id: 'major',
      label: '专业：',
      options: ['全部', '物联网', '人工智能', '工业互联网', '大数据', '区块链', '专业技术技能', '岗位课程']
    },
    {
      id: 'subCategory',
      label: '子类：',
      options: ['全部', '计算机视觉', '机器视觉', '深度学习', '机器学习', '自然语言处理', '大模型', '语音识别', '知识图谱', '基础', '数据分析', '机器人', '行业应用']
    },
    {
      id: 'courseType',
      label: '课程类型：',
      options: ['全部', '岗位技能认证', '基础通识', '专业基础课', '专业核心课', '行业应用课', '技能课程', '岗位认证课']
    },
    {
      id: 'level',
      label: '层次：',
      options: ['全部', '高职', '本科', '中职', '技工']
    }
  ];

  const sorts = ['默认排序', '最新', '使用最多'];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-6 overflow-hidden">
      {/* Top Bar */}
      <div className="p-6 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100">
        <div className="flex items-center gap-4">
          {icon && (
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shadow-sm border border-blue-100">
              {icon}
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{title}</h1>
            {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative w-48">
            <select className="w-full appearance-none bg-white border border-slate-200 text-slate-500 text-sm rounded-lg pl-4 pr-10 py-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all">
              <option value="">请选择标签</option>
              <option value="hot">热门课程</option>
              <option value="new">最新上架</option>
              <option value="recommend">名师推荐</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
          <div className="relative flex w-64">
            <input 
              type="text" 
              placeholder="请输入课程名进行搜索" 
              className="w-full bg-white border border-slate-200 border-r-0 text-slate-700 text-sm rounded-l-lg pl-4 pr-4 py-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-400"
            />
            <button className="bg-white border border-slate-200 border-l-0 rounded-r-lg px-4 text-slate-400 hover:text-blue-600 hover:bg-slate-50 transition-colors flex items-center justify-center">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Area */}
      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="p-6 pt-4 space-y-4 relative bg-slate-50/30">
          {filters.map(filterGroup => (
            <div key={filterGroup.id} className="flex items-start">
              <span className="text-sm font-medium text-slate-700 w-20 flex-shrink-0 pt-1.5">{filterGroup.label}</span>
              <div className="flex flex-wrap gap-2 flex-1 pr-16">
                {filterGroup.options.map(opt => {
                  const isActive = activeFilters[filterGroup.id as keyof typeof activeFilters] === opt;
                  return (
                    <button 
                      key={opt}
                      onClick={() => setActiveFilters({...activeFilters, [filterGroup.id]: opt})}
                      className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                        isActive 
                          ? 'bg-blue-50 text-blue-600 border border-blue-200 font-medium' 
                          : 'text-slate-600 hover:text-blue-600 border border-transparent hover:bg-slate-100'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
          
          <div className="absolute bottom-4 right-6">
            <button 
              onClick={() => setIsExpanded(false)}
              className="flex items-center gap-1 text-sm text-slate-500 hover:text-blue-600 transition-colors bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm hover:shadow"
            >
              收起 <ChevronUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Sort Area */}
      <div className="px-6 py-3 bg-white border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-6">
          {sorts.map(sort => {
            const isActive = activeFilters.sort === sort;
            return (
              <button 
                key={sort}
                onClick={() => setActiveFilters({...activeFilters, sort})}
                className={`text-sm font-medium transition-colors relative py-1 ${
                  isActive ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {sort}
                {isActive && (
                  <span className="absolute -bottom-3 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full"></span>
                )}
              </button>
            );
          })}
        </div>
        
        {!isExpanded && (
          <button 
            onClick={() => setIsExpanded(true)}
            className="flex items-center gap-1 text-sm text-slate-500 hover:text-blue-600 transition-colors"
          >
            展开筛选 <ChevronDown className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default CourseFilterHeader;
