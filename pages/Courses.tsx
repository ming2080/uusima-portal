import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Course } from '../types';
import { Clock, BookOpen, Loader2 } from 'lucide-react';
import CourseFilterHeader from '../components/CourseFilterHeader';

interface CoursesProps {
  onAccessTrigger: () => void;
}

const AI_COURSE_TEMPLATES = [
  { title: '机器学习基础', description: '掌握监督学习、无监督学习等核心算法及应用。', category: '人工智能' },
  { title: '深度学习入门', description: '基于 PyTorch/TensorFlow 构建神经网络模型。', category: '人工智能' },
  { title: '自然语言处理实战', description: '文本分类、情感分析与机器翻译技术解析。', category: '人工智能' },
  { title: '计算机视觉与图像处理', description: '图像识别、目标检测与图像分割算法实战。', category: '人工智能' },
  { title: '强化学习导论', description: '智能体与环境交互，马尔可夫决策过程详解。', category: '人工智能' },
  { title: '生成式对抗网络', description: '深入理解 GAN 原理，实现图像生成与风格迁移。', category: '人工智能' },
  { title: 'AI 伦理与安全', description: '探讨人工智能发展中的数据隐私与算法偏见问题。', category: '人工智能' },
  { title: '大语言模型微调', description: '基于开源 LLM 进行指令微调与领域知识注入。', category: '人工智能' },
  { title: '自动驾驶中的 AI', description: '感知、决策与控制系统中的深度学习应用。', category: '人工智能' },
  { title: '智能推荐系统', description: '协同过滤、深度推荐模型在电商与内容平台的应用。', category: '人工智能' },
  { title: '语音识别与合成', description: 'ASR 与 TTS 技术原理，构建智能语音助手。', category: '人工智能' },
  { title: '知识图谱构建', description: '信息抽取、实体链接与图数据库实战。', category: '人工智能' },
  { title: 'AI 在医疗中的应用', description: '医学影像分析、疾病预测与智能问诊系统。', category: '人工智能' },
  { title: '金融风控中的机器学习', description: '信用评分、欺诈检测与量化交易算法。', category: '人工智能' },
  { title: '机器人运动规划', description: '路径规划、避障算法与机器人运动学。', category: '人工智能' },
  { title: 'AI 绘画与创作', description: 'Stable Diffusion 与 Midjourney 提示词工程。', category: '人工智能' },
  { title: '联邦学习实战', description: '隐私保护下的分布式机器学习框架与应用。', category: '人工智能' },
  { title: '边缘计算与 AI', description: '模型压缩、量化与边缘设备上的 AI 部署。', category: '人工智能' },
  { title: '情感分析技术', description: '多模态情感计算与社交媒体舆情监控。', category: '人工智能' },
  { title: '智能对话机器人开发', description: '意图识别、多轮对话管理与 RAG 技术。', category: '人工智能' },
  { title: '异常检测算法', description: '工业物联网与网络安全中的异常行为识别。', category: '人工智能' },
  { title: '时间序列预测', description: 'LSTM、Transformer 在股票与销量预测中的应用。', category: '人工智能' },
  { title: 'AI 游戏智能', description: '强化学习在游戏 NPC 行为控制中的实践。', category: '人工智能' },
  { title: '脑机接口与 AI', description: '脑电信号处理与意念控制技术前沿。', category: '人工智能' },
];

const AI_THUMBNAILS = [
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1531297172867-4b4413e2269a?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1515378960530-7c0da6229678?auto=format&fit=crop&q=80&w=800',
];

const generateCourses = (page: number, pageSize: number): Course[] => {
  const courses: Course[] = [];
  for (let i = 0; i < pageSize; i++) {
    const templateIndex = ((page - 1) * pageSize + i) % AI_COURSE_TEMPLATES.length;
    const thumbnailIndex = ((page - 1) * pageSize + i) % AI_THUMBNAILS.length;
    const template = AI_COURSE_TEMPLATES[templateIndex];
    courses.push({
      id: `ai-course-${page}-${i}`,
      title: template.title,
      description: template.description,
      category: template.category,
      thumbnail: AI_THUMBNAILS[thumbnailIndex],
      lessons: Math.floor(Math.random() * 30) + 10,
      duration: `${Math.floor(Math.random() * 20) + 5}小时`,
      difficulty: ['初级', '中级', '高级'][Math.floor(Math.random() * 3)] as any
    });
  }
  return courses;
};

const Courses: React.FC<CoursesProps> = ({ onAccessTrigger }) => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial load
    setCourses(generateCourses(1, 12));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [loading, hasMore, page]);

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      const nextPage = page + 1;
      setCourses((prev) => [...prev, ...generateCourses(nextPage, 12)]);
      setPage(nextPage);
      setLoading(false);
      if (nextPage >= 10) { // Limit to 10 pages for demo
        setHasMore(false);
      }
    }, 800);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <CourseFilterHeader 
          title="课程大厅" 
          subtitle="真实行业项目实战学习" 
          icon={<BookOpen className="w-6 h-6" />}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.map((course) => (
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
                  <span className="text-blue-500 font-medium">{Math.floor(Math.random() * 500) + 50} 人在学</span>
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

        {/* Loading Indicator / Infinite Scroll Trigger */}
        <div 
          ref={loaderRef} 
          className="mt-12 flex flex-col items-center justify-center py-8 text-slate-500"
        >
          {loading && (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
              <span className="text-sm font-medium">正在加载更多课程...</span>
            </div>
          )}
          {!hasMore && (
            <div className="text-sm font-medium text-slate-400">
              没有更多课程了
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;