import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lab, User } from '../types';
import { Play, Search, Filter, Clock, BarChart, ChevronRight, Star, CheckCircle, BookOpen, Eye, Flame } from 'lucide-react';

interface LabsProps {
  user: User | null;
  onLoginRequest: () => void;
}

const LABS_DATA: any[] = [
    { 
        id: '4', 
        title: 'IoT 智能家居数据流实战', 
        description: '模拟传感器数据流向 MQTT 代理。使用 Node-RED 构建可视化数据处理流水线。', 
        category: '组合型',
        difficulty: '中级',
        duration: '150 分钟',
        rating: 4.6,
        enrolled: 720,
        tools: ['MQTT', 'Node-RED'], 
        thumbnail: 'https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?auto=format&fit=crop&q=80&w=800', 
        status: '运行中' 
    },
    { 
        id: '5', 
        title: '物联网虚拟仿真综合实验', 
        description: '基于虚拟仿真平台，完成从传感器数据采集、网关传输到云端平台展示的完整物联网链路实验。', 
        category: '平台型',
        difficulty: '中级',
        duration: '180 分钟',
        rating: 4.8,
        enrolled: 450,
        tools: ['仿真器', '传感器', '云平台'], 
        thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800', 
        status: '运行中' 
    },
    { 
        id: '6', 
        title: '嵌入式系统开发与仿真', 
        description: '使用嵌入式仿真工具，进行 ARM 架构下的裸机程序开发与 RTOS 移植实验。', 
        category: '虚拟系统',
        difficulty: '高级',
        duration: '200 分钟',
        rating: 4.9,
        enrolled: 320,
        tools: ['ARM', 'RTOS', 'C语言'], 
        thumbnail: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=800', 
        status: '运行中' 
    },
    { 
        id: '7', 
        title: 'ThingsBoard 物联网平台实战', 
        description: '搭建并配置 ThingsBoard 开源物联网平台，实现设备接入、数据可视化与规则引擎配置。', 
        category: '组合型',
        difficulty: '中级',
        duration: '160 分钟',
        rating: 4.7,
        enrolled: 580,
        tools: ['ThingsBoard', 'MQTT', '规则引擎'], 
        thumbnail: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=800', 
        status: '运行中' 
    },
    { 
        id: '8', 
        title: 'Jupyter 交互式数据分析', 
        description: '在云端 Jupyter Notebook 环境中，使用 Python 进行数据清洗、探索性数据分析 (EDA) 与可视化。', 
        category: '容器型',
        difficulty: '初级',
        duration: '90 分钟',
        rating: 4.8,
        enrolled: 1500,
        tools: ['Jupyter', 'Python', 'Pandas'], 
        thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800', 
        status: '运行中' 
    },
    { 
        id: '9', 
        title: '计算机视觉数据标注实战', 
        description: '使用专业数据标注工具，完成图像分类、目标检测 (Bounding Box) 和语义分割的数据准备工作。', 
        category: '平台型',
        difficulty: '初级',
        duration: '120 分钟',
        rating: 4.5,
        enrolled: 800,
        tools: ['CVAT', 'LabelImg', 'JSON'], 
        thumbnail: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?auto=format&fit=crop&q=80&w=800', 
        status: '运行中' 
    },
    { 
        id: '10', 
        title: 'VSCode 云端深度学习开发', 
        description: '在预装 PyTorch/TensorFlow 的云端 VSCode 环境中，构建、训练并评估深度神经网络模型。', 
        category: '容器型',
        difficulty: '高级',
        duration: '240 分钟',
        rating: 4.9,
        enrolled: 650,
        tools: ['VSCode', 'PyTorch', 'GPU'], 
        thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800', 
        status: '运行中' 
    }
];

const CATEGORIES = ['全部', '平台型', '容器型', '虚拟系统', '组合型'];

const SORTS = ['默认排序', '最多课程', '最多浏览', '使用最多'];

