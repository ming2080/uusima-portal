import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Course } from '../types';
import { Clock, BarChart, BookOpen, Users, Star } from 'lucide-react';
import CourseFilterHeader from '../components/CourseFilterHeader';

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
  const navigate = useNavigate();
  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <CourseFilterHeader 
          title="课程大厅" 
          subtitle="真实行业项目实战学习" 
          icon={<BookOpen className="w-6 h-6" />}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {COURSES_DATA.map((course) => (
            <div 
              key={course.id} 
              onClick={() => navigate(`/course/${course.id}`)}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group cursor-pointer"
            >
              <div className="h-44 relative overflow-hidden bg-slate-100">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  {/* Removed category tag from image as per reference */}
                </div>
                <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
                  <Clock className="w-3 h-3" /> {course.duration}
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="text-blue-500 font-medium bg-blue-50 px-2 py-1 rounded">人工智能/基础</span>
                  <span className="text-blue-500 font-medium">281 人在学</span>
                </div>
                
                <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">{course.title}</h3>
                <p className="text-slate-500 text-sm mb-4 line-clamp-2 flex-1 leading-relaxed"><span className="text-slate-400">课程概述：</span> {course.description}</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <span>实验环境：</span>
                      <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100">
                        <img src="https://api.iconify.design/logos:python.svg" alt="Python" className="w-4 h-4" />
                      </div>
                    </div>
                    <div 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/ai-interaction/${course.id || 'default'}`);
                      }}
                      className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs font-bold italic shadow-sm cursor-pointer hover:scale-110 transition-transform"
                      title="AI 互动"
                    >
                      AI
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;