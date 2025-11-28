import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Monitor, BookOpen, Award, Cpu, ChevronLeft, ChevronRight, Star, Zap, Activity, Truck, Sprout, Building, Wallet, Radio, Code, BarChart3, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  // --- Hero Carousel State ---
  const [currentSlide, setCurrentSlide] = useState(0);

  // --- Case Studies Carousel State ---
  const [caseIndex, setCaseIndex] = useState(0);
  const [itemsPerScreen, setItemsPerScreen] = useState(3);
  const [isCaseHovered, setIsCaseHovered] = useState(false);

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
      title: "沉浸式虚拟实验室",
      subtitle: "云端实训 · 即点即用",
      description: "无需本地配置，基于 Docker 与 K8s 的高仿真实验环境，支持 Linux、网络拓扑、IoT 设备仿真，让实践触手可及。",
      image: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?q=80&w=1920&auto=format&fit=crop",
      link: "/labs",
      cta: "进入实验室",
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

  const cases = [
    {
      id: 1,
      title: "智慧物流供应链",
      category: "工业物联网",
      icon: Truck,
      description: "结合 RFID 与 AGV 技术的智能仓储实训系统，还原真实物流分拣场景。",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
      stats: "效率提升 40%"
    },
    {
      id: 2,
      title: "工业 4.0 数字孪生",
      category: "智能制造",
      icon: Cpu,
      description: "利用实时数据采集与 3D 可视化，构建生产线数字孪生教学环境。",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
      stats: "故障预警 99%"
    },
    {
      id: 3,
      title: "智慧农业监测系统",
      category: "农业物联网",
      icon: Sprout,
      description: "基于 NB-IoT 的土壤环境监测与自动灌溉系统，服务现代农业技术专业。",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=800",
      stats: "节水 30%"
    },
    {
      id: 4,
      title: "城市智慧交通大脑",
      category: "人工智能",
      icon: Radio,
      description: "运用计算机视觉进行车流分析与信号灯智能调控的实战案例。",
      image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=800",
      stats: "拥堵降低 25%"
    },
    {
      id: 5,
      title: "金融科技区块链",
      category: "大数据与区块链",
      icon: Wallet,
      description: "基于联盟链的供应链金融平台，保障数据不可篡改与透明溯源。",
      image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=800",
      stats: "交易透明化"
    },
    {
      id: 6,
      title: "远程智慧医疗",
      category: "数字医疗",
      icon: Activity,
      description: "结合 5G 与 VR 技术的手术示教与远程诊断系统，赋能护理与医学专业。",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
      stats: "响应速度 <10ms"
    }
  ];

  // --- Hero Auto-play ---
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // --- Responsive Logic for Cases ---
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerScreen(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerScreen(2);
      } else {
        setItemsPerScreen(3);
      }
    };
    handleResize(); // Init
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Cases Auto-play ---
  useEffect(() => {
    if (isCaseHovered) return;
    
    const timer = setInterval(() => {
      setCaseIndex((prev) => {
        const maxIndex = cases.length - itemsPerScreen;
        if (prev >= maxIndex) return 0;
        return prev + 1;
      });
    }, 4000);
    return () => clearInterval(timer);
  }, [itemsPerScreen, cases.length, isCaseHovered]);

  const nextHeroSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevHeroSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const nextCase = () => {
    const maxIndex = cases.length - itemsPerScreen;
    setCaseIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevCase = () => {
    const maxIndex = cases.length - itemsPerScreen;
    setCaseIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <div>
      {/* --- HERO CAROUSEL --- */}
      <section className="relative h-[500px] md:h-[600px] bg-gray-900 text-white overflow-hidden group">
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

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
              <div className="max-w-2xl animate-fade-in-up">
                <div className="inline-flex items-center px-3 py-1 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-sm font-medium mb-4 text-blue-100">
                   <Star className="w-4 h-4 mr-2 text-yellow-400" fill="currentColor" />
                   {slide.subtitle}
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight shadow-sm">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl text-gray-100 mb-8 leading-relaxed border-l-4 border-white/30 pl-4">
                  {slide.description}
                </p>
                <Link 
                  to={slide.link} 
                  className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-blue-900 bg-white hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg"
                >
                  {slide.cta}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={prevHeroSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 text-white hover:bg-white hover:text-gray-900 transition-all backdrop-blur-sm opacity-0 group-hover:opacity-100"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        <button
          onClick={nextHeroSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 text-white hover:bg-white hover:text-gray-900 transition-all backdrop-blur-sm opacity-0 group-hover:opacity-100"
        >
          <ChevronRight className="w-8 h-8" />
        </button>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-12 h-1.5 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white' : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* --- STATS BAR --- */}
      <section className="bg-white border-b border-gray-100 shadow-sm relative z-20 -mt-8 mx-4 md:mx-auto max-w-7xl rounded-xl">
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: BookOpen, label: '500+ 精品课程', sub: '教育部标准对齐' },
              { icon: Monitor, label: '云端实验室', sub: 'Docker/K8s 容器化' },
              { icon: Award, label: '1+X 证书认证', sub: '行业龙头企业认可' },
              { icon: Zap, label: 'AI 智慧教学', sub: '知识图谱 + 个性化' },
            ].map((stat, idx) => (
              <div key={idx} className="flex items-center space-x-4 group cursor-default">
                <div className="bg-blue-50 p-3 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{stat.label}</p>
                  <p className="text-sm text-gray-500">{stat.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FEATURED COURSES --- */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">热门课程推荐</h2>
              <p className="mt-2 text-gray-600">根据本学期教学大纲为您精选。</p>
            </div>
            <Link to="/courses" className="hidden sm:flex items-center text-blue-600 font-medium hover:text-blue-700 group">
              查看课程大厅 <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
             {featuredCourses.map((course) => (
               <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group">
                  <div className="h-48 bg-gray-200 relative overflow-hidden">
                     <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                     <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-blue-800 uppercase">
                        {course.category}
                     </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{course.title}</h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">{course.desc}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                       <span className="text-sm text-gray-500 flex items-center"><Monitor className="w-3 h-3 mr-1"/> {course.hours}</span>
                       <span className="font-medium text-blue-600 hover:text-blue-800 cursor-pointer">开始学习</span>
                    </div>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </section>

       {/* --- INDUSTRY CASES SLIDER --- */}
       <section className="py-16 bg-white overflow-hidden" onMouseEnter={() => setIsCaseHovered(true)} onMouseLeave={() => setIsCaseHovered(false)}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex justify-between items-center mb-10">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">行业融合案例展示</h2>
                <p className="mt-2 text-gray-500">探索 UUSIMA 产品在各行各业的实际应用场景。</p>
              </div>
              <div className="flex space-x-2">
                 <button onClick={prevCase} className="p-2 rounded-full border border-gray-300 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    <ChevronLeft className="w-5 h-5" />
                 </button>
                 <button onClick={nextCase} className="p-2 rounded-full border border-gray-300 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    <ChevronRight className="w-5 h-5" />
                 </button>
              </div>
           </div>
           
           <div className="relative">
              <div 
                className="flex transition-transform duration-500 ease-out will-change-transform"
                style={{ transform: `translateX(-${caseIndex * (100 / itemsPerScreen)}%)` }}
              >
                 {cases.map((item) => (
                    <div 
                      key={item.id} 
                      className="flex-shrink-0 px-3"
                      style={{ width: `${100 / itemsPerScreen}%` }}
                    >
                       <div className="bg-gray-50 rounded-2xl overflow-hidden group hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-gray-100">
                          <div className="relative h-48 overflow-hidden">
                             <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                             <div className="absolute bottom-3 left-4 text-white font-medium flex items-center text-sm">
                                <item.icon className="w-4 h-4 mr-1.5" />
                                {item.category}
                             </div>
                          </div>
                          <div className="p-6 flex-1 flex flex-col">
                             <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                             <p className="text-gray-500 text-sm mb-4 line-clamp-3 flex-1">
                               {item.description}
                             </p>
                             <div className="pt-4 border-t border-gray-200 mt-auto flex items-center justify-between">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                   {item.stats}
                                </span>
                                <Link to="/products" className="text-blue-600 text-sm font-semibold hover:text-blue-800 flex items-center">
                                   查看详情 <ArrowRight className="w-3 h-3 ml-1" />
                                </Link>
                             </div>
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Home;