import React, { useState } from 'react';
import { Search, ChevronUp, ChevronDown, BookOpen } from 'lucide-react';

interface CourseFilterHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

const CourseFilterHeader: React.FC<CourseFilterHeaderProps> = ({ title, subtitle, icon }) => {
  const [isExpanded, setIsExpanded] = useState(false);
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
      label: '专业',
      options: ['全部', '物联网', '人工智能', '工业互联网', '大数据', '区块链', '专业技术技能', '岗位课程']
    },
    {
      id: 'subCategory',
      label: '子类',
      options: ['全部', '计算机视觉', '机器视觉', '深度学习', '机器学习', '自然语言处理', '大模型', '语音识别', '知识图谱', '基础', '数据分析', '机器人', '行业应用']
    },
    {
      id: 'courseType',
      label: '课程类型',
      options: ['全部', '岗位技能认证', '基础通识', '专业基础课', '专业核心课', '行业应用课', '技能课程', '岗位认证课']
    },
    {
      id: 'level',
      label: '层次',
      options: ['全部', '高职', '本科', '中职', '技工']
    }
  ];

  const sorts = ['默认排序', '最新', '使用最多'];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-6 overflow-hidden">
      {/* Top Bar */}
      <div className="px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100">
        <div className="flex items-center gap-4">
          {icon && (
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 shadow-sm border border-blue-100">
              {React.cloneElement(icon as React.ReactElement, { className: 'w-5 h-5' })}
            </div>
          )}
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h1>
            {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative w-40">
            <select className="w-full appearance-none bg-slate-50/50 border border-slate-200 text-slate-600 text-sm rounded-lg pl-3 pr-8 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all">
              <option value="">请选择标签</option>
              <option value="hot">热门课程</option>
              <option value="new">最新上架</option>
              <option value="recommend">名师推荐</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
          <div className="relative flex w-60">
            <input 
              type="text" 
              placeholder="请输入课程名进行搜索" 
              className="w-full bg-slate-50/50 border border-slate-200 border-r-0 text-slate-700 text-sm rounded-l-lg pl-3 pr-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-400"
            />
            <button className="bg-slate-50/50 border border-slate-200 border-l-0 rounded-r-lg px-3 text-slate-400 hover:text-blue-600 hover:bg-slate-100 transition-colors flex items-center justify-center">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Area */}
      <div className="px-6 py-4 space-y-3 relative transition-all duration-300 ease-in-out">
        {filters.map(filterGroup => {
          if (!isExpanded && filterGroup.id !== 'major' && filterGroup.id !== 'courseType') {
            return null;
          }
          return (
            <div key={filterGroup.id} className="flex items-start animate-fade-in">
              <span className="text-sm font-semibold text-slate-500 w-20 flex-shrink-0 pt-1">{filterGroup.label}：</span>
              <div className="flex flex-wrap gap-x-4 gap-y-1 flex-1 pr-16">
                {filterGroup.options.map(opt => {
                  const isActive = activeFilters[filterGroup.id as keyof typeof activeFilters] === opt;
                  return (
                    <button 
                      key={opt}
                      onClick={() => setActiveFilters({...activeFilters, [filterGroup.id]: opt})}
                      className={`px-2 py-1 text-sm rounded transition-all ${
                        isActive 
                          ? 'bg-blue-600 text-white font-medium shadow-sm' 
                          : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
        
        {isExpanded && (
          <div className="absolute bottom-4 right-6">
            <button 
              onClick={() => setIsExpanded(false)}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-blue-600 transition-colors px-2 py-1 rounded hover:bg-slate-100"
            >
              收起 <ChevronUp className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Sort Area */}
      <div className="px-6 py-2.5 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-8">
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
                  <span className="absolute -bottom-2.5 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full"></span>
                )}
              </button>
            );
          })}
        </div>
        
        {!isExpanded && (
          <button 
            onClick={() => setIsExpanded(true)}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-blue-600 transition-colors px-2 py-1 rounded hover:bg-slate-100"
          >
            展开筛选 <ChevronDown className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default CourseFilterHeader;