const Labs: React.FC<LabsProps> = ({ user, onLoginRequest }) => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('全部');
  const [activeSort, setActiveSort] = useState('默认排序');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredLabs = LABS_DATA.filter(lab => {
    const matchesCategory = activeCategory === '全部' || lab.category === activeCategory;
    const matchesSearch = lab.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          lab.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    switch (activeSort) {
      case '最多浏览':
        return b.enrolled - a.enrolled; // Assuming enrolled is related to views for mock data
      case '使用最多':
        return b.rating - a.rating; // Assuming rating is related to usage for mock data
      // Add more sorting logic if needed
      default:
        return 0;
    }
  });

  const handleViewDetail = (labId: string) => {
    navigate(`/labs/${labId}`);
  };

  const handleAdvancedFilter = () => {
    setToastMessage("高级筛选功能开发中...");
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-16 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in-down flex items-center">
          <CheckCircle className="w-4 h-4 mr-2" />
          {toastMessage}
        </div>
      )}

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-800 text-white py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              云端实训中心
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
              无需配置本地环境，一键开启沉浸式实战演练。涵盖主流技术栈，配备 AI 智能助教，随时随地提升你的工程实践能力。
            </p>
            
            {/* Search Bar */}
            <form onSubmit={(e) => e.preventDefault()} className="relative max-w-2xl">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-6 w-6 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-12 pr-4 py-4 rounded-xl border-0 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-lg bg-white text-gray-900 shadow-xl placeholder:text-gray-400"
                placeholder="搜索实验名称、技术栈或关键字..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute inset-y-2 right-2 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                搜索
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Filters Header */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
          {/* Categories Filter */}
          <div className="flex items-center mb-4">
            <span className="text-gray-600 font-medium w-16 flex-shrink-0 text-right mr-4">分类：</span>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded text-sm transition-all ${
                    activeCategory === cat 
                      ? 'text-blue-600 border border-blue-200 bg-blue-50/50' 
                      : 'text-gray-600 hover:text-blue-600 border border-transparent'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="h-px bg-gray-100 w-full mb-4"></div>

          {/* Sort Filter */}
          <div className="flex items-center">
            <div className="flex flex-wrap gap-6">
              {SORTS.map(sort => (
                <button
                  key={sort}
                  onClick={() => setActiveSort(sort)}
                  className={`text-sm transition-all ${
                    activeSort === sort 
                      ? 'text-blue-600 font-medium' 
                      : 'text-gray-500 hover:text-blue-600'
                  }`}
                >
                  {sort}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Lab Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredLabs.map((lab) => (
                <div 
                  key={lab.id} 
                  onClick={() => handleViewDetail(lab.id)}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col group"
                >
                    {/* Thumbnail */}
                    <div className="h-48 relative overflow-hidden">
                         <img src={lab.thumbnail} alt={lab.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                              <div className="w-5 h-5 text-blue-500">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                              </div>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                                {lab.title}
                            </h3>
                          </div>
                          <span className="text-xs font-medium text-white bg-blue-500 px-2 py-1 rounded ml-2 flex-shrink-0">{lab.category}</span>
                        </div>
                        
                        <div className="flex items-start gap-2 mb-6">
                          <span className="text-gray-400 text-sm font-medium flex-shrink-0 mt-0.5">实验<br/>简介：</span>
                          <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                            {lab.description}
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2 text-sm text-gray-500 mb-6">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-1.5">
                              <BookOpen className="w-4 h-4 text-blue-500" /> 
                              <span className="font-medium text-gray-700">67</span>
                            </div>
                            <span className="text-xs">门</span>
                          </div>
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-1.5">
                              <Clock className="w-4 h-4 text-blue-500" /> 
                              <span className="font-medium text-gray-700">27,157</span>
                            </div>
                            <span className="text-xs">小时</span>
                          </div>
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-1.5">
                              <Eye className="w-4 h-4 text-blue-500" /> 
                              <span className="font-medium text-gray-700">14,097</span>
                            </div>
                            <span className="text-xs">浏览人次</span>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 text-sm text-gray-600">
                                  <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                                  <span>热门课程:</span>
                                </div>
                                <div className="flex -space-x-2">
                                  <div className="w-6 h-6 rounded bg-blue-100 border border-white"></div>
                                  <div className="w-6 h-6 rounded bg-blue-200 border border-white"></div>
                                  <div className="w-6 h-6 rounded bg-blue-300 border border-white"></div>
                                </div>
                            </div>
                            <button className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-md transition-colors shadow-sm">
                              立即体验
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {filteredLabs.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">未找到相关实训</h3>
            <p className="text-gray-500">请尝试调整搜索关键词或筛选条件。</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Labs;