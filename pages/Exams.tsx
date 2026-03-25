import React, { useState, useEffect } from 'react';
import { Clock, Users, Trophy, Award, PlayCircle, CheckCircle, ArrowRight, BookOpen } from 'lucide-react';

interface ExamsProps {
  onAccessTrigger: () => void;
}

type ExamMode = 'exam' | 'certification' | 'competition';
type ExamStatus = 'upcoming' | 'ongoing' | 'completed';

interface ExamTask {
  id: string;
  title: string;
  description: string;
  mode: ExamMode;
  status: ExamStatus;
  startTime: string;
  endTime: string;
  participants?: number;
  tags?: string[];
  imageUrl?: string;
}

const MOCK_TASKS: ExamTask[] = [
  // Exams
  {
    id: 'e1',
    title: '2026年春季学期期中考试 - 高等数学',
    description: '本次考试涵盖微积分基础、极限与连续等核心知识点，请同学们提前做好准备，携带学生证入场。',
    mode: 'exam',
    status: 'upcoming',
    startTime: '2026-04-10 09:00',
    endTime: '2026-04-10 11:00',
    participants: 120,
    tags: ['期中考试', '必修课']
  },
  {
    id: 'e2',
    title: '计算机网络原理随堂测验',
    description: '针对第三章网络层协议的随堂小测，考察IP协议及路由算法，闭卷考试。',
    mode: 'exam',
    status: 'ongoing',
    startTime: '2026-03-24 14:00',
    endTime: '2026-03-24 16:00',
    participants: 85,
    tags: ['随堂测验', '专业课']
  },
  {
    id: 'e3',
    title: '大学英语四级全真模拟考试',
    description: '全真模拟四级考试流程，包含听力、阅读、翻译和写作，帮助大家熟悉考试节奏。',
    mode: 'exam',
    status: 'completed',
    startTime: '2026-03-15 09:00',
    endTime: '2026-03-15 11:20',
    participants: 300,
    tags: ['模拟考试', '公共课']
  },
  // Certifications
  {
    id: 'c1',
    title: 'AWS Certified Solutions Architect - Associate',
    description: '亚马逊AWS官方认证，验证您在AWS平台上设计分布式系统的能力，是云计算领域的黄金证书。',
    mode: 'certification',
    status: 'upcoming',
    startTime: '2026-05-01 10:00',
    endTime: '2026-05-01 12:10',
    participants: 450,
    tags: ['云计算', '国际认证'],
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'c2',
    title: 'Python 数据分析师高级认证',
    description: '面向数据分析从业者的专业认证，涵盖机器学习、深度学习及复杂数据可视化实战。',
    mode: 'certification',
    status: 'ongoing',
    startTime: '2026-03-20 00:00',
    endTime: '2026-04-20 23:59',
    participants: 1200,
    tags: ['数据分析', 'Python'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'c3',
    title: '前端开发工程师（React）专业认证',
    description: '考察React底层原理、性能优化及复杂状态管理的高级职业认证，由业内资深专家出题。',
    mode: 'certification',
    status: 'completed',
    startTime: '2026-02-10 14:00',
    endTime: '2026-02-10 16:00',
    participants: 800,
    tags: ['前端开发', 'React']
  },
  // Competitions
  {
    id: 'comp1',
    title: '第十五届蓝桥杯全国软件和信息技术专业人才大赛',
    description: '全国性IT类学科竞赛，旨在推动软件开发技术的发展，培养创新型人才，含金量极高。',
    mode: 'competition',
    status: 'upcoming',
    startTime: '2026-06-15 09:00',
    endTime: '2026-06-15 13:00',
    participants: 5000,
    tags: ['算法', '国家级'],
    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'comp2',
    title: '2026 Hackathon 校园创客马拉松',
    description: '48小时极限编程挑战，将你的创意转化为现实，赢取丰厚奖金和顶级大厂的面试机会！',
    mode: 'competition',
    status: 'ongoing',
    startTime: '2026-03-23 09:00',
    endTime: '2026-03-25 09:00',
    participants: 300,
    tags: ['黑客松', '创新'],
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'comp3',
    title: '全国大学生数学建模竞赛',
    description: '运用数学方法和计算机技术解决实际问题的团队竞赛，考验团队协作与数理逻辑。',
    mode: 'competition',
    status: 'completed',
    startTime: '2025-09-05 18:00',
    endTime: '2025-09-08 20:00',
    participants: 10000,
    tags: ['数学建模', '团队赛']
  }
];

const TABS = [
  { id: 'exam', label: '常规考试', icon: BookOpen },
  { id: 'certification', label: '职业认证', icon: Award },
  { id: 'competition', label: '学科竞赛', icon: Trophy },
] as const;

const Exams: React.FC<ExamsProps> = ({ onAccessTrigger }) => {
  const [activeMode, setActiveMode] = useState<ExamMode>('exam');
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  const bannerItems = MOCK_TASKS.filter(task => task.imageUrl);
  const filteredTasks = MOCK_TASKS.filter(task => task.mode === activeMode);

  // Auto-rotate banner
  useEffect(() => {
    if (bannerItems.length === 0) return;
    const timer = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % bannerItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [bannerItems.length]);

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Section */}
        <div className="relative w-full h-[320px] md:h-[400px] rounded-2xl overflow-hidden mb-10 shadow-lg group">
          {bannerItems.map((item, index) => (
            <div
              key={item.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentBannerIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/60 to-transparent"></div>
              <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 w-full md:w-2/3">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`px-3 py-1 text-xs font-bold rounded-full text-white ${
                    item.mode === 'certification' ? 'bg-purple-500' : 'bg-orange-500'
                  }`}>
                    {item.mode === 'certification' ? '推荐认证' : '热门竞赛'}
                  </span>
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-white/20 text-white backdrop-blur-sm">
                    {item.status === 'ongoing' ? '进行中' : '即将开始'}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">{item.title}</h2>
                <p className="text-gray-200 text-sm md:text-base mb-8 line-clamp-2">{item.description}</p>
                <div>
                  <button onClick={onAccessTrigger} className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors flex items-center gap-2">
                    {item.status === 'ongoing' ? '立即参与' : '查看详情'}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {/* Banner Indicators */}
          <div className="absolute bottom-6 left-8 md:left-16 flex gap-2 z-20">
            {bannerItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBannerIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === currentBannerIndex ? 'bg-blue-500 w-8' : 'bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Tabs Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-900">考试与认证中心</h1>
          <div className="flex space-x-1 bg-white p-1 rounded-xl shadow-sm border border-gray-100 w-full sm:w-auto">
            {TABS.map(tab => {
              const Icon = tab.icon;
              const isActive = activeMode === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveMode(tab.id as ExamMode)}
                  className={`flex-1 sm:flex-none sm:px-6 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all ${
                    isActive 
                      ? 'bg-blue-50 text-blue-600 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Task List Section */}
        <div className="space-y-4">
          {filteredTasks.map(task => (
            <div key={task.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow group">
              
              {/* Left: Date/Status Block */}
              <div className="flex-shrink-0 w-full md:w-32 flex flex-col items-center justify-center p-4 rounded-lg bg-gray-50 border border-gray-100">
                {task.status === 'ongoing' ? (
                  <>
                    <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-2 animate-pulse">
                      <PlayCircle className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-bold text-green-600">进行中</span>
                  </>
                ) : task.status === 'completed' ? (
                  <>
                    <div className="w-12 h-12 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center mb-2">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-bold text-gray-500">已结束</span>
                  </>
                ) : (
                  <>
                    <div className="text-blue-600 font-bold text-2xl leading-none mb-1">
                      {task.startTime.split(' ')[0].split('-')[2]}
                    </div>
                    <div className="text-gray-500 text-xs font-medium uppercase">
                      {task.startTime.split(' ')[0].split('-')[1]}月
                    </div>
                    <div className="mt-2 text-xs text-gray-400 font-medium">
                      {task.startTime.split(' ')[1]}
                    </div>
                  </>
                )}
              </div>

              {/* Middle: Content */}
              <div className="flex-grow flex flex-col justify-center">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {task.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                  {task.description}
                </p>
                
                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>{task.startTime} - {task.endTime.split(' ')[1]}</span>
                  </div>
                  {task.participants && (
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span>{task.participants} 人参与</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 ml-auto">
                    {task.tags?.map(tag => (
                      <span key={tag} className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex-shrink-0 flex items-center justify-end md:justify-center md:w-32 md:border-l md:border-gray-100 md:pl-6">
                {task.status === 'upcoming' && (
                  <button onClick={onAccessTrigger} className="w-full py-2.5 px-4 rounded-lg font-medium text-sm text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors">
                    查看详情
                  </button>
                )}
                {task.status === 'ongoing' && (
                  <button onClick={onAccessTrigger} className="w-full py-2.5 px-4 rounded-lg font-medium text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-sm shadow-blue-200 transition-colors">
                    {task.mode === 'exam' ? '进入考试' : task.mode === 'competition' ? '立即参赛' : '开始认证'}
                  </button>
                )}
                {task.status === 'completed' && (
                  <button onClick={onAccessTrigger} className="w-full py-2.5 px-4 rounded-lg font-medium text-sm text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-colors">
                    查看成绩
                  </button>
                )}
              </div>

            </div>
          ))}
          
          {filteredTasks.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
              <p className="text-gray-500">暂无相关任务</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Exams;
