import React, { useState } from 'react';
import { Search, Filter, Monitor, Clock, BookOpen, ArrowRight, LayoutGrid, List, ChevronDown, Download, Share2, MoreHorizontal } from 'lucide-react';

const MyCourses: React.FC = () => {
  const [activeTab, setActiveTab] = useState('全部');

  const filterOptions = {
    '课程类型': ['全部', '认证体系', '基础通识', '专业基础课', '专业核心课', '行业应用课', '技能课程', '岗位认证课'],
    '专业': ['全部', '物联网', '人工智能', '工业互联网', '大数据', '区块链', '专业技术技能', '岗位课程'],
    '子类': ['全部']
  };

  const courses = [
    {
      id: 1,
      title: '多步骤仿真',
      major: '传感器',
      date: '2026-03-04 18:36:28',
      desc: '课程简介：12',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
      environments: ['iot']
    },
    {
      id: 2,
      title: '单步骤仿真',
      major: '传感器',
      date: '2026-03-04 18:33:25',
      desc: '课程简介：仿真课程',
      image: 'https://images.unsplash.com/photo-1558494949-ef526b0042a0?q=80&w=800&auto=format&fit=crop',
      environments: ['iot']
    },
    {
      id: 3,
      title: '2026-1-23课程',
      major: '传感器',
      date: '2026-01-23 19:17:14',
      desc: '课程简介：2026-1-23课程',
      image: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=800&auto=format&fit=crop',
      environments: ['iot', 'network', 'cloud']
    },
    {
      id: 4,
      title: '全案例',
      major: '物联网',
      date: '2023-08-30 11:34:44',
      desc: '课程简介：包含家居牧场温室',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
      environments: ['iot', 'network', 'cloud', 'more']
    }
  ];

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
           <div className="flex-1 max-w-xl relative">
              <input 
                type="text" 
                placeholder="请输入课程名进行搜索" 
                className="w-full pl-4 pr-12 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-white border border-gray-100 rounded-md text-gray-400 hover:text-blue-600 transition-colors">
                <Search className="w-4 h-4" />
              </button>
           </div>
           <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              <Share2 className="w-5 h-5" />
           </button>
        </div>

        <div className="space-y-4">
          {Object.entries(filterOptions).map(([label, options]) => (
            <div key={label} className="flex items-start gap-4">
              <span className="text-sm font-bold text-gray-900 w-20 pt-1.5">{label}：</span>
              <div className="flex flex-wrap gap-2 flex-1">
                {options.map((option) => (
                  <button
                    key={option}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                      option === '全部' 
                        ? 'bg-blue-600 text-white shadow-sm' 
                        : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {label === '子类' && (
                <button className="text-xs text-gray-400 flex items-center gap-1 hover:text-blue-600 transition-colors pt-1.5">
                  收起 <ChevronDown className="w-3 h-3 rotate-180" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Sorting and View Toggle */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-6">
          <button className="text-sm font-bold text-blue-600 border-b-2 border-blue-600 pb-1">默认排序</button>
          <button className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors pb-1">最新</button>
          <button className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors pb-1">使用最多</button>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all group flex flex-col">
            <div className="relative h-48 overflow-hidden">
              <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">{course.title}</h3>
              <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                <span className="text-blue-600 font-bold">{course.major}</span>
                <span>{course.date}</span>
              </div>
              <p className="text-gray-500 text-sm mb-6 flex-1 line-clamp-2">{course.desc}</p>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-gray-400 mr-1">环境：</span>
                  {course.environments.map((env, idx) => (
                    <div key={idx} className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100">
                      {env === 'iot' && <Monitor className="w-3 h-3" />}
                      {env === 'network' && <Share2 className="w-3 h-3" />}
                      {env === 'cloud' && <BookOpen className="w-3 h-3" />}
                      {env === 'more' && <MoreHorizontal className="w-3 h-3" />}
                    </div>
                  ))}
                </div>
                <button className="flex items-center gap-1.5 px-4 py-2 bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 text-sm font-bold rounded-lg transition-all shadow-sm">
                  <Download className="w-4 h-4" /> 下发任务
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-12 flex items-center justify-between text-sm text-gray-500">
        <div>共 4 条</div>
        <div className="flex items-center gap-4">
          <select className="bg-white border border-gray-200 rounded-lg px-2 py-1 text-xs">
            <option>12条/页</option>
          </select>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              &lt;
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white font-bold shadow-sm">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              &gt;
            </button>
          </div>
          <div className="flex items-center gap-2">
            前往 <input type="text" className="w-10 h-8 border border-gray-200 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500/20" defaultValue="1" /> 页
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
