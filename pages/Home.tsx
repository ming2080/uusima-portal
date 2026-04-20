import React, { useState, useEffect } from 'react';
import { ArrowRight, Monitor, BookOpen, Award, Cpu, ChevronLeft, ChevronRight, Star, Zap, BarChart3, Cloud, FileBadge, BrainCircuit, PlayCircle, Clock, Eye } from 'lucide-react';
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
      subtitle: "云端实验 · 即点即用",
      description: "校内专属虚拟仿真环境，深度集成课程资源，提供一站式理实一体化实验大厅体验。",
      image: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?q=80&w=1920&auto=format&fit=crop",
      link: "/labs",
      cta: "进入实验大厅",
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
      id: 'ai-course-1-0',
      title: '机器学习基础',
      category: '人工智能',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
      desc: '掌握监督学习、无监督学习等核心算法及应用。',
      hours: '15小时',
      enrolled: 452
    },
    {
      id: 'ai-course-1-1',
      title: '深度学习入门',
      category: '人工智能',
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800',
      desc: '基于 PyTorch/TensorFlow 构建神经网络模型。',
      hours: '20小时',
      enrolled: 385
    },
    {
      id: 'ai-course-1-2',
      title: '自然语言处理实战',
      category: '人工智能',
      image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&q=80&w=800',
      desc: '文本分类、情感分析与机器翻译技术解析。',
      hours: '18小时',
      enrolled: 290
    },
    {
      id: 'ai-course-1-3',
      title: '计算机视觉与图像处理',
      category: '人工智能',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800',
      desc: '图像识别、目标检测与图像分割算法实战。',
      hours: '22小时',
      enrolled: 310
    }
  ];

  const featuredLabs = [
    { 
        id: '4', 
        title: 'IoT 智能家居数据流实战', 
        description: '模拟传感器数据流向 MQTT 代理。使用 Node-RED 构建可视化数据处理流水线。', 
        category: '组合型',
        courseName: 'AIoT系统实战',
        image: 'https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?auto=format&fit=crop&q=80&w=800', 
        status: '运行中',
        icon: Cpu
    },
    { 
        id: '8', 
        title: 'Jupyter 交互式数据分析', 
        description: '在云端 Jupyter Notebook 环境中，使用 Python 进行数据清洗、探索性数据分析 (EDA) 与可视化。', 
        category: '容器型',
        courseName: '数据分析基础',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800', 
        status: '运行中',
        icon: BarChart3
    },
    { 
        id: '9', 
        title: '计算机视觉数据标注实战', 
        description: '使用专业数据标注工具，完成图像分类、目标检测 (Bounding Box) 和语义分割的数据准备工作。', 
        category: '平台型',
        courseName: '计算机视觉',
        image: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?auto=format&fit=crop&q=80&w=800', 
        status: '运行中',
        icon: Eye
    },
    { 
        id: '10', 
        title: 'VSCode 云端深度学习开发', 
        description: '在预装 PyTorch/TensorFlow 的云端 VSCode 环境中，构建、训练并评估深度神经网络模型。', 
        category: '容器型',
        courseName: '深度学习',
        image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800', 
        status: '运行中',
        icon: BrainCircuit
    }
  ];

  const featuredExams = [
    {
      id: 'e1',
      title: '2026年春季学期期中考试 - 高等数学',
      description: '本次考试涵盖微积分基础、极限与连续等核心知识点，请同学们提前做好准备，携带学生证入场。',
      mode: 'exam',
      status: 'upcoming',
      date: '2026-04-10 09:00',
      tags: ['期中考试', '必修课']
    },
    {
      id: 'c1',
      title: 'AWS Certified Solutions Architect',
      description: '亚马逊AWS官方认证，验证您在AWS平台上设计分布式系统的能力，是云计算领域的黄金证书。',
      mode: 'certification',
      status: 'upcoming',
      date: '2026-05-01 10:00',
      tags: ['云计算', '国际认证']
    },
    {
      id: 'comp1',
      title: '第十五届蓝桥杯全国软件和信息技术专业人才大赛',
      description: '全国性IT类学科竞赛，旨在推动软件开发技术的发展，培养创新型人才，含金量极高。',
      mode: 'competition',
      status: 'ongoing',
      date: '报名中',
      tags: ['学科竞赛', 'A类赛事']
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
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
             {featuredCourses.map((course) => (
               <Link 
                 key={course.id} 
                 to={`/course/${course.id}`}
                 className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group block"
               >
                  <div className="h-44 relative overflow-hidden bg-slate-100">
                     <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                     <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
                        <Clock className="w-3 h-3" /> {course.hours}
                     </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center justify-between text-xs mb-3">
                      <span className="text-blue-500 font-medium bg-blue-50 px-2 py-1 rounded">实验环境:提供</span>
                      <span className="text-blue-500 font-medium">{course.enrolled} 人在学</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">{course.title}</h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-1">{course.desc}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                       <div className="flex items-center gap-1.5 text-xs text-gray-500">
                         <Monitor className="w-3.5 h-3.5 text-blue-500" />
                         <span>提供专属实验环境</span>
                       </div>
                       <span className="font-medium text-sm text-blue-600 group-hover:text-blue-800 transition-colors flex items-center">
                         开始学习 <ArrowRight className="w-4 h-4 ml-1" />
                       </span>
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
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">实验大厅</h2>
              <p className="mt-2 text-sm md:text-base text-gray-500">校内专属虚拟仿真环境，深度集成课程资源，提供一站式理实一体化实操体验。</p>
            </div>
            <Link to="/labs" className="hidden md:flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors">
              进入大厅 <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredLabs.map((lab) => (
              <Link 
                key={lab.id} 
                to={`/labs/${lab.id}`}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col group"
              >
                <div className="h-40 relative overflow-hidden">
                  <img src={lab.image} alt={lab.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                        <lab.icon className="w-4 h-4 text-blue-500" />
                      </div>
                      <h3 className="text-base font-semibold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">{lab.title}</h3>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-1">{lab.description}</p>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">{lab.category}</span>
                    <span className="flex items-center gap-1 text-xs font-medium text-yellow-600 bg-yellow-50 px-2 py-1 rounded">
                      <span>4.8</span>
                      <Star className="w-3 h-3 fill-current" />
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center text-xs text-gray-500 line-clamp-1 flex-1 pr-2">
                      <BookOpen className="w-3.5 h-3.5 text-blue-500 mr-1.5 flex-shrink-0" />
                      <span className="truncate">关联课程: {lab.courseName}</span>
                    </div>
                    <span className="text-sm font-semibold text-blue-600 group-hover:text-blue-800 flex items-center transition-colors flex-shrink-0">
                      进入实验 <ArrowRight className="w-4 h-4 ml-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link to="/labs" className="inline-flex items-center justify-center w-full px-6 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
              进入大厅 <ArrowRight className="w-4 h-4 ml-2" />
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
          
          <div className="space-y-4">
            {featuredExams.map((exam) => (
              <Link 
                key={exam.id} 
                to="/exams"
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow group block"
              >
                {/* Left: Date/Status Block */}
                <div className="flex-shrink-0 w-full md:w-32 flex flex-col items-center justify-center p-4 rounded-lg bg-gray-50 border border-gray-100">
                  {exam.status === 'ongoing' ? (
                    <>
                      <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-2 animate-pulse">
                        <PlayCircle className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-green-600">进行中</span>
                    </>
                  ) : (
                    <>
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-2">
                        <Clock className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-blue-600">即将开始</span>
                    </>
                  )}
                </div>

                {/* Middle: Content */}
                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded text-white ${
                      exam.mode === 'exam' ? 'bg-blue-500' : 
                      exam.mode === 'certification' ? 'bg-purple-500' : 'bg-orange-500'
                    }`}>
                      {exam.mode === 'exam' ? '考试' : exam.mode === 'certification' ? '认证' : '竞赛'}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{exam.title}</h3>
                  </div>
                  <p className="text-gray-500 text-sm mb-3 line-clamp-2">{exam.description}</p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {exam.date}
                    </div>
                    <div className="flex items-center gap-2">
                      {exam.tags?.map(tag => (
                        <span key={tag} className="px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Action */}
                <div className="flex-shrink-0 flex items-center justify-end md:justify-center md:border-l border-gray-100 md:pl-6">
                  <span className={`px-5 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2 ${
                    exam.status === 'ongoing' 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                  }`}>
                    {exam.status === 'ongoing' ? '立即参与' : '查看详情'}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
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