import React from 'react';
import { Course } from '../types';
import { Clock, BarChart } from 'lucide-react';

interface CoursesProps {
  onAccessTrigger: () => void;
}

// Mock Data
const COURSES_DATA: Course[] = [
  { 
    id: '1', 
    title: '大数据分析', 
    description: '掌握 Hadoop、Spark 和数据可视化技术。', 
    category: '数据科学', 
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800', 
    lessons: 42, 
    duration: '12小时', 
    difficulty: '高级' 
  },
  { 
    id: '2', 
    title: '云计算基础', 
    description: 'AWS、Azure 和私有云基础设施介绍。', 
    category: '云计算', 
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800', 
    lessons: 28, 
    duration: '8小时', 
    difficulty: '中级' 
  },
  { 
    id: '3', 
    title: '物联网传感器网络', 
    description: '将物理世界连接到数字领域。', 
    category: '物联网', 
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800', 
    lessons: 15, 
    duration: '5小时', 
    difficulty: '初级' 
  },
  { 
    id: '4', 
    title: 'Python 自动化运维', 
    description: '编写脚本解决系统管理的实际问题。', 
    category: '编程', 
    thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&q=80&w=800', 
    lessons: 30, 
    duration: '10小时', 
    difficulty: '初级' 
  },
  { 
    id: '5', 
    title: '网络安全防御', 
    description: '防御现代网络威胁和漏洞。', 
    category: '安全', 
    thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800', 
    lessons: 50, 
    duration: '15小时', 
    difficulty: '高级' 
  },
  { 
    id: '6', 
    title: '工业机器人', 
    description: '自动化装配线的编程与维护。', 
    category: '工程', 
    thumbnail: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?auto=format&fit=crop&q=80&w=800', 
    lessons: 20, 
    duration: '6小时', 
    difficulty: '中级' 
  },
];

const Courses: React.FC<CoursesProps> = ({ onAccessTrigger }) => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">课程大厅</h1>
          <p className="text-gray-600 mt-2">浏览我们丰富的职业教育课程库。</p>
        </div>

        {/* Filters (Visual only for demo) */}
        <div className="flex flex-wrap gap-2 mb-8">
            {['全部', '数据科学', '云计算', '物联网', '安全'].map(cat => (
                <button key={cat} className={`px-4 py-2 rounded-full text-sm font-medium ${cat === '全部' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>
                    {cat}
                </button>
            ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COURSES_DATA.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col">
              <div className="h-48 relative overflow-hidden group">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded">
                   {course.category}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-1">{course.description}</p>
                
                <div className="flex items-center space-x-4 text-xs text-gray-400 mb-6">
                    <div className="flex items-center"><Clock className="w-3 h-3 mr-1"/> {course.duration}</div>
                    <div className="flex items-center"><BarChart className="w-3 h-3 mr-1"/> {course.difficulty}</div>
                </div>

                <button
                  onClick={onAccessTrigger}
                  className="w-full py-2 bg-blue-50 text-blue-600 font-medium rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
                >
                  开始学习
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;