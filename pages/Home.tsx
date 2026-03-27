import React, { useState, useEffect } from 'react';
import { ArrowRight, Monitor, BookOpen, Award, Cpu, ChevronLeft, ChevronRight, Star, Zap, BarChart3, Cloud, FileBadge, BrainCircuit } from 'lucide-react';
import { Link } from 'react-router-dom';
import { User, UserRole } from '../types';
import StudentDashboard from './dashboards/StudentDashboard';
import TeacherDashboard from './dashboards/TeacherDashboard';
import SchoolAdminDashboard from './dashboards/SchoolAdminDashboard';
import SystemAdminDashboard from './dashboards/SystemAdminDashboard';

interface HomeProps {
  user?: User | null;
}

const MarketingHome: React.FC = () => {
  // --- Hero Carousel State ---
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      id: 1,
      title: "精品实战课程体系",
      subtitle: "紧贴行业需求 · 理论实战并重",
      description: "涵盖物联网、大数据、云计算等前沿技术领域，由行业专家倾力打造，帮助学生掌握核心职业技能。",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1920&auto=format&fit=crop",
      link: "/courses",
      cta: "探索课程",
      color: "from-blue-600 to-indigo-900"
    },
    {
      id: 2,
      title: "沉浸式虚拟实训室",
      subtitle: "云端实训 · 即点即用",
      description: "校内专属虚拟仿真环境，深度集成课程资源，提供一站式理实一体化实训体验。",
      image: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?q=80&w=1920&auto=format&fit=crop",
      link: "/labs",
      cta: "进入实训中心",
      color: "from-cyan-600 to-blue-900"
    },
    {
      id: 3,
      title: "权威认证与技能竞赛",
      subtitle: "以赛促学 · 课证融通",
      description: "提供行业认可的职业技能等级证书认证服务，配套全国职业院校技能大赛辅导资源，助力职场起飞。",
      image: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1920&auto=format&fit=crop",
      link: "/exams",
      cta: "查看认证",
      color: "from-purple-600 to-indigo-900"
    },
    {
      id: 4,
      title: "AI 学科大模型赋能",
      subtitle: "UusiBot · 您的专属智能助教",
      description: "基于 Gemini 2.5 架构深度定制的教学大模型，提供7x24小时智能答疑、代码纠错与个性化学习路径推荐。",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1920&auto=format&fit=crop",
      link: "/about",
      cta: "体验 AI",
      color: "from-emerald-600 to-teal-900"
    }
  ];

  const featuredCourses = [
    {
      id: 101,
      title: "嵌入式系统开发",
      category: "硬件开发",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800", // Circuit board
      desc: "深入理解ARM架构与实时操作系统，掌握底层驱动编写。",
      hours: "48 课时"
    },
    {
      id: 102,
      title: "移动端应用实战",
      category: "软件工程",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800", // Mobile phone
      desc: "使用 React Native 构建跨平台移动应用，从UI设计到上架发布。",
      hours: "32 课时"
    },
    {
      id: 103,
      title: "商业数据可视化",
      category: "数据分析",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800", // Charts
      desc: "学习 Tableau 与 ECharts，将复杂数据转化为直观的商业洞察。",
      hours: "24 课时"
    }
  ];

  const featuredLabs = [
    {
      id: 1,
      title: "人工智能深度学习实验室",
      category: "AI 实验室",
      icon: BrainCircuit,
      description: "预置 PyTorch/TensorFlow 环境，配备高性能 GPU 算力，支持图像识别与自然语言处理实战。",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
      status: "空闲可用"
    },
    {
      id: 2,
      title: "大数据分布式计算环境",
      category: "大数据实验室",
      icon: BarChart3,
      description: "一键部署 Hadoop/Spark 集群，提供海量脱敏数据集，真实还原企业级数据处理场景。",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
      status: "资源充足"
    },
    {
      id: 3,
      title: "云原生微服务架构实训",
      category: "云计算实验室",
      icon: Cloud,
      description: "基于 Kubernetes 的容器化部署环境，支持 CI/CD 流水线搭建与微服务治理演练。",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
      status: "推荐使用"
    }
  ];

  const featuredExams = [
    {
      id: 1,
      title: "UUSIMA 认证云架构师",
      level: "专家级 (Expert)",
      icon: Award,
      description: "考察在复杂业务场景下的云原生架构设计、高可用部署与性能调优能力。",
      date: "每月第三个周末"
    },
    {
      id: 2,
      title: "UUSIMA 认证数据分析师",
      level: "专业级 (Professional)",
      icon: FileBadge,
      description: "评估数据清洗、建模分析及可视化呈现的综合实战技能。",
      date: "随到随考"
    },
    {
      id: 3,
      title: "UUSIMA 认证物联网工程师",
      level: "基础级 (Associate)",
      icon: Cpu,
      description: "检验物联网基础理论、设备接入与边缘计算的入门掌握程度。",
      date: "随到随考"
    }
  ];

  // --- Hero Auto-play ---
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const nextHeroSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevHeroSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div>
      {/* --- HERO CAROUSEL --- */}
      {/* Reduced height to h-[280px] md:h-[380px] */}
      <section className="relative h-[280px] md:h-[380px] bg-gray-900 text-white overflow-hidden group">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.color} opacity-80 sm:opacity-70 mix-blend-multiply`}></div>
            <div className="absolute inset-0 bg-black/20"></div>

            <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
              <div className="max-w-2xl animate-fade-in-up pt-4 md:pt-0">
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-[10px] md:text-xs font-medium mb-2 md:mb-3 text-blue-100">
                   <Star className="w-3 h-3 mr-1.5 text-yellow-400" fill="currentColor" />
                   {slide.subtitle}
                </div>
                {/* Scaled down font sizes */}
                <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-2 md:mb-3 leading-tight shadow-sm">
                  {slide.title}
                </h1>
                <p className="text-sm md:text-base text-gray-100 mb-4 md:mb-6 leading-relaxed border-l-4 border-white/30 pl-3 md:pl-4 max-w-lg line-clamp-2 md:line-clamp-none">
                  {slide.description}
                </p>
                <Link 
                  to={slide.link} 
                  className="inline-flex items-center justify-center px-5 py-2 md:px-6 md:py-2.5 border border-transparent text-xs md:text-sm font-medium rounded-lg text-blue-900 bg-white hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg"
                >
                  {slide.cta}
                  <ArrowRight className="ml-1.5 w-3.5 h-3.5 md:ml-2 md:w-4 md:h-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={prevHeroSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-1.5 rounded-full bg-black/30 text-white hover:bg-white hover:text-gray-900 transition-all backdrop-blur-sm opacity-0 group-hover:opacity-100"
        >
          <ChevronLeft className="w-5 h-5 md:w-7 md:h-7" />
        </button>
        <button
          onClick={nextHeroSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-1.5 rounded-full bg-black/30 text-white hover:bg-white hover:text-gray-900 transition-all backdrop-blur-sm opacity-0 group-hover:opacity-100"
        >
          <ChevronRight className="w-5 h-5 md:w-7 md:h-7" />
        </button>

        <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-6 h-1 md:w-10 md:h-1.5 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white' : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* --- STATS BAR --- */}
      {/* Reduced negative margin to match smaller header -mt-4 md:-mt-6 */}
      <section className="bg-white border-b border-gray-100 shadow-sm relative z-20 -mt-6 md:-mt-8 mx-3 md:mx-auto max-w-[1440px] rounded-xl">
        <div className="px-4 sm:px-6 lg:px-8 py-5 md:py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { icon: BookOpen, label: '500+ 精品课程', sub: '教育部标准对齐' },
              { icon: Monitor, label: '云端实验室', sub: 'Docker/K8s 容器化' },
              { icon: Award, label: '认证体系', sub: '行业龙头企业认可' },
              { icon: Zap, label: 'AI 智慧教学', sub: '知识图谱 + 个性化' },
            ].map((stat, idx) => (
              <div key={idx} className="flex items-center space-x-3 md:space-x-4 group cursor-default">
                <div className="bg-blue-50 p-2 md:p-3 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <stat.icon className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm md:text-base group-hover:text-blue-600 transition-colors">{stat.label}</p>
                  <p className="text-xs text-gray-500 hidden sm:block">{stat.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FEATURED COURSES --- */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">热门课程推荐</h2>
              <p className="mt-2 text-sm md:text-base text-gray-600">根据本学期教学大纲为您精选。</p>
            </div>
            <Link to="/courses" className="hidden sm:flex items-center text-blue-600 font-medium hover:text-blue-700 group text-sm">
              查看课程大厅 <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
             {featuredCourses.map((course) => (
               <Link 
                 key={course.id} 
                 to={`/course/${course.id}`}
                 className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group block"
               >
                  <div className="h-40 md:h-48 bg-gray-200 relative overflow-hidden">
                     <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                     <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-blue-800 uppercase">
                        {course.category}
                     </div>
                  </div>
                  <div className="p-5 md:p-6">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{course.title}</h3>
                    <p className="text-gray-500 text-xs md:text-sm mb-4 line-clamp-2">{course.desc}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                       <span className="text-xs text-gray-500 flex items-center"><Monitor className="w-3 h-3 mr-1"/> {course.hours}</span>
                       <span className="font-medium text-sm text-blue-600 group-hover:text-blue-800 transition-colors">开始学习</span>
                    </div>
                  </div>
               </Link>
             ))}
          </div>
        </div>
      </section>

      {/* --- PRACTICAL TRAINING CENTER --- */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8 md:mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">实训中心</h2>
              <p className="mt-2 text-sm md:text-base text-gray-500">校内专属虚拟仿真环境，深度集成课程资源，提供一站式理实一体化实训体验。</p>
            </div>
            <Link to="/labs" className="hidden md:flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors">
              进入中心 <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredLabs.map((lab) => (
              <Link 
                key={lab.id} 
                to={`/labs/${lab.id}`}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={lab.image} alt={lab.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-blue-700 flex items-center">
                    <lab.icon className="w-3.5 h-3.5 mr-1.5" />
                    {lab.category}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">{lab.title}</h3>
                  <p className="text-gray-500 text-sm mb-6 flex-1 line-clamp-3">{lab.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">{lab.status}</span>
                    <span className="text-sm font-semibold text-blue-600 group-hover:text-blue-800 flex items-center transition-colors">
                      开始实验 <ArrowRight className="w-4 h-4 ml-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link to="/labs" className="inline-flex items-center justify-center w-full px-6 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
              进入中心 <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* --- EXAM CERTIFICATION --- */}
      <section className="py-12 md:py-16 bg-slate-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8 md:mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">考试认证</h2>
              <p className="mt-2 text-sm md:text-base text-gray-500">权威的技能认证体系，检验学习成果，提升职业竞争力。</p>
            </div>
            <Link to="/exams" className="hidden md:flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors">
              查看全部 <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredExams.map((exam) => (
              <div key={exam.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <exam.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{exam.title}</h3>
                <div className="inline-block px-2.5 py-1 bg-purple-50 text-purple-700 text-xs font-semibold rounded-md mb-4">
                  {exam.level}
                </div>
                <p className="text-gray-500 text-sm mb-6 line-clamp-2">{exam.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-xs text-gray-400 font-medium">{exam.date}</span>
                  <Link to="/exams" className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                    了解详情
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link to="/exams" className="inline-flex items-center justify-center w-full px-6 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
              查看全部 <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

const Home: React.FC<HomeProps> = ({ user }) => {
  return <MarketingHome />;
};

export default Home;