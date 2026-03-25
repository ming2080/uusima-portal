import React, { useState } from 'react';
import { Search, Play, Clock, BookOpen, CheckCircle } from 'lucide-react';

const MyLearning: React.FC = () => {
  const [activeTab, setActiveTab] = useState('教学任务');

  const courses = [
    {
      id: 1,
      title: '智能家居部署运维案例 V1.01758611027657',
      progress: 0,
      thumbnail: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=800&auto=format&fit=crop',
      type: '教学任务'
    },
    {
      id: 2,
      title: '数据标注与处理1758610948769',
      progress: 14,
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
      type: '教学任务'
    },
    {
      id: 3,
      title: '数据标注与处理1758535913954',
      progress: 0,
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
      type: '教学任务'
    }
  ];

  const tabs = ['教学任务', '学习任务', '已完成'];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab 
                  ? 'bg-blue-50 text-blue-600 shadow-sm' 
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="请输入课程名称进行搜索"
            className="w-full pl-10 pr-12 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-white border border-gray-200 rounded-md hover:bg-gray-50">
            <Search className="w-3.5 h-3.5 text-gray-500" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {courses.map(course => (
          <div key={course.id} className="p-4 border border-gray-100 rounded-xl hover:shadow-md transition-shadow group">
            <div className="flex gap-6">
              <div className="w-48 h-28 rounded-lg overflow-hidden flex-shrink-0 relative">
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Play className="w-8 h-8 text-white fill-white" />
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">{course.title}</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 transition-all duration-500" 
                        style={{ width: `${course.progress}%` }} 
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-400">{course.progress}%</span>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors shadow-sm">
                    继续学习
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyLearning;
